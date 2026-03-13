import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockSessions } from "@/lib/mock-data";
import { Video, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SessionsPage() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Sessions</h1>

        <Card className="shadow-soft border-border">
          <CardHeader>
            <CardTitle className="font-display">All Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockSessions.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-4 rounded-lg bg-sage-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sage-200 flex items-center justify-center">
                      {s.type === "Video" ? <Video className="w-5 h-5 text-sage-700" /> : <MessageSquare className="w-5 h-5 text-sage-700" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{s.patient} — {s.therapist}</p>
                      <p className="text-xs text-muted-foreground">{s.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={s.status === "scheduled" ? "default" : "secondary"}>{s.status}</Badge>
                    {s.status === "scheduled" && (
                      <Button size="sm" onClick={() => navigate("/dashboard/video")}>Join</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
