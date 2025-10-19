import * as motion from "motion/react-client";
import TransitionLink from "../ui/TransitionLink";

const Sidebar = () => {
  const routes = [
    { section: "/", label: "Home" },
    { section: "/projects", label: "Projects" },
    { section: "/experience", label: "Exp." },
    { section: "/contact", label: "Contact" },
  ];

  return (
    <div className="bg-zinc-950 min-h-screen h-full fixed top-0 left-0 z-50 flex flex-col items-center w-12 sm:w-14">
      <motion.div
        initial={{ y: -65, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="font-bold text-2xl my-6 mb-10"
      >
        H<span className="text-primary">p.</span>
      </motion.div>

      <div className="flex flex-col items-center w-full gap-10">
        {routes.map(({ section, label }, i) => (
          <motion.div
            key={section}
            initial={{ x: -45, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.35, delay: i * 0.2 }}
          >
            <TransitionLink
              key={section}
              href={section}
              className="navlink rotate-90 h-14 w-full px-6.5 border-t border-t-transparent transition-all duration-150 hover:bg-bg-sec hover:border-t-primary flex items-center justify-center"
            >
              <span className="inline-block origin-left whitespace-nowrap">
                {label}
              </span>
            </TransitionLink>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
