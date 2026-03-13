import { useAuth } from "@/lib/auth-context";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockPatients, mockTherapists, mockFinancials, mockSessions, mockMessages } from "@/lib/mock-data";
import { Users, DollarSign, Calendar, TrendingUp, MessageSquare, Activity } from "lucide-react";
import { motion } from "framer-motion";

const statVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
};

export default function Dashboard() {
  const { user } = useAuth();
  if (!user) return null;

  const isClinical = user.role === "super_admin" || user.role === "admin";
  const isTherapist = user.role === "therapist";
  const isPatient = user.role === "patient";

  const stats = isClinical
    ? [
        { label: "Total Patients", value: mockPatients.length, icon: Users, color: "text-primary" },
        { label: "Active Therapists", value: mockTherapists.length, icon: Activity, color: "text-status-online" },
        { label: "Monthly Revenue", value: `$${mockFinancials.monthlyRevenue.toLocaleString()}`, icon: DollarSign, color: "text-accent" },
        { label: "Sessions This Week", value: mockSessions.length, icon: Calendar, color: "text-primary" },
      ]
    : isTherapist
    ? [
        { label: "My Patients", value: 18, icon: Users, color: "text-primary" },
        { label: "Today's Sessions", value: 3, icon: Calendar, color: "text-accent" },
        { label: "Unread Messages", value: mockMessages.filter(m => m.unread).length, icon: MessageSquare, color: "text-status-busy" },
        { label: "Completion Rate", value: "94%", icon: TrendingUp, color: "text-status-online" },
      ]
    : [
        { label: "Total Sessions", value: 12, icon: Calendar, color: "text-primary" },
        { label: "Next Session", value: "Mar 15", icon: Activity, color: "text-accent" },
        { label: "Messages", value: 2, icon: MessageSquare, color: "text-status-busy" },
        { label: "Progress", value: "78%", icon: TrendingUp, color: "text-status-online" },
      ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Welcome back, {user.name.split(" ")[0]}
          </h1>
          <p className="text-muted-foreground mt-1">Here's your overview for today</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} custom={i} initial="hidden" animate="visible" variants={statVariants}>
              <Card className="shadow-soft border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Sessions */}
          <Card className="shadow-soft border-border">
            <CardHeader>
              <CardTitle className="text-lg font-display">Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockSessions.filter(s => s.status === "scheduled").map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 rounded-lg bg-sage-50">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {isPatient ? session.therapist : session.patient}
                    </p>
                    <p className="text-xs text-muted-foreground">{session.date}</p>
                  </div>
                  <Badge variant="outline">{session.type}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Messages or Therapist List */}
          {(isTherapist || isPatient) ? (
            <Card className="shadow-soft border-border">
              <CardHeader>
                <CardTitle className="text-lg font-display">Recent Messages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3 p-3 rounded-lg bg-sage-50">
                    <div className="w-8 h-8 rounded-full bg-sage-200 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-sage-700">{msg.from[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">{msg.from}</p>
                        {msg.unread && <span className="w-2 h-2 rounded-full bg-accent" />}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{msg.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-soft border-border">
              <CardHeader>
                <CardTitle className="text-lg font-display">Therapist Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockTherapists.map((t) => (
                  <div key={t.id} className="flex items-center justify-between p-3 rounded-lg bg-sage-50">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-sage-200 flex items-center justify-center">
                          <span className="text-xs font-bold text-sage-700">{t.name.split(" ").slice(-1)[0][0]}</span>
                        </div>
                        <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${
                          t.status === "online" ? "bg-status-online" : t.status === "busy" ? "bg-status-busy" : "bg-status-offline"
                        }`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.specialty}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{t.patients} patients</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
