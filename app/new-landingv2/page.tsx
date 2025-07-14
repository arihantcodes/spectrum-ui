
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

        {/* HERO */}
        <div className="h-[50vh] flex flex-col justify-start items-center md:gap-[4vh] gap-[3vh] mt-[12vh]">
            <p className='lg:text-7xl md:text-6xl text-4xl font-semibold font-regular bg-[linear-gradient(90deg,_#FFFFFF_34.13%,_#2388FF_77.88%)] bg-clip-text text-transparent'>Premium UI Blocks</p>
            <p className='lg:text-7xl md:text-6xl text-4xl font-semibold font-regular bg-[linear-gradient(90deg,_#FFFFFF_34.13%,_#2388FF_77.88%)] bg-clip-text text-transparent'>For SaaS & Startups</p>

            <div className='flex md:flex-row flex-col justify-center items-center lg:gap-[5vh] gap-[3vh] lg:mt-[5vh] mt-[3vh]'>
                <button
                 style={{
                    background: 'linear-gradient(90deg, #FFFFFF 39.42%, #2388FF 100%)',
                  }}
                 className='text-black text-base flex justify-center items-center lg:px-[3vh] lg:py-[1.25vh] px-[2vh] py-[1vh] font-inter font-semibold rounded-3xl'
                 >
                 Explore Components
                </button>
                <button className='flex bg-[rgba(38,38,38,0.6)] text-sm lg:px-[3vh] lg:py-[1.45vh] px-[2vh] py-[1vh] font-regular font-medium rounded-3xl'>
                  <div className="flex items-center">
                    <Icons.gitHub className="size-4" />
    
                    <span className="ml-1 ">Star on GitHub</span>
                  </div>
                  <div className="ml-1 flex items-center gap-1 text-sm md:flex">
                    🌟 660
                  </div>
                </button>
            </div>
        </div>

        {/*React3d logo */}
        <img src="/react3dLogo.jpg" alt="React3d Logo" className='md:h-32 h-24 mt-[10vh]' />
      </div>
    </section>

    {/*CODE SECTION */}
    <div className='hidden h-[130vh] w-full bg-black xl:flex justify-center items-start pt-[10vh] px-[10vh]'>
        <NewCodeSection />
    </div>

    
    </>
  );
};

export default LandingPage;
