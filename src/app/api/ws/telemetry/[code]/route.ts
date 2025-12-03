import { NextRequest } from "next/server";

const sessions: Record<string, Set<WebSocket>> = {};

export function GET(req: NextRequest, context: any) {
    const { code } = context.params;

    const { socket } = new Response(null, {
        status: 101,
        webSocket: true
    }) as any;

    if (!sessions[code]) sessions[code] = new Set();
    sessions[code].add(socket);

    socket.onclose = () => {
        sessions[code].delete(socket);
    };

    return new Response(null, {
        status: 101,
        webSocket: socket
    });
}

// Fonction utilitaire pour broadcast
export function broadcastTelemetry(code: string, data: any) {
    if (!sessions[code]) return;

    for (const ws of sessions[code]) {
        ws.send(JSON.stringify(data));
    }
}
