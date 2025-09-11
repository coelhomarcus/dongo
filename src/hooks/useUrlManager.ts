import { useState } from "react";
import type { QueryParam } from "../types/index";

export const useUrlManager = () => {
    const [baseUrl, setBaseUrl] = useState("");
    const [displayUrl, setDisplayUrl] = useState("");

    const normalizeUrl = (url: string): string => {
        const trimmedUrl = url.trim();
        if (!trimmedUrl) return trimmedUrl;

        if (trimmedUrl.match(/^https?:\/\//i)) {
            return trimmedUrl;
        }

        return `http://${trimmedUrl}`;
    };

    const updateDisplayUrl = (queryParams: QueryParam[]) => {
        try {
            const enabledParams = queryParams.filter((param) => param.enabled && param.name.trim());

            if (enabledParams.length > 0 && baseUrl.trim()) {
                try {
                    const urlObj = new URL(baseUrl);

                    urlObj.search = "";

                    enabledParams.forEach((param) => {
                        const paramName = param.name.trim();
                        const paramValue = param.value.trim() || "";
                        urlObj.searchParams.append(paramName, paramValue);
                    });

                    setDisplayUrl(urlObj.toString());
                } catch {
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
                        setDisplayUrl(baseUrl);
                    }
                }
            } else {
                setDisplayUrl(baseUrl);
            }
        } catch {
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
