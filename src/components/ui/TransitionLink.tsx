"use client";

import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "@/utils/animation";
import clsx from "clsx";

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const TransitionLink: React.FC<TransitionLinkProps> = ({
  href,
  children,
  className,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (href === pathname) return;
    animatePageOut(href, router);
  };

  return (
    <button
      className={clsx("navlink cursor-pointer", className, href === pathname && "active")}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default TransitionLink;
