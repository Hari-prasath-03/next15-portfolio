export const dynamic = "force-dynamic";

import Particles from "@/motion/Particles";
import Reveal from "@/motion/Reveal";
import Heading from "@/components/ui/Heading";
import TechstacksTabs from "@/components/layouts/TechstacksTabs";

import Link from "next/link";
import { apiUrl } from "../api/lib/base-url";

type AboutData = {
  name: string;
  role: string;
  description: string;
  contents: string[];
};

export default async function Home() {
  const data: AboutData = await fetch(apiUrl("/about")).then((res) =>
    res.json()
  );

  return (
    <div className="flex flex-col justify-center max-w-[1378px] mx-auto pl-10 pr-8 sm:px-10">
      <Hero {...data} />
      <AboutSection {...data} />
    </div>
  );
}

const Hero: React.FC<Omit<AboutData, "contents">> = ({
  name,
  role,
  description,
}) => {
  return (
    <section className="min-h-screen flex w-full items-center relative">
      <div className="absolute inset-0">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={220}
          particleSpread={10}
          speed={0.15}
          particleBaseSize={100}
          alphaParticles={false}
          disableRotation={false}
          moveParticlesOnHover
        />
      </div>
      <div className="max-w-3xl ml-10 md:ml-46 space-y-4">
        <Reveal>
          <h1 className="text-3xl sm:text-6xl lg:text-8xl font-extrabold tracking-tighter">
            Hi, I&apos;m {name}
            <span className="text-primary">.</span>
          </h1>
        </Reveal>
        <Reveal>
          <h2 className="text-2xl lg:text-4xl">
            I&apos;m a
            <span className="text-primary font-semibold"> {role}</span>
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-xl lg:max-w-2xl">
            {description}
          </p>
        </Reveal>
        <Reveal>
          <Link href="/contact">
            <button className="bg-primary/90 cursor-pointer hover:bg-primary px-6 py-2.5 rounded-lg font-semibold transition">
              Contact Me
            </button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

const AboutSection: React.FC<Pick<AboutData, "contents">> = ({ contents }) => {
  return (
    <section className="min-h-screen flex flex-col sm:flex-row gap-10 w-full items-center relative pb-10">
      <div className="max-w-3xl ml-10 md:ml-46 space-y-3">
        <Heading title="About me" />

        {contents.map((para, i) => (
          <Reveal key={i}>
            <p className="text-sm sm:text-base text-text/90 max-w-xl lg:max-w-xl">
              {para}
            </p>
          </Reveal>
        ))}
      </div>

      <TechstacksTabs />
    </section>
  );
};
