import * as motion from "motion/react-client";
import { CheckCircle2 } from "lucide-react";

const ContactSuccess = () => (
  <motion.div
    key="success"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="bg-bg-sec/50 backdrop-blur-sm p-8 rounded-2xl border border-primary/20 shadow-2xl flex flex-col items-center justify-center h-full min-h-[500px]"
  >
    <CheckCircle2 className="w-24 h-24 text-primary mb-6" />
    <h3 className="text-3xl font-bold mb-4">Message Sent!</h3>
    <p className="text-text/70 text-center">
      Thanks for reaching out. I&apos;ll get back to you soon!
    </p>
  </motion.div>
);

export default ContactSuccess;
