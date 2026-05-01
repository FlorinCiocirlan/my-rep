export default function LoginPage() {
  return <main className="p-6 max-w-md mx-auto"><form action="/api/auth/login" method="post" className="space-y-3"><input className="border p-2 w-full" name="email" type="email" placeholder="Email" required/><input className="border p-2 w-full" name="password" type="password" placeholder="Parolă" required/><button className="border px-4 py-2" type="submit">Login</button></form></main>;
}
