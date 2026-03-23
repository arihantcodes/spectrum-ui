"use client";
import React from "react";
import Link from "next/link";
import { useI18n } from "./i18n-provider";
import { Button } from "./ui/button";

const Cta = () => {
  const { t } = useI18n();
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] py-5 mt-4 lg:mt-8 px-4">

      {/* <div className="inline-flex items-center gap-2 bg-accent/10 border 
        border-accent/20 text-accent-text text-xs font-medium px-3 py-1.5 
        rounded-full mb-6">
        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
        Spectrum Pro — Early Access
      </div> */}

      <h1 className="text-center font-bold text-2xl md:text-5xl mb-4 leading-[1.1] tracking-tight text-foreground max-w-2xl min-h-[2.2em] md:min-h-[2em] flex flex-col justify-center gap-0">
        <span className="block">{t('CTA.title1')}</span>
        <span className="block">
          {t('CTA.title2')}
          <span className="text-gradient">
            {t('CTA.title2Pro')}
          </span>
        </span>
      </h1>

      <p className="text-[#666] text-base mb-8 text-center max-w-md min-h-[3em]">
        {t('CTA.description')}
      </p>

      <div className="flex items-center gap-3">
        <Link href="https://ui.spectrumhq.in/pro">
          <Button className="rounded-3xl px-6 text-sm font-medium">
            {t('CTA.button')}
          </Button>
        </Link>
      </div>

    </div>
  );
};

export default Cta;