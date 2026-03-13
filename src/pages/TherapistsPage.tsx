import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockTherapists } from "@/lib/mock-data";
import { Star } from "lucide-react";

export default function TherapistsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Therapists</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockTherapists.map((t) => (
            <Card key={t.id} className="shadow-soft border-border">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-sage-200 flex items-center justify-center">
                      <span className="text-lg font-bold text-sage-700">{t.name.split(" ").slice(-1)[0][0]}</span>
                    </div>
                    <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-card ${
                      t.status === "online" ? "bg-status-online" : t.status === "busy" ? "bg-status-busy" : "bg-status-offline"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-display font-semibold text-foreground">{t.name}</h3>
                    <p className="text-sm text-muted-foreground">{t.specialty}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                        <span className="text-sm font-medium text-foreground">{t.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{t.patients} patients</span>
                      <Badge variant={t.status === "online" ? "default" : "secondary"} className="capitalize">
                        {t.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
