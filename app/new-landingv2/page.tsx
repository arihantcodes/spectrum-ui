
import Image from "next/image";

const LandingPage = () => {
  return (
    <section className="relative h-screen w-full bg-black text-white overflow-hidden">
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
        <div className="h-[10vh] flex justify-center items-center gap-[3vh]">
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
      </div>
    </section>
  );
};

export default LandingPage;
