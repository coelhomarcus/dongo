import { useState } from "react";
import type { ApiResponse, QueryParam, HeaderItem } from "../types/index";

export const useHttpRequest = () => {
    const [response, setResponse] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(false);

    const makeRequest = async (
        method: string,
        baseUrl: string,
        requestData: string,
        queryParams: QueryParam[],
        headers: HeaderItem[],
        normalizeUrl: (url: string) => string
    ) => {
        if (!baseUrl.trim()) {
            alert("Por favor, insira uma URL");
            return;
        }

        // Verificar se a API do Electron está disponível
        if (!window.electronAPI) {
            alert("API do Electron não está disponível. Certifique-se de que o preload script foi carregado.");
            setResponse({
                success: false,
                status: 0,
                statusText: "Electron API não disponível",
                headers: {},
                data: "A API do Electron não foi carregada corretamente",
                error: "window.electronAPI não está definido",
            });
            return;
        }

        setLoading(true);
        try {
            let parsedData = undefined;
            const parsedHeaders: Record<string, string> = {};
            let finalUrl = normalizeUrl(baseUrl);

            // Processar parâmetros da URL
            const enabledParams = queryParams.filter(
                (param) => param.enabled && param.name.trim() && param.value.trim()
            );
            if (enabledParams.length > 0) {
                const urlObj = new URL(finalUrl);

                enabledParams.forEach((param) => {
                    urlObj.searchParams.append(param.name.trim(), param.value.trim());
                });

                finalUrl = urlObj.toString();
            }

            // Parse do JSON do body (se houver)
            if (requestData.trim() && (method === "POST" || method === "PUT" || method === "PATCH")) {
                try {
                    parsedData = JSON.parse(requestData);
                } catch {
                    alert("JSON inválido no body da requisição");
                    setLoading(false);
                    return;
                }
            }

            // Parse dos headers da tabela
            const enabledHeaders = headers.filter(
                (header) => header.enabled && header.name.trim() && header.value.trim()
            );
            if (enabledHeaders.length > 0) {
                enabledHeaders.forEach((header) => {
                    parsedHeaders[header.name.trim()] = header.value.trim();
                });
            }

            const result = await window.electronAPI.makeRequest(method, finalUrl, parsedData, parsedHeaders);

            setResponse(result);
        } catch (error) {
            console.error("Erro ao fazer requisição:", error);
            setResponse({
                success: false,
                status: 0,
                statusText: "Erro interno",
                headers: {},
                data: `Erro: ${error instanceof Error ? error.message : String(error)}`,
                error: "Erro interno da aplicação",
            });
        } finally {
            setLoading(false);
        }
    };

    return {
        response,
        loading,
        makeRequest,
    };
};
