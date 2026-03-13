import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Video, Users, CheckCircle, ArrowRight, Star, Calendar, Brain, MessageSquare, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { mockTherapists } from "@/lib/mock-data";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Index = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const steps = [
    { icon: Users, step: "01", title: "Create Your Profile", desc: "Sign up and complete your mental health intake form securely." },
    { icon: Brain, step: "02", title: "Get Matched", desc: "Our system matches you with a licensed therapist based on your needs." },
    { icon: Calendar, step: "03", title: "Book a Session", desc: "Schedule a video or chat session at a time that works for you." },
    { icon: MessageSquare, step: "04", title: "Start Healing", desc: "Connect with your therapist and begin your journey to wellness." },
  ];

  const plans = [
    { name: "Starter", price: "$49", period: "/session", features: ["1 video session/week", "Chat messaging", "Progress tracking", "Session notes"], popular: false },
    { name: "Growth", price: "$149", period: "/month", features: ["4 video sessions/month", "Unlimited chat", "Priority scheduling", "Mood journaling", "Emergency support"], popular: true },
    { name: "Premium", price: "$299", period: "/month", features: ["8 video sessions/month", "Unlimited chat & video", "Dedicated therapist", "Family sessions", "24/7 crisis line", "Custom treatment plan"], popular: false },
  ];

  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="flex items-center justify-between px-6 md:px-10 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-foreground">MindBridge</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo("home")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</button>
            <button onClick={() => scrollTo("how-it-works")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</button>
            <button onClick={() => scrollTo("therapists")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Therapists</button>
            <button onClick={() => scrollTo("pricing")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</button>
            <button onClick={() => scrollTo("book")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Book a Session</button>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => navigate("/sign-in")}>Sign In</Button>
            <Button onClick={() => navigate("/sign-up")}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-50 via-background to-warm-50" />
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-100 text-sage-700 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Trusted by 2,000+ patients
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-[1.1] tracking-tight">
                Where healing meets <span className="text-primary italic">technology</span>
              </h1>
              <p className="text-lg text-muted-foreground mt-6 max-w-xl leading-relaxed">
                A secure, HIPAA-compliant platform connecting licensed therapists with patients through video, chat, and comprehensive clinical management.
              </p>
              <div className="flex flex-wrap gap-4 mt-10">
                <Button size="lg" className="h-12 px-8 text-base" onClick={() => scrollTo("book")}>
                  Book a Session <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base" onClick={() => scrollTo("how-it-works")}>
                  Learn More
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-10 pt-6 border-t border-border">
                <div><p className="text-2xl font-display font-bold text-foreground">500+</p><p className="text-sm text-muted-foreground">Licensed Therapists</p></div>
                <div className="w-px h-10 bg-border" />
                <div><p className="text-2xl font-display font-bold text-foreground">98%</p><p className="text-sm text-muted-foreground">Patient Satisfaction</p></div>
                <div className="w-px h-10 bg-border" />
                <div><p className="text-2xl font-display font-bold text-foreground">24/7</p><p className="text-sm text-muted-foreground">Support Available</p></div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="hidden lg:block">
              <div className="relative">
                <div className="rounded-3xl bg-card border border-border shadow-elevated p-8 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-sage-100 flex items-center justify-center">
                      <Video className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-foreground">Next Session</p>
                      <p className="text-sm text-muted-foreground">Today at 2:00 PM with Dr. Mitchell</p>
                    </div>
                  </div>
                  <div className="h-48 rounded-2xl bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center">
                    <div className="text-center">
                      <Video className="w-10 h-10 text-sage-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-sage-700">Session starts in 45 min</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1 rounded-xl bg-sage-50 p-4 text-center">
                      <p className="text-2xl font-display font-bold text-foreground">12</p>
                      <p className="text-xs text-muted-foreground">Sessions</p>
                    </div>
                    <div className="flex-1 rounded-xl bg-warm-50 p-4 text-center">
                      <p className="text-2xl font-display font-bold text-foreground">85%</p>
                      <p className="text-xs text-muted-foreground">Progress</p>
                    </div>
                    <div className="flex-1 rounded-xl bg-sage-50 p-4 text-center">
                      <p className="text-2xl font-display font-bold text-accent">↑ 12%</p>
                      <p className="text-xs text-muted-foreground">Mood</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "HIPAA Compliant", desc: "End-to-end encryption & role-based masking" },
              { icon: Video, title: "HD Video Sessions", desc: "Crystal-clear real-time video counseling" },
              { icon: Users, title: "Tiered Access", desc: "Super Admin, Admin, Therapist & Patient roles" },
            ].map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sage-100 flex items-center justify-center shrink-0">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">Your path to wellness in <span className="text-primary italic">4 simple steps</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div key={s.step} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}>
                <Card className="relative border-border shadow-soft hover:shadow-card transition-shadow h-full group">
                  <CardContent className="pt-8 pb-6 px-6">
                    <span className="absolute -top-4 left-6 text-5xl font-display font-bold text-sage-200 group-hover:text-primary/20 transition-colors">{s.step}</span>
                    <div className="w-12 h-12 rounded-xl bg-sage-100 flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                      <s.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-foreground mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Therapists */}
      <section id="therapists" className="py-24 bg-sage-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Our Team</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">Meet our <span className="text-primary italic">licensed therapists</span></h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Each therapist is vetted, licensed, and experienced in their specialty area.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockTherapists.map((t, i) => (
              <motion.div key={t.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}>
                <Card className="border-border shadow-soft hover:shadow-elevated transition-all hover:-translate-y-1 h-full">
                  <CardContent className="pt-8 pb-6 text-center">
                    <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-sage-200 to-sage-100 flex items-center justify-center mb-4">
                      <span className="text-2xl font-display font-bold text-sage-700">{t.name.split(" ").pop()?.[0]}</span>
                      <span className={`absolute bottom-0 right-1 w-4 h-4 rounded-full border-2 border-card ${
                        t.status === "online" ? "bg-status-online" : t.status === "busy" ? "bg-status-busy" : "bg-status-offline"
                      }`} />
                    </div>
                    <h3 className="text-base font-display font-semibold text-foreground">{t.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t.specialty}</p>
                    <div className="flex items-center justify-center gap-1 mt-3">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span className="text-sm font-medium text-foreground">{t.rating}</span>
                      <span className="text-xs text-muted-foreground ml-1">· {t.patients} patients</span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-4 w-full" onClick={() => scrollTo("book")}>Book Session</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">Simple, transparent <span className="text-primary italic">pricing</span></h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Choose a plan that fits your needs. Cancel anytime.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}>
                <Card className={`relative border-border h-full transition-all hover:-translate-y-1 ${plan.popular ? "shadow-elevated ring-2 ring-primary" : "shadow-soft hover:shadow-card"}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">Most Popular</div>
                  )}
                  <CardContent className="pt-8 pb-6 px-6">
                    <h3 className="text-lg font-display font-semibold text-foreground">{plan.name}</h3>
                    <div className="mt-4 mb-6">
                      <span className="text-4xl font-display font-bold text-foreground">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">{plan.period}</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button variant={plan.popular ? "default" : "outline"} className="w-full" onClick={() => navigate("/sign-up")}>
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Book a Session */}
      <section id="book" className="py-24 bg-sage-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Book Now</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">Schedule your <span className="text-primary italic">first session</span></h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Pick a date and time that works for you. Your first consultation is free.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
            <Card className="max-w-3xl mx-auto border-border shadow-elevated">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">Select a Therapist</label>
                    <div className="space-y-2">
                      {mockTherapists.filter(t => t.status === "online").map((t) => (
                        <div key={t.id} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-sage-50 cursor-pointer transition-colors">
                          <div className="w-10 h-10 rounded-full bg-sage-200 flex items-center justify-center">
                            <span className="text-sm font-bold text-sage-700">{t.name.split(" ").pop()?.[0]}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{t.name}</p>
                            <p className="text-xs text-muted-foreground">{t.specialty}</p>
                          </div>
                          <span className="w-2.5 h-2.5 rounded-full bg-status-online" />
                        </div>
                      ))}
                    </div>
                    <label className="text-sm font-medium text-foreground mb-3 block mt-6">Select a Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">Available Time Slots</label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                            selectedTime === time
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border text-foreground hover:bg-sage-50"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    <Button className="w-full mt-6 h-12 text-base" onClick={() => navigate("/sign-up")} disabled={!selectedTime}>
                      <Calendar className="w-4 h-4 mr-2" />
                      Confirm Booking
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-3">Free 30-minute initial consultation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-display font-bold text-foreground">MindBridge</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <button onClick={() => scrollTo("home")} className="hover:text-foreground transition-colors">Home</button>
              <button onClick={() => scrollTo("how-it-works")} className="hover:text-foreground transition-colors">How It Works</button>
              <button onClick={() => scrollTo("therapists")} className="hover:text-foreground transition-colors">Therapists</button>
              <button onClick={() => scrollTo("pricing")} className="hover:text-foreground transition-colors">Pricing</button>
            </div>
            <p className="text-sm text-muted-foreground">© 2026 MindBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
