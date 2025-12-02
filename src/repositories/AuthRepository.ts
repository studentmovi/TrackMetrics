import { ApiRequestRepo } from "@/utils/RequestApi";

export class AuthRepository {
    async login(emailOrUser: string, password: string) {
        try {
            const res = await ApiRequestRepo.AuthUser(emailOrUser, password);
            return { success: true, data: res.data };
        } catch (err: any) {
            return { success: false, message: err?.response?.data?.message || "Erreur réseau" };
        }
    }

    async register(email: string, username: string, password: string) {
        try {
            const res = await ApiRequestRepo.RegisterUser(email, username, password);
            return { success: true, data: res.data };
        } catch (err: any) {
            return { success: false, message: err?.response?.data?.error || "Erreur réseau" };
        }
    }
}
