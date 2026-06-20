"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "./ui/skeleton";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const UserAccount = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  if (!session) {
    return <Skeleton className="h-10 w-full" />;
  }

  const user = session.user;

  if (!user) {
    return <Skeleton className="h-10 w-full" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="w-full flex items-center gap-2 ring ring-border p-1 rounded-sm select-none"
        asChild
      >
        <button className="w-full flex items-center gap-2">
          <UserAvatar user={user} />
          <div className="w-full flex flex-col items-start text-left">
            <span className="text-sm">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-0"
        align="start"
        sideOffset={4}
      >
        <div className="flex items-center gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/">Home</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
          className="text-red-800 dark:text-red-500 cursor-pointer group"
        >
          <span>Sign Out</span>
          <LogOut className="ml-auto -translate-x-0.5 group-hover:translate-x-0 transition-transform" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccount;
