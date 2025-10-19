import Reveal from "../../motion/Reveal";

const Heading = ({
  title,
  textSize = "text-3xl sm:text-5xl",
  className,
}: {
  title: string;
  textSize?: string;
  className?: string;
}) => (
  <Reveal>
    <h1 className={`${textSize} font-extrabold tracking-tighter flex-1 ${className}`}>
      {title}
      <span className="text-primary">.</span>
    </h1>
    <hr className="border-t border-primary mt-0.5" />
  </Reveal>
);

export default Heading;
