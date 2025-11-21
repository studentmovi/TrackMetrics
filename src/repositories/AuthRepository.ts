import { ApiRequestRepo } from "@/utils/RequestApi";
export class AuthRepository {
    async login(email: string, password: string) {
        try {
            const res = await ApiRequestRepo.AuthUser(email, password);
            return { success: true, data: res.data };
        } catch (err: any) {
            return { success: false, message: err?.response?.data?.message || "Erreur réseau" };
        }
    }
}