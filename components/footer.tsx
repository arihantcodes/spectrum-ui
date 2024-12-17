"use client";
import Link from "next/link";

import { Icons } from "./icon";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className=" py-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <Icons.logo className="icon-class w-2" />
              <h2 className="text-lg font-bold">Spectrum UI</h2>
            </Link>

            <h1 className="dark:text-gray-300 mt-4">
              Build by{" "}
              <span className="dark:text-[#039ee4]">
                <Link href="https://x.com/arihantCodes">@Arihantjain</Link>
              </span>
            </h1>
            <div className="mt-2">
            <Link  href="https://x.com/compose/tweet?text=I%27ve%20been%20using%20%23SpectrumUI%20 share%20yourtought%20%40arihantCodes%20">
              <Button variant='secondary'>
                Share Your Thoughts On
                <Icons.twitter className="icon-class ml-1 w-3.5 " />
              </Button>
            </Link>
            </div>
            <p className="text-sm dark:text-gray-400 mt-5">
              © {new Date().getFullYear()} Spectrum UI. All rights reserved.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Pages</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs" className="hover:text-gray-300">
                    Docs
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-gray-300">
                    Components
                  </Link>
                </li>
                <li>
                  <Link href="/examples" className="hover:text-gray-300">
                    Examples
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-gray-300">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="https://blog.arihant.us/" className="hover:text-gray-300">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Socials</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="https://github.com/arihantcodes/spectrum-ui" className="hover:text-gray-300">
                    Github
                  </Link>
                </li>
                <li>
                  <Link href="https://www.linkedin.com/in/arihantcodes" className="hover:text-gray-300">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="https://x.com/arihantcodes" className="hover:text-gray-300">
                    X
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="hover:text-gray-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/tos" className="hover:text-gray-300">
                    Terms of Service
                  </Link>
                </li>
              
              </ul>
            </div>
          </div>
        </div>
        <div className=" w-full flex mt-4 items-center justify-center   ">
          <h1 className="text-center text-3xl md:text-5xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 to-neutral-900 select-none">
            SPECTRUM UI
          </h1>
        </div>
      
      </div>
    </footer>
  );
}
