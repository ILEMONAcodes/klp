"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  User,
  ShieldCheck,
  Building,
} from "lucide-react";
import Navbar from "@/components/Navbar";

// KEY DIRECT CONTACTS
const DIRECT_CONTACTS = [
  {
    name: "Emmanuel Kelechukwu Chris Esq.",
    role: "Managing Director / CEO",
    phone: "+2348164173622",
    email: "emmanuel@kayceelawproperties.com",
    icon: Building,
  },
  {
    name: "Odebala Winifred",
    role: "Chief Legal Officer",
    phone: "+2348164173622",
    email: "legal@kayceelawproperties.com",
    icon: ShieldCheck,
  },
  {
    name: "Sunday Goodness",
    role: "Chief Operating Officer",
    phone: "+2348164173622",
    email: "coo@kayceelawproperties.com",
    icon: User,
  },
];

// TYPE-SAFE ANIMATION VARIANTS
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemSlideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

const itemSlideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

const itemSlideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ContactPage() {
  // FORM STATE
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyPreference: "General Inquiry",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // CLIENT-SIDE VALIDATION
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        propertyPreference: "General Inquiry",
        message: "",
      });
      setErrors({});
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <main className="min-h-screen bg-white text-stone-900 pt-16 sm:pt-20">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative py-16 sm:py-24 bg-purple-950 text-white overflow-hidden">
        {/* Subtle Ambient Gold Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-center space-y-4">
          <motion.span
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-3.5 py-1.5 bg-purple-600/10 text-purple-400 font-bold text-xs uppercase tracking-widest rounded-full border border-[#F2B512]/30 inline-block"
          >
            Get In Touch
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight"
          >
            We’re Here to Help You Build Generational Wealth
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-purple-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
          >
            Have questions about estate titles, private site inspections, or investment opportunities? Send us a message or contact our leadership directly.
          </motion.p>
        </div>
      </section>

      {/* TWO-COLUMN MAIN CONTAINER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: SWIFT INTERACTIVE CONTACT FORM */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/80 shadow-md space-y-6"
          >
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-stone-900">
                Send Us a Message
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
            </div>

            {/* SUCCESS TOAST / MESSAGE */}
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-start gap-3 text-emerald-900 text-xs sm:text-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Thank you for reaching out!</p>
                  <p className="text-emerald-700">
                    Your message has been received successfully. A consultant will get in touch with you shortly.
                  </p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* FULL NAME */}
              <motion.div variants={itemSlideLeft} className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Full Name <span className="text-purple-600">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className={`w-full px-4 py-3 bg-white border text-stone-900 text-sm rounded-xl outline-none transition-all duration-200 ${
                    errors.fullName
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-stone-300 focus:border-purple-950 focus:ring-2 focus:ring-purple-950/10"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                  </p>
                )}
              </motion.div>

              {/* EMAIL & PHONE GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* EMAIL */}
                <motion.div variants={itemSlideLeft} className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Email Address <span className="text-purple-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 bg-white border text-stone-900 text-sm rounded-xl outline-none transition-all duration-200 ${
                      errors.email
                        ? "border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-stone-300 focus:border-purple-950 focus:ring-2 focus:ring-purple-950/10"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                    </p>
                  )}
                </motion.div>

                {/* PHONE NUMBER */}
                <motion.div variants={itemSlideLeft} className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Phone Number <span className="text-purple-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+234..."
                    className={`w-full px-4 py-3 bg-white border text-stone-900 text-sm rounded-xl outline-none transition-all duration-200 ${
                      errors.phone
                        ? "border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-stone-300 focus:border-purple-950 focus:ring-2 focus:ring-purple-950/10"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                    </p>
                  )}
                </motion.div>
              </div>

              {/* PROPERTY PREFERENCE DROPDOWN */}
              <motion.div variants={itemSlideLeft} className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Subject / Property Preference
                </label>
                <select
                  name="propertyPreference"
                  value={formData.propertyPreference}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-stone-300 text-stone-900 text-sm rounded-xl outline-none focus:border-purple-950 focus:ring-2 focus:ring-purple-950/10 transition-all duration-200 cursor-pointer"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Residential Property Acquisition">
                    Residential Property Acquisition
                  </option>
                  <option value="Commercial Land & Development">
                    Commercial Land & Development
                  </option>
                  <option value="Legal Title Verification & Consultancy">
                    Legal Title Verification & Consultancy
                  </option>
                  <option value="Schedule a Private Inspection">
                    Schedule a Private Inspection
                  </option>
                </select>
              </motion.div>

              {/* MESSAGE AREA */}
              <motion.div variants={itemSlideLeft} className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Message <span className="text-purple-600">*</span>
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your property goals or questions..."
                  className={`w-full px-4 py-3 bg-white border text-stone-900 text-sm rounded-xl outline-none transition-all duration-200 resize-none ${
                    errors.message
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-stone-300 focus:border-purple-950 focus:ring-2 focus:ring-purple-950/10"
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                  </p>
                )}
              </motion.div>

              {/* SUBMIT BUTTON */}
              <motion.button
                variants={itemSlideLeft}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-purple-950 hover:bg-purple-900 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 text-purple-400" /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* RIGHT COLUMN: CONTACT INFORMATION & DETAIL CARDS */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-5 space-y-6"
          >
            {/* DIRECT CHANNELS CARD */}
            <motion.div
              variants={itemSlideRight}
              className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm space-y-4"
            >
              <h3 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
                Direct Channels
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                {/* PHONE */}
                <a
                  href="tel:+2348164173622"
                  className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-stone-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-950/10 text-purple-950 flex items-center justify-center shrink-0 group-hover:bg-purple-950 group-hover:text-purple-400 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-stone-600">
                      Phone Number
                    </p>
                    <p className="font-semibold text-stone-900">
                      +234 (0) 816 417 3622
                    </p>
                  </div>
                </a>

                {/* EMAIL */}
                <a
                  href="mailto:kayceelawproperties@yahoo.com"
                  className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-stone-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-950/10 text-purple-950 flex items-center justify-center shrink-0 group-hover:bg-purple-950 group-hover:text-purple-400 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-stone-600">
                      Email Address
                    </p>
                    <p className="font-semibold text-stone-900 break-all">
                      kayceelawproperties@yahoo.com
                    </p>
                  </div>
                </a>

                {/* OFFICE ADDRESS */}
                <div className="flex items-center gap-3.5 p-3 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-purple-950/10 text-purple-950 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-stone-600">
                      Main Office Address
                    </p>
                    <p className="font-semibold text-stone-900 leading-snug">
                      Plot 123, Cadastral Zone A07, Wuse 2, Abuja, Nigeria
                    </p>
                  </div>
                </div>

                {/* WHATSAPP CTA LINK */}
                <a
                  href="https://wa.me/2348164173622?text=Hello%20Kayceelaw%20Properties,%20I%20would%20like%20to%20make%20an%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-2xl transition-all shadow-sm mt-2"
                >
                  <MessageSquare className="w-4 h-4 fill-current" /> Chat on
                  WhatsApp
                </a>
              </div>
            </motion.div>

            {/* KEY EXECUTIVE CONTACTS */}
            <motion.div
              variants={itemSlideRight}
              className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm space-y-4"
            >
              <h3 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
                Key Contacts
              </h3>

              <div className="space-y-3">
                {DIRECT_CONTACTS.map((person, idx) => {
                  const PersonIcon = person.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white border border-stone-200/60 flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-600/10 text-purple-800 flex items-center justify-center shrink-0 mt-0.5">
                        <PersonIcon className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5 text-xs">
                        <p className="font-bold text-stone-900">
                          {person.name}
                        </p>
                        <p className="text-[10px] font-semibold text-purple-900 uppercase tracking-wider">
                          {person.role}
                        </p>
                        <div className="pt-1 flex flex-wrap gap-x-3 text-stone-600 font-medium text-[11px]">
                          <a
                            href={`tel:${person.phone}`}
                            className="hover:text-purple-950 underline"
                          >
                            Call
                          </a>
                          <span>•</span>
                          <a
                            href={`mailto:${person.email}`}
                            className="hover:text-purple-950 underline"
                          >
                            Email
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* BUSINESS HOURS CARD */}
            <motion.div
              variants={itemSlideRight}
              className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm space-y-3"
            >
              <div className="flex items-center gap-2 text-stone-900 font-bold border-b border-stone-100 pb-3">
                <Clock className="w-5 h-5 text-purple-950" />
                <h3 className="text-lg">Business Hours</h3>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-stone-600">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span>Monday – Friday:</span>
                  <span className="font-bold text-stone-900">
                    8:00 AM – 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span>Saturday:</span>
                  <span className="font-bold text-stone-900">
                    9:00 AM – 4:00 PM
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Sunday:</span>
                  <span className="font-bold text-red-600">Closed</span>
                </div>
              </div>

              <p className="text-[11px] text-stone-500 italic pt-2 border-t border-stone-100">
                * For emergency title verifications or urgent property inspection schedules, please reach out directly via WhatsApp.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* FULL-WIDTH MAP EMBED / LOCATION DISPLAY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-16">
        <motion.div
          variants={itemSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white p-4 sm:p-6 rounded-3xl border border-stone-200/80 shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-stone-900">
                Visit Our Corporate Headquarters
              </h3>
              <p className="text-stone-600 text-xs">
                Plot 123, Cadastral Zone A07, Wuse 2, Abuja, Nigeria
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Wuse+2+Abuja+Nigeria"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-bold rounded-xl transition-colors hidden sm:inline-block"
            >
              Open in Google Maps
            </a>
          </div>

          <div className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-stone-200 relative border border-stone-200">
            <iframe
              title="Kayceelaw Properties Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.824245607384!2d7.4764!3d9.0765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0ae2b2b11d8b%3A0x6a11111111111111!2sWuse%202%2C%20Abuja!5e0!2m3!1sen!2sng!4v1680000000000!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </section>

    </main>
  );
}