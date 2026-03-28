import type { CSSProperties } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
const HomeCardCollection = dynamic(() => import('@/components/homecard'), {
  ssr: true,
  loading: () => <div className="animate-pulse h-[800px] w-full bg-neutral-100 dark:bg-neutral-900 rounded-lg"></div>
});
import { HeroSection } from './home';
import { PromoBanner } from '@/components/promo-banner';


const Homepage = () => {
  return (
    <>
      {/* Pro Banner */}
      <PromoBanner />

      <div className="container-wrapper">

      <HeroSection />
    </div>

      <div className="container-wrapper">
        <div className="container py-6">
          <section className="overflow-hidden  rounded-lg border bg-background shadow-md md:hidden md:shadow-xl">
            <Image
              src="/cards-light.png"
              width={1280}
              height={1214}
              alt="Cards"
              className="block dark:hidden"
              priority={true}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            <Image
              src="/cards-dark.png"
              width={1280}
              height={1214}
              alt="Cards"
              className="hidden dark:block"
              priority={true}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </section>
       
          <section
            className="hidden md:block  [&>div]:p-0 "
            style={{
              '--radius': '1rem',
            } as CSSProperties}
          >
            <div className="flex flex-col justify-center items-center my-12">
              <div className="px-8 rounded-2xl text-center">
                <h2 className="font-bold text-2xl md:text-4xl mb-4 tracking-tight text-neutral-900 dark:text-white">
                  Ready-to-Use UI Blocks
                </h2>
              </div>
            </div>

            <HomeCardCollection />
          </section>
        </div>
      </div>
    </>
  );
};

export default Homepage;
