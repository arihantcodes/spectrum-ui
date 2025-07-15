
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";
import Image from "next/image";

export default function TestimonialSection() {
  const testimonials = [
    {
      text: "In times of card loss, the bank’s immediate support has proven reliable and reassuring, demonstrating a commitment to customer satisfaction and security.",
      name: "Emily Johnson",
      role: "Founder",
      company: "Ava Ventures",
      avatar: "/testimonialAvatars/emily.png",
    },
    {
      text: "The security standards in my account dealings have impressed me. I feel secure at all times, and that’s highly valuable to me.",
      name: "Chloe Williams",
      role: "Founder",
      company: "Radiant Dynamics",
      avatar: "/testimonialAvatars/chloe.png",
    },
    {
      text: "The diverse investment options offered by the bank have added a valuable layer to my financial portfolio, providing flexibility and strategic choices.",
      name: "Sophia Brown",
      role: "CEO",
      company: "Stellar Innovations",
      avatar: "/testimonialAvatars/sophia.png",
    },
    {
      text: "The bank’s swift services and user-friendly app have truly enhanced my financial experience; I am highly satisfied with the seamless and quick transactions.",
      name: "Grace Taylor",
      role: "CEO",
      company: "Williams Innovations",
      avatar: "/testimonialAvatars/grace.png",
    },
    {
      text: "Responsive customer service that goes above and beyond, providing a reassuring and helpful experience every step of the way.",
      name: "Ava Davis",
      role: "CEO",
      company: "Catalyst Innovations",
      avatar: "/testimonialAvatars/ava.png",
    },
    {
      text: "The credit application’s swift approval showcased the bank’s promptness; I extend my appreciation for the quick response and efficient service provided.",
      name: "Henry Carter",
      role: "Founder",
      company: "QuantumLeap",
      avatar: "/testimonialAvatars/henry.png",
    },
    {
      text: "Grateful for the app’s efficiency, enabling me to swiftly manage financial tasks; a heartfelt thank you for the seamless transaction experience.",
      name: "Olivia Smith",
      role: "CEO",
      company: "Brown Dynamics",
      avatar: "/testimonialAvatars/olivia.png",
    },
    {
      text: "The extensive network of your branches ensures accessibility and convenience at all times; it’s excellent and truly dependable for my needs.",
      name: "Liam Thompson",
      role: "Co-Founder",
      company: "Fusion Horizons",
      avatar: "/testimonialAvatars/liam.png",
    },
    {
      text: "The bank’s reasonable fees have become a crucial factor in my financial decisions, making it a preferred choice among other financial institutions.",
      name: "James Foster",
      role: "CEO",
      company: "Elysium International",
      avatar: "/testimonialAvatars/james.png",
    },
  ];
  
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.09
      }
    }
  };

const card = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: easeOut
          } 
        },
  };

  return (
    <section className="py-20 px-4 flex flex-col items-center">
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="flex justify-center flex-wrap gap-5 w-full max-w-6xl">

        {/* Cards */}
        {testimonials.map((testimonial, i) => (
          <motion.div key={i} variants={card}
          className="w-full md:w-[48%] lg:w-[30%] bg-neutral-900 p-6 rounded-xl flex flex-col justify-between gap-4">
            <p className="md:text-lg text-base text-neutral-100 font-inter font-normal">{testimonial.text}</p>
            <div className="flex items-center gap-4 mt-[2vh]">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={56}
                height={56}
                className="rounded-full"
              />
              <div className="md:text-lg text-base">
                <p className="font-inter font-medium">{testimonial.name}</p>
                <p className="text-sm text-neutral-300 font-inter font-normal">
                  {testimonial.role} <span className="text-[rgba(11,182,255,1)] font-inter font-normal">@{testimonial.company}</span>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <button
       className="text-sm mt-8 px-20 py-2 rounded-full font-inter font-medium bg-white text-black">
        Learn More
      </button>
    </section>
  );
}
