import { getSession } from "@/auth/auth";
import { redirect } from "next/navigation";
import React from "react";
import LogoutButton from "../(login)/components/LogoutButton";

const DashboardPage = async () => {
  const { user } = await getSession();
  if (!user) {
    redirect("/");
  }
  return (
    <div>
      aca deberian ir las estadicsticas principales segun el tipo de usuario
      <LogoutButton />
    </div>
  );
};

export default DashboardPage;
