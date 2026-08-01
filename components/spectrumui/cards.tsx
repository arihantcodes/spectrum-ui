'use client';

import { useEffect, useRef, useState, type JSX } from 'react';
import {
  Activity,
  ArrowUpRight,
  Bell,
  Check,
  ChevronRight,
  Circle,
  Copy as CopyIcon,
  CreditCard,
  Eye,
  EyeOff,
  FileText,
  GitBranch,
  GitCommit,
  HardDrive,
  Laptop,
  MessageSquare,
  MoreHorizontal,
  Package,
  Paperclip,
  Plus,
  Receipt,
  RefreshCw,
  Rocket,
  Send,
  Smartphone,
  Sparkles,
  Star,
  Trash2,
  TrendingDown,
  TrendingUp,
  UserPlus,
  Users,
  X,
} from 'lucide-react';

import {
  RiCheckboxCircleFill,
  RiDoubleQuotesR,
  RiErrorWarningFill,
  RiInboxFill,
  RiKey2Fill,
  RiMailFill,
  RiSlackFill,
  RiSparkling2Fill,
  RiUploadCloud2Fill,
} from '@remixicon/react';
import { IconCookieFilled } from '@tabler/icons-react';

import Copy from '../copy';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { CARD_SOURCE } from './cards.source';
import { CardCustomizer } from './card-customizer';

/* -------------------------------------------------------------------------- */
/*  Authentication                                                            */
/* -------------------------------------------------------------------------- */

export function LoginCard() {
  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-base">Sign in</CardTitle>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 p-6 pt-0">
        <div className="space-y-1.5">
          <Label htmlFor="login-email">Email</Label>
          <Input id="login-email" type="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password">Password</Label>
            <button
              type="button"
              className="text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Forgot?
            </button>
          </div>
          <Input id="login-password" type="password" placeholder="••••••••" />
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full transition-transform active:scale-[0.96]">Sign in</Button>
      </CardFooter>
    </Card>
  );
}

export function SignUpCard() {
  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-base">Create an account</CardTitle>
        <CardDescription>Start your 14-day free trial.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 p-6 pt-0">
        <div className="space-y-1.5">
          <Label htmlFor="signup-name">Full name</Label>
          <Input id="signup-name" placeholder="Ada Lovelace" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="signup-email">Work email</Label>
          <Input id="signup-email" type="email" placeholder="you@company.com" />
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          By continuing you agree to our Terms and Privacy Policy.
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full transition-transform active:scale-[0.96]">Create account</Button>
      </CardFooter>
    </Card>
  );
}

export function ForgotPasswordCard() {
  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <RiKey2Fill className="size-5" />
        </div>
        <CardTitle className="text-base">Reset your password</CardTitle>
        <CardDescription>We&apos;ll email you a link to choose a new one.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-1.5">
          <Label htmlFor="reset-email">Email</Label>
          <Input id="reset-email" type="email" placeholder="you@example.com" />
        </div>
      </CardContent>
      <CardFooter className="gap-2 p-6 pt-0">
        <Button variant="outline" className="flex-1 transition-transform active:scale-[0.96]">
          Back
        </Button>
        <Button className="flex-1 transition-transform active:scale-[0.96]">Send link</Button>
      </CardFooter>
    </Card>
  );
}

export function TwoFactorCard() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const setDigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);
    if (digit && index < 5) inputs.current[index + 1]?.focus();
  };

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-base">Two-factor authentication</CardTitle>
        <CardDescription>Enter the 6-digit code from your authenticator app.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="flex gap-1.5">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputs.current[index] = el;
              }}
              value={digit}
              onChange={(event) => setDigit(index, event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Backspace' && !digit && index > 0) {
                  inputs.current[index - 1]?.focus();
                }
              }}
              inputMode="numeric"
              aria-label={`Digit ${index + 1}`}
              className="h-11 w-full rounded-md border bg-background text-center text-base font-medium tabular-nums outline-hidden transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 p-6 pt-0">
        <Button className="w-full transition-transform active:scale-[0.96]">Verify</Button>
        <button
          type="button"
          className="text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          Resend code
        </button>
      </CardFooter>
    </Card>
  );
}

export function MagicLinkCard() {
  return (
    <Card className="w-full rounded-xl">
      <CardContent className="flex flex-col items-center p-6 text-center">
        <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <RiMailFill className="size-5" />
        </div>
        <p className="text-base font-medium">Check your inbox</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          We sent a sign-in link to <span className="text-foreground">ada@example.com</span>. It
          expires in 10 minutes.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4 w-full transition-transform active:scale-[0.96]"
        >
          <RefreshCw className="size-3.5" />
          Resend email
        </Button>
      </CardContent>
    </Card>
  );
}

export function SessionsCard() {
  const sessions = [
    { device: 'MacBook Pro', meta: 'San Francisco · Current', icon: Laptop, current: true },
    { device: 'iPhone 15', meta: 'San Francisco · 2h ago', icon: Smartphone, current: false },
  ];

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-base">Active sessions</CardTitle>
        <CardDescription>Devices signed in to your account.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1 p-6 pt-0">
        {sessions.map((session) => (
          <div
            key={session.device}
            className="-mx-2 flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-muted/50"
          >
            <session.icon className="size-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm">{session.device}</p>
              <p className="truncate text-xs text-muted-foreground">{session.meta}</p>
            </div>
            {session.current ? (
              <Badge variant="secondary">Active</Badge>
            ) : (
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                Revoke
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/*  Billing                                                                   */
/* -------------------------------------------------------------------------- */

export function PricingCard() {
  const features = ['Unlimited projects', 'Advanced analytics', 'Priority support'];

  return (
    <Card className="relative w-full overflow-hidden rounded-xl border-primary/30">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-primary/10 to-transparent"
      />
      <CardHeader className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Pro</CardTitle>
          <Badge>Popular</Badge>
        </div>
        <div className="flex items-baseline gap-1 pt-1">
          <span className="text-3xl font-semibold tracking-tight tabular-nums">$29</span>
          <span className="text-xs text-muted-foreground">/month</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 p-6 pt-0">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-2 text-sm">
            <Check className="size-3.5 shrink-0 text-primary" />
            <span>{feature}</span>
          </div>
        ))}
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full transition-transform active:scale-[0.96]">Upgrade to Pro</Button>
      </CardFooter>
    </Card>
  );
}

export function CheckoutCard() {
  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-base">Payment details</CardTitle>
        <CardDescription>Your card is encrypted end to end.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 p-6 pt-0">
        <div className="space-y-1.5">
          <Label htmlFor="checkout-number">Card number</Label>
          <div className="relative">
            <Input id="checkout-number" placeholder="4242 4242 4242 4242" className="pr-9" />
            <CreditCard className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="checkout-expiry">Expires</Label>
            <Input id="checkout-expiry" placeholder="MM / YY" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="checkout-cvc">CVC</Label>
            <Input id="checkout-cvc" placeholder="123" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full transition-transform active:scale-[0.96]">Pay $29.00</Button>
      </CardFooter>
    </Card>
  );
}

export function PaymentMethodCard() {
  const [selected, setSelected] = useState('visa');
  const methods = [
    { id: 'visa', label: 'Visa', meta: '•••• 4242', expiry: '12/27' },
    { id: 'mastercard', label: 'Mastercard', meta: '•••• 8080', expiry: '04/26' },
  ];

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-base">Payment method</CardTitle>
        <CardDescription>Choose a default card.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 p-6 pt-0">
        {methods.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => setSelected(method.id)}
            aria-pressed={selected === method.id}
            className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
              selected === method.id
                ? 'border-foreground/30 bg-muted/50'
                : 'hover:border-foreground/20 hover:bg-muted/30'
            }`}
          >
            <CreditCard className="size-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm">{method.label}</p>
              <p className="text-xs tabular-nums text-muted-foreground">
                {method.meta} · {method.expiry}
              </p>
            </div>
            <span
              className={`flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                selected === method.id ? 'border-primary bg-primary' : 'border-muted-foreground/40'
              }`}
            >
              {selected === method.id && <Check className="size-2.5 text-primary-foreground" />}
            </span>
          </button>
        ))}
      </CardContent>
    </Card>
  );
}

export function InvoiceCard() {
  const invoices = [
    { id: 'INV-2043', date: 'Jun 1, 2024', amount: '$29.00' },
    { id: 'INV-2042', date: 'May 1, 2024', amount: '$29.00' },
    { id: 'INV-2041', date: 'Apr 1, 2024', amount: '$29.00' },
  ];

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-base">Invoices</CardTitle>
        <CardDescription>Your recent billing history.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1 p-6 pt-0">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="group/row -mx-2 flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-muted/50"
          >
            <Receipt className="size-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm tabular-nums">{invoice.id}</p>
              <p className="text-xs text-muted-foreground">{invoice.date}</p>
            </div>
            <span className="text-sm tabular-nums">{invoice.amount}</span>
            <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/row:opacity-100" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function OrderSummaryCard() {
  const items = [
    { name: 'Pro plan · annual', price: '$290.00' },
    { name: 'Extra seats × 3', price: '$54.00' },
  ];

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-base">Order summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 p-6 pt-0">
        {items.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{item.name}</span>
            <span className="tabular-nums">{item.price}</span>
          </div>
        ))}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="tabular-nums">$27.52</span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t pt-3">
          <span className="text-sm font-medium">Total</span>
          <span className="text-lg font-semibold tracking-tight tabular-nums">$371.52</span>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full transition-transform active:scale-[0.96]">Place order</Button>
      </CardFooter>
    </Card>
  );
}

export function UsageQuotaCard() {
  const quotas = [
    { label: 'API requests', used: 74_120, limit: 100_000, percent: 74 },
    { label: 'Team seats', used: 8, limit: 10, percent: 80 },
  ];

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-base">Usage this month</CardTitle>
        <CardDescription>Resets on Jul 1.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6 pt-0">
        {quotas.map((quota) => (
          <div key={quota.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>{quota.label}</span>
              <span className="text-xs tabular-nums text-muted-foreground">
                {quota.used.toLocaleString()} / {quota.limit.toLocaleString()}
              </span>
            </div>
            <Progress value={quota.percent} className="h-1.5" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function SubscriptionCard() {
  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">Current plan</CardTitle>
            <CardDescription>Renews Jul 1, 2024</CardDescription>
          </div>
          <Badge variant="secondary">Pro</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-semibold tracking-tight tabular-nums">$29</span>
          <span className="text-xs text-muted-foreground">billed monthly</span>
        </div>
      </CardContent>
      <CardFooter className="gap-2 p-6 pt-0">
        <Button variant="outline" className="flex-1 transition-transform active:scale-[0.96]">
          Cancel
        </Button>
        <Button className="flex-1 transition-transform active:scale-[0.96]">Change plan</Button>
      </CardFooter>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/*  Data & analytics                                                          */
/* -------------------------------------------------------------------------- */

export function StatCard() {
  const points = [12, 18, 14, 24, 21, 32, 28, 38];
  const max = Math.max(...points);
  const path = points
    .map((point, index) => `${(index / (points.length - 1)) * 100},${28 - (point / max) * 24}`)
    .join(' ');

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
        <CardTitle className="text-sm font-medium">Monthly revenue</CardTitle>
        <TrendingUp className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="text-2xl font-semibold tracking-tight tabular-nums">$45,231</div>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <span className="tabular-nums text-foreground">+12.5%</span> from last month
        </p>
        <svg
          viewBox="0 0 100 28"
          preserveAspectRatio="none"
          className="mt-3 h-8 w-full overflow-visible"
        >
          <defs>
            <linearGradient id="spectrum-stat-area" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="hsl(var(--primary))" stopOpacity="0.25" />
              <stop offset="1" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`0,28 ${path} 100,28`} fill="url(#spectrum-stat-area)" />
          <polyline
            points={path}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            className="text-primary"
          />
          <circle
            cx="100"
            cy={28 - (points[points.length - 1] / max) * 24}
            r="2"
            fill="hsl(var(--primary))"
          />
        </svg>
      </CardContent>
    </Card>
  );
}

export function RevenueChartCard() {
  const bars = [42, 68, 51, 84, 62, 95, 73];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-base">Weekly activity</CardTitle>
        <CardDescription>Sessions per day</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="flex h-24 items-stretch gap-1.5">
          {bars.map((value, index) => (
            <div key={index} className="group/bar flex h-full flex-1 flex-col justify-end gap-1.5">
              <div
                style={{ height: `${value}%` }}
                className="w-full rounded-sm bg-linear-to-t from-primary/25 to-primary/70 opacity-70 transition-opacity duration-150 group-hover/bar:opacity-100"
              />
              <span className="text-center text-xs text-muted-foreground">{days[index]}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function GoalProgressCard() {
  const percent = 68;
  const circumference = 2 * Math.PI * 34;

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-base">Quarterly goal</CardTitle>
        <CardDescription>$68k of $100k closed</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-6 pt-0">
        <div className="relative size-24">
          <svg viewBox="0 0 80 80" className="size-full -rotate-90">
            <defs>
              <linearGradient id="spectrum-goal-ring" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="hsl(var(--primary))" />
                <stop offset="1" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <circle cx="40" cy="40" r="34" fill="none" strokeWidth="6" className="stroke-muted" />
            <circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke="url(#spectrum-goal-ring)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (percent / 100) * circumference}
              className="transition-[stroke-dashoffset] duration-500 ease-out"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold tabular-nums">
            {percent}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export function AnalyticsSummaryCard() {
  const metrics = [
    { label: 'Visitors', value: '12,408', change: '+8.2%', up: true },
    { label: 'Conversion', value: '3.8%', change: '+0.4%', up: true },
    { label: 'Bounce rate', value: '41.2%', change: '-2.1%', up: false },
  ];

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-base">Overview</CardTitle>
        <CardDescription>Last 30 days</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 p-6 pt-0">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{metric.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium tabular-nums">{metric.value}</span>
              <span className="flex items-center gap-0.5 text-xs tabular-nums text-muted-foreground">
                {metric.up ? (
                  <TrendingUp className="size-3" />
                ) : (
                  <TrendingDown className="size-3" />
                )}
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function StorageUsageCard() {
  const breakdown = [
    { label: 'Documents', value: 42 },
    { label: 'Media', value: 28 },
    { label: 'Backups', value: 12 },
  ];

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-4">
        <CardTitle className="text-sm font-medium">Storage</CardTitle>
        <HardDrive className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-semibold tracking-tight tabular-nums">82</span>
          <span className="text-xs text-muted-foreground">of 100 GB used</span>
        </div>
        <div className="mt-3 flex h-1.5 w-full overflow-hidden rounded-full bg-muted">
          {breakdown.map((segment, index) => (
            <div
              key={segment.label}
              style={{ width: `${segment.value}%` }}
              className={
                index === 0 ? 'bg-primary/80' : index === 1 ? 'bg-primary/50' : 'bg-primary/25'
              }
            />
          ))}
        </div>
        <div className="mt-3 space-y-1.5">
          {breakdown.map((segment) => (
            <div key={segment.label} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{segment.label}</span>
              <span className="tabular-nums">{segment.value} GB</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function LeaderboardCard() {
  const people = [
    { name: 'Ada Lovelace', initials: 'AL', score: '2,480' },
    { name: 'Alan Turing', initials: 'AT', score: '2,145' },
    { name: 'Grace Hopper', initials: 'GH', score: '1,932' },
  ];

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-base">Top performers</CardTitle>
        <CardDescription>This quarter</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1 p-6 pt-0">
        {people.map((person, index) => (
          <div
            key={person.name}
            className="-mx-2 flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-muted/50"
          >
            <span className="w-4 text-xs tabular-nums text-muted-foreground">{index + 1}</span>
            <Avatar className="size-7">
              <AvatarFallback className="text-[10px]">{person.initials}</AvatarFallback>
            </Avatar>
            <span className="min-w-0 flex-1 truncate text-sm">{person.name}</span>
            <span className="text-sm tabular-nums text-muted-foreground">{person.score}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/*  Developer tooling                                                         */
/* -------------------------------------------------------------------------- */

export function ApiKeyCard() {
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const key = 'sk_live_51H8xQ2LkD9vB3nR7';

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-base">API key</CardTitle>
        <CardDescription>Keep this secret. Rotate if leaked.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="flex items-center gap-2 rounded-lg border bg-muted/30 p-2">
          <code className="min-w-0 flex-1 truncate font-mono text-xs">
            {revealed ? key : '•'.repeat(key.length)}
          </code>
          <Button
            variant="ghost"
            size="sm"
            className="size-7 shrink-0 p-0"
            onClick={() => setRevealed((value) => !value)}
            aria-label={revealed ? 'Hide API key' : 'Reveal API key'}
          >
            {revealed ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="size-7 shrink-0 p-0"
            onClick={() => setCopied(true)}
            aria-label="Copy API key"
          >
            {copied ? <Check className="size-3.5" /> : <CopyIcon className="size-3.5" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function DeploymentCard() {
  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-4">
        <CardTitle className="text-sm font-medium">Production</CardTitle>
        <Badge variant="secondary" className="gap-1.5">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full rounded-full bg-primary/50 motion-safe:animate-ping" />
            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
          </span>
          Live
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3 p-6 pt-0">
        <div className="flex items-center gap-2 text-sm">
          <GitBranch className="size-3.5 shrink-0 text-muted-foreground" />
          <span className="font-mono text-xs">main</span>
          <span className="text-muted-foreground">·</span>
          <span className="truncate text-xs text-muted-foreground">Deployed 4m ago</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Build time</span>
          <span className="tabular-nums">42s</span>
        </div>
      </CardContent>
      <CardFooter className="gap-2 p-6 pt-0">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 transition-transform active:scale-[0.96]"
        >
          <Rocket className="size-3.5" />
          Redeploy
        </Button>
        <Button variant="ghost" size="sm" className="transition-transform active:scale-[0.96]">
          Logs
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ServiceHealthCard() {
  const services = [
    { name: 'API', uptime: '99.99%', healthy: true },
    { name: 'Database', uptime: '99.95%', healthy: true },
    { name: 'Webhooks', uptime: '98.20%', healthy: false },
  ];

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-4">
        <CardTitle className="text-sm font-medium">System status</CardTitle>
        <Activity className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-2.5 p-6 pt-0">
        {services.map((service) => (
          <div key={service.name} className="flex items-center gap-2.5">
            <span
              className={`size-1.5 shrink-0 rounded-full ${
                service.healthy ? 'bg-primary' : 'bg-muted-foreground/40'
              }`}
            />
            <span className="flex-1 text-sm">{service.name}</span>
            <span className="text-xs tabular-nums text-muted-foreground">{service.uptime}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function IntegrationCard() {
  const [connected, setConnected] = useState(false);

  return (
    <Card className="w-full rounded-xl">
      <CardContent className="flex items-start gap-3 p-6">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <RiSlackFill className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">Slack</p>
          <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
            Send deploy and alert notifications to your channels.
          </p>
          <Button
            variant={connected ? 'outline' : 'default'}
            size="sm"
            onClick={() => setConnected((value) => !value)}
            className="mt-3 transition-transform active:scale-[0.96]"
          >
            {connected ? 'Disconnect' : 'Connect'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function EnvVarsCard() {
  const vars = [
    { key: 'DATABASE_URL', scope: 'Production' },
    { key: 'STRIPE_SECRET', scope: 'Production' },
    { key: 'NEXT_PUBLIC_URL', scope: 'All' },
  ];

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-base">Environment variables</CardTitle>
        <CardDescription>Encrypted at rest.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1 p-6 pt-0">
        {vars.map((item) => (
          <div
            key={item.key}
            className="group/env -mx-2 flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-muted/50"
          >
            <code className="min-w-0 flex-1 truncate font-mono text-xs">{item.key}</code>
            <span className="shrink-0 text-xs text-muted-foreground">{item.scope}</span>
            <MoreHorizontal className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/env:opacity-100" />
          </div>
        ))}
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          variant="outline"
          size="sm"
          className="w-full transition-transform active:scale-[0.96]"
        >
          <Plus className="size-3.5" />
          Add variable
        </Button>
      </CardFooter>
    </Card>
  );
}

export function WebhookCard() {
  const [enabled, setEnabled] = useState(true);

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="text-sm font-medium">Webhook endpoint</CardTitle>
            <CardDescription className="truncate font-mono text-xs">
              https://api.acme.dev/hooks
            </CardDescription>
          </div>
          <Switch checked={enabled} onCheckedChange={setEnabled} aria-label="Enable webhook" />
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between p-6 pt-0 text-xs">
        <span className="text-muted-foreground">Last delivery</span>
        <span className="flex items-center gap-1.5">
          <Check className="size-3" />
          <span className="tabular-nums">200 · 2m ago</span>
        </span>
      </CardContent>
    </Card>
  );
}

export function CommitCard() {
  return (
    <Card className="w-full rounded-xl">
      <CardContent className="p-6">
        <div className="flex items-center gap-2">
          <GitCommit className="size-4 shrink-0 text-muted-foreground" />
          <code className="font-mono text-xs text-muted-foreground">a3f9c21</code>
          <Badge variant="secondary" className="ml-auto">
            main
          </Badge>
        </div>
        <p className="mt-2.5 text-sm font-medium leading-snug">
          fix: prevent duplicate webhook retries
        </p>
        <div className="mt-3 flex items-center gap-2">
          <Avatar className="size-5">
            <AvatarFallback className="text-[9px]">AL</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">Ada Lovelace committed 3h ago</span>
        </div>
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/*  Work & team                                                               */
/* -------------------------------------------------------------------------- */

export function TaskListCard() {
  const [done, setDone] = useState<string[]>(['Ship design tokens']);
  const tasks = ['Ship design tokens', 'Review API contract', 'Write migration guide'];
  const toggle = (task: string) =>
    setDone((current) =>
      current.includes(task) ? current.filter((item) => item !== task) : [...current, task],
    );

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-base">Today</CardTitle>
        <CardDescription className="tabular-nums">
          {done.length} of {tasks.length} complete
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-1 p-6 pt-0">
        {tasks.map((task) => {
          const checked = done.includes(task);
          return (
            <button
              key={task}
              type="button"
              onClick={() => toggle(task)}
              aria-pressed={checked}
              className="-mx-2 flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left transition-colors hover:bg-muted/50"
            >
              <span
                className={`flex size-4 shrink-0 items-center justify-center rounded border transition-colors duration-150 ${
                  checked ? 'border-primary bg-primary' : 'border-muted-foreground/40'
                }`}
              >
                {checked && <Check className="size-3 text-primary-foreground" />}
              </span>
              <span
                className={`text-sm transition-colors ${checked ? 'text-muted-foreground line-through' : ''}`}
              >
                {task}
              </span>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}

export function KanbanTaskCard() {
  return (
    <Card className="w-full cursor-grab rounded-xl transition-shadow duration-200 hover:shadow-md active:cursor-grabbing">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary">Design</Badge>
          <MoreHorizontal className="size-3.5 text-muted-foreground" />
        </div>
        <p className="mt-2.5 text-sm font-medium leading-snug">
          Redesign the onboarding empty states
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MessageSquare className="size-3" />
              <span className="tabular-nums">4</span>
            </span>
            <span className="flex items-center gap-1">
              <Paperclip className="size-3" />
              <span className="tabular-nums">2</span>
            </span>
          </div>
          <Avatar className="size-5">
            <AvatarFallback className="text-[9px]">GH</AvatarFallback>
          </Avatar>
        </div>
      </CardContent>
    </Card>
  );
}

export function OnboardingChecklistCard() {
  const steps = [
    { label: 'Create your account', done: true },
    { label: 'Invite your team', done: true },
    { label: 'Connect a repository', done: false },
    { label: 'Ship your first deploy', done: false },
  ];
  const complete = steps.filter((step) => step.done).length;

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-base">Get started</CardTitle>
        <Progress value={(complete / steps.length) * 100} className="mt-2 h-1.5" />
      </CardHeader>
      <CardContent className="space-y-1 p-6 pt-0">
        {steps.map((step) => (
          <div
            key={step.label}
            className="group/step -mx-2 flex items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-muted/50"
          >
            {step.done ? (
              <RiCheckboxCircleFill className="size-4 shrink-0 text-primary" />
            ) : (
              <Circle className="size-4 shrink-0 text-muted-foreground/40" />
            )}
            <span className={`flex-1 text-sm ${step.done ? 'text-muted-foreground' : ''}`}>
              {step.label}
            </span>
            {!step.done && (
              <ChevronRight className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-150 group-hover/step:translate-x-0.5" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function ActivityFeedCard() {
  const events = [
    { who: 'AL', what: 'merged', target: '#412 Fix retries', when: '2m' },
    { who: 'AT', what: 'opened', target: '#413 Add tracing', when: '1h' },
    { who: 'GH', what: 'commented on', target: '#409', when: '3h' },
  ];

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-base">Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-3">
          {events.map((event, index) => (
            <div key={index} className="flex gap-3">
              <Avatar className="size-6 shrink-0">
                <AvatarFallback className="text-[9px]">{event.who}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-snug">
                  <span className="text-muted-foreground">{event.what} </span>
                  <span className="truncate">{event.target}</span>
                </p>
                <p className="mt-0.5 text-xs tabular-nums text-muted-foreground">
                  {event.when} ago
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function CommentCard() {
  return (
    <Card className="w-full rounded-xl">
      <CardContent className="p-6">
        <div className="flex items-center gap-2.5">
          <Avatar className="size-7">
            <AvatarFallback className="text-[10px]">AT</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Alan Turing</p>
            <p className="text-xs text-muted-foreground">2 hours ago</p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Looks good overall — can we align the empty state copy with the rest of the product?
        </p>
        <div className="mt-3 flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-7 gap-1.5 px-2 text-xs">
            <MessageSquare className="size-3" />
            Reply
          </Button>
          <Button variant="ghost" size="sm" className="h-7 gap-1.5 px-2 text-xs">
            <Star className="size-3" />
            <span className="tabular-nums">3</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function CalendarEventCard() {
  return (
    <Card className="w-full rounded-xl">
      <CardContent className="flex gap-4 p-6">
        <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10">
          <span className="text-[10px] font-medium uppercase tracking-wide text-primary">Jun</span>
          <span className="text-base font-semibold leading-none tabular-nums">18</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">Design review</p>
          <p className="mt-0.5 text-xs tabular-nums text-muted-foreground">2:00 – 3:00 PM · Zoom</p>
          <div className="mt-2.5 flex -space-x-1.5">
            {['AL', 'AT', 'GH'].map((initials) => (
              <Avatar key={initials} className="size-5 border-2 border-background">
                <AvatarFallback className="text-[9px]">{initials}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2 p-6 pt-0">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 transition-transform active:scale-[0.96]"
        >
          Decline
        </Button>
        <Button size="sm" className="flex-1 transition-transform active:scale-[0.96]">
          Join
        </Button>
      </CardFooter>
    </Card>
  );
}

export function TeamMembersCard() {
  const members = [
    { name: 'Ada Lovelace', initials: 'AL', role: 'Owner' },
    { name: 'Alan Turing', initials: 'AT', role: 'Admin' },
    { name: 'Grace Hopper', initials: 'GH', role: 'Member' },
  ];

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-4">
        <CardTitle className="text-sm font-medium">Members</CardTitle>
        <Users className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1 p-6 pt-0">
        {members.map((member) => (
          <div
            key={member.name}
            className="-mx-2 flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-muted/50"
          >
            <Avatar className="size-7">
              <AvatarFallback className="text-[10px]">{member.initials}</AvatarFallback>
            </Avatar>
            <span className="min-w-0 flex-1 truncate text-sm">{member.name}</span>
            <span className="text-xs text-muted-foreground">{member.role}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function InviteMemberCard() {
  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-base">Invite teammates</CardTitle>
        <CardDescription>They&apos;ll get an email invitation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 p-6 pt-0">
        <div className="flex gap-2">
          <Input placeholder="ada@acme.com" aria-label="Email address" />
          <Select defaultValue="member">
            <SelectTrigger className="w-28 shrink-0" aria-label="Role">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full transition-transform active:scale-[0.96]">
          <UserPlus className="size-3.5" />
          Send invite
        </Button>
      </CardFooter>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/*  States & feedback                                                         */
/* -------------------------------------------------------------------------- */

export function EmptyStateCard() {
  return (
    <Card className="w-full rounded-xl">
      <CardContent className="flex flex-col items-center p-8 text-center">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <RiInboxFill className="size-5" />
        </div>
        <p className="mt-3 text-base font-medium">No projects yet</p>
        <p className="mt-1 max-w-[26ch] text-sm leading-relaxed text-muted-foreground">
          Create your first project to start shipping.
        </p>
        <Button size="sm" className="mt-4 transition-transform active:scale-[0.96]">
          <Plus className="size-3.5" />
          New project
        </Button>
      </CardContent>
    </Card>
  );
}

export function ErrorStateCard() {
  return (
    <Card className="w-full rounded-xl">
      <CardContent className="flex flex-col items-center p-8 text-center">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <RiErrorWarningFill className="size-5" />
        </div>
        <p className="mt-3 text-base font-medium">Couldn&apos;t load your data</p>
        <p className="mt-1 max-w-[28ch] text-sm leading-relaxed text-muted-foreground">
          The request timed out after 30 seconds.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="group/retry mt-4 transition-transform active:scale-[0.96]"
        >
          <RefreshCw className="size-3.5 transition-transform duration-300 group-hover/retry:rotate-90" />
          Try again
        </Button>
      </CardContent>
    </Card>
  );
}

export function SuccessCard() {
  return (
    <Card className="w-full rounded-xl">
      <CardContent className="flex flex-col items-center p-8 text-center">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <RiCheckboxCircleFill className="size-5" />
        </div>
        <p className="mt-3 text-base font-medium">Payment successful</p>
        <p className="mt-1 max-w-[28ch] text-sm leading-relaxed text-muted-foreground">
          We emailed a receipt to ada@example.com.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4 transition-transform active:scale-[0.96]"
        >
          View receipt
        </Button>
      </CardContent>
    </Card>
  );
}

export function LoadingSkeletonCard() {
  return (
    <Card className="w-full rounded-xl">
      <CardContent className="space-y-3 p-6">
        <div className="flex items-center gap-3">
          <div className="size-9 shrink-0 rounded-full bg-muted motion-safe:animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-2/3 rounded bg-muted motion-safe:animate-pulse" />
            <div className="h-3 w-1/3 rounded bg-muted motion-safe:animate-pulse" />
          </div>
        </div>
        <div className="space-y-2 pt-1">
          <div className="h-3 w-full rounded bg-muted motion-safe:animate-pulse" />
          <div className="h-3 w-5/6 rounded bg-muted motion-safe:animate-pulse" />
          <div className="h-3 w-4/6 rounded bg-muted motion-safe:animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}

export function DangerZoneCard() {
  const [confirm, setConfirm] = useState('');

  return (
    <Card className="w-full rounded-xl border-destructive/30">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-base">Delete project</CardTitle>
        <CardDescription className="text-xs leading-relaxed">
          This permanently removes the project and all of its data.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <Label htmlFor="danger-confirm">
          Type <span className="font-mono text-foreground">acme-api</span> to confirm
        </Label>
        <Input
          id="danger-confirm"
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
          className="mt-1.5"
          placeholder="acme-api"
        />
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          variant="destructive"
          disabled={confirm !== 'acme-api'}
          className="w-full transition-transform active:scale-[0.96]"
        >
          <Trash2 className="size-3.5" />
          Delete permanently
        </Button>
      </CardFooter>
    </Card>
  );
}

export function CookieConsentCard() {
  return (
    <Card className="w-full rounded-xl">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <IconCookieFilled className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">We use cookies</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Analytics cookies help us understand how the product is used.
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 transition-transform active:scale-[0.96]"
          >
            Reject
          </Button>
          <Button size="sm" className="flex-1 transition-transform active:scale-[0.96]">
            Accept all
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function ChangelogCard() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) {
    return (
      <Card className="w-full rounded-xl">
        <CardContent className="flex items-center justify-center p-8">
          <Button variant="ghost" size="sm" onClick={() => setDismissed(false)}>
            Show announcement
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full rounded-xl">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-3">
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="size-2.5" />
            New
          </Badge>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss announcement"
            className="-m-1 rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-3.5" />
          </button>
        </div>
        <p className="mt-2.5 text-sm font-medium">Instant rollbacks</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Revert any deployment to a previous build in one click.
        </p>
        <button
          type="button"
          className="group/link mt-3 flex items-center gap-1 text-xs font-medium underline-offset-4 hover:underline"
        >
          Read the changelog
          <ArrowUpRight className="size-3 transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </button>
      </CardContent>
    </Card>
  );
}

export function FeedbackCard() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-base">How did we do?</CardTitle>
        <CardDescription>Your feedback shapes the roadmap.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 p-6 pt-0">
        <div className="flex gap-1" onMouseLeave={() => setHovered(0)}>
          {[1, 2, 3, 4, 5].map((star) => {
            const active = (hovered || rating) >= star;
            return (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                aria-label={`Rate ${star} out of 5`}
                className="rounded p-1 transition-transform duration-150 hover:scale-110 active:scale-95"
              >
                <Star
                  className={`size-4 transition-colors duration-150 ${
                    active ? 'fill-primary text-primary' : 'text-muted-foreground/40'
                  }`}
                />
              </button>
            );
          })}
        </div>
        <textarea
          rows={3}
          placeholder="Tell us more (optional)"
          className="w-full resize-none rounded-md border bg-background px-3 py-2 text-sm outline-hidden transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
        />
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full transition-transform active:scale-[0.96]">Send feedback</Button>
      </CardFooter>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/*  Content & profile                                                         */
/* -------------------------------------------------------------------------- */

export function ProfileCard() {
  return (
    <Card className="w-full overflow-hidden rounded-xl">
      <div
        aria-hidden
        className="h-16 bg-linear-to-r from-primary/25 via-primary/10 to-transparent"
      />
      <CardContent className="p-6 pt-0">
        <div className="flex items-end justify-between">
          <Avatar className="-mt-6 size-12 ring-4 ring-card">
            <AvatarFallback className="text-xs">AL</AvatarFallback>
          </Avatar>
          <Badge variant="secondary">Pro</Badge>
        </div>
        <div className="mt-3 min-w-0">
          <p className="truncate text-base font-semibold leading-none tracking-tight">
            Ada Lovelace
          </p>
          <p className="mt-1.5 truncate text-sm text-muted-foreground">Product engineer · London</p>
        </div>
        <div className="mt-4 flex items-center gap-6 border-t pt-4">
          {[
            { label: 'Projects', value: '24' },
            { label: 'Followers', value: '1.2k' },
            { label: 'Following', value: '318' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-sm font-medium tabular-nums">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="gap-2 p-6 pt-0">
        <Button size="sm" className="flex-1 transition-transform active:scale-[0.96]">
          Follow
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 transition-transform active:scale-[0.96]"
        >
          Message
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ProductCard() {
  return (
    <Card className="group/product w-full overflow-hidden rounded-xl">
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.18),transparent_65%)]"
        />
        <div className="flex size-full items-center justify-center transition-transform duration-300 ease-out group-hover/product:scale-[1.04]">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-background/80 shadow-xs ring-1 ring-black/10 backdrop-blur-sm dark:ring-white/10">
            <Package className="size-6 text-muted-foreground" strokeWidth={1.5} />
          </div>
        </div>
        <Badge variant="secondary" className="absolute left-3 top-3">
          New
        </Badge>
      </div>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Series 8 watch</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Brushed titanium</p>
          </div>
          <span className="shrink-0 text-sm font-medium tabular-nums">$249</span>
        </div>
        <Button size="sm" className="mt-4 w-full transition-transform active:scale-[0.96]">
          Add to cart
        </Button>
      </CardContent>
    </Card>
  );
}

export function BlogPostCard() {
  return (
    <Card className="group/post w-full rounded-xl">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Engineering</span>
          <span>·</span>
          <span className="tabular-nums">6 min read</span>
        </div>
        <p className="mt-2 text-base font-semibold leading-snug tracking-tight">
          How we cut cold starts by 80% with edge caching
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          A practical walkthrough of the caching layer we built and the trade-offs we accepted.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <Avatar className="size-5">
            <AvatarFallback className="text-[9px]">AT</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">Alan Turing · Jun 12</span>
          <ArrowUpRight className="ml-auto size-3.5 text-muted-foreground transition-transform duration-150 group-hover/post:translate-x-0.5 group-hover/post:-translate-y-0.5" />
        </div>
      </CardContent>
    </Card>
  );
}

export function TestimonialCard() {
  return (
    <Card className="relative w-full rounded-xl">
      <RiDoubleQuotesR aria-hidden className="absolute right-6 top-6 size-8 text-primary/10" />
      <CardContent className="p-6">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="size-3.5 fill-primary text-primary" />
          ))}
        </div>
        <p className="mt-3 text-sm leading-relaxed">
          &ldquo;We replaced three internal tools with this in a single afternoon. The defaults are
          genuinely good.&rdquo;
        </p>
        <div className="mt-4 flex items-center gap-2.5">
          <Avatar className="size-8">
            <AvatarFallback className="text-[10px]">GH</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Grace Hopper</p>
            <p className="truncate text-xs text-muted-foreground">CTO, Compiler Inc.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function NotificationsCard() {
  const items = [
    { title: 'Deploy finished', meta: 'production · 2m ago', unread: true },
    { title: 'New comment on #412', meta: 'Alan Turing · 1h ago', unread: true },
    { title: 'Weekly report ready', meta: 'analytics · 5h ago', unread: false },
  ];

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-3">
        <CardTitle className="text-sm font-medium">Notifications</CardTitle>
        <Badge variant="secondary" className="tabular-nums">
          2 new
        </Badge>
      </CardHeader>
      <CardContent className="space-y-0.5 p-6 pt-0">
        {items.map((item) => (
          <div
            key={item.title}
            className="-mx-2 flex items-start gap-2.5 rounded-md px-2 py-2 transition-colors hover:bg-muted/50"
          >
            <span
              className={`mt-1.5 size-1.5 shrink-0 rounded-full ${
                item.unread ? 'bg-primary' : 'bg-transparent'
              }`}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm">{item.title}</p>
              <p className="truncate text-xs text-muted-foreground">{item.meta}</p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button variant="ghost" size="sm" className="w-full text-xs">
          <Bell className="size-3.5" />
          Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
}

export function FileUploadCard() {
  const [dragging, setDragging] = useState(false);

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-base">Upload files</CardTitle>
        <CardDescription>PNG, JPG or PDF up to 10 MB.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
          }}
          className={`flex flex-col items-center rounded-lg border border-dashed p-6 text-center transition-colors duration-150 ${
            dragging
              ? 'border-primary/60 bg-primary/10'
              : 'hover:border-primary/40 hover:bg-primary/5'
          }`}
        >
          <RiUploadCloud2Fill className="size-5 text-primary" />
          <p className="mt-2 text-xs text-muted-foreground">
            Drag and drop, or{' '}
            <span className="text-foreground underline underline-offset-4">browse</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function FileListCard() {
  const files = [
    { name: 'design-spec.pdf', size: '2.4 MB', progress: 100 },
    { name: 'brand-assets.zip', size: '18 MB', progress: 62 },
  ];

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-base">Files</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-6 pt-0">
        {files.map((file) => (
          <div key={file.name} className="group/file space-y-1.5">
            <div className="flex items-center gap-2.5">
              <FileText className="size-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1 truncate text-sm">{file.name}</span>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {file.size}
              </span>
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                className="-m-1 shrink-0 rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover/file:opacity-100 focus-visible:opacity-100"
              >
                <X className="size-3.5" />
              </button>
            </div>
            {file.progress < 100 && <Progress value={file.progress} className="h-1" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function AIChatCard() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'user', text: 'Summarise last week’s errors.' },
    {
      role: 'assistant',
      text: 'Three services logged errors. Webhooks accounted for 82% of them.',
    },
  ]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((current) => [...current, { role: 'user', text }]);
    setInput('');
  };

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0 p-6 pb-3">
        <span className="flex size-6 items-center justify-center rounded-full bg-linear-to-br from-primary to-primary/60 text-primary-foreground">
          <RiSparkling2Fill className="size-3.5" />
        </span>
        <CardTitle className="text-sm font-medium">Assistant</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 p-6 pt-0">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
              message.role === 'user'
                ? 'ml-auto bg-primary text-primary-foreground'
                : 'bg-muted text-foreground'
            }`}
          >
            {message.text}
          </div>
        ))}
        <div className="flex w-fit items-center gap-1 rounded-lg bg-muted px-3 py-2.5">
          <span className="size-1 rounded-full bg-muted-foreground/60 motion-safe:animate-pulse" />
          <span className="size-1 rounded-full bg-muted-foreground/60 motion-safe:animate-pulse [animation-delay:160ms]" />
          <span className="size-1 rounded-full bg-muted-foreground/60 motion-safe:animate-pulse [animation-delay:320ms]" />
        </div>
      </CardContent>
      <CardFooter className="gap-2 p-6 pt-0">
        <Input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              send();
            }
          }}
          placeholder="Ask anything…"
          aria-label="Message"
        />
        <Button
          size="sm"
          onClick={send}
          disabled={!input.trim()}
          aria-label="Send message"
          className="shrink-0 transition-transform active:scale-[0.96]"
        >
          <Send className="size-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/*  Gallery                                                                   */
/* -------------------------------------------------------------------------- */

const CARD_SECTIONS: { title: string; cards: { name: string; component: () => JSX.Element }[] }[] =
  [
    {
      title: 'Authentication',
      cards: [
        { name: 'LoginCard', component: LoginCard },
        { name: 'SignUpCard', component: SignUpCard },
        { name: 'ForgotPasswordCard', component: ForgotPasswordCard },
        { name: 'TwoFactorCard', component: TwoFactorCard },
        { name: 'MagicLinkCard', component: MagicLinkCard },
        { name: 'SessionsCard', component: SessionsCard },
      ],
    },
    {
      title: 'Billing & commerce',
      cards: [
        { name: 'PricingCard', component: PricingCard },
        { name: 'CheckoutCard', component: CheckoutCard },
        { name: 'PaymentMethodCard', component: PaymentMethodCard },
        { name: 'InvoiceCard', component: InvoiceCard },
        { name: 'OrderSummaryCard', component: OrderSummaryCard },
        { name: 'UsageQuotaCard', component: UsageQuotaCard },
        { name: 'SubscriptionCard', component: SubscriptionCard },
      ],
    },
    {
      title: 'Data & analytics',
      cards: [
        { name: 'StatCard', component: StatCard },
        { name: 'RevenueChartCard', component: RevenueChartCard },
        { name: 'GoalProgressCard', component: GoalProgressCard },
        { name: 'AnalyticsSummaryCard', component: AnalyticsSummaryCard },
        { name: 'StorageUsageCard', component: StorageUsageCard },
        { name: 'LeaderboardCard', component: LeaderboardCard },
      ],
    },
    {
      title: 'Developer tooling',
      cards: [
        { name: 'ApiKeyCard', component: ApiKeyCard },
        { name: 'DeploymentCard', component: DeploymentCard },
        { name: 'ServiceHealthCard', component: ServiceHealthCard },
        { name: 'IntegrationCard', component: IntegrationCard },
        { name: 'EnvVarsCard', component: EnvVarsCard },
        { name: 'WebhookCard', component: WebhookCard },
        { name: 'CommitCard', component: CommitCard },
      ],
    },
    {
      title: 'Work & team',
      cards: [
        { name: 'TaskListCard', component: TaskListCard },
        { name: 'KanbanTaskCard', component: KanbanTaskCard },
        { name: 'OnboardingChecklistCard', component: OnboardingChecklistCard },
        { name: 'ActivityFeedCard', component: ActivityFeedCard },
        { name: 'CommentCard', component: CommentCard },
        { name: 'CalendarEventCard', component: CalendarEventCard },
        { name: 'TeamMembersCard', component: TeamMembersCard },
        { name: 'InviteMemberCard', component: InviteMemberCard },
      ],
    },
    {
      title: 'States & feedback',
      cards: [
        { name: 'EmptyStateCard', component: EmptyStateCard },
        { name: 'ErrorStateCard', component: ErrorStateCard },
        { name: 'SuccessCard', component: SuccessCard },
        { name: 'LoadingSkeletonCard', component: LoadingSkeletonCard },
        { name: 'DangerZoneCard', component: DangerZoneCard },
        { name: 'CookieConsentCard', component: CookieConsentCard },
        { name: 'ChangelogCard', component: ChangelogCard },
        { name: 'FeedbackCard', component: FeedbackCard },
      ],
    },
    {
      title: 'Content & profile',
      cards: [
        { name: 'ProfileCard', component: ProfileCard },
        { name: 'ProductCard', component: ProductCard },
        { name: 'BlogPostCard', component: BlogPostCard },
        { name: 'TestimonialCard', component: TestimonialCard },
        { name: 'NotificationsCard', component: NotificationsCard },
        { name: 'FileUploadCard', component: FileUploadCard },
        { name: 'FileListCard', component: FileListCard },
        { name: 'AIChatCard', component: AIChatCard },
      ],
    },
  ];

export default function CardCollection() {
  return (
    <CardCustomizer>
      <div className="space-y-14">
        {CARD_SECTIONS.map((section) => (
          <section key={section.title}>
            <div className="mb-5 flex items-center gap-2.5">
              <span
                aria-hidden
                className="h-[9px] w-[9px] shrink-0 border-l-2 border-t-2 border-[#f9452d] dark:border-[#E1F435]"
              />
              <h3 className="font-mono text-xs font-medium uppercase leading-[16.8px] text-neutral-900 dark:text-neutral-100">
                {section.title}
              </h3>
              <span className="h-px flex-1 bg-border" />
              <span className="font-mono text-xs tabular-nums text-muted-foreground/70">
                {String(section.cards.length).padStart(2, '0')}
              </span>
            </div>
            <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2">
              {section.cards.map(({ name, component: CardComponent }) => (
                <div
                  key={name}
                  className="group relative transition-transform duration-200 ease-out hover:-translate-y-0.5"
                >
                  <CardComponent />
                  <div className="absolute right-2 top-2 opacity-0 transition-opacity duration-150 focus-within:opacity-100 group-hover:opacity-100">
                    <Copy content={CARD_SOURCE[name] ?? ''} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </CardCustomizer>
  );
}
