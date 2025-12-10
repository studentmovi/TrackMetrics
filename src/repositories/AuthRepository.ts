export class AuthRepository {

    async login(login: string, password: string) {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ login, password }),
            });

            const json = await res.json();

            if (!res.ok) {
                return { success: false, message: json.error || "Identifiants invalides" };
            }

            // 👉 ON RENVOIE LE TOKEN pour que le AuthProvider l'utilise
            return {
                success: true,
                token: json.token,
                user: json.user,
            };

        } catch (e: any) {
            return { success: false, message: e.message || "Erreur réseau" };
        }
    }

    async register(email: string, username: string, password: string) {
        try {
            const res = await ApiRequestRepo.RegisterUser(email, username, password);
            return { success: true, data: res.data };

        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.error || "Erreur réseau"
            };
        }
    }

    logout() {
        localStorage.removeItem("tm_token");
        localStorage.removeItem("tm_user");
    }
}
