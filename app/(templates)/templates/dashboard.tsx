"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Home,
  Calendar,
  Users,
  Truck,
  Pill,
  GitBranch,
  UserCheck,
  Settings,
  Globe,
  HelpCircle,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Clock,
  Package,
  Menu,
  X,
  Bell,
  Sun,
  Moon,
  ChevronsLeft,
  CircleDashed,
  Circle,
  Gauge,
  Clock4,
  KeyRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { useTheme } from "next-themes";
import { Icons } from "@/components/icon";

interface Order {
  id: string;
  location: string;
  time?: string;
  packages: number;
  type: string;
  assignee?: string;
  status: string;
  secondType?: string;
  image?: string;
  duration?: string;
  assignShelf?: boolean;
  weight?: string;
  code?: string;
}

interface Vehicle {
  id: string;
  type: string;
  maxWeight: string;
  dimensions: string;
  tags: string[];
  available: boolean;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  notification?: boolean;
  collapsed?: boolean;
}

interface OrderColumnProps {
  title: string;
  count: number;
  orders: Order[];
  onOrderClick: (order: Order) => void;
  selectedOrder: Order | undefined;
}

interface OrderCardProps {
  order: Order;
  isSelected: boolean;
}

interface AssignmentPanelProps {
  order: Order;
  vehicles: Vehicle[];
  onClose: () => void;
  onAssign: () => void;
  onAutoAssign: () => void;
  isMobile?: boolean;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  isSelected: boolean;
}

interface SidebarContentProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const orders = [
  {
    id: "#SJP24",
    location: "St. John's Ph...",
    time: "22:00",
    packages: 2,
    type: "EXPRESS",
    assignee: "Jake F.",
    image: "/02.png",
    status: "to-be-fulfilled",
  },
  {
    id: "#WLS392496",
    location: "Wells Minho Cent...",
    time: "22:00",
    packages: 56,
    type: "HEAVY",
    status: "to-be-fulfilled",
  },
  {
    id: "#DKJ24",
    location: "DonnaKaren",
    time: "22:00",
    packages: 34,
    type: "EXPRESS",
    status: "to-be-fulfilled",
  },
  {
    id: "#TNK504",
    location: "Tanaka II",
    time: "23:30",
    packages: 29,
    type: "LATE PICKUP",
    status: "to-be-fulfilled",
  },
  {
    id: "#LOS12094",
    location: "Lou & Sons",
    time: "17:00",
    packages: 14,
    type: "REFRIGERATED",
    secondType: "EXPRESS",
    assignee: "Lory K.",
    image: "/01.png",
    duration: "27min",
    status: "open",
  },
  {
    id: "#WLS392494",
    location: "Wells Minho Cent...",
    time: "21:30",
    packages: 23,
    type: "HEAVY",
    assignee: "Jake F.",
    image: "/03.png",
    duration: "2h57min",
    status: "open",
  },
  {
    id: "#WLS392495",
    location: "Wells Minho Cent...",
    time: "22:30",
    packages: 0,
    type: "REFRIGERATED",
    assignee: "Darren A.",
    duration: "3h57min",
    image: "/04.png",
    assignShelf: true,
    status: "open",
  },
  {
    id: "#CHA109763",
    location: "Chadwick I",
    packages: 35,
    type: "EXPRESS",
    assignee: "Darren A.",
    image: "/04.png",
    status: "ready",
  },
  {
    id: "#WLS392493",
    location: "Wells Minho Center",
    packages: 396,
    weight: "2455kg",
    code: "A02503",
    type: "HEAVY",
    assignee: "Jake F.",
    image: "/02.png",
    time: "16:30",
    status: "ready",
  },
  {
    id: "#CHB2049",
    location: "Chadwick II",
    packages: 46,
    type: "EXPRESS",
    assignee: "Lory K.",
    image: "/05.png",
    status: "ready",
  },
];

const vehicles = [
  {
    id: "BA-02-AS",
    type: "Medium-Duty Box Truck",
    maxWeight: "3200 kg",
    dimensions: "15-20 m³",
    tags: ["HEAVY LOAD", "GPS"],
    available: true,
  },
  {
    id: "BC-67-XZ",
    type: "Medium-Duty Box Truck",
    maxWeight: "3500 kg",
    dimensions: "20 m³",
    tags: ["HEAVY LOAD", "GPS"],
    available: true,
  },
];

export default function Dashboardblock() {
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(
    orders.find((order) => order.id === "#WLS392493"),
  );
  const [collapsed, setCollapsed] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assignmentOpen, setAssignmentOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { theme, setTheme } = useTheme();

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    if (isMobile) {
      setAssignmentOpen(true);
    }
  };

  const handleAssign = () => {
    if (!selectedOrder) return;
    toast({
      title: "Vehicle assigned",
      description: `Vehicle assigned to order ${selectedOrder.id}`,
    });
    setAssignmentOpen(false);
  };

  const handleAutoAssign = () => {
    if (!selectedOrder) return;
    toast({
      title: "Auto-assignment complete",
      description: `Vehicle and driver automatically assigned to order ${selectedOrder.id}`,
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="flex h-screen bg-background w-full border ">
        {/* Mobile Sidebar Toggle */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger
            asChild
            className="md:hidden absolute top-4 left-4 z-50"
          >
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent collapsed={false} toggleSidebar={toggleSidebar} />
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <div className="hidden md:flex w-64 bg-[#F8F8F8] dark:bg-card flex-col">
          <SidebarContent collapsed={collapsed} toggleSidebar={toggleSidebar} />
        </div>

        {/* Main Content */}
        <div
          className={`
          flex-1 
          flex 
          flex-col 
          overflow-hidden 
          bg-[#F8F8F8] 
          dark:bg-card
          ${collapsed ? "w-full" : "w-full"}
          transition-width 
          duration-300 
          ease-in-out
        `}
        >
          {/* Header */}
          <header className=" border-b border-border flex items-center px-4 h-14 bg-[##F8F8F8] dark:bg-card">
            <div className="md:flex items-center space-x-2 hidden">
              <Home className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground text-sm">/ Orders /</span>
              <span className="text-muted-foreground text-sm font-medium">
                Board
              </span>
            </div>

            <div className="ml-auto flex items-center space-x-2">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => setNotifications(0)}
                >
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"
                    />
                  )}
                </Button>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <div className="relative md:block hidden">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  className="pl-9 pr-4 py-2 w-64 rounded-xl"
                />
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 flex overflow-hidden bg-white dark:bg-black p-4 rounded-3xl">
            {/* Order Columns */}
            <div className="flex-1 flex overflow-x-auto">
              <OrderColumn
                title="To-be fulfilled"
                count={
                  orders.filter((o) => o.status === "to-be-fulfilled").length
                }
                orders={orders.filter((o) => o.status === "to-be-fulfilled")}
                onOrderClick={handleOrderClick}
                selectedOrder={selectedOrder}
              />

              <OrderColumn
                title="Open"
                count={orders.filter((o) => o.status === "open").length}
                orders={orders.filter((o) => o.status === "open")}
                onOrderClick={handleOrderClick}
                selectedOrder={selectedOrder}
              />

              <OrderColumn
                title="Ready for Shipment"
                count={orders.filter((o) => o.status === "ready").length}
                orders={orders.filter((o) => o.status === "ready")}
                onOrderClick={handleOrderClick}
                selectedOrder={selectedOrder}
              />
            </div>

            {/* Assignment Panel - Desktop */}
            <AnimatePresence>
              {selectedOrder && !isMobile && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 400, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-l border-border bg-card flex flex-col overflow-hidden"
                >
                  <AssignmentPanel
                    order={selectedOrder}
                    vehicles={vehicles}
                    onClose={() => setSelectedOrder(undefined)}
                    onAssign={handleAssign}
                    onAutoAssign={handleAutoAssign}
                    isMobile={isMobile}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Assignment Panel - Mobile */}
            <Sheet open={assignmentOpen} onOpenChange={setAssignmentOpen}>
              <SheetContent side="right" className="p-0 sm:max-w-md w-full">
                {selectedOrder && (
                  <AssignmentPanel
                    order={selectedOrder}
                    vehicles={vehicles}
                    onClose={() => setAssignmentOpen(false)}
                    onAssign={handleAssign}
                    onAutoAssign={handleAutoAssign}
                    isMobile={isMobile}
                  />
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
function NavItem({
  icon,
  label,
  active = false,
  notification = false,
  collapsed = false,
}: NavItemProps) {
  return (
    <div
      className={`
      flex items-center 
      ${collapsed ? "justify-center" : "px-3"}
      py-2 
      ${active ? "bg-accent" : "hover:bg-accent/50"}
      relative
    `}
    >
      <div
        className={`
        ${collapsed ? "flex-col items-center" : "flex items-center"}
      `}
      >
        <span
          className={`
          ${notification ? "relative" : ""}
          ${collapsed ? "mb-1" : "mr-3"}
        `}
        >
          {notification && !collapsed && (
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full"></span>
          )}
          {icon}
        </span>
        {!collapsed && <span className="text-sm">{label}</span>}
      </div>
    </div>
  );
}

function SidebarContent({ collapsed, toggleSidebar }: SidebarContentProps) {
  return (
    <div
      className={`
      bg-background 
      h-full 
      flex 
      flex-col 
      ${collapsed ? "w-16" : "w-64"}
      transition-all 
      duration-300 
      ease-in-out
    `}
    >
      {/* Logo */}
      <div
        className={`
        flex 
        ${collapsed ? "justify-center" : "justify-between"} 
        items-center 
        gap-3 
        py-3 

      `}
      >
        <div className="flex items-center gap-2 ml-3" onClick={toggleSidebar}>
          <Icons.logo className="w-8 h-8 " />
          <span className={` ${collapsed ? "hidden" : ""}`}>PharmX</span>
        </div>
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="hover:bg-transparent hidden md:flex"
          >
            <ChevronsLeft className="w-5 h-5 text-muted-foreground" />
          </Button>
        )}
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-9 pr-4 py-2 rounded-xl" />
            <span className="absolute right-3 top-3 text-xs text-muted-foreground">
              ⌘K
            </span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav
        className={`
        flex-1 
        overflow-y-auto 
        ${collapsed ? "flex flex-col items-center" : ""}
      `}
      >
        <div className="py-2">
          {!collapsed && (
            <div className="px-3 py-1 text-xs font-medium text-muted-foreground">
              MAIN
            </div>
          )}
          <NavItem
            icon={<Home className="w-4 h-4" />}
            label="Home"
            collapsed={collapsed}
          />
          <NavItem
            icon={<Package className="w-4 h-4" />}
            label="Orders"
            active
            collapsed={collapsed}
          />
          <NavItem
            icon={<Clock4 className="w-4 h-4" />}
            label="Scheduler"
            notification
            collapsed={collapsed}
          />

          {!collapsed && (
            <div className="mt-4 px-3 py-1 text-xs font-medium text-muted-foreground">
              ADMIN
            </div>
          )}
          <NavItem
            icon={<Users className="w-4 h-4" />}
            label="Users"
            collapsed={collapsed}
          />
          <NavItem
            icon={<Truck className="w-4 h-4" />}
            label="Freight"
            collapsed={collapsed}
          />
          <NavItem
            icon={<Pill className="w-4 h-4" />}
            label="Pharmacies"
            collapsed={collapsed}
          />
          <NavItem
            icon={<GitBranch className="w-4 h-4" />}
            label="Workflows"
            notification
            collapsed={collapsed}
          />

          {!collapsed && (
            <div className="mt-4 px-3 py-1 text-xs font-medium text-muted-foreground">
              SETTINGS
            </div>
          )}
          <NavItem
            icon={<UserCheck className="w-4 h-4" />}
            label="User Roles"
            collapsed={collapsed}
          />
          <NavItem
            icon={<KeyRound className="w-4 h-4" />}
            label="Permissions"
            collapsed={collapsed}
          />
          <NavItem
            icon={<Settings className="w-4 h-4" />}
            label="Settings"
            collapsed={collapsed}
          />

          {!collapsed && (
            <div className="mt-4">
              <NavItem
                icon={<Globe className="w-4 h-4" />}
                label="Global Settings"
                collapsed={collapsed}
              />
              <NavItem
                icon={<HelpCircle className="w-4 h-4" />}
                label="Help"
                collapsed={collapsed}
              />
            </div>
          )}
        </div>
      </nav>

      {/* User Profile */}
      <div
        className={`
        p-4 
        border-t 
        border-border 
        flex 
        ${collapsed ? "flex-col items-center" : "items-center"}
      `}
      >
        <Avatar className={`h-8 w-8 ${collapsed ? "mb-2" : ""}`}>
          <AvatarImage src="/02.png" />
          <AvatarFallback>LF</AvatarFallback>
        </Avatar>
        {!collapsed && (
          <>
            <div className="ml-3 flex-1">
              <div className="text-sm font-medium">Arihant Jain</div>
              <div className="text-xs text-muted-foreground">Super Admin</div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </>
        )}
      </div>
    </div>
  );
}

function OrderColumn({
  title,
  count,
  orders,
  onOrderClick,
  selectedOrder,
}: OrderColumnProps): JSX.Element {
  return (
    <div className="flex-1 min-w-[350px] flex flex-col border-r border-border bg-[#F8F8F8] dark:bg-card">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          {title === "Ready for Shipment" && (
            <Gauge className="w-5 h-5 text-muted-foreground mr-2" />
          )}
          {title === "To-be fulfilled" && (
            <CircleDashed className="w-5 h-5 text-muted-foreground mr-2" />
          )}

          {title === "Open" && (
            <Circle className="w-5 h-5 text-muted-foreground mr-2" />
          )}

          <span className="font-medium">{title}</span>
          {count > 0 && (
            <span className="ml-1 text-muted-foreground text-sm">{count}</span>
          )}
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <AnimatePresence>
          {orders.map((order: Order, index: number) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              onClick={() => onOrderClick(order)}
            >
              <OrderCard
                order={order}
                isSelected={selectedOrder?.id === order.id}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function OrderCard({ order, isSelected }: OrderCardProps): JSX.Element {
  const getTypeColor = (type: string): string => {
    switch (type) {
      case "EXPRESS":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "REFRIGERATED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "HEAVY":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "LATE PICKUP":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
      <Card
        className={cn(
          "mb-2 cursor-pointer",
          isSelected ? "border-primary shadow-sm" : "border-border",
        )}
      >
        <CardHeader className="p-3 pb-0">
          <div className="flex items-center justify-between">
            <div className="font-medium">{order.id}</div>
            <div className="flex items-center">
              {order.duration && (
                <div className="flex items-center text-muted-foreground text-sm mr-2">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  <span>{order.duration}</span>
                </div>
              )}
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-2">
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{order.location}</span>
            {order.time && (
              <>
                <span className="mx-2">•</span>
                <Clock className="w-4 h-4 mr-1" />
                <span>Today</span>
                <span className="mx-2">•</span>
                <span>{order.time}</span>
              </>
            )}
          </div>

          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Package className="w-4 h-4 mr-1" />
            <span>{order.packages} packages</span>
            <span className="mx-2">•</span>
            <span>EST</span>
            {order.assignShelf && (
              <>
                <span className="mx-2">•</span>
                <span>Assign shelf</span>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-3 pt-0 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className={getTypeColor(order.type)}>
              {order.type}
            </Badge>
            {order.secondType && (
              <Badge
                variant="outline"
                className={getTypeColor(order.secondType)}
              >
                {order.secondType}
              </Badge>
            )}
          </div>

          {order.assignee ? (
            <div className="flex items-center border border-dotted px-3 py-1 rounded-md">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={order.image} />
                <AvatarFallback>{order.assignee.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{order.assignee}</span>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 border border-dotted "
            >
              <Plus className="w-3 h-3 mr-1" />
              <span>Assign staff</span>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function AssignmentPanel({
  order,
  vehicles,
  onClose,
  onAssign,
  onAutoAssign,
  isMobile = false,
}: AssignmentPanelProps): JSX.Element {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="font-medium">Assign vehicle and driver</div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="text-lg font-medium">{order.id}</div>
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
          >
            READY
          </Badge>
        </div>

        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{order.location}</span>
          <span className="mx-2">•</span>
          <Clock className="w-4 h-4 mr-1" />
          <span>Today</span>
          <span className="mx-2">•</span>
          <span>{order.time || "16:30"}</span>
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <Package className="w-4 h-4 mr-1" />
          <span>{order.packages} packages</span>
          {order.weight && (
            <>
              <span className="mx-2">•</span>
              <span>{order.weight}</span>
            </>
          )}
          {order.code && (
            <>
              <span className="mx-2">•</span>
              <span>{order.code}</span>
            </>
          )}
        </div>

        <div className="mt-2">
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
          >
            {order.type}
          </Badge>
        </div>
      </div>
      <Button className="w-full mb-4" onClick={onAutoAssign}>
        Auto-assign vehicle and driver
      </Button>

      <div className="mt-5">
        <Tabs defaultValue="vehicle" className="">
          <div className="flex justify-between ">
            <TabsList>
              <div>
                <TabsTrigger value="vehicle">
                  <Truck className="w-4 h-4 mr-1" />
                  Vehicle
                </TabsTrigger>
                <TabsTrigger value="driver">
                  <Icons.driver className=" " />
                  <span>
                    <span className="ml-2">Driver</span>
                  </span>
                </TabsTrigger>
              </div>
            </TabsList>
            <Button>
              <Plus className="w-4 h-4 mr-1" />
              <span>Add vehicle</span>
            </Button>
          </div>
          <TabsContent value="vehicle" className="mt-2 p-2">
            <AnimatePresence>
              {vehicles.map((vehicle) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                >
                  <VehicleCard
                    vehicle={vehicle}
                    isSelected={selectedVehicle === vehicle.id}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </TabsContent>
          <TabsContent value="driver">
            <div className="p-4 text-center text-muted-foreground">
              No drivers available at the moment
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="p-4 border-t border-border   flex justify-end items-center mb-12">
        <Button variant="outline" className="mr-2" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onAssign} disabled={!selectedVehicle}>
          Assign
        </Button>
      </div>
    </div>
  );
}

function VehicleCard({ vehicle, isSelected }: VehicleCardProps): JSX.Element {
  return (
    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
      <Card
        className={cn(
          "mb-4 cursor-pointer",
          isSelected ? "border-primary shadow-sm" : "border-border",
        )}
      >
        <CardHeader className="p-3 pb-0">
          <div className="flex items-center justify-between">
            <div className="font-medium">{vehicle.id}</div>
            <Badge
              variant="outline"
              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            >
              AVAILABLE
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-3">
          <div className="text-sm text-muted-foreground mb-1">
            {vehicle.type}
          </div>

          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <span className="flex items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
              >
                <path
                  d="M3 6H21M3 12H21M3 18H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {vehicle.maxWeight}
            </span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
              >
                <path
                  d="M21 16V8.00002C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27002L13 2.27002C12.696 2.09449 12.3511 2.00208 12 2.00208C11.6489 2.00208 11.304 2.09449 11 2.27002L4 6.27002C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8.00002V16C3.00036 16.3508 3.09294 16.6952 3.26846 16.9989C3.44398 17.3025 3.69626 17.5547 4 17.73L11 21.73C11.304 21.9056 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9056 13 21.73L20 17.73C20.3037 17.5547 20.556 17.3025 20.7315 16.9989C20.9071 16.6952 20.9996 16.3508 21 16Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.27002 6.96002L12 12.01L20.73 6.96002"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 22.08V12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {vehicle.dimensions}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {vehicle.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className={
                  index === 0
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                }
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
