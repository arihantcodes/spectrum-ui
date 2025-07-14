
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

      
      
    </section>

    
    </>
  );
};

export default LandingPage;
