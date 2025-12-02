export class ApiError extends Error {
    status: number;

    constructor(message: string, status = 500) {
        super(message);
        this.status = status;
        this.name = "ApiError";
    }

    static badRequest(msg = "Bad Request") {
        throw new ApiError(msg, 400);
    }

    static unauthorized(msg = "Unauthorized") {
        throw new ApiError(msg, 401);
    }

    static forbidden(msg = "Forbidden") {
        throw new ApiError(msg, 403);
    }

    static notFound(msg = "Not Found") {
        throw new ApiError(msg, 404);
    }

    static serverError(msg = "Internal Server Error") {
        throw new ApiError(msg, 500);
    }
}