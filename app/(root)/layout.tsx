import React from "react";
import type { Metadata } from "next";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "../globals.css";
import { redirect } from "next/navigation";
import Topbar from "@/components/shared/Topbar";
import { getUserInfo } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/models/user";
import { getCategories } from "@/lib/actions/category.actions";
import { Toast } from "@/components/shared/Toast";
import { getIcons } from "@/lib/actions/icon.actions";
import { ICategory } from "@/lib/models/category";
import { IIcon } from "@/lib/models/icon";
import { MainContent } from "@/components/shared/MainContent";
import "@fontsource/ubuntu";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

export const metadata: Metadata = {
  title: "Things To Do",
  description: "All your To Dos, organised, simplified, accessible...",
  applicationName: "Things To Do",
  manifest: "/manifest.json",
  themeColor: "#877EFF",
  icons: [
    {
      url: "/assets/maskable_icon_x48",
      type: "image/png",
      sizes: "48x48",
    },
    {
      url: "/assets/maskable_icon_x72",
      type: "image/png",
      sizes: "72x72",
    },
    {
      url: "/assets/maskable_icon_x96.png",
      type: "image/png",
      sizes: "96x96",
    },
    {
      url: "/assets/maskable_icon_x128.png",
      type: "image/png",
      sizes: "128x128",
    },
    {
      url: "/assets/maskable_icon_x192.png",
      type: "image/png",
      sizes: "192x192",
      rel: "apple-touch-icon",
    },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Things To Do",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Things To Do",
    title: {
      default: "Things To Do",
      template: "% - PWA App",
    },
    description: "All your To Dos, organised, simplified, accessible...",
  },
  twitter: {
    card: "summary",
    title: {
      default: "Things To Do",
      template: "% - PWA App",
    },
    description: "All your To Dos, organised, simplified, accessible...",
  },
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

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <head>
          <ColorSchemeScript />
        </head>
        <body>
          <MantineProvider>
            <Topbar
              icons={icons}
              userId={userInfo._id}
              categories={categories}
            />
            <MainContent
              categories={categories}
              icons={icons}
              userId={userInfo._id}
              children={children}
            />
            <Toast />
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
