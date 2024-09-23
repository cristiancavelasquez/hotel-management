import { getSession } from "@/auth/auth";
import LoginForm from "./components/LoginForm";
import { redirect } from "next/navigation";

export default async function Login() {
  const { user } = await getSession();
  if (user) {
    redirect("/dashboard");
  }
  return (
    <main className="h-screen flex items-center justify-center bg-red-200">
      <LoginForm />
    </main>
  );
}
