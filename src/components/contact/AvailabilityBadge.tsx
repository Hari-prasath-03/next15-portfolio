import * as motion from "motion/react-client";

const AvailabilityBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2 }}
    className="bg-bg-sec/50 backdrop-blur-sm p-6 rounded-xl border border-primary/20"
  >
    <div className="flex items-center gap-3 mb-2">
      <motion.div
        className="w-3 h-3 bg-primary rounded-full"
        animate={{ scale: [0.6, 1, 0.6], opacity: [1, 0.7, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
      <span className="font-bold text-lg">Available for Projects</span>
    </div>
    <p className="text-text/70 text-sm">
      Currently open to freelance opportunities and exciting collaborations
    </p>
  </motion.div>
);

export default AvailabilityBadge;
