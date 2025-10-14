"use client";

import { JSX, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";

import { SocialLink } from "../layouts/Navbar";
import { useGetSocials } from "@/queries/useGetSocials";

const SocialLinks = () => {
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
    <div>
      <h2 className="text-3xl font-bold mb-6">Connect With Me</h2>
      <div className="grid grid-cols-2 gap-4">
        {links.map(({ link, name }, idx) => (
          <motion.div
            key={idx}
            onClick={() => window.open(link, "_blank")}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + idx * 0.1 }}
            className="relative bg-bg-sec/50 backdrop-blur-sm p-6 rounded-xl border border-primary/20 flex flex-col items-center justify-center gap-3 group overflow-hidden hover:border-primary hover:*:text-primary cursor-pointer"
            whileTap={{ scale: 0.95 }}
          >
            <motion.div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            {iconMap[name]}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default SocialLinks;
