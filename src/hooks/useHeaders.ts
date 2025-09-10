import { useState } from "react";
import type { HeaderItem } from "../types/index";

export const useHeaders = () => {
    const [headers, setHeaders] = useState<HeaderItem[]>([{ id: "1", name: "", value: "", enabled: true }]);

    const addHeader = () => {
        const newHeader: HeaderItem = {
            id: Date.now().toString(),
            name: "",
            value: "",
            enabled: true,
        };
        setHeaders((prev) => [...prev, newHeader]);
    };

    const updateHeader = (id: string, field: keyof HeaderItem, value: string | boolean) => {
        setHeaders((prev) => prev.map((header) => (header.id === id ? { ...header, [field]: value } : header)));
    };

    const removeHeader = (id: string) => {
        setHeaders((prev) => prev.filter((header) => header.id !== id));
    };

    return {
        headers,
        addHeader,
        updateHeader,
        removeHeader,
    };
};
