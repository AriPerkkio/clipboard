import { createCookieSessionStorage } from "@remix-run/cloudflare";

export const unencryptedSession = createCookieSessionStorage({
  cookie: {
    path: "/",
    sameSite: "lax",
  },
});
