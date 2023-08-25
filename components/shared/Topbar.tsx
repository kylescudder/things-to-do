"use client";

import Link from "next/link";
import { IconListCheck } from "@tabler/icons-react";
import Logout from "./Logout";
import { DarkModeToggle } from "../ui/dark-mode-toggle";

export default function Topbar() {
  return (
    <nav className="topbar">
      <Link
        href="/"
        className="flex 
			items-center gap-4"
      >
        <IconListCheck
          stroke={1}
          strokeLinejoin="miter"
          height={28}
          width={28}
          className="text-dark-1 dark:text-light-1"
        />
        <p
          className="text-heading3-bold 
				text-dark-2 dark:text-light-1 max-xs:hidden"
        >
          Things To Do
        </p>
      </Link>

      <div className="flex items-center gap-1">
        <DarkModeToggle />
        <div className="block md:hidden"></div>
      </div>
      <Logout placement="top" />
    </nav>
  );
}
