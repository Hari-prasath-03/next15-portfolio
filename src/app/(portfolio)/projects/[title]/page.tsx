/* eslint-disable @next/next/no-img-element */
export const dynamic = "force-dynamic";

import Heading from "@/components/ui/Heading";
import Reveal from "@/motion/Reveal";
import { ExternalLink, Github } from "lucide-react";
import { ProjectType } from "../page";

const Project = async ({ params }: { params: Promise<{ title: string }> }) => {
  const { title } = await params;

  const project: ProjectType | undefined = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/projects/${title}`
  )
    .then((res) => res.json())
    .catch(() => undefined);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <section className="min-h-screen max-w-[1378px] mx-auto flex flex-col relative pt-40 pb-10">
      <div className="max-w-2xl ml-20 mr-6 sm:mr-20 md:ml-36 space-y-3">
        <Heading
          title={project.name}
          textSize="text-xl sm:text-3xl lg:text-5xl"
        />
        <img
          src={project.image.secure_url}
          alt={project.name}
          className="h-96 object-cover rounded-lg my-6"
        />

        <div className="flex flex-col gap-5">
          <Reveal>
            <div className="flex flex-wrap gap-2 text-sm font-medium">
              {project.techStacks.map((tech, i) => (
                <TagForTech key={i} tech={tech} />
              ))}
            </div>
          </Reveal>

          <Discription description={project.description} />
        </div>

        <Links githubLink={project.githubLink} liveLink={project.liveLink} />
      </div>
    </section>
  );
};

export default Project;

export const TagForTech: React.FC<{ tech: string }> = ({ tech }) => (
  <span className="text-sm sm:text-base bg-gradient-to-br from-primary/90 to-primary/40 px-2 py-1 rounded-full">
    {tech}
  </span>
);

export const Discription: React.FC<{ description: string[] }> = ({
  description,
}) => (
  <div>
    <Reveal>
      <h3 className="text-lg font-semibold mb-2">Description</h3>
    </Reveal>
    <div className="space-y-1.5 mb-6 leading-relaxed text-sm">
      {description.map((para, i) => (
        <Reveal key={i}>
          <p className="pl-3 text-text/80 text-sm sm:text-base">
            {"->"} {para}
          </p>
        </Reveal>
      ))}
    </div>
  </div>
);

export const Links: React.FC<{
  githubLink?: string[];
  liveLink?: string;
}> = ({ githubLink, liveLink }) => (
  <Reveal>
    <h3 className="text-lg font-semibold mb-2">Project Links</h3>
    <div className="flex gap-4 text-sm">
      {githubLink && githubLink?.length === 2 ? (
        <>
          {githubLink.map((link, i) => (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white/80 hover:text-white"
            >
              <Github size={16} /> {i === 0 ? "Frontend" : "Backend"}
            </a>
          ))}
        </>
      ) : (
        githubLink &&
        githubLink.length === 1 && (
          <a
            href={githubLink[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-white/80 hover:text-white"
          >
            <Github size={16} /> Source Code
          </a>
        )
      )}
      {liveLink && (
        <a
          href={liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-white/80 hover:text-white"
        >
          <ExternalLink size={16} /> Live Project
        </a>
      )}
    </div>
  </Reveal>
);
