'use client';

import { useState, useMemo } from 'react';
import { Drawer } from 'vaul';
import useMeasure from 'react-use-measure';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import {
  BannedIcon,
  DangerIcon,
  FaceIDIcon,
  LockIcon,
  PassIcon,
  PhraseIcon,
  RecoveryPhraseIcon,
  ShieldIcon,
  WarningIcon,
} from '@/components/demo';
export const AnimatedDrawer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [view, setView] = useState('default');
  const [elementRef, bounds] = useMeasure();

  const content = useMemo(() => {
    switch (view) {
      case 'default':
        return (
          <div className="">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">Wallet Settings</h2>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                onClick={() => setIsOpen(false)}
              >
                <X className="text-neutral-600 dark:text-neutral-400" size="18" />
              </Button>
            </div>

            <div className="mt-6 flex flex-col items-start gap-4">
              <button
                onClick={() => setView('key')}
                className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium flex items-center gap-2 w-full rounded-2xl px-4 py-3.5 transition-colors"
              >
                <LockIcon />
                View Private Key
              </button>
              <button
                onClick={() => setView('pharse')}
                className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium flex items-center gap-2 w-full rounded-2xl px-4 py-3.5 transition-colors"
              >
                <PassIcon />
                View Recovery Phrase
              </button>
              <button
                onClick={() => setView('remove')}
                className="bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-medium flex items-center gap-2 w-full rounded-2xl px-4 py-3.5 transition-colors"
              >
                <WarningIcon />
                Remove Wallet
              </button>
            </div>
          </div>
        );
      case 'remove':
        return (
          <div className="space-y-4">
            <div className="flex justify-between">
              <DangerIcon />
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                onClick={() => setIsOpen(false)}
              >
                <X className="text-neutral-600 dark:text-neutral-400" size="18" />
              </Button>
            </div>
            <h2 className="font-medium text-xl text-neutral-900 dark:text-neutral-100">Remove Wallet?</h2>

            <p className="text-neutral-500 dark:text-neutral-400 font-light text-lg">
              This action cannot be undone. Make sure you&apos;ve backed up your recovery phrase before proceeding. 
              You&apos;ll lose access to all funds if you don&apos;t have a backup.
            </p>
            <div className="flex items-center justify-start gap-4">
              <Button
                onClick={() => setView('default')}
                className="w-36 h-12 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-900 dark:text-neutral-100 rounded-3xl text-lg transition-colors"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setView('default')}
                className="w-36 h-12 bg-red-500 hover:bg-red-600 text-white rounded-3xl text-lg transition-colors"
              >
                Remove
              </Button>
            </div>
          </div>
        );
      case 'pharse':
        return (
          <div className="space-y-4">
            <div className="flex justify-between">
              <RecoveryPhraseIcon />
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                onClick={() => setIsOpen(false)}
              >
                <X className="text-neutral-600 dark:text-neutral-400" size="18" />
              </Button>
            </div>
            <h2 className="font-medium text-xl text-neutral-900 dark:text-neutral-100">Recovery Phrase</h2>
            <p className="text-neutral-500 dark:text-neutral-400 font-light text-lg">
              Your recovery phrase is the master key to your wallet. Write it down and store it securely. 
              Anyone with this phrase can access your funds.
            </p>
            <div className="border-t border-neutral-200 dark:border-neutral-700 space-y-5 text-neutral-500 dark:text-neutral-400 text-lg">
              <div className="flex items-center gap-4 mt-5">
                <ShieldIcon />
                <h3>Store it in a secure location</h3>
              </div>
              <div className="flex items-center gap-4">
                <PhraseIcon />
                <h3>Never share with anyone</h3>
              </div>
              <div className="flex items-center gap-4">
                <BannedIcon />
                <h3>We cannot recover it for you</h3>
              </div>
            </div>
            <div className="flex items-center justify-start gap-4">
              <Button
                onClick={() => setView('default')}
                className="w-36 h-12 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-900 dark:text-neutral-100 rounded-3xl text-lg transition-colors"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setView('default')}
                className="w-42 h-12 bg-sky-400 hover:bg-sky-500 text-white rounded-3xl text-lg flex items-center gap-3 transition-colors"
              >
                <FaceIDIcon />
                Show Phrase
              </Button>
            </div>
          </div>
        );
      case 'key':
        return (
          <div className="space-y-4">
             <div className="flex justify-between">
              <RecoveryPhraseIcon />
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                onClick={() => setIsOpen(false)}
              >
                <X className="text-neutral-600 dark:text-neutral-400" size="18" />
              </Button>
            </div>
            <h2 className="font-medium text-xl text-neutral-900 dark:text-neutral-100">Private Key</h2>
            <p className="text-neutral-500 dark:text-neutral-400 font-light text-lg">
              Your private key is a cryptographic key that proves ownership of your wallet. 
              Treat it with the same security as your bank account details.
            </p>

            <div className="border-t border-neutral-200 dark:border-neutral-700 space-y-5 text-neutral-500 dark:text-neutral-400 text-lg">
              <div className="flex items-center gap-4 mt-5">
                <ShieldIcon />
                <h3>Store it in a secure location</h3>
              </div>
              <div className="flex items-center gap-4">
                <PhraseIcon />
                <h3>Never share with anyone</h3>
              </div>
              <div className="flex items-center gap-4">
                <BannedIcon />
                <h3>We cannot recover it for you</h3>
              </div>
            </div>
            <div className="flex items-center justify-start gap-4">
              <Button
                onClick={() => setView('default')}
                className="w-36 h-12 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-900 dark:text-neutral-100 rounded-3xl text-lg transition-colors"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setView('default')}
                className="w-42 h-12 bg-sky-400 hover:bg-sky-500 text-white rounded-3xl text-lg flex items-center gap-3 transition-colors"
              >
                <FaceIDIcon />
                Show Key
              </Button>
            </div>
          </div>
        );
    }
  }, [view]);

  return (
    <>
      <Button
        className="mt-5 px-6 rounded-full bg-white dark:bg-neutral-800 py-2 font-medium text-black dark:text-white border border-neutral-200 dark:border-neutral-700 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-700 focus-visible:shadow-focus-ring-button md:font-medium"
        onClick={() => setIsOpen(true)}
      >
        Click Me To Open Drawer
      </Button>
      <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" onClick={() => setIsOpen(false)} />
          <Drawer.Content
            asChild
            className="fixed inset-x-4 bottom-4 z-10 mx-auto h-64 max-w-[361px] overflow-hidden rounded-[36px] bg-white dark:bg-neutral-900 outline-none md:mx-auto md:w-full"
          >
            <motion.div animate={{ height: bounds.height }}>
              <div className="p-6" ref={elementRef}>
                {content}
              </div>
            </motion.div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};


