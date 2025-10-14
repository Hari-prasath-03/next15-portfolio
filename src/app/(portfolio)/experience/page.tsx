"use client";

import React, { useEffect, useState } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

import Reveal from "@/motion/Reveal";
import Heading from "@/components/ui/Heading";
import { Timeline, TimelineItem } from "@/components/ui/Timeline";
import useGetExperiences from "@/queries/useGetExperiences";

type ExperienceType = {
  date: string;
  title: string;
  organizing: string;
  type?: "work" | "internship" | "volunteer" | "freelance";
  contents?: string[];
  techStacks?: string[];
};

const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const isSmallScreen = useMediaQuery("(max-width: 568px)");
  const { data } = useGetExperiences();
  
  useEffect(() => {
    if (!data) return;
    console.log(data);
    setExperiences(data);
  }, [data]);

  return (
    <section className="min-h-screen max-w-[1378px] overflow-x-hidden mx-auto flex flex-col relative pt-40 pb-10 ml-20 mr-6 sm:mr-20 md:ml-50">
      <Heading title="My Experience" />
      <Reveal>
        <p className="sm:text-lg mt-3">
          A Timeline tracking of a Developer, Built by Me
        </p>
      </Reveal>

      <div className="min-h-screen py-12">
        <Timeline className="max-w-4xl ml-0 sm:ml-20">
          {experiences.map((exp, i) => (
            <TimelineItem
              key={i}
              details={{ ...exp }}
              date={exp.date}
              isLeft={!isSmallScreen && i % 2 !== 0}
              delay={i * 0.2}
            >
              <div className="space-y-2">
                {exp.contents && (
                  <ul className="space-y-1 text-sm sm:text-base">
                    {exp.contents.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                )}
                <div
                  className={`flex flex-wrap gap-1 ${
                    !isSmallScreen && i % 2 !== 0 ? "justify-end" : ""
                  }`}
                >
                  {exp.techStacks &&
                    exp.techStacks.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gradient-to-br from-primary/90 to-primary/40 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                </div>
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </section>
  );
};

export default Experience;
