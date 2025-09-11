import { useState, useEffect } from "react";

export const useWindow = () => {
    const [isMaximized, setIsMaximized] = useState(false);

    const minimize = () => {
        if (window.electronAPI && window.electronAPI.windowMinimize) {
            window.electronAPI.windowMinimize();
        } else {
            console.error("electronAPI ou windowMinimize não está disponível");
        }
    };

    const maximize = () => {
        if (window.electronAPI && window.electronAPI.windowMaximize) {
            window.electronAPI.windowMaximize();
            setTimeout(async () => {
                if (window.electronAPI && window.electronAPI.windowIsMaximized) {
                    const maximized = await window.electronAPI.windowIsMaximized();
                    setIsMaximized(maximized);
                }
            }, 100);
        } else {
            console.error("electronAPI ou windowMaximize não está disponível");
        }
    };

    const close = () => {
        if (window.electronAPI && window.electronAPI.windowClose) {
            window.electronAPI.windowClose();
        } else {
            console.error("electronAPI ou windowClose não está disponível");
        }
    };

    useEffect(() => {
        const checkMaximized = async () => {
            if (window.electronAPI && window.electronAPI.windowIsMaximized) {
                const maximized = await window.electronAPI.windowIsMaximized();
                setIsMaximized(maximized);
            }
        };

        checkMaximized();
    }, []);

    return {
        isMaximized,
        minimize,
        maximize,
        close,
    };
};
