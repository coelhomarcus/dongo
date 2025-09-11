import { useState } from "react";

interface AlertState {
    isOpen: boolean;
    title?: string;
    description: string;
}

export const useAlert = () => {
    const [alertState, setAlertState] = useState<AlertState>({
        isOpen: false,
        description: "",
    });

    const showAlert = (description: string, title?: string) => {
        setAlertState({
            isOpen: true,
            description,
            title,
        });
    };

    const hideAlert = () => {
        setAlertState({
            isOpen: false,
            description: "",
        });
    };

    return {
        alertState,
        showAlert,
        hideAlert,
    };
};
