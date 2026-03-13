import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Shield, Eye, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

const permissions = [
  { role: "Super Admin", canViewPatients: true, canEditPatients: true, canUnmask: true, canManageUsers: true, canViewFinancials: true, canDelete: true },
  { role: "Admin", canViewPatients: true, canEditPatients: true, canUnmask: true, canManageUsers: false, canViewFinancials: true, canDelete: false },
  { role: "Therapist", canViewPatients: true, canEditPatients: true, canUnmask: true, canManageUsers: false, canViewFinancials: false, canDelete: false },
  { role: "Patient", canViewPatients: false, canEditPatients: false, canUnmask: false, canManageUsers: false, canViewFinancials: false, canDelete: false },
];

export default function AccessControlPage() {
  const [perms, setPerms] = useState(permissions);

  const toggle = (roleIdx: number, key: string) => {
    setPerms(prev => prev.map((p, i) =>
      i === roleIdx ? { ...p, [key]: !(p as any)[key] } : p
    ));
  };

  const permKeys = [
    { key: "canViewPatients", label: "View Patients", icon: Eye },
    { key: "canEditPatients", label: "Edit Patients", icon: Edit },
    { key: "canUnmask", label: "Unmask Data", icon: Shield },
    { key: "canManageUsers", label: "Manage Users", icon: Shield },
    { key: "canViewFinancials", label: "View Financials", icon: Eye },
    { key: "canDelete", label: "Delete Records", icon: Trash2 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Access Control</h1>
          <p className="text-muted-foreground mt-1">Manage role-based permissions</p>
        </div>

        <Card className="shadow-soft border-border overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-sage-50">
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wide p-4">Permission</th>
                    {perms.map((p) => (
                      <th key={p.role} className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wide p-4">
                        {p.role}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {permKeys.map(({ key, label, icon: Icon }) => (
                    <tr key={key} className="border-b border-border last:border-0">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">{label}</span>
                        </div>
                      </td>
                      {perms.map((p, i) => (
                        <td key={p.role} className="p-4 text-center">
                          <Switch
                            checked={(p as any)[key]}
                            onCheckedChange={() => toggle(i, key)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
