"use client";
import { createContext, useContext, useState } from "react";

interface AuthContextType {
  needsEmailVerification: boolean;
  isThirdPartyAuthLoading: boolean;
  anonymousLoading: boolean;
  setAnonymousLoading: (value: boolean) => void;
  setThirdPartyAuthLoading: (value: boolean) => void;
  setNeedsEmailVerification: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  anonymousLoading: false,
  isThirdPartyAuthLoading: false,
  needsEmailVerification: false,
  setAnonymousLoading: () => {},
  setThirdPartyAuthLoading: () => {},
  setNeedsEmailVerification: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [anonymousLoading, setAnonymousLoading] = useState(false);;
   const [needsEmailVerification, setNeedsEmailVerification] = useState(false);
    const [isThirdPartyAuthLoading, setThirdPartyAuthLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        anonymousLoading,
        setAnonymousLoading,
        needsEmailVerification,
        setNeedsEmailVerification,
        isThirdPartyAuthLoading,
        setThirdPartyAuthLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
