export interface ApiResponse {
    success: boolean;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    data: unknown;
    error?: string;
    responseTime?: number; // em milissegundos
    responseSize?: number; // em bytes
}

export interface QueryParam {
    id: string;
    name: string;
    value: string;
    enabled: boolean;
}

export interface HeaderItem {
    id: string;
    name: string;
    value: string;
    enabled: boolean;
}
