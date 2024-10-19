"use client";
import { parseJwt } from "@/lib/utils";
import { UserDto } from "@/types/saeki/user.dto";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextProps = {
  user: UserDto | null;
  logOut: () => void;
};

const AuthContext = createContext<AuthContextProps>({} as any);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<UserDto | null>(null);

  function logOut() {
    router.push("/auth/logout");
  }

  useEffect(() => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`token=`))
        ?.split("=")[1];
      if (!token) {
        router.push("/auth/login");
        return;
      }
      const parsedJwt = parseJwt(token);
      const user = new UserDto(parsedJwt.user);
      setUser(user);
    } catch {
      router.refresh();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
