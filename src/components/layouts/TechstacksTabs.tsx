"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import useGetTechstacks from "@/queries/useGetTechstacks";
import Reveal from "@/motion/Reveal";

type Tabs = string[];
type TechStack = {
  id: number;
  name: string;
  category: string;
  icon: string;
};
const TechstacksTabs = () => {
  const { data, isLoading, error } = useGetTechstacks();
  const [tabs, setTabs] = useState<Tabs>([]);
  const [techStacks, setTechStacks] = useState<TechStack[]>([]);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    if (!data) return;
    setTabs(data.tabs);
    setTechStacks(data.techStacks);
    setActiveTab(data.tabs[1]);
  }, [data]);

  if (!data && isLoading) return <TechstacksFallback />;
  if (!data && error)
    return <TechstacksError message="Failed to load tech stacks." />;

  return (
    <div className="flex flex-col gap-5 max-w-sm ml-4 sm:ml-0">
      <Reveal>
        <div className="flex flex-wrap justify-center gap-2 rounded-md bg-primary/10 p-1.5 mx-5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "relative cursor-pointer rounded px-4 py-1.5 text-sm font-medium transition",
                activeTab === tab ? "bg-slate-600" : "hover:bg-slate-700"
              )}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="underline"
                  className="absolute inset-0 rounded bg-slate-600 -z-10"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <motion.div
          layout
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
          className="flex flex-wrap max-w-3xl gap-3 rounded-md bg-primary/10 p-3 mx-5 font-primary"
        >
          <AnimatePresence>
            {techStacks
              .filter((tech) => tech.category === activeTab)
              .map((tech) => (
                <motion.div
                  layout
                  key={tech.id}
                  initial={{ scale: 0.3 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.3 }}
                  className="rounded bg-bg/95 hover:bg-primary/15 p-2 text-sm flex techs-center gap-1.5 transition-colors duration-400"
                >
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="h-6 w-6 object-contain"
                  />
                  <span>{tech.name}</span>
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      </Reveal>
    </div>
  );
};

export default TechstacksTabs;

export const TechstacksFallback = () => {
  return (
    <div className="flex flex-col gap-5 max-w-sm ml-4 sm:ml-0 animate-pulse">
      <div className="flex flex-wrap justify-center gap-2 rounded-md bg-primary/10 p-1.5 mx-5">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="h-8 w-20 rounded bg-slate-700/50" />
        ))}
      </div>

      <div className="flex flex-wrap max-w-3xl gap-3 rounded-md bg-primary/10 p-3 mx-5">
        {Array.from({ length: 6 }).map((_, idx) => (
          <motion.div
            key={idx}
            layout
            initial={{ scale: 0.9, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="h-10 w-28 rounded bg-slate-700/50"
          />
        ))}
      </div>
    </div>
  );
};

export const TechstacksError = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center gap-3 text-center text-primary p-5 bg-primary/30 rounded-md">
    <p>Oops! Something went wrong:</p>
    <p className="font-medium">{message}</p>
  </div>
);
