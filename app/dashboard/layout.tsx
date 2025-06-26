"use client";

import GetUserPlan from "@/actions/getUserPlan";
import Logo from "@/components/Logo";
import { buttonVariants } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import UserAccount from "@/components/UserAccount";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Gem, Home, Key, LucideIcon, Menu, Settings, X } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren, useEffect, useState } from "react";

interface SidebarItem {
  href: string;
  icon: LucideIcon;
  text: string;
}

interface SidebarCategory {
  category: string;
  items: SidebarItem[];
}

const SIDEBAR_ITEMS: SidebarCategory[] = [
  {
    category: "Overview",
    items: [{ href: "/dashboard", icon: Home, text: "Dashboard" }],
  },
  {
    category: "Account",
    items: [{ href: "/dashboard/upgrade", icon: Gem, text: "Upgrade" }],
  },
  {
    category: "Settings",
    items: [
      { href: "/dashboard/api-key", icon: Key, text: "API Key" },
      {
        href: "/dashboard/account-settings",
        icon: Settings,
        text: "Account Settings",
      },
    ],
  },
];

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const { data: session } = authClient.useSession();
  const [selected, setSelected] = useState<string | null>(null);

  const { data: userPlan } = useQuery({
    queryKey: ["user-plan"],
    queryFn: async () => {
      if (!session) return null;
      const user = session.user;
      return await GetUserPlan(user.id);
    },
  });

  useEffect(() => {
    const saved = localStorage.getItem("selectedSidebarItem");
    if (saved === "Dashboard") {
      setSelected("Dashboard");
    } else if (saved) {
      setSelected(saved);
    }
  }, []);

  useEffect(() => {
    if (selected) localStorage.setItem("selectedSidebarItem", selected);
  }, [selected]);

  console.log(userPlan);

  return (
    <div className="space-y-4 md:space-y-6 relative z-20 flex flex-col h-full">
      <div className="hidden md:flex items-center">
        <Logo />
        {userPlan?.plan && userPlan.plan === "PRO" ? (
          <p className="outline text-sm rounded-full px-2 bg-pink-700 text-white select-none">
            Pro
          </p>
        ) : null}
      </div>

      <div className="flex-grow">
        <ul>
          {SIDEBAR_ITEMS.map(({ category, items }) => (
            <li key={category} className="mb-2 md:mb-8">
              <p className="text-xs font-medium leading-6 text-muted-foreground">
                {category}
              </p>
              <div className="-mx-2 flex flex-1 flex-col">
                {items.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "w-full justify-start group flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-400 hover:bg-gray-50 transition mt-1",
                      selected === item.text && "border inset-shadow-sm"
                    )}
                    onClick={() => {
                      if (onClose) onClose();
                      setSelected(item.text);
                    }}
                  >
                    <item.icon className="size-4" />
                    {item.text}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col w-full">
        <hr className="my-4 md:my-6 w-full h-px" />
        <UserAccount />
      </div>
    </div>
  );
};

const Layout = ({ children }: PropsWithChildren) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="relative h-screen flex flex-col md:flex-row overflow-hidden md:space-x-6 md:p-6 md:bg-zinc-200/50 md:dark:bg-zinc-800/50">
      <div className="hidden md:block w-64 lg:w-80 border-r p-6 h-full text-brand-900 relative z-10 rounded-3xl shadow-sm bg-white dark:bg-zinc-950/80">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="md:hidden flex items-center justify-between p-4 border-b">
          <Logo />
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="text-gray-500 hover:text-gray-600"
          >
            <Menu className="size-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 relative md:rounded-3xl z-10 md:shadow-sm bg-white dark:bg-zinc-950/80">
          <div className="relative min-h-full flex flex-col">
            <div className="h-full flex flex-col flex-1 space-y-4">
              {children}
            </div>
          </div>
        </div>

        <Modal
          className="p-4"
          showModal={isDrawerOpen}
          setShowModal={setIsDrawerOpen}
        >
          <div className="flex justify-between items-center mb-4">
            <Logo />
            <button
              aria-label="Close modal"
              onClick={() => setIsDrawerOpen(false)}
            >
              <X className="size-6" />
            </button>
          </div>

          <Sidebar />
        </Modal>
      </div>
    </div>
  );
};

export default Layout;
