import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  Instagram,
  Mail,
  MessageSquare,
  Send,
  Twitter,
  Youtube,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { toast } from "sonner";
import { useSubmitContact } from "../hooks/useQueries";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const submitContact = useSubmitContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    try {
      await submitContact.mutateAsync({ name, email, message });
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
      toast.success("Message sent! We'll get back to you soon.");
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial opacity-50" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-fit-red/10 border-fit-red/30 text-fit-red mb-4 text-xs font-semibold uppercase tracking-widest">
              Get In Touch
            </Badge>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4">
              Contact <span className="text-fit-red">FitTrack</span>
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Have a question, feedback, or just want to connect? We'd love to
              hear from you.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="p-7 rounded-2xl bg-fit-surface-2 border border-fit-red/20">
              <h2 className="font-display font-bold text-xl text-white mb-6">
                Send Us a Message
              </h2>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    data-ocid="contact.success_state"
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6 max-w-xs">
                      Thanks for reaching out. We'll get back to you within 24
                      hours.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSubmitted(false)}
                      className="border-fit-red/30 text-fit-red hover:bg-fit-red/10"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-sm">
                        Your Name
                      </Label>
                      <Input
                        type="text"
                        placeholder="e.g. Rahul Kumar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        data-ocid="contact.name_input"
                        className="bg-fit-surface-3 border-fit-red/20 text-white focus:border-fit-red placeholder:text-muted-foreground/50"
                        required
                        autoComplete="name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-sm">
                        Email Address
                      </Label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        data-ocid="contact.email_input"
                        className="bg-fit-surface-3 border-fit-red/20 text-white focus:border-fit-red placeholder:text-muted-foreground/50"
                        required
                        autoComplete="email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-sm">
                        Message
                      </Label>
                      <Textarea
                        placeholder="Tell us about your fitness journey, ask a question, or share feedback..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        data-ocid="contact.message_textarea"
                        className="bg-fit-surface-3 border-fit-red/20 text-white focus:border-fit-red placeholder:text-muted-foreground/50 min-h-[140px] resize-none"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitContact.isPending}
                      data-ocid="contact.submit_button"
                      className="bg-fit-red hover:bg-fit-red-bright text-white font-semibold w-full animate-pulse-glow"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {submitContact.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Email */}
            <div className="p-5 rounded-xl bg-fit-surface-2 border border-fit-red/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-fit-red/15 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-fit-red" />
                </div>
                <h3 className="font-display font-bold text-white">Email Us</h3>
              </div>
              <a
                href="mailto:support@fittrack.app"
                className="text-fit-red hover:text-fit-red-bright transition-colors font-semibold"
              >
                support@fittrack.app
              </a>
              <p className="text-muted-foreground text-xs mt-1">
                Response within 24 hours
              </p>
            </div>

            {/* Social Media */}
            <div className="p-5 rounded-xl bg-fit-surface-2 border border-fit-red/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-fit-red/15 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-fit-red" />
                </div>
                <h3 className="font-display font-bold text-white">Follow Us</h3>
              </div>
              <div className="space-y-3">
                {[
                  {
                    icon: SiInstagram,
                    label: "@fittrack.sriram",
                    platform: "Instagram",
                    color: "hover:text-pink-400",
                    href: "https://instagram.com",
                  },
                  {
                    icon: SiX,
                    label: "@FitTrackSRIRAM",
                    platform: "X (Twitter)",
                    color: "hover:text-blue-400",
                    href: "https://x.com",
                  },
                  {
                    icon: SiYoutube,
                    label: "FitTrack SRIRAM",
                    platform: "YouTube",
                    color: "hover:text-red-500",
                    href: "https://youtube.com",
                  },
                ].map(({ icon: SocialIcon, label, platform, color, href }) => (
                  <a
                    key={platform}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 text-muted-foreground ${color} transition-colors group`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-fit-surface-3 flex items-center justify-center group-hover:bg-fit-surface-2 transition-colors">
                      <SocialIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {platform}
                      </div>
                      <div className="text-xs">{label}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="p-5 rounded-xl bg-fit-red/8 border border-fit-red/25">
              <h3 className="font-display font-bold text-white text-sm mb-2">
                💬 Community Support
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Join our growing community of fitness enthusiasts. Share your
                progress, get tips, and stay motivated.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
