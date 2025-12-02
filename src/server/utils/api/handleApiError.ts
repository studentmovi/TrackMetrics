import { NextResponse } from "next/server";
import { ApiResult } from "./apiResults";
export function handleApiError(
    err: any,
    defaultMessage: string,
    status = 500
): NextResponse {
    const response: ApiResult<null> = {
        success: false,
        error: defaultMessage,
    };

    return NextResponse.json(response,{ status });
}