import { useState, useEffect } from "react";

export const useWindow = () => {
    const [isMaximized, setIsMaximized] = useState(false);

    const minimize = () => {
        console.log("Tentando minimizar...", window.electronAPI);
        if (window.electronAPI && window.electronAPI.windowMinimize) {
            window.electronAPI.windowMinimize();
        } else {
            console.error("electronAPI ou windowMinimize não está disponível");
        }
    };

    const maximize = () => {
        console.log("Tentando maximizar...", window.electronAPI);
        if (window.electronAPI && window.electronAPI.windowMaximize) {
            window.electronAPI.windowMaximize();
            // Atualizar o estado após maximizar/restaurar
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
        console.log("Tentando fechar...", window.electronAPI);
        if (window.electronAPI && window.electronAPI.windowClose) {
            window.electronAPI.windowClose();
        } else {
            console.error("electronAPI ou windowClose não está disponível");
        }
    };

    // Verificar estado inicial
    useEffect(() => {
        const checkMaximized = async () => {
            console.log("Verificando estado inicial...", window.electronAPI);
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
