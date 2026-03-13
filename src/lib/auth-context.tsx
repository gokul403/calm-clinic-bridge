import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "super_admin" | "admin" | "therapist" | "patient";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

const HARDCODED_USERS: Record<string, User> = {
  "super@therapy.com": { id: "1", email: "super@therapy.com", name: "Dr. Eleanor Voss", role: "super_admin" },
  "admin@therapy.com": { id: "2", email: "admin@therapy.com", name: "Marcus Chen", role: "admin" },
  "therapist@therapy.com": { id: "3", email: "therapist@therapy.com", name: "Dr. Sarah Mitchell", role: "therapist" },
  "patient@therapy.com": { id: "4", email: "patient@therapy.com", name: "James Holloway", role: "patient" },
};

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => boolean;
  signUp: (email: string, password: string, name: string, role: UserRole) => boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = (email: string, _password: string) => {
    const found = HARDCODED_USERS[email.toLowerCase()];
    if (found) {
      setUser(found);
      return true;
    }
    // Allow any email with password "demo123"
    if (_password === "demo123") {
      setUser({ id: "99", email, name: email.split("@")[0], role: "patient" });
      return true;
    }
    return false;
  };

  const signUp = (email: string, _password: string, name: string, role: UserRole) => {
    setUser({ id: Date.now().toString(), email, name, role });
    return true;
  };

  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
