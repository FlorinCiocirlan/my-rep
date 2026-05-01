import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "session";
const SECRET = process.env.AUTH_SECRET ?? "dev-secret-change-me";

function base64url(input: string) {
  return Buffer.from(input).toString("base64url");
}

function sign(value: string) {
  return createHmac("sha256", SECRET).update(value).digest("base64url");
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, key] = stored.split(":");
  const hash = scryptSync(password, salt, 64);
  return timingSafeEqual(hash, Buffer.from(key, "hex"));
}

export function createSession(userId: string) {
  const payload = base64url(JSON.stringify({ userId, exp: Date.now() + 1000 * 60 * 60 * 24 * 30 }));
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function readSession(): { userId: string } | null {
  const cookie = cookies().get(SESSION_COOKIE)?.value;
  if (!cookie) return null;
  const [payload, signature] = cookie.split(".");
  if (!payload || !signature) return null;
  if (sign(payload) !== signature) return null;
  const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  if (!data?.exp || Date.now() > data.exp) return null;
  return { userId: data.userId };
}

export function setSessionCookie(session: string) {
  cookies().set(SESSION_COOKIE, session, { httpOnly: true, sameSite: "lax", secure: true, path: "/" });
}

export function clearSessionCookie() {
  cookies().delete(SESSION_COOKIE);
}
