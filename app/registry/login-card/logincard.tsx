'use client';

import { useState } from 'react';
import { motion, easeOut } from 'framer-motion';
import { MoveRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
  };

  return (
    <div className=" w-full min-h-screen">
      <div className="relative min-h-screen z-10 flex items-center justify-center p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-[#3F3F3F] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl "
          >
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h1 className="text-3xl font-light text-gray-900 dark:text-white mb-2">
                Welcome back
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Sign in to your account</p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Please enter your Email"
                  className="w-full bg-gray-100 dark:bg-[#1B1B1B] border border-gray-300 dark:border-white/20 rounded-full px-6 py-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-hidden focus:border-gray-500 dark:focus:border-white/40 transition-colors"
                />
                <motion.button className="absolute right-2 top-1/2 -translate-y-1/2 bg-linear-to-r from-neutral-200 to-neutral-300 rounded-full p-3 transition-colors">
                  <MoveRight className="w-4 h-4 text-black" />
                </motion.button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center mb-6">
              <div className="flex-1 h-px bg-linear-to-r from-transparent via-gray-300 dark:via-white/20 to-transparent" />
              <span className="px-4 text-gray-500 dark:text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-linear-to-r from-transparent via-gray-300 dark:via-white/20 to-transparent" />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4 mb-6">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full bg-gray-100 dark:bg-[#1B1B1B] border border-gray-300 dark:border-white/20 rounded-full px-6 py-4 text-gray-900 dark:text-white flex items-center justify-between hover:bg-gray-200 dark:hover:bg-black/60 transition-colors group"
              >
                <div className="flex items-center">
                  <div className="w-5 h-5 mr-3">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <span>Continue with Twitter</span>
                </div>
                <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full bg-gray-100 dark:bg-[#1B1B1B] border border-gray-300 dark:border-white/20 rounded-full px-6 py-4 text-gray-900 dark:text-white flex items-center justify-between hover:bg-gray-200 dark:hover:bg-black/60 transition-colors group"
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                    fill="currentColor"
                    className="w-5 h-5 mr-3"
                  >
                    <path d="M25.565,9.785c-0.123,0.077-3.051,1.702-3.051,5.305c0.138,4.109,3.695,5.55,3.756,5.55 c-0.061,0.077-0.537,1.963-1.947,3.94C23.204,26.283,21.962,28,20.076,28c-1.794,0-2.438-1.135-4.508-1.135 c-2.223,0-2.852,1.135-4.554,1.135c-1.886,0-3.22-1.809-4.4-3.496c-1.533-2.208-2.836-5.673-2.882-9 c-0.031-1.763,0.307-3.496,1.165-4.968c1.211-2.055,3.373-3.45,5.734-3.496c1.809-0.061,3.419,1.242,4.523,1.242 c1.058,0,3.036-1.242,5.274-1.242C21.394,7.041,23.97,7.332,25.565,9.785z M15.001,6.688c-0.322-1.61,0.567-3.22,1.395-4.247 c1.058-1.242,2.729-2.085,4.17-2.085c0.092,1.61-0.491,3.189-1.533,4.339C18.098,5.937,16.488,6.872,15.001,6.688z" />
                  </svg>
                  <span>Continue with Apple</span>
                </div>
                <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Don&apos;t have an account? 
                <motion.a
                  href="#"
                  className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors underline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                   Sign up
                </motion.a>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
