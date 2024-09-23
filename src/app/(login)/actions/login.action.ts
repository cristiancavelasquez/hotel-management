"use server";
import { verify } from "@node-rs/argon2";
import { z } from "zod";
import { loginSchema } from "../schemas/login.schema";
import prisma from "@/database/db";
import { getSession, lucia } from "@/auth/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      username: values.username,
    },
  });

  if (!existingUser) {
    return {
      error: "Incorrect username or password",
    };
  }

  const validPassword = await verify(
    existingUser.hashedPassword,
    values.password,
    {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    }
  );

  if (!validPassword) {
    return {
      error: "Incorrect username or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return {
    success: true,
  };
};

export const logoutAction = async () => {
  const { session } = await getSession();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
};
