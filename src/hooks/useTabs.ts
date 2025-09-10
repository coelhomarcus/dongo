import { useState } from "react";

export const useTabs = (initialTab: string = "Params") => {
    const [activeTab, setActiveTab] = useState(initialTab);

    return {
        activeTab,
        setActiveTab,
    };
};
