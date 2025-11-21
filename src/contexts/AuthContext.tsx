"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { AuthRepository } from "@/repositories/AuthRepository";

interface AuthContextType {
    login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => useContext(AuthContext)!;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(false);
    const repo = new AuthRepository();

    const login = async (email: string, password: string) => {
        setLoading(true);
        const result = await repo.login(email, password);
        setLoading(false);
        return result;
    };

    return <AuthContext.Provider value={{ login, loading }}>{children}</AuthContext.Provider>;
};
