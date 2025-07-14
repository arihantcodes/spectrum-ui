
'use client';
import { Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Icons } from '@/components/icon';
import { ShinyCardGroup } from '@/components/shiny-cards';
import {
  Bullet,
  Bullets,
  PricingButton,
  Color,
  Cost,
  FreeCardHighlight,
  PricingCard,
  PricingCardContent,
  PricingCardHeader,
  ProCardHighlight,
  Separator,
} from '@/components/pricing';
import TestimonialSection from '@/components/TestimonialSection';
import NewCodeSection from '@/components/NewCodeSection';
import NewFooter from '@/components/NewFooter';

const LandingPage = () => {
  return (
    <>
    <section className="relative min-h-screen w-full bg-black text-white overflow-visible">

      {/* Top-right glow */}
      <div className='absolute -top-[216px] -left-[5]  h-[798px] w-[270px] bg-[linear-gradient(86.58deg,_#FFFFFF_33.38%,_transparent_83.2%)] z-10 lg:rotate-[115deg] rotate-[150deg] opacity-[25%] blur-[100px]'>
      </div>

      {/* Background image */}
      <Image
        src="/landingPageBg.png" 
        alt="Landing Background"
        fill
        className="object-cover opacity-20 z-0"
        priority
      />

      <div className="relative z-10 flex flex-col justify-start items-center h-full">

        {/* NAVBAR */}
        <div className="lg:h-[10vh] h-[9vh] flex justify-center items-center gap-[3vh] mt-[1vh]">
            <div className="h-[60%] flex justify-center items-center border-2 border-gray-800 rounded-l-3xl pr-[1vh] pl-[1.5vh] py-[1vh]">
              <img
              src="/spectrumLogo.svg"
              alt="Spectrum Logo"
              className="h-7"
              />
            </div>

            <div className="hidden h-[60%] md:flex justify-center items-center gap-[4vh] text-sm font-semibold font-inter text-white pl-[4vh] pr-[0.7vh] border-2 border-gray-800 rounded-l-lg rounded-r-3xl">
                <p className="text-base cursor-pointer">Docs</p>
                <p className="text-base cursor-pointer">Block</p>
                <p className="text-base cursor-pointer">Colors</p>
                <p className="text-base cursor-pointer">Pricing</p>
                <button 
                  style={{
                    background: 'linear-gradient(90deg, #FFFFFF 39.42%, #2388FF 100%)',
                  }}
                  className="text-black text-base flex justify-center items-center px-[2.5vh] py-[0.6vh] rounded-3xl">
                  Book a Call
                </button>
            </div>
        </div>

        </div>

        </section>
    </>
  );
};

export default LandingPage;
