import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/db";
import {lucia} from "@/auth";

export default async function Page() {
	return (
		<>
			<h1>Sign in</h1>
			<form action={login}>
				<label htmlFor="username">Username</label>
				<input name="username" id="username" />
				<br />
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />
				<br />
				<button>Continue</button>
			</form>
		</>
	);
}

async function login( formData: FormData): Promise<ActionResult> {
	"use server";
	const username = formData.get("username");
    console.log(username);
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return {
			error: "Invalid username"
		};
	}
	const password = formData.get("password");
    console.log(password)
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		return {
			error: "Invalid password"
		};
	}

	
	const validPassword = await prisma.user.findFirst({
        where: {
            username: username,
            hashedPassword: password
        }
    });

    console.log(validPassword)


	if (!validPassword) {
		return {
			error: "Incorrect username or password"
		};
	}

	const session = await lucia.createSession(validPassword.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}

interface ActionResult {
	error: string;
}