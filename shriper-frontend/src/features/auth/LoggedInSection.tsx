import { UserIcon } from "lucide-react";
import React, { useState } from "react";
import { logout, useGetMeQuery, useLogoutMutation } from "./api";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import type { UserDto } from "@/generated-types";

interface LoggedInSectionProps {
  me: UserDto;
}

const LoggedInSection = ({ me }: LoggedInSectionProps) => {
  const logoutMutation = useLogoutMutation();

  function handleLogout() {
    logoutMutation.mutate();
  }

  return (
    <div className="flex items-center">
      {/* Email (hidden on smaller screens) */}
      <div className="hidden sm:block mr-2">{me.email}</div>

      {/* Image/Avatar as Dropdown Trigger */}
      <Menubar className="bg-transparent border-none">
        <MenubarMenu>
          <MenubarTrigger className="rounded-full overflow-hidden h-8 w-8 cursor-pointer  p-0">
            <Avatar>
              <AvatarImage src={me.profilePictureUrl} />
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
            </Avatar>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={handleLogout}>Logout</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      {/* <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full overflow-hidden h-8 w-8 cursor-pointer border-none bg-transparent p-0">
            <Avatar>
              <AvatarImage src={me.profilePictureUrl} />
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </div>
  );
};

export default LoggedInSection;
