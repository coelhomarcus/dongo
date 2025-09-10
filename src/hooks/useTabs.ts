import { useState } from "react";

export const useTabs = (initialTab: string = "Body") => {
    const [activeTab, setActiveTab] = useState(initialTab);

    return {
        activeTab,
        setActiveTab,
    };
};
