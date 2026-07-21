"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

// Explicitly typed Variants to resolve TypeScript string errors
const containerVariants: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.15,
      when: "beforeChildren",
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <footer className="w-full py-16 px-6 md:px-12 lg:px-20 overflow-hidden bg-gradient-to-br from-stone-950 via-purple-950/60 to-stone-950 text-white">
      {/* MAIN TRANSPARENT PURPLE GLASS CONTAINER */}
      <motion.div
        className="max-w-7xl mx-auto p-8 md:p-12 lg:p-16 rounded-3xl bg-purple-900/30 backdrop-blur-xl border border-purple-500/20 shadow-2xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* LEFT COLUMN: GET IN TOUCH & FORM */}
          <motion.div className="lg:col-span-5 space-y-6" variants={itemVariants}>
            <div className="space-y-3">
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold tracking-tight text-white"
              >
                Get In Touch
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-purple-200 text-sm md:text-base leading-relaxed max-w-md font-normal"
              >
                Ready to step into the world of Kayceelaw excellence? Reach out
                now to start your extraordinary real estate experience.
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
              <motion.div variants={itemVariants}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-purple-950/40 border border-purple-400/30 placeholder-purple-300/60 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm font-medium transition"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-purple-950/40 border border-purple-400/30 placeholder-purple-300/60 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm font-medium transition"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-purple-950/40 border border-purple-400/30 placeholder-purple-300/60 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm font-medium transition"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Type a message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-purple-950/40 border border-purple-400/30 placeholder-purple-300/60 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm font-medium resize-none transition"
                ></textarea>
              </motion.div>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-full transition-colors text-sm shadow-lg shadow-purple-950/50"
              >
                Submit
              </motion.button>
            </form>
          </motion.div>

          {/* MIDDLE COLUMN: CONTACT INFORMATION */}
          <motion.div
            className="lg:col-span-4 space-y-8 lg:pl-6"
            variants={itemVariants}
          >
            {/* Call Us */}
            <motion.div className="space-y-2" variants={itemVariants}>
              <h3 className="text-xl font-bold text-white">Call Us</h3>
              <div className="text-purple-200 text-sm font-medium space-y-1">
                <p>+234 906 000 1552</p>
                <p>+234 906 000 1553</p>
              </div>
            </motion.div>

            {/* Write Us */}
            <motion.div className="space-y-2" variants={itemVariants}>
              <h3 className="text-xl font-bold text-white">Write Us</h3>
              <p className="text-purple-200 text-sm font-medium">
                info@kayceelawproperties.com
              </p>
            </motion.div>

            {/* Visit Us */}
            <motion.div className="space-y-2 max-w-xs" variants={itemVariants}>
              <h3 className="text-xl font-bold text-white">Visit Us</h3>
              <p className="text-purple-200 text-sm font-medium leading-relaxed">
                4th Floor, Mukhtar El Yakub Building, Zakariyya Maimalari Street,
                Central Business District, Abuja. FCT 900211 Nigeria
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: QUICK LINKS */}
          <motion.div className="lg:col-span-3 space-y-6" variants={itemVariants}>
            <h3 className="text-xl font-bold text-white">Quick Links</h3>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm font-medium text-purple-200">
              <div className="space-y-3 flex flex-col">
                <Link href="/" className="hover:text-purple-400 transition">
                  Home
                </Link>
                <Link href="/about" className="hover:text-purple-400 transition">
                  About
                </Link>
                <Link href="/properties" className="hover:text-purple-400 transition">
                  Our Homes
                </Link>
                <Link href="/projects" className="hover:text-purple-400 transition">
                  Projects
                </Link>
                <Link href="/contact" className="hover:text-purple-400 transition">
                  Contact
                </Link>
              </div>

              <div className="space-y-3 flex flex-col">
                <Link href="/blog" className="hover:text-purple-400 transition">
                  Blog
                </Link>
                <Link href="/careers" className="hover:text-purple-400 transition">
                  Careers
                </Link>
                <Link href="/agents" className="hover:text-purple-400 transition">
                  Agent Registration
                </Link>
                <Link href="/terms" className="hover:text-purple-400 transition">
                  Term of service
                </Link>
                <Link href="/privacy" className="hover:text-purple-400 transition">
                  Privacy policy
                </Link>
              </div>
            </div>
          </motion.div>

        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-6 border-t border-purple-500/20 flex flex-col sm:flex-row justify-between items-center text-xs text-purple-300/80 font-medium gap-4"
        >
          <p>© {new Date().getFullYear()} Kayceelaw Properties. All rights reserved.</p>
          <p>Built with excellence for modern real estate.</p>
        </motion.div>
      </motion.div>
    </footer>
  );
}