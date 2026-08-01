'use client';

import { motion } from 'framer-motion';
import { Play, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

const mainTestimonial = {
  quote: 'Using Spectrum UI made our design process much smoother.',
  author: 'Danielle M.',
  role: 'Senior UI Designer',
  videoThumbnail: '/test1.jpg',
  videoUrl: '/placeholder-video.mp4',
};

const testimonials = [
  {
    id: 1,
    quote: 'With Spectrum UI, we built a clean dashboard in just a few hours.',
    author: 'Alex B.',
    role: 'Product Manager',
    avatar: '/headshot/Lummi Doodle 02.png',
    rating: 5,
  },
  {
    id: 2,
    quote:
      "I've used Spectrum UI in 5 client projects so far. It’s super consistent and saves a lot of time during development.",
    author: 'Jasmine R.',
    role: 'Frontend Developer',
    avatar: '/headshot/Rectangle-1.png',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'From first drafts to final product, Spectrum UI made everything easier. It just works well out of the box.',
    author: 'Leo D.',
    role: 'Startup Founder',
    avatar: '/headshot/Lummi Doodle 06.png',
    rating: 5,
  },
  {
    id: 4,
    quote:
      'The components are clean, the docs are simple to follow, and the support from the community is great.',
    author: 'Marta C.',
    role: 'UI/UX Designer',
    avatar: '/headshot/Lummi Doodle 09.png',
    rating: 5,
  },
];

export default function Testimonial() {
  const cardWidth = 320;
  const gap = 24;
  const totalWidth = testimonials.length * (cardWidth + gap);

  return (
    <div className="max-w-full px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
      <div className=" bg-neutral-100 dark:bg-neutral-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-10 lg:p-16 shadow-xs">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-start mb-8 sm:mb-10 lg:mb-12">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
              Real stories. Real results.
            </h1>
          </div>
          <div>
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Developers, designers, and teams trust Spectrum UI to build beautiful interfaces
              faster.
            </p>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row justify-between gap-4 sm:gap-6">
          <div className="grid md:grid-cols-2 bg-white dark:bg-neutral-800  rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-16">
            <div className="flex flex-col relative group cursor-pointer">
              <Image
                alt="Video Thumbnail"
                className="w-full  rounded-lg cursor-pointer object-cover border border-neutral-200"
                height={200}
                width={200}
                src={mainTestimonial.videoThumbnail}
              />

              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
                <div className="bg-black/80 backdrop-blur-xs rounded-full px-2 sm:px-4 py-1.5 sm:py-2 flex items-center space-x-1.5 sm:space-x-2 text-white">
                  <Play className="w-3 h-3 sm:w-4 sm:h-4 fill-white" />
                  <span className="font-medium text-xs sm:text-sm">Watch Video</span>
                </div>
              </div>
            </div>

            <div className="space-y-5 flex flex-col justify-between">
              <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-full text-sm font-medium w-fit">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Design System Success</span>
              </div>
              <div>
                <blockquote className="font-medium text-base sm:text-lg text-neutral-900 dark:text-neutral-100">
                  “{mainTestimonial.quote}”
                </blockquote>
                <div className="space-y-1">
                  <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">
                    {mainTestimonial.author}
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    {mainTestimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden mt-8 sm:mt-10">
          <motion.div
            className="flex space-x-4 sm:space-x-6"
            animate={{ x: [-totalWidth, 0] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30,
                ease: 'linear',
              },
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="shrink-0 w-64 sm:w-72 md:w-80 bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4 border-0 shadow-xs min-h-[180px] sm:min-h-[200px]">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 sm:w-4 sm:h-4 fill-green-500 text-green-500"
                      />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed min-h-12 sm:min-h-16">
                    “{testimonial.quote}”
                  </p>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Image
                      width={20}
                      height={20}
                      loading="lazy"
                      src={testimonial.avatar || '/placeholder.svg'}
                      alt={testimonial.author}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-neutral-200 dark:border-neutral-600"
                    />
                    <div>
                      <p className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
