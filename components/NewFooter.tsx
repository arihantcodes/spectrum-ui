import Image from "next/image";

export default function NewFooter(){

    return(
        <>
        {/* Drop shadow effect */}
        <div
          className="absolute inset-0 z-0"
          style={{
          background: "radial-gradient(ellipse 35% 35% at 50% 0%, rgba(82, 82, 82, 0.25), transparent 70%), #000000",
          }}
        />
        
        {/* Footer */}
        <div className='relative z-10 h-full w-[90%] flex md:flex-row flex-col justify-start items-center xl:p-[10vh] md:p-[2vh] xl:gap-[40vh] md:gap-[10vh] gap-[7vh]' style={{
          borderTop: '2px solid',
          borderImageSource: 'linear-gradient(89.85deg, rgba(255, 255, 255, 0.2) 6.22%, rgba(102, 102, 102, 0.4) 106.35%)',
          borderImageSlice: 1,
          }}>
          <div className='md:h-[70%] h-[50%] flex flex-col md:justify-start justify-end items-center md:gap-[2vh] gap-[1vh]'>
              <div className='flex justify-center items-center gap-[1vh]'>
                  <img src="/footerAssets/spectrumFooter.png" alt="SPECTRUM-LOGO" className='h-6' />
                  <p className='text-xs text-white font-regular font-bold'>Spectrum UI</p>
              </div>
              <p className='text-xs text-[rgba(209,213,219,1)] font-regular font-normal'>Build by <span className='text-[rgba(11,182,255,1)] font-regular font-normal'>@Arihantjain</span></p>
              <div className='flex justify-center items-center gap-[1.5vh]'>
                  <img src="/footerAssets/twitter.png" alt="Twitter" className='md:h-8 h-5' />
                  <img src="/footerAssets/discord.png" alt="Discord" className='md:h-8 h-5'/>
                  <img src="/footerAssets/linkedin.png" alt="LinkedIn" className='md:h-8 h-5' />
                  <img src="/footerAssets/github.png" alt="Github" className='md:h-8 h-5' />
              </div>
          </div>
  
          <div className='md:h-[70%] h-[50%] flex justify-around items-start lg:mt-[8vh] md:mt-[5vh] mt-0 xl:gap-[18vh] md:gap-[5vh] gap-[2vh]'>
            <div className='flex flex-col justify-start items-center md:gap-[2vh] gap-[1vh]'>
                <p className='text-xs text-[rgba(252,253,255,0.937)] font-inter font-normal '>Documentation</p>
                <p className='text-xs text-[rgba(241,247,254,0.71)] font-inter font-normal'>Getting Started</p>
                <p className='text-xs text-[rgba(241,247,254,0.71)] font-inter font-normal'>Block</p>
                <p className='text-xs text-[rgba(241,247,254,0.71)] font-inter font-normal'>Colors</p>
            </div>
    
            <div className='flex flex-col justify-start items-center md:gap-[2vh] gap-[1vh]'>
                <p className='text-xs text-[rgba(252,253,255,0.937)] font-inter font-normal '>Social</p>
                <p className='text-xs text-[rgba(241,247,254,0.71)] font-inter font-normal'>Github</p>
                <p className='text-xs text-[rgba(241,247,254,0.71)] font-inter font-normal'>LinkedIn</p>
                <p className='text-xs text-[rgba(241,247,254,0.71)] font-inter font-normal'>Twitter (X)</p>
            </div>
    
            <div className='flex flex-col justify-start items-center md:gap-[2vh] gap-[1vh]'>
                <p className='text-xs text-[rgba(252,253,255,0.937)] font-inter font-normal '>Legal</p>
                <p className='text-xs text-[rgba(241,247,254,0.71)] font-inter font-normal'>Acceptable Use</p>
                <p className='text-xs text-[rgba(241,247,254,0.71)] font-inter font-normal'>Privacy Policy</p>
                <p className='text-xs text-[rgba(241,247,254,0.71)] font-inter font-normal'>Terms of Service</p>
            </div>
          </div>
  
        </div>
      </>
    )
};
