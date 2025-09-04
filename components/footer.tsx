"use client";
import Link from "next/link";

import { Icons } from "./icon";

export default function Footer() {
  return (
    <footer className=" py-12 px-4 md:px-6 z-50">
      <div className="container mx-auto">
        <div className="h-[7vh] md:h-[10vh] lg:h-[25vh] w-full flex items-center justify-center -mb-[2.5vh] md:-mb-[3.5vh] lg:-mb-[8vh] relative">
          <h1 className="absolute text-center text-[2.75rem] md:text-8xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 to-neutral-900 select-none z-0">
            SPECTRUM UI
          </h1>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between bg-background relative z-10 py-[7vh] lg:py-[10vh]">
          <div
            className="hidden md:block absolute inset-0 z-0"
            style={{
              backgroundImage: "radial-gradient(ellipse 35% 35% at 50% 0%, rgba(82, 82, 82, 0.25), transparent 70%)",
              backgroundColor: "transparent",
            }}
          />
          
          <div className="mb-8 md:mb-0">
            <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
              <div className="h-6 w-6 bg-neutral-100 border-neutral-300 border dark:bg-white rounded-md flex items-center justify-center p-1">
                <Icons.logo className="h-5 w-5 text-black " />
              </div>

              <span className=" font-bold lg:inline-block">Spectrum UI</span>
            </Link>

            <h1 className="dark:text-gray-300 mt-4">
              Build by{" "}
              <span className="dark:text-[#039ee4] gap-2">
                <Link className="underline" href="https://x.com/arihantCodes">@Arihantjain</Link>
                <span>{" & "}</span>
                <Link href="https://linkedin.com/in/itzamanjain" className="underline">
                @itzamanjain
                </Link>
              </span>
            </h1>
           
            <p className="text-sm dark:text-gray-400 mt-5">
              © {new Date().getFullYear()} Spectrum UI. All rights reserved.
            </p>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-0 lg:gap-8">
            <div>
              <h3 className="font-semibold mb-4 mt-3">Pages</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/docs"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    Docs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blocks"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    Blocks
                  </Link>
                </li>
                <li>
                  <Link
                    href="/colors"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    Colors
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 mt-3">Socials</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://github.com/arihantcodes/spectrum-ui"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    Github
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/in/arihantcodes"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://x.com/arihantcodes"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    X
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 mt-3">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tos"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
