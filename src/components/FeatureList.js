// import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  "Effortless Customization: Modify your DITA-OT HTML and PDF plugin with ease and gives the HTML and PDF Output",
  "Theme Editor: Change theme colors to suit your preference.",
  "Logo Placement & Branding: Supports logo placement in cover pages and headers.",
  "Footer Customization: Allows editing footer text and adding custom links, with the current year displayed dynamically",
  "Download Ready: We can download the DITA to HTML and PDF converted files.",
];

export default function FeatureList() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-black mt-[-80px]  px-6">
      <motion.h2
        className="text-[1.875rem] font-bold font-[poppins] text-center bg-black-500 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Why Use This Tool?
      </motion.h2>
      <div className="w-full max-w-3xl space-y-4 text-black">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-r from-[#bee5fc] to-[#d3bdfc] hover:bg-gradient-to-r from-[#bee5fc] to-[#d3bdfc] transition-all cursor-pointer shadow-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            
            <span className="text-lg font-poppins">{feature}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
