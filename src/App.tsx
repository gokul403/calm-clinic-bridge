import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth-context";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import PatientsPage from "./pages/PatientsPage";
import SessionsPage from "./pages/SessionsPage";
import MessagesPage from "./pages/MessagesPage";
import VideoRoom from "./pages/VideoRoom";
import FinancialsPage from "./pages/FinancialsPage";
import TherapistsPage from "./pages/TherapistsPage";
import AccessControlPage from "./pages/AccessControlPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/patients" element={<PatientsPage />} />
            <Route path="/dashboard/sessions" element={<SessionsPage />} />
            <Route path="/dashboard/messages" element={<MessagesPage />} />
            <Route path="/dashboard/video" element={<VideoRoom />} />
            <Route path="/dashboard/financials" element={<FinancialsPage />} />
            <Route path="/dashboard/therapists" element={<TherapistsPage />} />
            <Route path="/dashboard/access" element={<AccessControlPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
