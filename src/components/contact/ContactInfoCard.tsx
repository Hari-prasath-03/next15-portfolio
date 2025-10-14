import * as motion from "motion/react-client";

type ContactInfoCardProps = {
  info: {
    icon: React.ElementType;
    text: string;
  };
  delay: number;
};

const ContactInfoCard = ({ info, delay }: ContactInfoCardProps) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    whileHover={{ x: 10, transition: { duration: 0.2 } }}
    className="bg-bg-sec/50 backdrop-blur-sm p-6 rounded-xl border border-primary/20 flex items-center gap-4 group cursor-pointer"
  >
    <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
      <info.icon className="w-6 h-6 text-primary" />
    </div>
    <span className="text-text/90 overflow-hidden">{info.text}</span>
  </motion.div>
);

export default ContactInfoCard;
