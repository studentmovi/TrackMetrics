"use client";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import InputField from "@/component/InputField/InputField";
import { sanitizeText } from "@/utils/sanitize";
import styles from "./LoginForm.module.scss";

export default function LoginForm() {
    const { login, loading } = useAuth();
    const [loginValue, setLoginValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [loginError, setLoginError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);

    const handleSubmit = async () => {
        // Reset errors
        setLoginError(null);
        setPasswordError(null);
        setServerError(null);

        let hasError = false;

        // Validation simple côté client
        if (!loginValue || loginValue.length < 3) {
            setLoginError("Le nom d'utilisateur doit comporter au moins 3 caractères");
            hasError = true;
        }
        if (!passwordValue || passwordValue.length < 4) {
            setPasswordError("Le mot de passe doit comporter au moins 4 caractères");
            hasError = true;
        }
        if (hasError) return;

        // Sanitize
        const loginSanitized = sanitizeText(loginValue);
        const passwordSanitized = sanitizeText(passwordValue);

        // Appel AuthContext
        const result = await login(loginSanitized, passwordSanitized);
        if (!result.success) setServerError(result.message || "Échec de la connexion");
    };

    return (
        <div className={styles.container}>
            <InputField
                label="Login"
                value={loginValue}
                onChange={setLoginValue}
                placeholder="Entrez votre login"
            />
            {loginError && <div className={styles.errorBadge}>{loginError}</div>}

            <InputField
                label="Password"
                type="password"
                value={passwordValue}
                onChange={setPasswordValue}
                placeholder="Entrez votre mot de passe"
            />
            {passwordError && <div className={styles.errorBadge}>{passwordError}</div>}

            {serverError && <div className={styles.errorBadge}>{serverError}</div>}

            <button onClick={handleSubmit} className={styles.loginBtn} disabled={loading}>
                {loading ? "Loading..." : "Se connecter"}
            </button>

            <button className={styles.registerBtn}>Créer un compte</button>
        </div>
    );
}
