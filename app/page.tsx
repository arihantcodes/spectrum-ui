"use client";

import Image from "next/image";
import Link from "next/link";
import Spline from "@splinetool/react-spline/next";

import { Cover } from "@/components/UI/Cover";

import { Button } from "@/components/UI/Button";
import CardCollection from "@/components/SpectrumUI/Cards";
import { CardsDemo } from "@/components/Cards/CardsDemo";
import { Fomo } from "@/components/FomoButton";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/Icon";
import { NumberTicker } from "@/components/MagicUI/NumberTicker";
import axios from "axios";
import { useEffect, useState } from "react";

const Homepage = () => {
  const [star, setStar] = useState(0);
  const fetchGithubData = () => {
    axios
      .get("https://api.github.com/repos/arihantcodes/spectrum-ui")
      .then((response) => {
        const star = response.data.stargazers_count;
        setStar(star);
      })
      .catch((error) => {
        console.error("Error fetching GitHub data:", error);
      });
  };

  useEffect(() => {
    fetchGithubData();
  }, []);
  return (
    <>
      {/* <Homepage /> */}
      <div className="flex justify-center min-h-[60vh] container-wrapper">
        <div className=" py-5 flex flex-col items-center justify-center">
          <Fomo />
          <h1 className="text-center text-2xl font-bold  mt-4 md:mt-12 md:text-5xl lg:text-6xl">
            Instant UI Components <br /> Just{" "}
            <Cover>
              <span className="dark:text-neutral-100">
                Copy, Paste &amp; Done
              </span>
            </Cover>
          </h1>
          <p className="text-center text-sm md:text-lg mt-4 md:mt-8 text-neutral-500 dark:text-neutral-500 max-w-2xl">
            250+ free and open-source animated components and effects built with
            Next Js, Typescript, Tailwind CSS, and Motion.Perfect companion for
            shadcn/ui.
          </p>
          <h1 className="mt-6 text-center text-lg md:text-2xl font-bold text-gray-400">
            Built With
          </h1>
          <div className="my-4 flex items-center justify-center gap-5  md:ml-8">
            <Image
              src="./nextjs.svg"
              height={40}
              width={90}
              className="w-[50px] md:w-[90px]"
              alt="next js"
            />
            <Image
              src="./shadcn.svg"
              height={40}
              width={140}
              className="w-[90px] md:w-[140px]"
              alt="shadcn ui"
            />
            <Image
              src="./tailwind.svg"
              height={40}
              width={120}
              className="w-[80px] md:w-[120px]"
              alt="tailwind css"
            />
            <Image
              src="./aceternity.svg"
              height={40}
              width={160}
              className="w-[90px] md:w-[160px]"
              alt="acternity ui"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-5">
            <Link href="/docs/installation" className="w-full sm:w-auto">
              <Button size="lg" className="rounded-xl w-full sm:w-auto px-8">
                Explore Components
              </Button>
            </Link>

            <div className="w-full sm:w-auto">
              <Link target="_blank" href={siteConfig.links.github}>
                <Button
                  variant="secondary"
                  className="rounded-xl w-full sm:w-auto px-8 h-11"
                >
                  <div className="flex items-center">
                    <Icons.gitHub className="size-4" />

                    <span className="ml-1 ">Star on GitHub</span>
                  </div>
                  <div className="ml-1 flex items-center gap-1 text-sm md:flex">
                    🌟
                    <NumberTicker value={star} className="font-display" />
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-wrapper mt-20">
        <div className="container py-6">
          <section className="overflow-hidden rounded-lg border bg-background shadow-md md:hidden md:shadow-xl">
            <Image
              src="/examples/cards-light.png"
              width={1280}
              height={1214}
              alt="Cards"
              className="block dark:hidden"
            />
            <Image
              src="/examples/cards-dark.png"
              width={1280}
              height={1214}
              alt="Cards"
              className="hidden dark:block"
            />
          </section>
          <section
            className="hidden md:block [&>div]:p-0"
            style={
              {
                "--radius": "1rem",
              } as React.CSSProperties
            }
          >
            <CardCollection />
          </section>
        </div>
      </div>
    </>
  );
};

export default Homepage;
