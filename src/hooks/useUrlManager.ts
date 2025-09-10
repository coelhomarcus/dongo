import { useState } from "react";
import type { QueryParam } from "../types/index";

export const useUrlManager = () => {
    const [baseUrl, setBaseUrl] = useState("https://jsonplaceholder.typicode.com/todos/1");
    const [displayUrl, setDisplayUrl] = useState("");

    // Função para normalizar URL (adicionar http:// se necessário)
    const normalizeUrl = (url: string): string => {
        const trimmedUrl = url.trim();
        if (!trimmedUrl) return trimmedUrl;

        // Verificar se já tem protocolo
        if (trimmedUrl.match(/^https?:\/\//i)) {
            return trimmedUrl;
        }

        // Se não tem protocolo, adicionar http://
        return `http://${trimmedUrl}`;
    };

    // Atualizar a URL exibida quando os parâmetros mudarem
    const updateDisplayUrl = (queryParams: QueryParam[]) => {
        try {
            // Filtrar parâmetros habilitados que tenham pelo menos o nome preenchido
            const enabledParams = queryParams.filter((param) => param.enabled && param.name.trim());

            if (enabledParams.length > 0 && baseUrl.trim()) {
                try {
                    // Tentar criar URL com a base original primeiro
                    const urlObj = new URL(baseUrl);

                    // Limpar parâmetros existentes
                    urlObj.search = "";

                    // Adicionar novos parâmetros
                    enabledParams.forEach((param) => {
                        const paramName = param.name.trim();
                        const paramValue = param.value.trim() || ""; // Usar string vazia se não houver valor
                        urlObj.searchParams.append(paramName, paramValue);
                    });

                    setDisplayUrl(urlObj.toString());
                } catch {
                    // Se falhar, tentar com URL normalizada
                    try {
                        const normalizedUrl = normalizeUrl(baseUrl);
                        const urlObj = new URL(normalizedUrl);

                        urlObj.search = "";
                        enabledParams.forEach((param) => {
                            const paramName = param.name.trim();
                            const paramValue = param.value.trim() || "";
                            urlObj.searchParams.append(paramName, paramValue);
                        });

                        setDisplayUrl(urlObj.toString());
                    } catch {
                        // Se ainda falhar, manter URL original
                        setDisplayUrl(baseUrl);
                    }
                }
            } else {
                setDisplayUrl(baseUrl);
            }
        } catch {
            // Se a URL base não for válida, manter como está
            setDisplayUrl(baseUrl);
        }
    };

    return {
        baseUrl,
        setBaseUrl,
        displayUrl,
        setDisplayUrl,
        normalizeUrl,
        updateDisplayUrl,
    };
};
