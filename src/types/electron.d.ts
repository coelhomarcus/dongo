export interface ElectronAPI {
    makeRequest: (
        method: string,
        url: string,
        data?: unknown,
        headers?: Record<string, string>
    ) => Promise<{
        success: boolean;
        status: number;
        statusText: string;
        headers: Record<string, string>;
        data: unknown;
        error?: string;
        responseTime?: number;
        responseSize?: number;
    }>;

    // Controles da janela
    windowMinimize: () => Promise<void>;
    windowMaximize: () => Promise<void>;
    windowClose: () => Promise<void>;
    windowIsMaximized: () => Promise<boolean>;
}

declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
}
