
'use client';
import { Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { motion } from "framer-motion";
import { Icons } from '@/components/icon';
import { ShinyCardGroup } from '@/components/shiny-cards';
import { NumberTicker } from '@/components/magicui/number-ticker';
import axios from 'axios';
import { useEffect, useState } from 'react';
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
  const [star, setStar] = useState(0);
  const fetchGithubData = () => {
    axios
      .get('https://api.github.com/repos/arihantcodes/spectrum-ui')
      .then((response) => {
        const star = response.data.stargazers_count;
        setStar(star);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    fetchGithubData();
  }, []);
  return (
    <>
    <section className="relative min-h-screen w-full bg-black text-white overflow-visible">

      {/* Top-right glow */}
      <div className='absolute -top-[276px] -left-[5]  h-[798px] w-[270px] bg-[linear-gradient(86.58deg,_#FFFFFF_33.38%,_transparent_83.2%)] z-10 lg:rotate-[115deg] rotate-[150deg] opacity-[25%] blur-[100px] diagonal-slide-in'>
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
            <motion.p
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1}}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
              className='lg:text-7xl md:text-6xl text-4xl font-semibold font-regular bg-[linear-gradient(90deg,_#FFFFFF_34.13%,_#2388FF_77.88%)] bg-clip-text text-transparent'>Premium UI Blocks

            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut", delay: 0.1
              }}
              className='lg:text-7xl md:text-6xl text-4xl font-semibold font-regular bg-[linear-gradient(90deg,_#FFFFFF_34.13%,_#2388FF_77.88%)] bg-clip-text text-transparent'>For SaaS & Startups

            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
              duration: 0.6,
              ease: "easeOut", delay: 0.2}}
              className='flex md:flex-row flex-col justify-center items-center lg:gap-[5vh] gap-[3vh] lg:mt-[5vh] mt-[3vh]'>
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
                    🌟 
                    <NumberTicker value={star} className="font-display" />
                  </div>
                </button>
            </motion.div>
        </div>

        {/*React3d logo */}
        <motion.img src="/react3dLogo.png" alt="React3d Logo" className='md:h-31 h-24 mt-[10vh]'variants={{
          idle: { rotate: 0 },
          spinning: {
            rotate: 360,
            transition: {
              repeat: Infinity,
              duration: 2,
              ease: "linear",
              },
            },
          }}
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          whileHover="spinning" />
      </div>
    </section>

    {/*CODE SECTION */}
    <div className='hidden h-[130vh] w-full bg-black lg:flex justify-center items-start pt-[10vh] px-[10vh] overflow-hidden' style={{ perspective: "1000px" }}>
        <NewCodeSection />
    </div>

    {/* FEATURE SECTION */}
    <div className='lg:min-h-[100vh] min-h-[85vh] w-full bg-black overflow-auto overflow-x-hidden pt-[15vh] lg:pt-[5vh] pb-[15vh]' style={{ perspective: "1000px" }}>
        <Link href={siteConfig.links.twitter} className="flex justify-center items-center mb-12">
          <div className="px-8 rounded-2xl text-center mt-4 font-semibold font-regular lg:text-5xl md:text-4xl text-3xl mb-8 bg-[linear-gradient(90deg,_#FFFFFF_34.13%,_#2388FF_77.88%)] bg-clip-text text-transparent">
            Feature Your Product on Spectrum UI
          </div>
        </Link>

        <motion.div 
          initial={{ rotateX: -50, opacity: 0 }}
          whileInView={{ rotateX: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full flex justify-center items-center" 
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}>

          <ShinyCardGroup className="grid h-full w-full max-w-4xl grid-cols-2 gap-6 mx-auto group">
            <PricingCard color={Color.White} className="col-span-2 md:col-span-1">
              <FreeCardHighlight className="absolute top-0 right-0 pointer-events-none" />
  
              <PricingCardHeader
                title="💜 Support Spectrum UI"
                description="Support Spectrum UI and get early access + your name on the wall."
                className="bg-gradient-to-tr from-transparent to-[#ffffff]/10 "
                color={Color.White}
              />
              <Separator />
  
              <PricingCardContent>
                <Cost dollar="$20" />
                <PricingButton
                  productId="656c8573-32fe-4433-a0d9-ddd45ae267c6"
                  label="Become a Supporter"
                />
                <Bullets>
                  <li>
                    <Bullet
                      Icon={Check}
                      label="Show your support for Spectrum UI"
                      color={Color.White}
                    />
                  </li>
  
                  <li>
                    <Bullet
                      Icon={Check}
                      label="Get your name listed on our Supporter Wall"
                      color={Color.White}
                    />
                  </li>
                  <li>
                    {' '}
                    <Bullet
                      Icon={Check}
                      label="Priority access to new components & updates"
                      color={Color.White}
                    />
                  </li>
                  <li>
                    <Bullet Icon={Check} label="Warm fuzzy feeling ❤️" color={Color.White} />
                  </li>
                </Bullets>
              </PricingCardContent>
            </PricingCard>
            <PricingCard color={Color.Yellow} className="col-span-2 md:col-span-1 animate-slideUpScale">
              <ProCardHighlight className="absolute top-0 right-0 pointer-events-none" />
  
              <PricingCardHeader
                title="Golden Banner Promotion"
                description="Promote your product at the top of every page "
                className="bg-gradient-to-tr from-black/50 to-[#FFD600]/10 "
                color={Color.Yellow}
              />
              <Separator />
  
              <PricingCardContent>
                <Cost dollar="$199" />
                <PricingButton
                  productId="f0a5e414-d0aa-4f1c-9822-ce9e24f00faf"
                  label="Book the Banner Slot"
                />
                <Bullets>
                  <li>
                    <Bullet Icon={Check} label="Banner on all pages" color={Color.Yellow} />
                  </li>
  
                  <li>
                    <Bullet Icon={Check} label="Custom link + message" color={Color.Yellow} />
                  </li>
                  <li>
                    <Bullet Icon={Check} label="3 slots only" color={Color.Yellow} />
                  </li>
                  <li>
                    <Bullet Icon={Check} label="Seen by 10,000+ devs/month" color={Color.Yellow} />
                  </li>
                </Bullets>
              </PricingCardContent>
            </PricingCard>
          </ShinyCardGroup>
      </motion.div>
    </div>

    {/* TESTIMONIAL SECTION */}
    <div className='min-h-[100vh] w-full bg-black overflow-auto flex flex-col justify-start items-center lg:pt-[15vh] md:pt-[10vh] pt-[15vh]'>
        <motion.p 
          
          className='lg:text-5xl md:text-4xl text-3xl font-inter font-normal text-white'>What people who work
        </motion.p>
        <motion.p 
          
          className='lg:text-5xl md:text-4xl text-3xl font-inter font-normal bg-[linear-gradient(90deg,_#FFFFFF_34.13%,_#2388FF_77.88%)] bg-clip-text text-transparent'>with us think about us?
        </motion.p>

        <TestimonialSection />
    </div>

    {/* CTA SECTION */}
    <div className='lg:h-[50vh] h-[30vh] bg-black flex flex-col justify-start items-center pt-[9vh]'>
        <p className='lg:text-5xl text-4xl font-inter font-normal text-white'>Your Product</p>
        <p className='lg:text-5xl text-4xl font-inter font-normal bg-[linear-gradient(90deg,_#FFFFFF_34.13%,_#2388FF_77.88%)] bg-clip-text text-transparent'>Deserves a better UI</p>
        <button
         style={{
            background: 'linear-gradient(90deg, #FFFFFF 39.42%, #2388FF 100%)',
          }}
         className='text-black text-sm flex justify-center items-center lg:px-[3vh] lg:py-[1.25vh] px-[2vh] py-[1vh] font-inter font-semibold rounded-3xl lg:mt-[5vh] mt-[3vh]'
         >
         Let’s work together →
        </button>
    </div>

    {/* BACKGROUND SPECTRUM UI TEXT */}
    <div className='lg:h-[35vh] h-[15vh] flex flex-col justify-end items-center bg-black relative z-0'>
        <motion.p 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='text-[clamp(2rem,12vw,200px)] font-bold text-neutral-800'>SPECTRUM UI
        </motion.p>
    </div>

    {/* FOOTER SECTION */}
    <div className='lg:h-[55vh] h-[40vh] w-full flex justify-center items-center bg-black lg:-mt-[14.5vh] -mt-[1vh] relative'>
      <NewFooter />
    </div>
    </>
  );
};

export default LandingPage;
