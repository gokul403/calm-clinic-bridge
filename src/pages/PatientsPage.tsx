import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import DashboardLayout from "@/components/DashboardLayout";
import PatientProfileCard from "@/components/PatientProfileCard";
import { Input } from "@/components/ui/input";
import { mockPatients } from "@/lib/mock-data";
import { Search } from "lucide-react";

export default function PatientsPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  if (!user) return null;

  const canUnmask = user.role === "super_admin" || user.role === "admin" || user.role === "therapist";
  const filtered = mockPatients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.diagnosis.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              {user.role === "therapist" ? "My Patients" : "All Patients"}
            </h1>
            <p className="text-muted-foreground mt-1">{filtered.length} patients found</p>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patients..."
              className="pl-9"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filtered.map((patient) => (
            <PatientProfileCard key={patient.id} patient={patient} canUnmask={canUnmask} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
