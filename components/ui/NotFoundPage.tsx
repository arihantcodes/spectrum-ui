'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { 
    opacity: 0,
    y: 30
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.43, 0.13, 0.23, 0.96],
      delayChildren: 0.1,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const numberVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction * 40,
    y: 15,
    rotate: direction * 5
  }),
  visible: {
    opacity: 0.7,
    x: 0,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const ghostVariants = {
  hidden: { 
    scale: 0.8,
    opacity: 0,
    y: 15,
    rotate: -5
  },
  visible: { 
    scale: 1,
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  hover: {
    scale: 1.1,
    y: -10,
    rotate: [0, -5, 5, -5, 0],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      rotate: {
        duration: 2,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  },
  floating: {
    y: [-5, 5],
    transition: {
      y: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  }
};

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black px-4">
      <AnimatePresence mode="wait">
        <motion.div 
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-8 md:mb-12">
            <motion.span 
              className="text-[80px] md:text-[120px] font-bold text-[#222222] dark:text-neutral-100 opacity-70 font-signika select-none"
              variants={numberVariants}
              custom={-1}
            >
              4
            </motion.span>
            <motion.div
              variants={ghostVariants}
              whileHover="hover"
              animate={["visible", "floating"]}
            >
               <motion.span 
              className="text-[80px] md:text-[120px] font-bold text-[#222222] dark:text-neutral-100 opacity-70 font-signika select-none"
              variants={numberVariants}
              custom={-1}
            >
              0
            </motion.span>
            </motion.div>
            <motion.span 
              className="text-[80px] md:text-[120px] font-bold text-[#222222]  dark:text-neutral-200 opacity-70 font-signika select-none"
              variants={numberVariants}
              custom={1}
            >
              4
            </motion.span>
          </div>
          
          <motion.h1 
            className="text-3xl md:text-5xl font-bold text-[#222222] dark:text-neutral-200 mb-4 md:mb-6 opacity-70 font-dm-sans select-none"
            variants={itemVariants}
          >
            Boo! Page missing!
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-[#222222]  dark:text-neutral-600 mb-8 md:mb-12 opacity-50 font-dm-sans select-none"
            variants={itemVariants}
          >
            Whoops! This page must be a ghost - it&apos;s not here!
          </motion.p>

          <motion.div 
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              transition: {
                duration: 0.3,
                ease: [0.43, 0.13, 0.23, 0.96]
              }
            }}
          >
            <Link 
              href="/"
              className="inline-block bg-[#222222] text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-[#000000] transition-colors font-dm-sans select-none"
            >
              Back to Home
            </Link>
          </motion.div>

         
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
