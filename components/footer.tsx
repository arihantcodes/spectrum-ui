"use client";
import Link from "next/link";

import { Icons } from "./icon";

export default function Footer() {
  return (
    <footer className=" py-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <Icons.logo className="icon-class w-2" />
              <h2 className="text-lg font-bold">Spectrum/UI</h2>
            </Link>
           
            <h1 className="dark:text-gray-300 mt-4">
              Build by <span className="dark:text-[#039ee4]">
                <Link href="https://x.com/arihantCodes">
                
                @Arihantjain
                </Link>

              </span>
            </h1>
            <p className="text-sm dark:text-gray-400 mt-5">
              © {new Date().getFullYear()} Spectrum UI. All rights reserved.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Pages</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/products" className="hover:text-gray-300">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/studio" className="hover:text-gray-300">
                    Studio
                  </Link>
                </li>
                <li>
                  <Link href="/clients" className="hover:text-gray-300">
                    Clients
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-gray-300">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-gray-300">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Socials</h3>
              <ul className="space-y-2">
               
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                  LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                   X
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="hover:text-gray-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-gray-300">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookie-policy" className="hover:text-gray-300">
                    Cookie Policy
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
