"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, MapPin, Loader2, CircleCheck, AlertCircle } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { SiGithub, SiDevdotto } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("success");
      formRef.current?.reset();
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <SectionWrapper id="contact" className="bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Get In Touch"
          subtitle="Let's build something amazing together"
        />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                Let&apos;s Talk
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Have a project in mind or just want to say hi? I&apos;m always open to new opportunities and collaborations.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: personalInfo.email, href: personalInfo.social.email },
                { icon: MapPin, label: "Location", value: personalInfo.location },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-royal-blue/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-royal-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-foreground hover:text-royal-blue transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-foreground">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-medium">
                Find me on
              </p>
              <div className="flex gap-3">
                {[
                  { icon: SiGithub, href: personalInfo.social.github, label: "GitHub" },
                  { icon: FaLinkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
                  { icon: SiDevdotto, href: personalInfo.social.devto, label: "Dev.to" },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-royal-blue hover:border-royal-blue/50 transition-all duration-300"
                    whileHover={{ y: -4, rotate: [0, -5, 5, 0], transition: { duration: 0.3 } }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {status === "success" ? (
              <motion.div
                className="h-full flex items-center justify-center p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-center">
                  <CircleCheck className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-lg font-heading font-bold text-foreground mb-1">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Thank you for reaching out. I&apos;ll get back to you soon.
                  </p>
                </div>
              </motion.div>
            ) : status === "error" ? (
              <motion.div
                className="h-full flex items-center justify-center p-8 rounded-2xl bg-red-500/10 border border-red-500/30"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-heading font-bold text-foreground mb-1">
                    Something went wrong
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Failed to send. Please try again or email me directly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-sm text-royal-blue hover:underline cursor-pointer"
                  >
                    Try again
                  </button>
                </div>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      className="bg-muted/30 border-border/50 focus:border-royal-blue"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="bg-muted/30 border-border/50 focus:border-royal-blue"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What's this about?"
                    required
                    className="bg-muted/30 border-border/50 focus:border-royal-blue"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project or idea..."
                    rows={5}
                    required
                    className="bg-muted/30 border-border/50 focus:border-royal-blue resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-full gap-2 h-12 bg-royal-blue hover:bg-royal-blue/90 disabled:bg-royal-blue/50 text-white inline-flex items-center justify-center font-medium cursor-pointer disabled:cursor-not-allowed transition-colors"
                  whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
                  whileTap={{ scale: status === "loading" ? 1 : 0.97 }}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
