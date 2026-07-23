export const SESSION_COOKIE = "portal_session";
export const SESSION_VALUE = "authenticated";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function isAuthEnabled(): boolean {
  return Boolean(process.env.PORTAL_ACCESS_PASSWORD?.trim());
}

export function getAuthSecret(): string | undefined {
  return process.env.AUTH_SECRET?.trim() || process.env.PORTAL_ACCESS_PASSWORD?.trim();
}

function bufferToHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function getExpectedToken(secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(SESSION_VALUE),
  );
  return bufferToHex(signature);
}

export async function createSessionToken(secret: string): Promise<string> {
  return getExpectedToken(secret);
}

export async function verifySessionToken(
  token: string | undefined,
  secret: string | undefined,
): Promise<boolean> {
  if (!token || !secret) return false;

  const expected = await getExpectedToken(secret);
  if (token.length !== expected.length) return false;

  let mismatch = 0;
  for (let i = 0; i < token.length; i++) {
    mismatch |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

export function verifyPassword(input: string): boolean {
  const expected = process.env.PORTAL_ACCESS_PASSWORD?.trim();
  if (!expected) return true;

  if (input.length !== expected.length) return false;

  let mismatch = 0;
  for (let i = 0; i < input.length; i++) {
    mismatch |= input.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function isRequestAuthenticated(
  token: string | undefined,
): Promise<boolean> {
  if (!isAuthEnabled()) return true;
  return verifySessionToken(token, getAuthSecret());
}
