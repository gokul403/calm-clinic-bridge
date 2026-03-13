import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Shield, Calendar, Phone, Mail, MapPin, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PatientData {
  id: string;
  name: string;
  email: string;
  phone: string;
  ssn: string;
  dob: string;
  address: string;
  diagnosis: string;
  therapist: string;
  status: "active" | "inactive";
  nextSession: string;
  sessions: number;
  insurance: string;
  emergencyContact: string;
  notes: string;
}

interface Props {
  patient: PatientData;
  canUnmask?: boolean;
}

export default function PatientProfileCard({ patient, canUnmask = false }: Props) {
  const [isRevealed, setIsRevealed] = useState(false);

  const MaskedText = ({ children, sensitive = false }: { children: string; sensitive?: boolean }) => {
    if (!sensitive) return <span>{children}</span>;
    return (
      <span className={cn("transition-all duration-300 inline-block", !isRevealed && "blur-sm select-none")}>
        {children}
      </span>
    );
  };

  return (
    <Card className="shadow-card border-border overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-sage-200 flex items-center justify-center">
              <span className="text-lg font-bold text-sage-700">{patient.name.split(" ").map(n => n[0]).join("")}</span>
            </div>
            <div>
              <h3 className="text-lg font-display font-semibold text-foreground">{patient.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={patient.status === "active" ? "default" : "secondary"}>
                  {patient.status}
                </Badge>
                <span className="text-xs text-muted-foreground">{patient.sessions} sessions</span>
              </div>
            </div>
          </div>

          {canUnmask && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRevealed(!isRevealed)}
              className="gap-2"
            >
              {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {isRevealed ? "Mask" : "Reveal"}
            </Button>
          )}
        </div>

        {!canUnmask && (
          <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-lg bg-warm-100 text-sm text-accent">
            <Shield className="w-4 h-4" />
            <span>Sensitive data is protected. Contact admin for access.</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InfoRow icon={Mail} label="Email">
            <MaskedText sensitive>{patient.email}</MaskedText>
          </InfoRow>
          <InfoRow icon={Phone} label="Phone">
            <MaskedText sensitive>{patient.phone}</MaskedText>
          </InfoRow>
          <InfoRow icon={Calendar} label="Date of Birth">
            <MaskedText sensitive>{patient.dob}</MaskedText>
          </InfoRow>
          <InfoRow icon={MapPin} label="Address">
            <MaskedText sensitive>{patient.address}</MaskedText>
          </InfoRow>
        </div>

        <div className="border-t border-border pt-4 space-y-3">
          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Diagnosis</span>
            <p className="text-sm text-foreground mt-1">{patient.diagnosis}</p>
          </div>
          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Insurance</span>
            <p className="text-sm text-foreground mt-1">
              <MaskedText sensitive>{patient.insurance}</MaskedText>
            </p>
          </div>
          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Emergency Contact</span>
            <p className="text-sm text-foreground mt-1">
              <MaskedText sensitive>{patient.emergencyContact}</MaskedText>
            </p>
          </div>
          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">SSN</span>
            <p className="text-sm text-foreground mt-1">
              <MaskedText sensitive>{patient.ssn}</MaskedText>
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
            <div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Clinical Notes</span>
              <p className="text-sm text-foreground mt-1">{patient.notes}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoRow({ icon: Icon, label, children }: { icon: any; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="w-4 h-4 text-muted-foreground mt-0.5" />
      <div>
        <span className="text-xs text-muted-foreground">{label}</span>
        <p className="text-sm text-foreground">{children}</p>
      </div>
    </div>
  );
}
