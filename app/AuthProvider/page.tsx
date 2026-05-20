"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<User | null>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const Page = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/me", {
        withCredentials: true,
      });
      setUser(res.data);
      return res.data;
    } catch (error) {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchUser();
    })();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      if (res.data.success) {
        setUser(res.data.user);
        router.push("/");
      }
      return res.data.user || null;
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/register",
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      if (res.data.success) {
        setUser(res.data.user);
      }
      return res.data.user || null;
    } catch (error) {
      console.error("Registration error:", error);
      return null;
    }
  };

  const logout = async () => {
    await axios.post(
      "http://localhost:5000/logout",
      {},
      {
        withCredentials: true,
      },
    );
    setUser(null);
    router.push("/Login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Page;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
