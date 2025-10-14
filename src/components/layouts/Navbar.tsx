"use client";

import { JSX, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { useGetSocials } from "@/queries/useGetSocials";

export type SocialLink = {
  id: number;
  name: string;
  link: string;
};

const Navbar = () => {
  const iconMap: { [key: string]: JSX.Element } = {
    github: <Github size={20} />,
    linkedin: <Linkedin size={20} />,
    instagram: <Instagram size={19} />,
    mail: <Mail size={20} />,
  };

  const { data } = useGetSocials();
  const [links, setLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    if (!data) return;
    setLinks(data);
  }, [data]);

  return (
    <nav className="h-20 z-40 fixed top-0 left-0 right-0 flex justify-between items-center backdrop-blur-md pl-20 pr-5 sm:pr-10">
      <div className="flex gap-4 sm:gap-6">
        {links.map(({ name, link }, i) => (
          <motion.span
            key={name}
            layoutId={name}
            layout
            onClick={() => window.open(link, "_blank")}
            initial={{ y: -65, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="hover:text-primary transition-all duration-300 cursor-pointer"
          >
            {iconMap[name]}
          </motion.span>
        ))}
      </div>
      <div>
        <button className="outline-none cursor-pointer text-sm border font-semibold border-text py-1.5 px-3 rounded-md hover:text-primary hover:border-primary transition-colors">
          My Resume
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
