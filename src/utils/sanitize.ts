import sanitizeHtml from "sanitize-html";

export const sanitizeText = (text: string | undefined | null): string => {
    if (!text) return "";
    return sanitizeHtml(text, {
        allowedTags: [],        // aucun tag HTML
        allowedAttributes: {},  // aucun attribut
        allowedSchemes: [],     // pas de URL javascript/xss
    }).trim();
};
