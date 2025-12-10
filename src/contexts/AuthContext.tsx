"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

import { AuthRepository } from "@/repositories/AuthRepository";

interface AuthContextType {
    user: any | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => useContext(AuthContext)!;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const repo = new AuthRepository();

    // 🔥 Charger token + user au démarrage
    useEffect(() => {
        const t = localStorage.getItem("tm_token");
        if (t) {
            setToken(t);
            loadUser(t);
        } else {
            setLoading(false);
        }
    }, []);

    const loadUser = async (tk: string) => {
        try {
            const res = await fetch("/api/auth/myuser", {
                headers: { Authorization: `Bearer ${tk}` },
            });

            const json = await res.json();
            if (res.ok) {
                setUser(json);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    // 🟦 LOGIN
    const login = async (email: string, password: string) => {
        setLoading(true);
        const result = await repo.login(email, password);

        if (result.success && result.token) {
            localStorage.setItem("tm_token", result.token);
            setToken(result.token);
            await loadUser(result.token);
        } else {
            setLoading(false);
        }

        return result;
    };

    // 🟥 LOGOUT
    const logout = () => {
        localStorage.removeItem("tm_token");
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
