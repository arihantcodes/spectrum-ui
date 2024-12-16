/* eslint-disable react/no-unescaped-entities */
"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Moon, Sun, DollarSign, Users, Activity, Send, Palette, Check } from "lucide-react"

const revenueData = [
  { month: "Jan", amount: 12000 },
  { month: "Feb", amount: 14000 },
  { month: "Mar", amount: 13500 },
  { month: "Apr", amount: 13800 },
  { month: "May", amount: 14200 },
  { month: "Jun", amount: 15231 },
]

const subscriptionData = [
  { name: "Basic", value: 400 },
  { name: "Pro", value: 300 },
  { name: "Enterprise", value: 150 },
]

const exerciseData = [
  { name: "Mon", minutes: 45 },
  { name: "Tue", minutes: 55 },
  { name: "Wed", minutes: 35 },
  { name: "Thu", minutes: 50 },
  { name: "Fri", minutes: 45 },
  { name: "Sat", minutes: 40 },
  { name: "Sun", minutes: 35 },
]
const COLORS = ['#8b5cf6', '#6366f1', '#a78bfa']

const styles = [
  { name: "Default", value: "default" },
  { name: "New York", value: "new-york" },
]

const colors = [
  { name: "Zinc", value: "zinc", class: "bg-zinc-500" },
  { name: "Slate", value: "slate", class: "bg-slate-500" },
  { name: "Stone", value: "stone", class: "bg-stone-500" },
  { name: "Gray", value: "gray", class: "bg-gray-500" },
  { name: "Neutral", value: "neutral", class: "bg-neutral-500" },
  { name: "Red", value: "red", class: "bg-red-500" },
  { name: "Rose", value: "rose", class: "bg-rose-500" },
  { name: "Orange", value: "orange", class: "bg-orange-500" },
  { name: "Green", value: "green", class: "bg-green-500" },
  { name: "Blue", value: "blue", class: "bg-blue-500" },
  { name: "Yellow", value: "yellow", class: "bg-yellow-500" },
  { name: "Violet", value: "violet", class: "bg-violet-500" },
]

const radiusOptions = [
  { name: "0", value: "0" },
  { name: "0.3", value: "0.3" },
  { name: "0.5", value: "0.5" },
  { name: "0.75", value: "0.75" },
  { name: "1.0", value: "1.0" },
]
export default function Component() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [selectedStyle, setSelectedStyle] = React.useState("default")
  const [selectedColor, setSelectedColor] = React.useState("zinc")
  const [selectedRadius, setSelectedRadius] = React.useState("0.5")
  const [mode, setMode] = React.useState("dark")
  function cn(...classes: (string | boolean | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <Card className="min-h-screen  text-gray-100  md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Revenue Card */}
        <Card className="md:col-span-2  border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$15,231.89</div>
            <p className="text-xs text-gray-400">+20.1% from last month</p>
            <div className="h-[200px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: '#111827', border: 'none', color: 'white' }} />
                  <Area type="monotone" dataKey="amount" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Subscriptions Card */}
        <Card className="md:row-span-`  border-gray-800">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">850</div>
            <p className="text-xs text-gray-400">Total active users</p>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subscriptionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {subscriptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#111827', border: 'none' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center mt-4">
              {subscriptionData.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center mx-2">
                  <div className="w-3 h-3 mr-1" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-xs">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calendar Card */}
        <Card className="md:col-span-1  border-gray-800">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-gray-800"
            />
          </CardContent>
        </Card>

        {/* Team Members Card */}
        <Card className="md:col-span-1  border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-4">
                {[
                  { name: "Sofia Davis", role: "Product Manager", image: "/placeholder.svg?height=32&width=32" },
                  { name: "Jackson Lee", role: "Designer", image: "/placeholder.svg?height=32&width=32" },
                  { name: "Isabella Nguyen", role: "Developer", image: "/placeholder.svg?height=32&width=32" },
                  { name: "William Chen", role: "Marketing", image: "/placeholder.svg?height=32&width=32" },
                  { name: "Emily Taylor", role: "Customer Support", image: "/placeholder.svg?height=32&width=32" },
                ].map((member) => (
                  <div key={member.name} className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={member.image} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-gray-400">{member.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Settings Card */}
        <Card className="md:col-span-1  border-gray-800">
          <CardHeader>
            <CardTitle className="text-sm font-medium">App Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <div className="text-xs text-gray-400">Toggle dark mode on/off</div>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifications</Label>
                <div className="text-xs text-gray-400">Receive push notifications</div>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Data Saver</Label>
                <div className="text-xs text-gray-400">Reduce data usage</div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Exercise Minutes Card */}
        <Card className="md:col-span-2  border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exercise Minutes</CardTitle>
            <Activity className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">305 min</div>
            <p className="text-xs text-gray-400">Total this week</p>
            <div className="h-[200px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={exerciseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: '#111827', border: 'none' }} />
                  <Bar dataKey="minutes" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Payments Table Card */}
        <Card className="md:col-span-1 lg:col-span-2  border-gray-800">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { status: "Success", customer: "John Doe", date: "2023-06-20", amount: "$316.00" },
                  { status: "Processing", customer: "Jane Smith", date: "2023-06-19", amount: "$242.00" },
                  { status: "Failed", customer: "Bob Johnson", date: "2023-06-18", amount: "$837.00" },
                  { status: "Success", customer: "Alice Brown", date: "2023-06-17", amount: "$874.00" },
                ].map((payment) => (
                  <TableRow key={payment.date}>
                    <TableCell>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${payment.status === 'Success' ? 'bg-green-500/20 text-green-500' :
                        payment.status === 'Processing' ? 'bg-yellow-500/20 text-yellow-500' :
                          'bg-red-500/20 text-red-500'
                        }`}>
                        {payment.status}
                      </span>
                    </TableCell>
                    <TableCell>{payment.customer}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell className="text-right">{payment.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Support Chat Card */}
        <Card className="md:col-span-1 lg:col-span-2  border-gray-800">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Customer Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScrollArea className="h-[200px] w-full rounded border border-gray-800 p-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Avatar>
                    <AvatarFallback>CS</AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-800 rounded-lg p-2 max-w-[80%]">
                    <p className="text-sm">Hello! How can I assist you today?</p>
                  </div>
                </div>
                <div className="flex items-start justify-end space-x-2">
                  <div className="bg-purple-600 rounded-lg p-2 max-w-[80%]">
                    <p className="text-sm">Hi, I'm having trouble with my account settings.</p>
                  </div>
                  <Avatar>
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex items-start space-x-2">
                  <Avatar>
                    <AvatarFallback>CS</AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-800 rounded-lg p-2 max-w-[80%]">
                    <p className="text-sm">I'm sorry to hear that. Can you please provide more details about the issue you're experiencing?</p>
                  </div>
                </div>

              </div>
            </ScrollArea>
            <div className="flex space-x-2">
              <Input placeholder="Type your message..." className="flex-grow" />
              <Button size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-1 lg:col-span-1  border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customize</CardTitle>
            <Palette className="h-4 w-4 " />
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs ">Style</span>
              </div>
              <div className="flex gap-2">
                {styles.map((style) => (
                  <Button
                    key={style.value}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "h-7  c ",
                      selectedStyle === style.value && "border-white"
                    )}
                    onClick={() => setSelectedStyle(style.value)}
                  >
                    {style.name}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs ">Color</span>
              </div>
              <div className="grid grid-cols-2  lg:grid-cols-3 gap-2">
                {colors.map((color) => (
                  <Button
                    key={color.value}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "  ",
                      selectedColor === color.value && ""
                    )}
                    onClick={() => setSelectedColor(color.value)}
                  >
                    <div className="flex items-center gap-2">
                      <div className={cn("h-4 w-4 rounded-full", color.class)} />
                      <span className="text-sm">{color.name}</span>
                    </div>
                    {selectedColor === color.value && (
                      <Check className=" " />
                    )}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs ">Radius</span>
              </div>
              <div className="flex gap-2 ">
                {radiusOptions.map((radius) => (
                  <Button
                    key={radius.value}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "flex-1 h-7  border-gray-800",
                      selectedRadius === radius.value && "border-white"
                    )}
                    onClick={() => setSelectedRadius(radius.value)}
                  >
                    {radius.name}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">Mode</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "flex-1 h-7  border-gray-800",
                    mode === "light" && "border-white"
                  )}
                  onClick={() => setMode("light")}
                >
                  Light
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "flex-1 h-7  border-gray-800",
                    mode === "dark" && "border-white"
                  )}
                  onClick={() => setMode("dark")}
                >
                  Dark
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Card>
  )
}