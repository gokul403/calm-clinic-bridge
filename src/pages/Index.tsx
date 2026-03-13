import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Video, Users } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Shield, title: "HIPAA Compliant", desc: "Patient data protected with role-based masking" },
    { icon: Video, title: "Video Sessions", desc: "Real-time video and chat counseling" },
    { icon: Users, title: "Tiered Access", desc: "Super Admin, Admin, Therapist & Patient roles" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-display font-bold text-foreground">MindBridge</span>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => navigate("/sign-in")}>Sign In</Button>
          <Button onClick={() => navigate("/sign-up")}>Get Started</Button>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto text-center px-6 pt-20 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground leading-tight">
            Where healing meets <span className="text-primary">technology</span>
          </h1>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            A secure platform connecting licensed therapists with patients through video, chat, and comprehensive clinical management.
          </p>
          <div className="flex gap-4 justify-center mt-10">
            <Button size="lg" onClick={() => navigate("/sign-up")}>Start Free Trial</Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/sign-in")}>Sign In</Button>
          </div>
        </motion.div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="p-6 rounded-2xl bg-card border border-border shadow-soft text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-sage-100 mx-auto flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
