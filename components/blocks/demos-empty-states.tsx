'use client';

import { AccessEmpty } from '@/components/spectrumui/blocks/empty-states/access-empty';
import { ActivityEmpty } from '@/components/spectrumui/blocks/empty-states/activity-empty';
import { ApiKeyEmpty } from '@/components/spectrumui/blocks/empty-states/api-key-empty';
import { BoardEmpty } from '@/components/spectrumui/blocks/empty-states/board-empty';
import { CartEmpty } from '@/components/spectrumui/blocks/empty-states/cart-empty';
import { ChartEmpty } from '@/components/spectrumui/blocks/empty-states/chart-empty';
import { ErrorEmpty } from '@/components/spectrumui/blocks/empty-states/error-empty';
import { FilterEmpty } from '@/components/spectrumui/blocks/empty-states/filter-empty';
import { InboxEmpty } from '@/components/spectrumui/blocks/empty-states/inbox-empty';
import { IntegrationEmpty } from '@/components/spectrumui/blocks/empty-states/integration-empty';
import { InviteEmpty } from '@/components/spectrumui/blocks/empty-states/invite-empty';
import { LockedEmpty } from '@/components/spectrumui/blocks/empty-states/locked-empty';
import { MaintenanceEmpty } from '@/components/spectrumui/blocks/empty-states/maintenance-empty';
import { NotFoundEmpty } from '@/components/spectrumui/blocks/empty-states/not-found-empty';
import { NotificationEmpty } from '@/components/spectrumui/blocks/empty-states/notification-empty';
import { OfflineEmpty } from '@/components/spectrumui/blocks/empty-states/offline-empty';
import { ProjectEmpty } from '@/components/spectrumui/blocks/empty-states/project-empty';
import { QuotaEmpty } from '@/components/spectrumui/blocks/empty-states/quota-empty';
import { SavedEmpty } from '@/components/spectrumui/blocks/empty-states/saved-empty';
import { ScheduleEmpty } from '@/components/spectrumui/blocks/empty-states/schedule-empty';
import { SearchEmpty } from '@/components/spectrumui/blocks/empty-states/search-empty';
import { TableEmpty } from '@/components/spectrumui/blocks/empty-states/table-empty';
import { TrashEmpty } from '@/components/spectrumui/blocks/empty-states/trash-empty';
import { UploadEmpty } from '@/components/spectrumui/blocks/empty-states/upload-empty';
import { WebhookEmpty } from '@/components/spectrumui/blocks/empty-states/webhook-empty';

/**
 * The empty-state demos, keyed by block slug.
 *
 * Each one is keyed by its variant too: switching a pill remounts the block, so
 * the entrance replays and any state the reader built up (added rows, dropped
 * filters, a sent invite) resets with it. That is the behaviour you want on a
 * specimen page — every variant should look the way it looks on first paint.
 */
export const EMPTY_STATE_DEMOS: Record<string, (variant: string) => React.ReactNode> = {
  'project-empty': (variant) => (
    <ProjectEmpty key={variant} variant={variant as 'Templates' | 'Checklist' | 'Minimal'} />
  ),
  'invite-empty': (variant) => (
    <InviteEmpty key={variant} variant={variant as 'Invite' | 'Link' | 'Sent'} />
  ),
  'integration-empty': (variant) => (
    <IntegrationEmpty key={variant} variant={variant as 'Catalog' | 'Featured' | 'Minimal'} />
  ),
  'upload-empty': (variant) => (
    <UploadEmpty key={variant} variant={variant as 'Dropzone' | 'Compact' | 'Uploading'} />
  ),
  'api-key-empty': (variant) => (
    <ApiKeyEmpty key={variant} variant={variant as 'Default' | 'Created' | 'Compact'} />
  ),
  'webhook-empty': (variant) => (
    <WebhookEmpty key={variant} variant={variant as 'Listening' | 'Received'} />
  ),
  'search-empty': (variant) => (
    <SearchEmpty key={variant} variant={variant as 'Suggestions' | 'Scoped' | 'Minimal'} />
  ),
  'filter-empty': (variant) => (
    <FilterEmpty key={variant} variant={variant as 'Chips' | 'Summary'} />
  ),
  'table-empty': (variant) => (
    <TableEmpty key={variant} variant={variant as 'Overlay' | 'Inline' | 'Loading'} />
  ),
  'chart-empty': (variant) => <ChartEmpty key={variant} variant={variant as 'Bars' | 'Line'} />,
  'activity-empty': (variant) => (
    <ActivityEmpty key={variant} variant={variant as 'Timeline' | 'Compact'} />
  ),
  'inbox-empty': (variant) => (
    <InboxEmpty key={variant} variant={variant as 'Cleared' | 'Snoozed' | 'Minimal'} />
  ),
  'notification-empty': (variant) => (
    <NotificationEmpty key={variant} variant={variant as 'Default' | 'Quiet hours'} />
  ),
  'trash-empty': (variant) => (
    <TrashEmpty key={variant} variant={variant as 'Default' | 'Retention'} />
  ),
  'schedule-empty': (variant) => (
    <ScheduleEmpty key={variant} variant={variant as 'Day' | 'Week' | 'Minimal'} />
  ),
  'saved-empty': (variant) => <SavedEmpty key={variant} variant={variant as 'Teach' | 'Minimal'} />,
  'cart-empty': (variant) => <CartEmpty key={variant} variant={variant as 'Recent' | 'Minimal'} />,
  'board-empty': (variant) => <BoardEmpty key={variant} variant={variant as 'Board' | 'Column'} />,
  'offline-empty': (variant) => (
    <OfflineEmpty key={variant} variant={variant as 'Offline' | 'Reconnecting' | 'Restored'} />
  ),
  'error-empty': (variant) => (
    <ErrorEmpty key={variant} variant={variant as 'Error' | 'Details' | 'Recovered'} />
  ),
  'not-found-empty': (variant) => (
    <NotFoundEmpty key={variant} variant={variant as 'Search' | 'Links'} />
  ),
  'access-empty': (variant) => (
    <AccessEmpty key={variant} variant={variant as 'Request' | 'Requested' | 'Admin'} />
  ),
  'quota-empty': (variant) => (
    <QuotaEmpty key={variant} variant={variant as 'Reached' | 'Approaching'} />
  ),
  'locked-empty': (variant) => (
    <LockedEmpty key={variant} variant={variant as 'Locked' | 'Trial'} />
  ),
  'maintenance-empty': (variant) => (
    <MaintenanceEmpty key={variant} variant={variant as 'In progress' | 'Scheduled' | 'Done'} />
  ),
};
