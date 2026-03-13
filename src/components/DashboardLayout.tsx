import { ReactNode } from "react";
import { useAuth } from "@/lib/auth-context";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Heart, LayoutDashboard, Users, Calendar, MessageSquare, DollarSign, Shield, Video, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const roleNavItems = {
  super_admin: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Therapists", icon: Users, path: "/dashboard/therapists" },
    { label: "Patients", icon: User, path: "/dashboard/patients" },
    { label: "Financials", icon: DollarSign, path: "/dashboard/financials" },
    { label: "Access Control", icon: Shield, path: "/dashboard/access" },
  ],
  admin: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Therapists", icon: Users, path: "/dashboard/therapists" },
    { label: "Patients", icon: User, path: "/dashboard/patients" },
    { label: "Financials", icon: DollarSign, path: "/dashboard/financials" },
  ],
  therapist: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "My Patients", icon: User, path: "/dashboard/patients" },
    { label: "Sessions", icon: Calendar, path: "/dashboard/sessions" },
    { label: "Messages", icon: MessageSquare, path: "/dashboard/messages" },
    { label: "Video Room", icon: Video, path: "/dashboard/video" },
  ],
  patient: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Sessions", icon: Calendar, path: "/dashboard/sessions" },
    { label: "Messages", icon: MessageSquare, path: "/dashboard/messages" },
    { label: "Video Room", icon: Video, path: "/dashboard/video" },
  ],
};

const roleLabels: Record<string, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  therapist: "Therapist",
  patient: "Patient",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) {
    navigate("/sign-in");
    return null;
  }

  const navItems = roleNavItems[user.role];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-6 border-b border-border">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-display font-bold text-foreground">MindBridge</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-sage-100 hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3 px-3">
            <div className="w-8 h-8 rounded-full bg-sage-200 flex items-center justify-center">
              <span className="text-xs font-bold text-sage-700">{user.name[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground">{roleLabels[user.role]}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted-foreground hover:text-destructive"
            onClick={() => { signOut(); navigate("/sign-in"); }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
