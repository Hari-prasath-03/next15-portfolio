/* eslint-disable @next/next/no-img-element */
"use client";

import { X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Reveal from "@/motion/Reveal";
import Heading from "@/components/ui/Heading";
import { Discription, Links, TagForTech } from "../../[title]/page";
import useGetProjectByTitle from "@/queries/useGetProjectByTitle";
import { ProjectType } from "../../page";

const ProjectModel = () => {
  const params = useParams();
  const router = useRouter();

  const title = (params?.title as string) ?? "";
  const { data: project } = useGetProjectByTitle<ProjectType>(title);
  console.log(project);

  const handleClickOutside = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.back();
  };

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <button className="fixed pointer-events-none z-50 top-4 right-4 text-primary sm:text-white hover:text-primary transition">
        <X size={24} />
      </button>
      <div className="bg-bg-sec max-h-[90vh] overflow-y-scroll px-6 py-8 rounded-lg max-w-2xl w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl">
        <img
          src={project.image.secure_url}
          alt={project.name}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        <div className="flex flex-col gap-5">
          <Heading title={project.name} textSize="text-3xl" />

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
    </div>
  );
};

export default ProjectModel;
