import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Monitor, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export default function VideoRoom() {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [inCall, setInCall] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Video Session</h1>

        <Card className="shadow-card border-border overflow-hidden">
          <div className="relative bg-sage-700 aspect-video flex items-center justify-center">
            {inCall ? (
              <>
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-sage-500 mx-auto flex items-center justify-center mb-4">
                    <span className="text-3xl font-display font-bold text-primary-foreground">SM</span>
                  </div>
                  <p className="text-primary-foreground font-medium">Dr. Sarah Mitchell</p>
                  <p className="text-primary-foreground/60 text-sm mt-1">Connected • 12:34</p>
                </div>

                {/* Self view */}
                <div className="absolute bottom-4 right-4 w-48 h-36 rounded-xl bg-sage-600 flex items-center justify-center border-2 border-primary-foreground/20">
                  {camOn ? (
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-sage-500 mx-auto flex items-center justify-center">
                        <span className="text-sm font-bold text-primary-foreground">You</span>
                      </div>
                    </div>
                  ) : (
                    <VideoOff className="w-8 h-8 text-primary-foreground/40" />
                  )}
                </div>
              </>
            ) : (
              <div className="text-center">
                <Video className="w-16 h-16 text-primary-foreground/30 mx-auto mb-4" />
                <p className="text-primary-foreground/70 text-lg font-display">Ready to start your session</p>
                <p className="text-primary-foreground/40 text-sm mt-1">Click "Start Call" to begin</p>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 p-6 bg-card">
            <Button
              variant="outline"
              size="icon"
              className={cn("rounded-full w-12 h-12", !micOn && "bg-destructive text-destructive-foreground border-destructive")}
              onClick={() => setMicOn(!micOn)}
            >
              {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn("rounded-full w-12 h-12", !camOn && "bg-destructive text-destructive-foreground border-destructive")}
              onClick={() => setCamOn(!camOn)}
            >
              {camOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
              <Monitor className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
              <MessageSquare className="w-5 h-5" />
            </Button>

            {inCall ? (
              <Button
                variant="destructive"
                size="icon"
                className="rounded-full w-14 h-14"
                onClick={() => setInCall(false)}
              >
                <PhoneOff className="w-6 h-6" />
              </Button>
            ) : (
              <Button
                className="rounded-full px-8 h-12"
                onClick={() => setInCall(true)}
              >
                Start Call
              </Button>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
