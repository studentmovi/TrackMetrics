"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import InputField from "@/components/InputField/InputField";
import { sanitizeText } from "@/utils/sanitize";
import { useRouter } from "next/navigation";
import styles from "./LoginForm.module.scss";

export default function LoginForm() {
    const { login, register, loading } = useAuth();
    const router = useRouter();

    // ---- LOGIN ----
    const [loginValue, setLoginValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const [loginError, setLoginError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);

    // ---- REGISTER MODAL ----
    const [showRegister, setShowRegister] = useState(false);
    const [regEmail, setRegEmail] = useState("");
    const [regUsername, setRegUsername] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regError, setRegError] = useState<string | null>(null);

    const handleSubmit = async () => {
        setLoginError(null);
        setPasswordError(null);
        setServerError(null);

        let hasError = false;

        if (!loginValue || loginValue.length < 3) {
            setLoginError("Le nom d'utilisateur doit comporter au moins 3 caractères");
            hasError = true;
        }
        if (!passwordValue || passwordValue.length < 4) {
            setPasswordError("Le mot de passe doit comporter au moins 4 caractères");
            hasError = true;
        }
        if (hasError) return;

        const result = await login(
            sanitizeText(loginValue),
            sanitizeText(passwordValue)
        );

        if (!result.success)
            return setServerError(result.message || "Échec de la connexion");

        // Redirect si login OK
        router.push("/historic");
    };

    const handleRegister = async () => {
        setRegError(null);

        const res = await register(
            sanitizeText(regEmail),
            sanitizeText(regUsername),
            sanitizeText(regPassword)
        );

        if (!res.success) {
            setRegError(res.message || "Erreur lors de l'inscription");
            return;
        }

        // Fermeture du modal
        setShowRegister(false);
    };

    return (
        <div className={styles.container}>
            {/* --- LOGIN FORM --- */}
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

            <button
                className={styles.registerBtn}
                onClick={() => setShowRegister(true)}
            >
                Créer un compte
            </button>

            {/* --- REGISTER MODAL --- */}
            {showRegister && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2>Créer un compte</h2>

                        <InputField
                            label="Email"
                            value={regEmail}
                            onChange={setRegEmail}
                            placeholder="ex: exemple@mail.com"
                        />

                        <InputField
                            label="Username"
                            value={regUsername}
                            onChange={setRegUsername}
                            placeholder="Nom d'utilisateur"
                        />

                        <InputField
                            label="Mot de passe"
                            type="password"
                            value={regPassword}
                            onChange={setRegPassword}
                            placeholder="Mot de passe"
                        />

                        {regError && <div className={styles.errorBadge}>{regError}</div>}

                        <button
                            className={styles.loginBtn}
                            disabled={loading}
                            onClick={handleRegister}
                        >
                            {loading ? "..." : "S'inscrire"}
                        </button>

                        <button
                            className={styles.cancelBtn}
                            onClick={() => setShowRegister(false)}
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
