import { useState } from "react";
import type { QueryParam } from "../types/index";

export const useQueryParams = () => {
    const [queryParams, setQueryParams] = useState<QueryParam[]>([{ id: "1", name: "", value: "", enabled: true }]);

    const addQueryParam = () => {
        const newParam: QueryParam = {
            id: Date.now().toString(),
            name: "",
            value: "",
            enabled: true,
        };
        setQueryParams((prev) => [...prev, newParam]);
    };

    const updateQueryParam = (id: string, field: keyof QueryParam, value: string | boolean) => {
        setQueryParams((prev) => prev.map((param) => (param.id === id ? { ...param, [field]: value } : param)));
    };

    const removeQueryParam = (id: string) => {
        setQueryParams((prev) => prev.filter((param) => param.id !== id));
    };

    return {
        queryParams,
        addQueryParam,
        updateQueryParam,
        removeQueryParam,
    };
};
