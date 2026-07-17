'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import {
  Bug,
  CalendarClock,
  ChartNoAxesColumn,
  Clock,
  Code2,
  FileText,
  Globe,
  Handshake,
  Headphones,
  Kanban,
  LineChart,
  Mail,
  Search,
  Server,
  ShieldCheck,
  UserCheck,
  Workflow,
} from 'lucide-react';

import { cn } from '@/lib/utils';

export interface ActivityItem {
  icon?: React.ReactNode;
  title: string;
  /** Small run-duration chip next to the title, e.g. "15s". */
  duration?: string;
  description: string;
  /** Right-aligned chip, e.g. "15H". Clipped on narrow cards, like the design. */
  timeAgo?: string;
}

export interface RecentActivityProps {
  title?: string;
  titleIcon?: React.ReactNode;
  items?: ActivityItem[];
  className?: string;
}

const DEFAULT_ITEMS: ActivityItem[] = [
  {
    icon: <Mail />,
    title: 'Personalized Email',
    duration: '15s',
    description: 'Personalized Email sent to ••••• @gmail.com',
    timeAgo: '15H',
  },
  {
    icon: <UserCheck />,
    title: 'Peer Review',
    description: 'Reviewed and approved 2 outputs from Content Drafting Agent',
    timeAgo: '30H',
  },
  {
    icon: <FileText />,
    title: 'Content Drafting',
    description: 'Generated draft campaign brief',
    timeAgo: '40M',
  },
  {
    icon: <ShieldCheck />,
    title: 'Admin Approval',
    description: 'Final approval of marketing copy before publishing',
    timeAgo: '20H',
  },
  {
    icon: <ChartNoAxesColumn />,
    title: 'Weekly Campaign Report',
    duration: '2m',
    description: 'Generated campaign performance report',
    timeAgo: '18H',
  },
  {
    icon: <Search />,
    title: 'SEO Audit',
    duration: '5m',
    description: 'Checked 50 web pages for SEO health and compliance',
    timeAgo: '12H',
  },
  {
    icon: <LineChart />,
    title: 'Price Monitoring Agent',
    description: 'Checked competitor prices for top-selling products',
    timeAgo: '25H',
  },
  {
    icon: <Globe />,
    title: 'Research',
    duration: '2m',
    description: 'Searched 25 webpages for industry trends',
    timeAgo: '25S',
  },
  {
    icon: <CalendarClock />,
    title: 'Social Media Manager',
    duration: '25S',
    description: 'Scheduled posts for the next month',
    timeAgo: '10H',
  },
  {
    icon: <Handshake />,
    title: 'Sales Representative',
    duration: '25S',
    description: 'Closed 5 deals with new clients',
    timeAgo: '35H',
  },
  {
    icon: <Headphones />,
    title: 'Customer Support',
    duration: '25S',
    description: 'Resolved 100 support tickets',
    timeAgo: '20H',
  },
  {
    icon: <Bug />,
    title: 'Quality Assurance',
    duration: '25S',
    description: 'Tested 20 features for bugs',
    timeAgo: '15H',
  },
  {
    icon: <Code2 />,
    title: 'Frontend Developer',
    duration: '25S',
    description: 'Implemented 10 new UI components',
    timeAgo: '30H',
  },
  {
    icon: <Server />,
    title: 'Backend Developer',
    duration: '25S',
    description: 'Built 5 new API endpoints',
    timeAgo: '25H',
  },
  {
    icon: <Kanban />,
    title: 'Project Manager',
    duration: '25S',
    description: 'Led the team through 3 project phases',
    timeAgo: '40H',
  },
];

function TimeChip({ value }: { value: string }) {
  return (
    <span className="inline-flex h-5 shrink-0 items-center gap-[3px] rounded-md border border-border bg-white px-[5px] font-inter text-[10px] font-medium leading-none text-neutral-900/80 dark:bg-neutral-900 dark:text-neutral-100/80">
      <Clock className="h-3 w-3 text-neutral-900/50 dark:text-neutral-100/50" />
      {value}
    </span>
  );
}

export function RecentActivity({
  title = 'Recent Activity',
  titleIcon,
  items = DEFAULT_ITEMS,
  className,
}: RecentActivityProps) {
  return (
    <div
      className={cn(
        'w-full rounded-[26px] border-[0.5px] border-neutral-300 bg-[#f2f2f2] p-1.5 font-inter dark:border-neutral-700 dark:bg-neutral-900',
        className,
      )}
    >
      <div className="overflow-hidden rounded-[20px] border-[0.5px] border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-950">
        {/* Header */}
        <div className="flex items-center gap-1.5 border-b border-neutral-200/80 px-[18px] py-[19px] dark:border-neutral-800">
          <span className="flex text-neutral-900/80 dark:text-neutral-100/80 [&_svg]:h-4 [&_svg]:w-4">
            {titleIcon ?? <Workflow />}
          </span>
          <h3 className="text-[16px] font-semibold leading-none tracking-[-0.32px] text-neutral-900/80 dark:text-neutral-100/80">
            {title}
          </h3>
        </div>

        {/* Rows */}
        <div>
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: index * 0.03, ease: 'easeOut' }}
              className={cn(
                'flex h-[41px] items-center px-[18px] transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/50',
                index > 0 && 'border-t border-neutral-200/60 dark:border-neutral-800/60',
              )}
            >
              <div className="flex min-w-0 flex-1 items-center gap-1.5 pr-3 sm:w-[248px] sm:flex-none sm:shrink-0">
                {item.icon ? (
                  <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border border-neutral-200 text-neutral-900/60 dark:border-neutral-800 dark:text-neutral-100/60 [&_svg]:h-3 [&_svg]:w-3">
                    {item.icon}
                  </span>
                ) : null}
                <span className="ml-1 truncate text-xs font-medium tracking-[-0.24px] text-neutral-900/80 dark:text-neutral-100/80">
                  {item.title}
                </span>
                {item.duration ? <TimeChip value={item.duration} /> : null}
              </div>
              <div className="hidden min-w-0 flex-1 items-center gap-3 self-stretch border-l border-neutral-200/60 pl-4 dark:border-neutral-800/60 sm:flex">
                <span className="min-w-0 flex-1 truncate text-xs font-medium tracking-[-0.24px] text-neutral-900/60 dark:text-neutral-100/60">
                  {item.description}
                </span>
                {item.timeAgo ? (
                  <span className="hidden xl:inline-flex">
                    <TimeChip value={item.timeAgo} />
                  </span>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
