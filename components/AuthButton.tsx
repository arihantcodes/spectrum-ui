import { Avatar, AvatarImage } from "@/components/ui/Avatar";

import { signIn, signOut, useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { Button } from "./ui/Button";
import Link from "next/link";

const AuthButton: React.FC = () => {
  const { data: session, status } = useSession();
  if (!session?.user)
    return (
      <Link href="/signin">
        <Button>Sign in</Button>
      </Link>
    );
  return (
    <div className="flex gap-2 items-center">
      <span className="hidden text-sm sm:inline-flex">
        {session.user?.email}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative w-8 h-8 rounded-full">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={
                  session.user.image ??
                  "https://source.boringavatars.com/marble/120"
                }
                alt={session.user.name ?? ""}
              />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <Button onClick={() => signOut()}>Sign out</Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AuthButton;
