import { NextResponse } from "next/server";
import { ApiError } from "./apiError";
import { jsonResponse } from "./apiResponse";
import axios from "axios";

export async function handleApi(fn: () => Promise<any>) {
    try {
        const result = await fn();
        return NextResponse.json(result);
    } catch (err: any) {
        if (err instanceof ApiError) {
            await axios.post("/api/log", { message: `[API ${err.status}] ${err.message}`, level: "warn" , source: "servererror"});
            return jsonResponse({ error: err.message }, err.status);
        }
        await axios.post("/api/log", { message: `[API 500] ${err.message || String(err)}`, level: "error", source: "servererror"});
        return jsonResponse({ error: "Internal server error" }, 500);
    }
}