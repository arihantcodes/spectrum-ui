'use client';

import * as React from 'react';

/** The platform never changes under us, so there is nothing to subscribe to. */
const subscribe = () => () => {};
const getSnapshot = () => /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
/** The server has no user agent; ⌘ is the better guess to paint first. */
const getServerSnapshot = () => true;

/** Drives whether shortcut chips read ⌘ or Ctrl. */
export function useIsApplePlatform() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
