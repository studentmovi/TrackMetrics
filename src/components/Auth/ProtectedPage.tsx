"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        if (loading) return; // Auth is still checking

        if (!user) {
            router.push("/login");
        } else {
            setAuthorized(true);
        }
    }, [user, loading, router]);

    if (loading || !authorized) {
        return <div className="loading">Chargement...</div>;
    }

    return <>{children}</>;
};
