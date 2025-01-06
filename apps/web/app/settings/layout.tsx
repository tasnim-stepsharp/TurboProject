"use client";
import { SettingsTopNav } from "./settings-top-nav";
import { useRootContext } from "@/libs/context/root";
import { LucideIcon } from "@/libs/types/icons";
import { Flex } from "../components/ui";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
// import { Button } from "../../../../packages/ui/src/index";

export type TSettingMenu = {
  name: string;
  icon: LucideIcon;
  route: string;
};

export default function SettingsPage({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { setIsMobileSidebarOpen } = useRootContext();
  const { push } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileSidebarOpen(false);
    if (pathname === "/settings") {
      push("/settings/common");
    }
  }, [pathname, push, setIsMobileSidebarOpen]);

  return (
    <Flex
      justify="center"
      direction="col"
      className="relative h-full w-full bg-white dark:bg-zinc-800"
    >
      {/* <Button appName="WebApp" className="btn-class">
              Click Me
            </Button> */}
      <SettingsTopNav />
      <Flex className="no-scrollbar h-full w-full flex-grow justify-center overflow-y-auto pb-24">
        <Flex className="relative w-[700px]">
          <Flex className="w-full px-4 pt-8 md:p-8">
            {children}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
