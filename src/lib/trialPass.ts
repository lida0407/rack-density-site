// Trial pass (TRY-SIGNUP.md §3): base64url(JSON {id, ed, iat, exp}) + "." + base64url(HMAC-SHA256(secret, payload part)).
// The e-mail never goes into the pass. Callback signature for POST /api/try/used: header X-RD-Signature =
// base64url(HMAC-SHA256(secret, raw request body)). WebCrypto only, so it runs in Pages Functions, the browser and Node.
export interface Pass { id: string; ed: 'homelab' | 'dc'; iat: number; exp: number }

const enc = new TextEncoder();
const b64url = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromB64url = (s: string) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (s.length % 4)) % 4)), (c) => c.charCodeAt(0));
const key = (secret: string) => crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);

export const hmac = async (secret: string, data: string) => b64url(new Uint8Array(await crypto.subtle.sign('HMAC', await key(secret), enc.encode(data))));
export const newPassId = () => b64url(crypto.getRandomValues(new Uint8Array(16)));

export async function signPass(secret: string, p: Pass): Promise<string> {
  const payload = b64url(enc.encode(JSON.stringify(p)));
  return `${payload}.${await hmac(secret, payload)}`;
}

/** The pass if the signature is right and it has not expired, else null. */
export async function verifyPass(secret: string, token: string, now = Math.floor(Date.now() / 1000)): Promise<Pass | null> {
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  let ok = false;
  try { ok = await crypto.subtle.verify('HMAC', await key(secret), fromB64url(sig), enc.encode(payload)); } catch { return null; }
  if (!ok) return null;
  try { const p = JSON.parse(new TextDecoder().decode(fromB64url(payload))) as Pass; return p.exp > now ? p : null; } catch { return null; }
}

/** Constant-time check of an X-RD-Signature header against the raw body. */
export async function verifyBody(secret: string, body: string, signature: string): Promise<boolean> {
  try { return await crypto.subtle.verify('HMAC', await key(secret), fromB64url(signature), enc.encode(body)); } catch { return false; }
}
