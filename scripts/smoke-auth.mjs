const [baseUrl, email, password] = process.argv.slice(2);

if (!baseUrl || !email || !password) {
  throw new Error("Usage: npm run test:auth -- <base-url> <email> <password>");
}

const loginResponse = await fetch(new URL("/api/v1/auth/login", baseUrl), {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ email, password, rememberMe: false }),
});

if (!loginResponse.ok) {
  throw new Error(`Login failed: ${await loginResponse.text()}`);
}

const cookie = loginResponse.headers
  .getSetCookie()
  .map((value) => value.split(";", 1)[0])
  .join("; ");

if (!cookie) {
  throw new Error("Login response did not set a session cookie.");
}

const sessionResponse = await fetch(new URL("/api/v1/auth/session", baseUrl), {
  headers: { cookie },
});
const sessionPayload = await sessionResponse.json();

if (!sessionResponse.ok || !sessionPayload.data?.authenticated) {
  throw new Error("Session was not authenticated after login.");
}

const logoutResponse = await fetch(new URL("/api/v1/auth/logout", baseUrl), {
  method: "POST",
  headers: { cookie },
});

if (!logoutResponse.ok) {
  throw new Error(`Logout failed: ${await logoutResponse.text()}`);
}

const revokedSessionResponse = await fetch(new URL("/api/v1/auth/session", baseUrl), {
  headers: { cookie },
});
const revokedSessionPayload = await revokedSessionResponse.json();

if (!revokedSessionResponse.ok || revokedSessionPayload.data?.authenticated) {
  throw new Error("Session remained authenticated after logout.");
}

console.log(`Auth smoke test passed for ${email}.`);
