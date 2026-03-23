"use client";
import Link from "next/link";

import { useI18n } from "./i18n-provider";
import { Icons } from "./icon";

export default function Footer() {
  const { t, locale, setLocale } = useI18n();
  return (
    <footer className=" py-12 px-4 md:px-6 z-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
              <div className="h-6 w-6 bg-neutral-100 border-neutral-300 border dark:bg-white rounded-md flex items-center justify-center p-1">
                <Icons.logo className="h-5 w-5 text-black " />
              </div>

              <span className=" font-bold lg:inline-block">Spectrum UI</span>
            </Link>

            <h1 className="dark:text-gray-300 mt-4">
              {t('Footer.builtBy')}{" "}
              <span className="dark:text-[#039ee4] gap-2">
                <Link className="underline" href="https://x.com/arihantCodes">@Arihantjain</Link>
                <span>{" & "}</span>
                <Link href="https://linkedin.com/in/itzamanjain" className="underline">
                @itzamanjain
                </Link>
              </span>
            </h1>
           
            <p className="text-sm dark:text-gray-400 mt-5 min-h-[1.5em]">
              © {new Date().getFullYear()} Spectrum UI. {t('Footer.rights')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">{t('Footer.pages')}</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/docs"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    {t('Footer.docs')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blocks"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    {t('Footer.blocks')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/colors"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    {t('Footer.colors')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('Footer.socials')}</h3>
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
              <h3 className="font-semibold mb-4">{t('Footer.legal')}</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    {t('Footer.privacy')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tos"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    {t('Footer.tos')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faqs"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    {t('Footer.faqs')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('Footer.language')}</h3>
              <select 
                value={locale} 
                onChange={(e) => setLocale(e.target.value as any)}
                className="bg-background border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="en">English 🇺🇸</option>
                <option value="es">Español 🇪🇸</option>
                <option value="pt">Português 🇧🇷</option>
                <option value="zh">简体中文 🇨🇳</option>
                <option value="fr">Français 🇫🇷</option>
                <option value="de">Deutsch 德</option>
                <option value="hi">हिन्दी 🇮🇳</option>
                <option value="tr">Türkçe 🇹🇷</option>
              </select>
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
