"use client";

import { useState } from "react";
import Copy from "../HandleCopy";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/Label";
import { Switch } from "@/components/UI/Switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import { Badge } from "@/components/UI/Badge";
import { Progress } from "@/components/UI/Progress";
import { Slider } from "@/components/UI/Slider";
import {
  Bell,
  Calendar,
  Check,
  Clock,
  Cloud,
  CreditCard,
  Download,
  Heart,
  LucideBarChart,
  LucideLineChart,
  LucidePieChart,
  Mail,
  Map,
  MessageSquare,
  Mic,
  Moon,
  Music,
  Phone,
  Search,
  Settings,
  Star,
  Sun,
  Zap,
} from "lucide-react";
import { DollarSign, PieChart, TrendingUp, Users } from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/UI/Chart";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";

export default function CardCollection() {
  const cardComponents = [
    {
      name: "LoginCard",
      component: LoginCard,
      code: `
  function LoginCard() {
    return (
      <Card className="w-[310px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" type="email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Login</Button>
        </CardFooter>
      </Card>
    )
  }`,
    },
    {
      name: "SignUpCard",
      component: SignUpCard,
      code: `
  function SignUpCard() {
    return (
      <Card className="w-[310px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" type="email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Choose a password"
                  type="password"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="terms" />
                <Label htmlFor="terms">I agree to the terms and conditions</Label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Create Account</Button>
        </CardFooter>
      </Card>
    )
  }`,
    },
    {
      name: "PaymentCard",
      component: PaymentCard,
      code: `
  function PaymentCard() {
    return (
      <Card className="w-[310px]">
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>
            Enter your payment information to complete the purchase.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cardName">Name on Card</Label>
                <Input id="cardName" placeholder="Enter name on card" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="Enter card number" />
              </div>
              <div className="flex space-x-4">
                <div className="flex flex-col space-y-1.5 flex-1">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="flex flex-col space-y-1.5 flex-1">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="CVC" />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Pay Now</Button>
        </CardFooter>
      </Card>
    )
  }`,
    },
    {
      name: "AIAssistantCard",
      component: AIAssistantCard,
      code: `
  function AIAssistantCard() {
    const [message, setMessage] = useState("")
    const [conversation, setConversation] = useState([])
  
    const handleSend = () => {
      if (message.trim()) {
        setConversation([
          ...conversation,
          { role: "user", content: message },
          { role: "ai", content: "This is a simulated AI response." },
        ])
        setMessage("")
        default:
          return <div>No chart available</div>;
      }
    }
  
    return (
      <Card className="w-[310px]">
        <CardHeader>
          <CardTitle>AI Assistant</CardTitle>
          <CardDescription>Ask me anything about your data</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] overflow-y-auto">
          {conversation.map((msg, index) => (
            <div
              key={index}
              className={\`mb-2 \${
              msg.role === "ai"
                ? "text-blue-600 text-left"
                : "text-right"
              }\`}
            >
              <strong>{msg.role === "ai" ? "AI: " : "You: "}</strong>
              {msg.content}
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend}>Send</Button>
        </CardFooter>
      </Card>
    )
  }`,
    },

    {
      name: "SettingsCard",
      component: SettingsCard,
      code: `
  function SettingsCard() {
    const [activeTab, setActiveTab] = useState("account")
  
    return (
      <Card className="w-[310px]">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Manage your account settings and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div className="space-y-4 py-2 ">
                <div className="space-y-2 mt-5">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="Enter username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="notifications">
              <div className="space-y-4 py-2">
                <div className="flex items-center space-x-2">
                  <Switch id="emailNotifications" />
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="pushNotifications" />
                  <Label htmlFor="pushNotifications">Push Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="weeklyDigest" />
                  <Label htmlFor="weeklyDigest">Weekly Digest</Label>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Save Changes</Button>
        </CardFooter>
      </Card>
    )
  }`,
    },
    {
      name: "DataVisualizationCard",
      component: DataVisualizationCard,
      code: `
  function DataVisualizationCard() {
    const [activeChart, setActiveChart] = useState("bar")
  
    const chartData = [
      { month: "January", desktop: 186, mobile: 80 },
      { month: "February", desktop: 305, mobile: 200 },
      { month: "March", desktop: 237, mobile: 120 },
      { month: "April", desktop: 73, mobile: 190 },
      { month: "May", desktop: 209, mobile: 130 },
      { month: "June", desktop: 214, mobile: 140 },
    ]
  
    const chartConfig = {
      desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
      },
      mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
      },
    }
  
    const renderChart = (type) => {
      switch (type) {
        case "bar":
          return (
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          )
        case "line":
          return (
            <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
              <Line dataKey="mobile" type="natural" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
            </LineChart>
          )
        case "radar":
          return (
            <RadarChart data={chartData}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey="month" />
              <PolarGrid />
              <Radar dataKey="desktop" fill="var(--color-desktop)" fillOpacity={0.6} />
              <Radar dataKey="mobile" fill="var(--color-mobile)" fillOpacity={0.6} />
            </RadarChart>
          )
      }
    }
  
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Data Visualization</CardTitle>
          <CardDescription>Interactive chart types</CardDescription>
        </CardHeader>
        <CardContent >
          <Tabs value={activeChart} onValueChange={(value) => setActiveChart(value)}>
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="bar" aria-label="Bar Chart">
                <BarChart className="h-4 w-4 mr-2" />
                Bar
              </TabsTrigger>
              <TabsTrigger value="line" aria-label="Line Chart">
                <LucideLineChart className="h-4 w-4 mr-2" />
                Line
              </TabsTrigger>
              <TabsTrigger value="radar" aria-label="Radar Chart">
                <LucidePieChart className="h-4 w-4 mr-2" />
                Radar
              </TabsTrigger>
            </TabsList>
            <TabsContent value={activeChart} className="mt-0">
              <Card >
                <CardHeader>
                  <CardTitle>{activeChart.charAt(0).toUpperCase() + activeChart.slice(1)} Chart</CardTitle>
                  <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="">
                    {renderChart(activeChart)}
                  </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                  <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Export Data
          </Button>
        </CardFooter>
      </Card>
    )
  }`,
    },
    {
      name: "MetricsCard",
      component: MetricsCard,
      code: `
  function MetricsCard() {
    return (
      <Card className="w-[310px]">
        <CardHeader>
          <CardTitle>Metrics Overview</CardTitle>
          <CardDescription>Your key performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="flex items-center">
              <Users className="mr-4 h-4 w-4 text-muted-foreground" />
              <div className="space-y-1 flex-1">
                <p className="text-sm font-medium leading-none">Total Users</p>
                <p className="text-2xl font-bold">2,543</p>
              </div>
              <Badge variant="secondary">+12%</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div>Revenue</div>
                <div className="font-medium">$45,231.89</div>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BarChart className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Conversion Rate
                </span>
              </div>
              <div className="text-2xl font-bold">3.8%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }`,
    },
    {
      name: "SubscriptionCard",
      component: SubscriptionCard,
      code: `
  function SubscriptionCard() {
    return (
      <Card className="w-[310px]">
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>You are currently on the Pro plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">$29.99</span>
              <Badge>Monthly</Badge>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                Unlimited projects
              </li>
              <li className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                Unlimited team members
              </li>
              <li className="flex items-center">
                <Download className="mr-2 h-4 w-4 text-muted-foreground" />
                5TB storage
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Upgrade Plan</Button>
        </CardFooter>
      </Card>
    )
  }`,
    },
    {
      name: "TaskCard",
      component: TaskCard,
      code: `
  function TaskCard() {
    return (
      <Card className="w-[310px]">
        <CardHeader>
          <CardTitle>Current Tasks</CardTitle>
          <CardDescription>Your team's ongoing tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["Design system update", "API integration", "User testing"].map(
              (task, index) => (
                <div key={index} className="flex items-center">
                  <input type="checkbox" id={\`task-\${index}\`} className="mr-2" />
                  <label htmlFor={\`task-\${index}\`} className="flex-1">
                    {task}
                  </label>
                  <Badge
                    variant={
                      index === 0
                        ? "default"
                        : index === 1
                        ? "secondary"
                        : "outline"
                    }
                    
                    export default CardCollection;
                    
                    export default CardCollection;
                    
                    export default CardCollection;
                  >
                    {index === 0
                      ? "In Progress"
                      : index === 1
                      ? "Pending"
                      : "Completed"}
                  </Badge>
                </div>
              )
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Tasks
          </Button>
        </CardFooter>
      
      </Card>
    )
  }`,
    },
    {
      name: "CalendarCard",
      component: CalendarCard,
      code: `
  function CalendarCard() {
    return (
      <Card className="w-[310px]">
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Your schedule for the next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: "Today", event: "Team standup", time: "10:00 AM" },
              { date: "Tomorrow", event: "Client meeting", time: "2:00 PM" },
              {
                date: "Fri, Jun 12",
                event: "Project deadline",
                time: "11:59 PM",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.event}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.date} at {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View Full Calendar
          </Button>
        </CardFooter>
      </Card>
    )
  }`,
    },
    {
      name: "BillingCard",
      component: BillingCard,
      code: `
  function BillingCard() {
    return (
      <Card className="w-[310px]">
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>
            Manage your billing details and payment method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Visa ending in 4242</p>
                <p className="text-xs text-muted-foreground">Expires 12/2024</p>
              </div>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="billingEmail">Billing Email</Label>
              <Input id="billingEmail" value="johndoe@example.com" readOnly />
            </div>
            <div className="space-y-2">
              <Label>Next Payment</Label>
              <div className="flex justify-between items-center">
                <span>$29.99 due on June 1, 2023</span>
                <Badge>Upcoming</Badge>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Update Payment Method</Button>
        </CardFooter>
      </Card>
    )
  }`,
    },
    {
      name: "FeedbackCard",
      component: FeedbackCard,
      code: `
  function FeedbackCard() {
    return (
      <Card className="w-[310px]">
        <CardHeader>
          <CardTitle>Feedback</CardTitle>
          <CardDescription>Help us improve our product</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>How satisfied are you with our product?</Label>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback">Your feedback</Label>
              <textarea
                id="feedback"
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Tell us what you think..."
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Submit Feedback</Button>
        </CardFooter>
      </Card>
    )
  }`,
    },

    {
      name: "TeamCollaborationCard",
      component: TeamCollaborationCard,
      code: `
  function TeamCollaborationCard() {
    const teamMembers = [
      { name: "Alice", avatar: "A", status: "online" },
      { name: "Bob", avatar: "B", status: "offline" },
      { name: "Charlie", avatar: "C", status: "away" },
    ]
  
    return (
      <Card className="w-[310px]">
        <CardHeader>
          <CardTitle>Team Collaboration</CardTitle>
          <CardDescription>Current project: Website Redesign</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex -space-x-2">
                {teamMembers.map((member, index) => (
                  <Avatar key={index} className="border-2 border-background">
                    <AvatarFallback>{member.avatar}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <Badge variant="outline">3 Active Members</Badge>
            </div>
            <Progress value={65} className="w-full" />
            <div className="text-sm text-muted-foreground">
              Project Progress: 65%
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Team Chat</Button>
          <Button>Update Status</Button>
        </CardFooter>
      </Card>
    )
  }`,
    },
    {
      name: "ProfileCard",
      component: ProfileCard,
      code: `
  function ProfileCard() {
    return (
      <Card className="w-[310px]">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src="https://img.freepik.com/premium-photo/anime-male-avatar_950633-956.jpg"
                alt="@arihantcodes"
              />
              <AvatarFallback>SU</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Spectrum UI</CardTitle>
              <CardDescription>@arihantcodes</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label>Email</Label>
              <p className="text-sm">hello@arihant.us</p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Location</Label>
              <p className="text-sm">San Francisco, CA</p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Bio</Label>
              <p className="text-sm">
                Software developer passionate about creating user-friendly
                applications.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Edit Profile
          </Button>
        </CardFooter>
      </Card>
    )
  }`,
    },

    {
      name: "ProductivityTrackerCard",
      component: ProductivityTrackerCard,
      code: `
  function ProductivityTrackerCard() {
    const tasks = [
      { name: "Complete project proposal", completed: true },
      { name: "Review team submissions", completed: false },
      { name: "Prepare for client meeting", completed: false },
    ]
  
    return (
      <Card className="w-[310px]">
        <CardHeader>
          <CardTitle>Productivity Tracker</CardTitle>
          <CardDescription>Your daily task overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {}}
                  className="mr-2"
                />
                <span
                  className={
                    task.completed ? "line-through text-muted-foreground" : ""
                  }
                >
                  {task.name}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            1 of 3 tasks completed
          </div>
          <Button variant="outline" size="sm">
            Add Task
          </Button>
        </CardFooter>
      </Card>
    )
  }`,
    },
    {
      name: "QuickActionCard",
      component: QuickActionCard,
      code: `
  function QuickActionCard() {
    return (
      <Card className="w-[310px]">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Mail, label: "Send Email" },
              { icon: Calendar, label: "Schedule Meeting" },
              { icon: MessageSquare, label: "Start Chat" },
              { icon: Settings, label: "Open Settings" },
            ].map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex-col space-y-2"
              >
                <action.icon className="h-6 w-6" />
                <span>{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }`,
    },
    {
      name: "NotificationCard",
      component: NotificationCard,
      code: `
  function NotificationCard() {
    const notifications = [
      {
        icon: Mail,
        content: "You have 3 new emails",
        time: "5 min ago",
      },
      {
        icon: Bell,
        content: "Meeting reminder: Team sync at 2 PM",
        time: "1 hour ago",
      },
      {
        icon: MessageSquare,
        content: "New comment on your post",
        time: "2 hours ago",
      },
    ]
  
    return (
      <Card className="w-[310px]">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Stay updated with recent activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div key={index} className="flex items-start space-x-4">
                <notification.icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm">{notification.content}</p>
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className="w-full">
            View All Notifications
          </Button>
        </CardFooter>
      </Card>
    )
  }`,
    },
    {
      name: "WeatherMiniCard",
      component: WeatherMiniCard,
      code: `
  function WeatherMiniCard() {
    return (
      <Card className="w-[200px]">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">San Francisco</p>
              <p className="text-2xl font-bold">72°F</p>
            </div>
            <div className="text-4xl">☀️</div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Sunny</p>
        </CardContent>
      </Card>
    )
  }`,
    },
    {
      name: "QuickSettingsCard",
      component: QuickSettingsCard,
      code: `
  function QuickSettingsCard() {
    return (
      <Card className="w-[310px]">
        <CardHeader>
          <CardTitle>Quick Settings</CardTitle>
          <CardDescription>Adjust your preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="airplane-mode">Airplane Mode</Label>
              <Switch id="airplane-mode" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="wifi">Wi-Fi</Label>
              <Switch id="wifi" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="bluetooth">Bluetooth</Label>
              <Switch id="bluetooth" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="volume">Volume</Label>
              <Slider id="volume" defaultValue={[50]} max={100} step={1} />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }`,
    },
    {
      name: "MusicPlayerCard",
      component: MusicPlayerCard,
      code: `
  function MusicPlayerCard() {
    return (
      <Card className="w-[310px]">
        <CardHeader>
          <CardTitle>Now Playing</CardTitle>
          <CardDescription>Your current track</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
              <Music className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium">Song Title</h3>
              <p className="text-sm text-muted-foreground">Artist Name</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Slider defaultValue={[33]} max={100} step={1} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1:23</span>
              <span>3:45</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="icon">
            <Zap className="h-4 w-4" />
          </Button>
          <Button size="icon">
            <Play className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Forward className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    )
  }`,
    },
    {
      name: "TaskProgressCard",
      component: TaskProgressCard,
      code: `
  function TaskProgressCard() {
    return (
      <Card className="w-[310px]">
        <CardHeader>
          <CardTitle>Task Progress</CardTitle>
          <CardDescription>Your project status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Design Phase</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Development</span>
                <span>50%</span>
              </div>
              <Progress value={50} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Testing</span>
                <span>25%</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">View Detailed Report</Button>
        </CardFooter>
      </Card>
    )
  }`,
    },
    {
      name: "QuickSearchCard",
      component: QuickSearchCard,
      code: `
  function QuickSearchCard() {
    return (
      <Card className="w-[310px]">
        <CardHeader>
          <CardTitle>Quick Search</CardTitle>
          <CardDescription>Find what you need quickly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8" />
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium">Recent Searches</p>
            {["Project status", "Team members", "Budget report"].map(
              (item, index) => (
                <Button key={index} variant="ghost" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  {item}
                </Button>
              )
            )}
          </div>
        </CardContent>
      </Card>
    )
  }`,
    },
    {
      name: "UpcomingEventCard",
      component: UpcomingEventCard,
      code: `
  function UpcomingEventCard() {
    return (
      <Card className="w-[310px]">
        <CardHeader>
          <CardTitle>Upcoming Event</CardTitle>
          <CardDescription>Your next scheduled event</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                15
              </div>
              <div>
                <h3 className="font-medium">Team Building Workshop</h3>
                <p className="text-sm text-muted-foreground">June 15, 2023</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm">2:00 PM - 4:00 PM</span>
              </div>
              <div className="flex items-center">
                <Map className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Conference Room A</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Decline</Button>
          <Button>Accept</Button>
        </CardFooter>
      </Card>
    )
  }`,
    },
    {
      name: "QuickExpenseCard",
      component: QuickExpenseCard,
      code: `
  function QuickExpenseCard() {
    return (
      <Card className="w-[310px]">
        <CardHeader>
          <CardTitle>Quick Expense</CardTitle>
          <CardDescription>Add a new expense quickly</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                placeholder="Enter amount"
                type="number"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Add Expense</Button>
        </CardFooter>
      </Card>
    )
  }`,
    },
    {
      name: "DeviceStatusCard",
      component: DeviceStatusCard,
      code: `
 function DeviceStatusCard() {
    return (
      <Card className="w-[310px]">
        <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Device Status</CardTitle>
          <Zap className="w-4 h-4 text-yellow-500" />
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="text-2xl font-bold">85%</div>
          <p className="text-xs text-muted-foreground">Battery remaining</p>
        </CardContent>
      </Card>
    );
  }
  }`,
    },
    {
      name: "QuickPollCard",
      component: QuickPollCard,
      code: `
  function QuickPollCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4">
        <CardTitle className="text-sm">Quick Poll</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        <div className="text-sm font-medium">Favorite feature?</div>
        {["Dashboard", "Reports", "Settings"].map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input type="radio" id={option} name="poll" className="radio" />
            <Label htmlFor={option}>{option}</Label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
  `,
    },
    {
      name: "DataUsageCard",
      component: DataUsageCard,
      code: `
  function DataUsageCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Data Usage</CardTitle>
        <Cloud className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Progress value={75} className="w-full" />
        <p className="text-xs text-muted-foreground mt-2">
          7.5 GB of 10 GB used
        </p>
      </CardContent>
    </Card>
  );
}
  `,
    },
    {
      name: "QuickNoteCard",
      component: QuickNoteCard,
      code: `
function QuickNoteCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4">
        <CardTitle className="text-sm">Quick Note</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <textarea
          className="w-full h-20 text-sm resize-none border rounded-md p-2"
          placeholder="Type your note here..."
        ></textarea>
      </CardContent>
    </Card>
  );
}
  `,
    },
    {
      name: "SocialShareCard",
      component: SocialShareCard,
      code: `
 function SocialShareCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4">
        <CardTitle className="text-sm">Share</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex justify-between">
        {["Twitter", "Facebook", "LinkedIn"].map((platform, index) => (
          <Button key={index} variant="outline" size="sm" className="w-16">
            {platform.charAt(0)}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
  `,
    },
    {
      name: "QuickContactCard",
      component: QuickContactCard,
      code: `
 function QuickContactCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Quick Contact</CardTitle>
        <Phone className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-4 pt-0 flex items-center space-x-4">
        <Avatar>
          <AvatarImage src="https://img.freepik.com/premium-photo/anime-male-avatar_950633-956.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold">Arihant</div>
          <p className="text-xs text-muted-foreground">Call | Message</p>
        </div>
      </CardContent>
    </Card>
  );
}
  `,
    },
    {
      name: "LocationCard",
      component: LocationCard,
      code: `
 function LocationCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Current Location</CardTitle>
        <Map className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="font-semibold">San Francisco</div>
        <p className="text-xs text-muted-foreground">California, USA</p>
      </CardContent>
    </Card>
  );
}
  `,
    },
    {
      name: "VoiceCommandCard",
      component: VoiceCommandCard,
      code: `
 function VoiceCommandCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4">
        <CardTitle className="text-sm">Voice Command</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex justify-center">
        <Button variant="outline" size="lg" className="rounded-full">
          <Mic className="h-6 w-6" />
        </Button>
      </CardContent>
    </Card>
  );
}
  `,
    },
    {
      name: "DownloadProgressCard",
      component: DownloadProgressCard,
      code: `
 function DownloadProgressCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Download Progress</CardTitle>
        <Download className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Progress value={40} className="w-full" />
        <p className="text-xs text-muted-foreground mt-2">
          2 of 5 files downloaded
        </p>
      </CardContent>
    </Card>
  );
}
  `,
    },
    {
      name: "ThemeToggleCard",
      component: ThemeToggleCard,
      code: `
 function ThemeToggleCard() {
  const [isDark, setIsDark] = useState(false);
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4">
        <CardTitle className="text-sm">Theme</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sun className="h-4 w-4" />
          <Label>Light</Label>
        </div>
        <Switch checked={isDark} onCheckedChange={setIsDark} />
        <div className="flex items-center space-x-2">
          <Label>Dark</Label>
          <Moon className="h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  );
}
  `,
    },
    {
      name: "QuickRatingCard",
      component: QuickRatingCard,
      code: `
      function QuickRatingCard() {
  const [starRating, setStarRating] = useState(0);
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4">
        <CardTitle className="text-sm">Rate Your Experience</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex justify-between">
        {[1, 2, 3, 4, 5].map((star) => (
          <Button
            key={star}
            variant="ghost"
            size="sm"
            onClick={() => setStarRating(star)}
          >
            <Star
              className="h-4 w-4 
                starRating >= star ? "text-yellow-500" : "text-gray-400"
              "
            />
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}

      
       
  `,
    },
  ];
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12  grid-cols-1 ml-2">
      {cardComponents.map(({ name, component: CardComponent, code }) => (
        <div key={name} className="relative group">
          <CardComponent />
          <div className="absolute top-1 right-5 hidden group-hover:flex">
            <Copy content={code} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function LoginCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email" type="email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Login</Button>
      </CardFooter>
    </Card>
  );
}
export function SignUpCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email" type="email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Choose a password"
                type="password"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="terms" />
              <Label htmlFor="terms">I agree to the terms and conditions</Label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Create Account</Button>
      </CardFooter>
    </Card>
  );
}
export function PaymentCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>
          Enter your payment information to complete the purchase.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cardName">Name on Card</Label>
              <Input id="cardName" placeholder="Enter name on card" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" placeholder="Enter card number" />
            </div>
            <div className="flex space-x-4">
              <div className="flex flex-col space-y-1.5 flex-1">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="flex flex-col space-y-1.5 flex-1">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="CVC" />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Pay Now</Button>
      </CardFooter>
    </Card>
  );
}
export function ProfileCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              src="https://img.freepik.com/premium-photo/anime-male-avatar_950633-956.jpg"
              alt="@arihantcodes"
            />
            <AvatarFallback>SU</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>Spectrum UI</CardTitle>
            <CardDescription>@arihantcodes</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label>Email</Label>
            <p className="text-sm">hello@arihant.us</p>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Location</Label>
            <p className="text-sm">San Francisco, CA</p>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Bio</Label>
            <p className="text-sm">
              Software developer passionate about creating user-friendly
              applications.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Edit Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
export function SettingsCard() {
  const [activeTab, setActiveTab] = useState("account");
  return (
    <Card className="w-[310px]">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Manage your account settings and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="space-y-4 py-2 ">
              <div className="space-y-2 mt-5">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Enter username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="notifications">
            <div className="space-y-4 py-2">
              <div className="flex items-center space-x-2">
                <Switch id="emailNotifications" />
                <Label htmlFor="emailNotifications">Email Notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="pushNotifications" />
                <Label htmlFor="pushNotifications">Push Notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="weeklyDigest" />
                <Label htmlFor="weeklyDigest">Weekly Digest</Label>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
export function MetricsCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader>
        <CardTitle>Metrics Overview</CardTitle>
        <CardDescription>Your key performance indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex items-center">
            <Users className="mr-4 h-4 w-4 text-muted-foreground" />
            <div className="space-y-1 flex-1">
              <p className="text-sm font-medium leading-none">Total Users</p>
              <p className="text-2xl font-bold">2,543</p>
            </div>
            <Badge variant="secondary">+12%</Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div>Revenue</div>
              <div className="font-medium">$45,231.89</div>
            </div>
            <Progress value={75} className="h-2" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Conversion Rate
              </span>
            </div>
            <div className="text-2xl font-bold">3.8%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export function SubscriptionCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader>
        <CardTitle>Subscription Plan</CardTitle>
        <CardDescription>You are currently on the Pro plan</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">$29.99</span>
            <Badge>Monthly</Badge>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
              Unlimited projects
            </li>
            <li className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              Unlimited team members
            </li>
            <li className="flex items-center">
              <Download className="mr-2 h-4 w-4 text-muted-foreground" />
              5TB storage
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Upgrade Plan</Button>
      </CardFooter>
    </Card>
  );
}
export function TaskCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader>
        <CardTitle>Current Tasks</CardTitle>
        <CardDescription>Your team's ongoing tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {["Design system update", "API integration", "User testing"].map(
            (task, index) => (
              <div key={index} className="flex items-center">
                <input type="checkbox" id={`task-${index}`} className="mr-2" />
                <label htmlFor={`task-${index}`} className="flex-1">
                  {task}
                </label>
                <Badge
                  variant={
                    index === 0
                      ? "default"
                      : index === 1
                      ? "secondary"
                      : "outline"
                  }
                >
                  {index === 0
                    ? "In Progress"
                    : index === 1
                    ? "Pending"
                    : "Completed"}
                </Badge>
              </div>
            )
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Tasks
        </Button>
      </CardFooter>
    </Card>
  );
}
export function CalendarCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
        <CardDescription>Your schedule for the next 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { date: "Today", event: "Team standup", time: "10:00 AM" },
            { date: "Tomorrow", event: "Client meeting", time: "2:00 PM" },
            {
              date: "Fri, Jun 12",
              event: "Project deadline",
              time: "11:59 PM",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.event}</p>
                <p className="text-xs text-muted-foreground">
                  {item.date} at {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Full Calendar
        </Button>
      </CardFooter>
    </Card>
  );
}
export function BillingCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader>
        <CardTitle>Billing Information</CardTitle>
        <CardDescription>
          Manage your billing details and payment method
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium">Visa ending in 4242</p>
              <p className="text-xs text-muted-foreground">Expires 12/2024</p>
            </div>
            <Button variant="ghost" size="sm">
              Edit
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="billingEmail">Billing Email</Label>
            <Input id="billingEmail" value="johndoe@example.com" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Next Payment</Label>
            <div className="flex justify-between items-center">
              <span>$29.99 due on June 1, 2023</span>
              <Badge>Upcoming</Badge>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Update Payment Method</Button>
      </CardFooter>
    </Card>
  );
}
export function FeedbackCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader>
        <CardTitle>Feedback</CardTitle>
        <CardDescription>Help us improve our product</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>How satisfied are you with our product?</Label>
            <Slider defaultValue={[50]} max={100} step={1} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback">Your feedback</Label>
            <textarea
              id="feedback"
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Tell us what you think..."
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Submit Feedback</Button>
      </CardFooter>
    </Card>
  );
}
export function AIAssistantCard() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<
    { role: "user" | "ai"; content: string }[]
  >([]);
  const handleSend = () => {
    if (message.trim()) {
      setConversation([
        ...conversation,
        { role: "user", content: message },
        { role: "ai", content: "This is a simulated AI response." },
      ]);
      setMessage("");
    }
  };
  return (
    <Card className="w-[310px]">
      <CardHeader>
        <CardTitle>AI Assistant</CardTitle>
        <CardDescription>Ask me anything about your data</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] overflow-y-auto">
        {conversation.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.role === "ai" ? "text-blue-600 text-left" : "text-right"
            }`}
          >
            <strong>{msg.role === "ai" ? "AI: " : "You: "}</strong>
            {msg.content}
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend}>Send</Button>
      </CardFooter>
    </Card>
  );
}

export function TeamCollaborationCard() {
  const teamMembers = [
    { name: "Alice", avatar: "A", status: "online" },
    { name: "Bob", avatar: "B", status: "offline" },
    { name: "Charlie", avatar: "C", status: "away" },
  ];
  return (
    <Card className="w-[310px]">
      <CardHeader>
        <CardTitle>Team Collaboration</CardTitle>
        <CardDescription>Current project: Website Redesign</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex -space-x-2">
              {teamMembers.map((member, index) => (
                <Avatar key={index} className="border-2 border-background">
                  <AvatarFallback>{member.avatar}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <Badge variant="outline">3 Active Members</Badge>
          </div>
          <Progress value={65} className="w-full" />
          <div className="text-sm text-muted-foreground">
            Project Progress: 65%
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Team Chat</Button>
        <Button>Update Status</Button>
      </CardFooter>
    </Card>
  );
}
export function WeatherCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader>
        <CardTitle>Weather Forecast</CardTitle>
        <CardDescription>San Francisco, CA</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-4xl font-bold">72°F</div>
          <div className="text-6xl">☀️</div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span>Humidity</span>
            <span>60%</span>
          </div>
          <div className="flex justify-between">
            <span>Wind</span>
            <span>5 mph</span>
          </div>
          <div className="flex justify-between">
            <span>UV Index</span>
            <span>3 of 10</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View 7-Day Forecast
        </Button>
      </CardFooter>
    </Card>
  );
}
export function ProductivityTrackerCard() {
  const tasks = [
    { name: "Complete project proposal", completed: true },
    { name: "Review team submissions", completed: false },
    { name: "Prepare for client meeting", completed: false },
  ];
  return (
    <Card className="w-[310px]">
      <CardHeader>
        <CardTitle>Productivity Tracker</CardTitle>
        <CardDescription>Your daily task overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => {}}
                className="mr-2"
              />
              <span
                className={
                  task.completed ? "line-through text-muted-foreground" : ""
                }
              >
                {task.name}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          2 of 3 tasks completed
        </div>
        <Button variant="outline">Add Task</Button>
      </CardFooter>
    </Card>
  );
}
export function QuickActionCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4">
        <CardTitle className="text-sm">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 grid grid-cols-3 gap-2">
        {["New", "Upload", "Share"].map((action, index) => (
          <Button key={index} variant="outline" size="sm" className="w-full">
            {action}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
export function NotificationCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Notifications</CardTitle>
        <Bell className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-2xl font-bold">24</div>
        <p className="text-xs text-muted-foreground">3 unread messages</p>
      </CardContent>
    </Card>
  );
}
export function WeatherMiniCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Weather</CardTitle>
        <Sun className="w-4 h-4 text-yellow-500" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-2xl font-bold">72°F</div>
        <p className="text-xs text-muted-foreground">Sunny, San Francisco</p>
      </CardContent>
    </Card>
  );
}
export function QuickSettingsCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4">
        <CardTitle className="text-sm">Quick Settings</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
          <Switch id="airplane-mode" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="wifi">Wi-Fi</Label>
          <Switch id="wifi" />
        </div>
      </CardContent>
    </Card>
  );
}
export function MusicPlayerCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Now Playing</CardTitle>
        <Music className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="font-semibold">Song Title</div>
        <p className="text-xs text-muted-foreground">Artist Name</p>
        <div className="mt-2">
          <Slider defaultValue={[33]} max={100} step={1} />
        </div>
      </CardContent>
    </Card>
  );
}
export function TaskProgressCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Task Progress</CardTitle>
        <Check className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Progress value={60} className="w-full" />
        <p className="text-xs text-muted-foreground mt-2">
          12 of 20 tasks completed
        </p>
      </CardContent>
    </Card>
  );
}
export function QuickSearchCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4">
        <CardTitle className="text-sm">Quick Search</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex space-x-2">
          <Input placeholder="Search..." className="flex-1" />
          <Button size="sm" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
export function UpcomingEventCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Upcoming Event</CardTitle>
        <Calendar className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="font-semibold">Team Meeting</div>
        <p className="text-xs text-muted-foreground">Today, 2:00 PM</p>
      </CardContent>
    </Card>
  );
}
export function QuickExpenseCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Quick Expense</CardTitle>
        <CreditCard className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        <Input placeholder="Amount" type="number" />
        <Button className="w-full" size="sm">
          Add Expense
        </Button>
      </CardContent>
    </Card>
  );
}
export function DeviceStatusCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Device Status</CardTitle>
        <Zap className="w-4 h-4 text-yellow-500" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-2xl font-bold">85%</div>
        <p className="text-xs text-muted-foreground">Battery remaining</p>
      </CardContent>
    </Card>
  );
}
export function QuickPollCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4">
        <CardTitle className="text-sm">Quick Poll</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        <div className="text-sm font-medium">Favorite feature?</div>
        {["Dashboard", "Reports", "Settings"].map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input type="radio" id={option} name="poll" className="radio" />
            <Label htmlFor={option}>{option}</Label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
export function DataUsageCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Data Usage</CardTitle>
        <Cloud className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Progress value={75} className="w-full" />
        <p className="text-xs text-muted-foreground mt-2">
          7.5 GB of 10 GB used
        </p>
      </CardContent>
    </Card>
  );
}
export function QuickNoteCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4">
        <CardTitle className="text-sm">Quick Note</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <textarea
          className="w-full h-20 text-sm resize-none border rounded-md p-2"
          placeholder="Type your note here..."
        ></textarea>
      </CardContent>
    </Card>
  );
}
export function SocialShareCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4">
        <CardTitle className="text-sm">Share</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex justify-between">
        {["Twitter", "Facebook", "LinkedIn"].map((platform, index) => (
          <Button key={index} variant="outline" size="sm" className="w-16">
            {platform.charAt(0)}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
export function QuickContactCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Quick Contact</CardTitle>
        <Phone className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-4 pt-0 flex items-center space-x-4">
        <Avatar>
          <AvatarImage src="https://img.freepik.com/premium-photo/anime-male-avatar_950633-956.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold">Arihant</div>
          <p className="text-xs text-muted-foreground">Call | Message</p>
        </div>
      </CardContent>
    </Card>
  );
}
export function LocationCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Current Location</CardTitle>
        <Map className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="font-semibold">San Francisco</div>
        <p className="text-xs text-muted-foreground">California, USA</p>
      </CardContent>
    </Card>
  );
}
export function VoiceCommandCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4">
        <CardTitle className="text-sm">Voice Command</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex justify-center">
        <Button variant="outline" size="lg" className="rounded-full">
          <Mic className="h-6 w-6" />
        </Button>
      </CardContent>
    </Card>
  );
}
export function DownloadProgressCard() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Download Progress</CardTitle>
        <Download className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Progress value={40} className="w-full" />
        <p className="text-xs text-muted-foreground mt-2">
          2 of 5 files downloaded
        </p>
      </CardContent>
    </Card>
  );
}
export function ThemeToggleCard() {
  const [isDark, setIsDark] = useState(false);
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4">
        <CardTitle className="text-sm">Theme</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sun className="h-4 w-4" />
          <Label>Light</Label>
        </div>
        <Switch checked={isDark} onCheckedChange={setIsDark} />
        <div className="flex items-center space-x-2">
          <Label>Dark</Label>
          <Moon className="h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  );
}
export function QuickRatingCard() {
  const [starRating, setStarRating] = useState(0);
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4">
        <CardTitle className="text-sm">Rate Your Experience</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex justify-between">
        {[1, 2, 3, 4, 5].map((star) => (
          <Button
            key={star}
            variant="ghost"
            size="sm"
            onClick={() => setStarRating(star)}
          >
            <Star
              className={`h-4 w-4 ${
                starRating >= star ? "text-yellow-500" : "text-gray-400"
              }`}
            />
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}

export function DataVisualizationCard() {
  const [activeChart, setActiveChart] = useState<ChartType>("bar");
  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  };
  type ChartType = "bar" | "line" | "radar";

  const renderChart = (type: ChartType) => {
    switch (type) {
      case "bar":
        return (
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        );
      case "line":
        return (
          <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="mobile"
              type="natural"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        );
      case "radar":
        return (
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
            />
            <Radar
              dataKey="mobile"
              fill="var(--color-mobile)"
              fillOpacity={0.6}
            />
          </RadarChart>
        );
    }
  };
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Data Visualization</CardTitle>
        <CardDescription>Interactive chart types</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeChart}
          onValueChange={(value) => setActiveChart(value as ChartType)}
        >
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="bar" aria-label="Bar Chart">
              <LucideBarChart className="h-4 w-4 mr-2" />
              Bar
            </TabsTrigger>
            <TabsTrigger value="line" aria-label="Line Chart">
              <LucideLineChart className="h-4 w-4 mr-2" />
              Line
            </TabsTrigger>
            <TabsTrigger value="radar" aria-label="Radar Chart">
              <LucidePieChart className="h-4 w-4 mr-2" />
              Radar
            </TabsTrigger>
          </TabsList>
          <TabsContent value={activeChart} className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeChart.charAt(0).toUpperCase() + activeChart.slice(1)}{" "}
                  Chart
                </CardTitle>
                <CardDescription>January - June 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="">
                  {renderChart(activeChart)}
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                  Trending up by 5.2% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                  Showing total visitors for the last 6 months
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Export Data
        </Button>
      </CardFooter>
    </Card>
  );
}
