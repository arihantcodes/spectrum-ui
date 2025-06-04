import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Bell, Home, Search, Settings } from "lucide-react";

export default function CircularNavbar() {
  return (
    // add fixed  to the nav class name to make the navbar stick to the bottom of the screen
    <nav className=" bottom-0 left-0 right-0 border-t bg-background p-4 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Button size="icon" className="rounded-full" variant="ghost">
          <Home className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </Button>
        <Button size="icon" className="rounded-full" variant="ghost">
          <Search className="h-6 w-6" />
          <span className="sr-only">Search</span>
        </Button>
        <Button
          size="icon"
          className="rounded-full bg-primary text-primary-foreground"
        >
          <Bell className="h-6 w-6" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button size="icon" className="rounded-full" variant="ghost">
          <Settings className="h-6 w-6" />
          <span className="sr-only">Settings</span>
        </Button>
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
