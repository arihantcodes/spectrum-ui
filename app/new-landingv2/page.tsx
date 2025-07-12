
import { Icons } from '@/components/icon';
import { NumberTicker } from '@/components/magicui/number-ticker';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from "next/image";

const LandingPage = () => {
    // const [star, setStar] = useState(0);
    //   const fetchGithubData = () => {
    //     axios
    //       .get('https://api.github.com/repos/arihantcodes/spectrum-ui')
    //       .then((response) => {
    //         const star = response.data.stargazers_count;
    //         setStar(star);
    //       })
    //       .catch((error) => {});
    //   };
    
    //   useEffect(() => {
    //     fetchGithubData();
    //   }, []);
  return (
    <>
    <section className="relative min-h-screen w-full bg-black text-white overflow-auto">
      {/* Background image */}
      <Image
        src="/landingPageBg.png" 
        alt="Landing Background"
        fill
        className="object-cover opacity-20 z-0"
        priority
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-start items-center h-full">
        {/* Navbar */}
        <div className="h-[10vh] flex justify-center items-center gap-[3vh] mt-[1vh]">
            <div className="h-[60%] flex justify-center items-center border-2 border-gray-800 rounded-l-3xl pr-[1vh] pl-[1.5vh] py-[1vh]">
              <img
              src="/spectrumLogo.svg"
              alt="Spectrum Logo"
              className="h-[20px]"
              />
            </div>

            <div className="h-[60%] flex justify-center items-center gap-[4vh] text-sm font-medium text-white pl-[4vh] pr-[0.7vh] border-2 border-gray-800 rounded-l-lg rounded-r-3xl">
                <p className="cursor-pointer">Docs</p>
                <p className="cursor-pointer">Block</p>
                <p className="cursor-pointer">Colors</p>
                <p className="cursor-pointer">Pricing</p>
                <button 
                  style={{
                    background: 'linear-gradient(90deg, #FFFFFF 39.42%, #2388FF 100%)',
                  }}
                  className="text-black flex justify-center items-center px-[2.5vh] py-[1vh] rounded-3xl">
                  Book a Call
                </button>
            </div>
        </div>

        {/* Hero */}
        <div className="h-[50vh] flex flex-col justify-start items-center gap-[4vh] mt-[12vh]">
            <p className='text-6xl font-bold bg-[linear-gradient(90deg,_#FFFFFF_34.13%,_#2388FF_77.88%)] bg-clip-text text-transparent'>Premium UI Blocks</p>
            <p className='text-6xl font-bold bg-[linear-gradient(90deg,_#FFFFFF_34.13%,_#2388FF_77.88%)] bg-clip-text text-transparent'>For SaaS & Startups</p>

            <div className='flex justify-center items-center gap-[5vh] mt-[5vh]'>
                <button
                 style={{
                    background: 'linear-gradient(90deg, #FFFFFF 39.42%, #2388FF 100%)',
                  }}
                 className='text-black flex justify-center items-center px-[3vh] py-[1.25vh] rounded-3xl'
                 >
                 Explore Components
                </button>
                <button className='flex bg-[rgba(38,38,38,0.6)] px-[3vh] py-[1.25vh] rounded-3xl'>
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

        {/*React3D Logo */}
        <img src="/react3dLogo.jpg" alt="React3d Logo" className='h-32 mt-[10vh]' />
      </div>
    </section>

    </>
  );
};

export default LandingPage;
