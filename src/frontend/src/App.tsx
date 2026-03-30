import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetAllArticles,
  useGetAllFAQs,
  useSubmitConsultation,
} from "@/hooks/useQueries";
import {
  Activity,
  ArrowRight,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  Heart,
  Home,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scale,
  Shield,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const PRACTICE_AREAS = [
  {
    icon: Shield,
    title: "Criminal Law",
    description:
      "Expert defense representation for all criminal charges, from misdemeanors to serious felonies. We protect your rights at every stage.",
  },
  {
    icon: Heart,
    title: "Family Law",
    description:
      "Compassionate guidance through divorce, child custody, adoption, and domestic relations matters with your family's best interests in mind.",
  },
  {
    icon: Briefcase,
    title: "Business Law",
    description:
      "Comprehensive corporate legal services including formation, contracts, mergers, compliance, and dispute resolution for businesses of all sizes.",
  },
  {
    icon: Activity,
    title: "Personal Injury",
    description:
      "Aggressive advocacy for accident victims seeking maximum compensation for medical expenses, lost wages, and pain and suffering.",
  },
  {
    icon: Users,
    title: "Employment Law",
    description:
      "Protecting workers' rights in cases of wrongful termination, discrimination, harassment, wage disputes, and workplace violations.",
  },
  {
    icon: Home,
    title: "Real Estate Law",
    description:
      "Full-service real estate legal support for purchases, sales, landlord-tenant disputes, zoning issues, and property litigation.",
  },
];

const STATIC_FAQS = [
  {
    question: "What should I do immediately after a car accident?",
    answer:
      "First, ensure everyone's safety and call 911 if there are injuries. Document the scene with photos, exchange information with other drivers, and report the accident to your insurance company. Do not admit fault. Contact a personal injury attorney before giving any recorded statements.",
  },
  {
    question: "How do I file for divorce in my state?",
    answer:
      "The divorce process varies by state, but generally involves filing a petition with your local family court, serving your spouse, and reaching agreements on asset division, child custody, and support. An uncontested divorce is faster; a contested one may require mediation or trial. A family law attorney can guide you through the specific requirements.",
  },
  {
    question: "What are my rights as an employee facing termination?",
    answer:
      "Unless you have an employment contract stating otherwise, most employment is 'at-will,' meaning employers can terminate without cause. However, you cannot be fired for discriminatory reasons (race, gender, religion, disability) or retaliation for protected activities. You may be entitled to severance, unemployment benefits, and COBRA healthcare continuation.",
  },
  {
    question: "Do I need a lawyer to start a business?",
    answer:
      "While not legally required, having a business attorney is highly advisable. They can help you choose the right business structure (LLC, corporation, partnership), draft operating agreements, review contracts, ensure regulatory compliance, protect intellectual property, and avoid costly legal mistakes from the start.",
  },
  {
    question: "What happens if I'm arrested and can't afford a lawyer?",
    answer:
      "The Sixth Amendment guarantees your right to legal representation. If you cannot afford an attorney, the court must appoint a public defender at no cost to you. Immediately invoke your right to remain silent and request an attorney before answering any police questions.",
  },
  {
    question: "How long do I have to file a personal injury lawsuit?",
    answer:
      "The statute of limitations varies by state and injury type, typically ranging from 1 to 4 years from the date of injury. Some exceptions apply for minors or when injuries are discovered later. Missing this deadline permanently bars your claim, so consulting an attorney promptly after an injury is critical.",
  },
  {
    question: "Can a landlord enter my rental property without notice?",
    answer:
      "Most states require landlords to provide 24-48 hours advance notice before entering a rental unit, except in genuine emergencies. Unauthorized entry may constitute harassment or breach of the lease agreement. Tenants have the right to quiet enjoyment of their home, and repeated violations may justify lease termination or legal action.",
  },
  {
    question: "What is the difference between a will and a living trust?",
    answer:
      "A will takes effect at death and goes through probate court (a public, potentially lengthy process). A living trust takes effect immediately, allows you to manage assets during your lifetime, avoids probate, and offers more privacy. Both are essential estate planning tools that often work best together with guidance from an estate planning attorney.",
  },
];

const STATIC_ARTICLES = [
  {
    title: "Understanding Your Miranda Rights",
    content:
      "Learn what Miranda rights are, when they apply, and how they protect you during police interactions and criminal proceedings.",
    category: "Criminal Law",
    image: "/assets/generated/article-legal-rights.dim_600x400.jpg",
  },
  {
    title: "Essential Clauses in Every Business Contract",
    content:
      "A comprehensive guide to the most important contract provisions that protect your business interests and prevent costly disputes.",
    category: "Business Law",
    image: "/assets/generated/article-contract-law.dim_600x400.jpg",
  },
  {
    title: "Navigating Child Custody Agreements",
    content:
      "What you need to know about legal vs. physical custody, parenting plans, and how courts determine the best interests of the child.",
    category: "Family Law",
    image: "/assets/generated/article-family-law.dim_600x400.jpg",
  },
];

const ISSUE_TYPES = [
  "Criminal Defense",
  "Family Law / Divorce",
  "Personal Injury",
  "Business Law",
  "Employment Law",
  "Real Estate",
  "Estate Planning",
  "Immigration",
  "Other",
];

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Areas of Law", href: "#areas" },
  { label: "Resources", href: "#resources" },
  { label: "FAQ", href: "#faq" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Scale className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold tracking-tight text-foreground">
              BMP TIWARI <span className="text-primary">ASSOCIATES</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-6"
            data-ocid="navbar.section"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                type="button"
                data-ocid="navbar.link"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollTo("#contact")}
              data-ocid="navbar.primary_button"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            >
              Book Consultation
            </Button>
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="navbar.toggle"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white border-t border-border px-4 pb-4"
          >
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left py-3 text-sm font-medium text-foreground hover:text-primary border-b border-border last:border-0"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollTo("#contact")}
              className="w-full mt-3 bg-primary text-primary-foreground"
            >
              Book Consultation
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('/assets/generated/hero-courthouse.dim_1600x900.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-navy/80" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4"
        >
          Trusted Legal Information
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight leading-tight mb-6"
        >
          YOUR TRUSTED SOURCE
          <br />
          FOR LEGAL INFORMATION
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-white/80 max-w-2xl mx-auto mb-10"
        >
          Navigate the legal system with confidence. Access expert resources,
          understand your rights, and connect with qualified attorneys for
          personalized guidance.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() =>
              document
                .querySelector("#areas")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-ocid="hero.primary_button"
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8"
          >
            Explore Practice Areas
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-ocid="hero.secondary_button"
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10 font-bold px-8"
          >
            Find a Lawyer
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function PracticeAreasSection() {
  return (
    <section id="areas" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            What We Cover
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground">
            Practice Areas
          </h2>
          <div className="mt-4 w-16 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          data-ocid="areas.list"
        >
          {PRACTICE_AREAS.map((area, idx) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                data-ocid={`areas.item.${idx + 1}`}
                className="group p-8 rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300">
                  <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {area.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {area.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ResourcesSection() {
  const { data: backendArticles } = useGetAllArticles();
  const articles =
    backendArticles && backendArticles.length > 0
      ? backendArticles.slice(0, 3).map((a, i) => ({
          title: a.title,
          content: a.content,
          category: a.category,
          image: STATIC_ARTICLES[i % STATIC_ARTICLES.length].image,
        }))
      : STATIC_ARTICLES;

  return (
    <section id="resources" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Stay Informed
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground">
            Legal Resources & Guidance
          </h2>
          <div className="mt-4 w-16 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div
          className="grid grid-cols-1 lg:grid-cols-4 gap-6"
          data-ocid="resources.list"
        >
          {/* Article cards */}
          {articles.map((article, idx) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              data-ocid={`resources.item.${idx + 1}`}
              className="lg:col-span-1 bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full mb-3">
                  {article.category}
                </span>
                <h3 className="font-bold text-foreground mb-2 leading-tight">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {article.content}
                </p>
                <button
                  type="button"
                  className="mt-4 text-sm font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Read More <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}

          {/* Promo card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 bg-navy rounded-xl p-8 flex flex-col justify-between text-white"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-5">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 leading-tight">
                Your Complete Guide to Filing a Lawsuit
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                A step-by-step breakdown of the civil litigation process — from
                deciding whether to sue to understanding court procedures and
                collecting a judgment.
              </p>
            </div>
            <Button
              data-ocid="resources.download_button"
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full font-bold"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Free Guide
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const { data: backendFaqs } = useGetAllFAQs();
  const faqs =
    backendFaqs && backendFaqs.length > 0 ? backendFaqs : STATIC_FAQS;

  const toggle = (idx: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const half = Math.ceil(faqs.length / 2);
  const leftCol = faqs.slice(0, half);
  const rightCol = faqs.slice(half);

  const FAQItem = ({
    faq,
    idx,
  }: { faq: { question: string; answer: string }; idx: number }) => {
    const isOpen = openItems.has(idx);
    return (
      <div
        data-ocid={`faq.item.${idx + 1}`}
        className="border border-border rounded-xl overflow-hidden mb-4"
      >
        <button
          type="button"
          onClick={() => toggle(idx)}
          className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
        >
          <span className="font-semibold text-foreground text-sm pr-4">
            {faq.question}
          </span>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          )}
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                {faq.answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Common Questions
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 w-16 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            {leftCol.map((faq, i) => (
              <FAQItem key={faq.question} faq={faq} idx={i} />
            ))}
          </div>
          <div>
            {rightCol.map((faq, i) => (
              <FAQItem key={faq.question} faq={faq} idx={i + half} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ConsultationSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issueType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { mutate: submitConsultation, isPending } = useSubmitConsultation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.issueType ||
      !formData.message
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    submitConsultation(formData, {
      onSuccess: () => {
        setSubmitted(true);
        setFormData({ name: "", email: "", issueType: "", message: "" });
      },
      onError: () => {
        toast.error("Failed to submit. Please try again.");
      },
    });
  };

  return (
    <section id="contact" className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <p className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              Free Consultation
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight mb-6">
              GET LEGAL HELP TODAY
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Don't navigate the legal system alone. Our network of experienced
              attorneys is ready to evaluate your case and provide the expert
              guidance you deserve.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider">
                    Call Us
                  </p>
                  <p className="font-semibold">1-800-LEGAL-01</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider">
                    Email
                  </p>
                  <p className="font-semibold">TIWARIKAVYA192@GMAIL.COM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider">
                    Office
                  </p>
                  <p className="font-semibold">
                    123 Justice Ave, New York, NY 10001
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/10 rounded-2xl p-8 text-center"
                  data-ocid="contact.success_state"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-5">
                    <Scale className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Request Submitted!
                  </h3>
                  <p className="text-white/70 mb-6">
                    Thank you for reaching out. An attorney will contact you
                    within 24 hours to discuss your legal matter.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="bg-primary text-primary-foreground"
                  >
                    Submit Another Request
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-5"
                  data-ocid="contact.modal"
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-white text-sm font-medium"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      data-ocid="contact.input"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-white text-sm font-medium"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      data-ocid="contact.input"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white text-sm font-medium">
                      Legal Issue
                    </Label>
                    <Select
                      value={formData.issueType}
                      onValueChange={(v) =>
                        setFormData((prev) => ({ ...prev, issueType: v }))
                      }
                    >
                      <SelectTrigger
                        data-ocid="contact.select"
                        className="bg-white/10 border-white/20 text-white"
                      >
                        <SelectValue placeholder="Select an issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        {ISSUE_TYPES.map((issue) => (
                          <SelectItem key={issue} value={issue}>
                            {issue}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-white text-sm font-medium"
                    >
                      Describe Your Situation
                    </Label>
                    <Textarea
                      id="message"
                      rows={4}
                      placeholder="Please briefly describe your legal issue..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      data-ocid="contact.textarea"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isPending}
                    data-ocid="contact.submit_button"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-3 uppercase tracking-wide"
                  >
                    {isPending ? "Submitting..." : "Schedule Your Consultation"}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              Who We Are
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground mb-6">
              Committed to Access & Justice
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              BMP Tiwari Associates was founded on the belief that quality legal
              information should be available to everyone — not just those who
              can afford it. We bridge the gap between complex legal concepts
              and the everyday person.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our network of licensed attorneys contributes verified, up-to-date
              content across all major areas of law, ensuring you get accurate
              guidance you can trust.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "50+", label: "Practice Areas" },
                { value: "10K+", label: "Cases Supported" },
                { value: "98%", label: "Satisfaction Rate" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-extrabold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              {
                icon: Scale,
                title: "Expert Verified",
                desc: "All content reviewed by licensed attorneys",
              },
              {
                icon: Shield,
                title: "Confidential",
                desc: "Your information is always protected",
              },
              {
                icon: Users,
                title: "Nationwide Network",
                desc: "Attorneys in all 50 states",
              },
              {
                icon: Activity,
                title: "Always Current",
                desc: "Updated with the latest legal changes",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-card border border-border rounded-xl p-5 hover:border-primary transition-colors"
                >
                  <Icon className="h-7 w-7 text-primary mb-3" />
                  <h4 className="font-bold text-foreground text-sm mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scale className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold tracking-tight">
                BMP TIWARI <span className="text-primary">ASSOCIATES</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Your trusted source for legal information and attorney
              connections. Empowering individuals with the knowledge to navigate
              the legal system.
            </p>
            <div className="flex gap-3">
              {["FB", "TW", "LI"].map((s) => (
                <div
                  key={s}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold hover:bg-primary cursor-pointer transition-colors"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-sm mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .querySelector(link.href)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    data-ocid="footer.link"
                    className="text-white/60 text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-sm mb-5">
              Legal Disclaimer
            </h4>
            <p className="text-white/50 text-xs leading-relaxed">
              The information provided on this website is for general
              informational purposes only and does not constitute legal advice.
              No attorney-client relationship is formed by accessing this site.
              Laws vary by jurisdiction and may change. Always consult a
              qualified attorney for advice specific to your situation.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            &copy; {year} BMP Tiwari Associates. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Toaster richColors position="top-right" />
      <Navbar />
      <main>
        <HeroSection />
        <PracticeAreasSection />
        <ResourcesSection />
        <FAQSection />
        <AboutSection />
        <ConsultationSection />
      </main>
      <Footer />
    </div>
  );
}
