import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "../globals.css";
import Topbar from "@/components/shared/Topbar";
import { getUserInfo } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { IUser } from "@/lib/models/user";
import { getCategories } from "@/lib/actions/category.actions";
import { Toast } from "@/components/shared/Toast";
import { getIcons } from "@/lib/actions/icon.actions";
import { ICategory } from "@/lib/models/category";
import { IIcon } from "@/lib/models/icon";
import { MainContent } from "@/components/shared/MainContent";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Things To Do",
  description: "All your To Dos, organised, simplified, accessible...",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo: IUser = await getUserInfo(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const categories: ICategory[] = await getCategories(userInfo._id);
  const icons: IIcon[] = await getIcons();
  const pullData = () => {};
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <Topbar icons={icons} userId={userInfo._id} categories={categories} />
          <MainContent
            categories={categories}
            icons={icons}
            userId={userInfo._id}
            children={children}
          />          <Toast />
        </body>
      </html>
    </ClerkProvider>
  );
}
