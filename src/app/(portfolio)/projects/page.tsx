export const dynamic = "force-dynamic";

import React from "react";
import Link from "next/link";

import Reveal from "@/motion/Reveal";
import Heading from "@/components/ui/Heading";
import MotionImage from "@/components/ui/MotionImage";

import { ExternalLink, Github } from "lucide-react";

import { TagForTech } from "./[title]/page";
import { apiUrl } from "@/app/api/lib/base-url";

export type ProjectType = {
  image: {
    public_id: string;
    secure_url: string;
  };
  name: string;
  description: string[];
  shortDescription: string;
  techStacks: string[];
  githubLink?: string[];
  liveLink?: string;
};

const Projects = async () => {
  const projects: ProjectType[] = await fetch(apiUrl("/projects")).then((res) =>
    res.json()
  );

  return (
    <section className="min-h-screen max-w-[1378px] mx-auto flex flex-col justify-center relative pt-40 pb-10">
      <div className="max-w-4xl ml-20 mr-6 sm:mr-20 md:ml-36 space-y-3">
        <Heading title="Projects" />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={i} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

const ProjectCard: React.FC<ProjectType> = ({
  image,
  name,
  description,
  techStacks,
  githubLink,
  liveLink,
  shortDescription,
}) => (
  <div className="rounded-lg overflow-hidden shadow-lg transition hover:shadow-xl h-fit border border-white/20">
    <Reveal>
      <div className="w-full h-36 sm:h-48 bg-bg-sec overflow-hidden px-5 pt-8">
        <MotionImage
          src={image.secure_url}
          alt={name}
          width={400}
          height={300}
          initial={{ scale: 1, rotateX: 0, rotateY: 0, rotateZ: 0 }}
          whileHover={{
            scale: 1.05,
            rotateZ: 2,
            rotateX: 15,
            rotateY: -15,
            transition: {
              type: "spring",
              stiffness: 120,
              damping: 10,
            },
          }}
          className="object-cover rounded-t"
        />
      </div>
    </Reveal>

    <div className="p-4">
      <div className="flex items-center justify-between mb-1.5">
        <Reveal>
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
        </Reveal>
        <hr className="flex-1 border-t border-t-white/30 mx-3" />
        <Reveal>
          <div className="flex items-center gap-2">
            {githubLink &&
              githubLink.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={20} />
                </a>
              ))}
            {liveLink && (
              <a href={liveLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="flex flex-wrap gap-2 text-sm mb-3">
          {techStacks.map((tech, i) => (
            <TagForTech key={i} tech={tech} />
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div>
          <p className="text-sm">
            {shortDescription}{" "}
            {(description[0] + " " + description[1]).slice(0, 80) + "... "}
            <Link
              scroll={false}
              href={`/projects/${name.split(" ").join("-")}`}
              className="cursor-pointer text-primary"
            >
              Read more{" >"}
            </Link>
          </p>
        </div>
      </Reveal>
    </div>
  </div>
);
