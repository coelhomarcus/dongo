import { useState } from "react";

interface BodyEditorProps {
    value: string;
    onChange: (value: string) => void;
    method: string;
    disabled?: boolean;
}

const BodyEditor = ({ value, onChange, method, disabled = false }: BodyEditorProps) => {
    const [bodyError, setBodyError] = useState("");

    // Função para formatar JSON (Pretty)
    const formatBodyJson = () => {
        if (!value.trim()) return;

        try {
            const parsed = JSON.parse(value);
            const formatted = JSON.stringify(parsed, null, 2);
            onChange(formatted);
            setBodyError("");
        } catch {
            setBodyError("JSON inválido - não foi possível formatar");
        }
    };

    // Função para validar JSON em tempo real
    const validateJson = (jsonString: string) => {
        if (!jsonString.trim()) {
            setBodyError("");
            return;
        }

        try {
            JSON.parse(jsonString);
            setBodyError("");
        } catch {
            setBodyError("JSON inválido");
        }
    };

    // Função para lidar com mudanças no body
    const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        onChange(newValue);
        validateJson(newValue);
    };

    // Função para lidar com teclas especiais no body
    const handleBodyKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const textarea = e.currentTarget;
        const { selectionStart, selectionEnd, value: currentValue } = textarea;

        // Mapeamento de caracteres de abertura e fechamento
        const pairs: Record<string, string> = {
            "{": "}",
            "[": "]",
        };

        // Ctrl/Cmd + D para duplicar linha
        if ((e.ctrlKey || e.metaKey) && e.key === "d") {
            e.preventDefault();

            const lines = currentValue.split("\n");
            const currentLineIndex = currentValue.slice(0, selectionStart).split("\n").length - 1;
            const currentLine = lines[currentLineIndex];

            lines.splice(currentLineIndex + 1, 0, currentLine);
            const newValue = lines.join("\n");

            onChange(newValue);
            validateJson(newValue);

            // Mover cursor para a linha duplicada
            setTimeout(() => {
                const newPosition = selectionStart + currentLine.length + 1;
                textarea.setSelectionRange(newPosition, newPosition);
            }, 0);
            return;
        }

        // Se o usuário digitou um caractere de abertura
        if (pairs[e.key] && selectionStart === selectionEnd) {
            e.preventDefault();

            const newValue =
                currentValue.slice(0, selectionStart) + e.key + pairs[e.key] + currentValue.slice(selectionEnd);

            onChange(newValue);
            validateJson(newValue);

            // Posicionar o cursor entre os caracteres
            setTimeout(() => {
                textarea.setSelectionRange(selectionStart + 1, selectionStart + 1);
            }, 0);
        }

        // Auto-indentação para Enter após {
        else if (e.key === "Enter" && selectionStart > 0) {
            const charBefore = currentValue[selectionStart - 1];
            const charAfter = currentValue[selectionStart];

            if (charBefore === "{" && charAfter === "}") {
                e.preventDefault();

                // Calcular indentação atual
                const lines = currentValue.slice(0, selectionStart).split("\n");
                const currentLine = lines[lines.length - 1];
                const indent = currentLine.match(/^\s*/)?.[0] || "";

                const newValue =
                    currentValue.slice(0, selectionStart) +
                    "\n" +
                    indent +
                    "  " +
                    "\n" +
                    indent +
                    currentValue.slice(selectionEnd);

                onChange(newValue);
                validateJson(newValue);

                // Posicionar o cursor na linha com indentação
                setTimeout(() => {
                    const newPosition = selectionStart + 1 + indent.length + 2;
                    textarea.setSelectionRange(newPosition, newPosition);
                }, 0);
            }
        }

        // Tab para indentação
        else if (e.key === "Tab") {
            e.preventDefault();

            const newValue = currentValue.slice(0, selectionStart) + "  " + currentValue.slice(selectionEnd);

            onChange(newValue);

            // Mover cursor após a indentação
            setTimeout(() => {
                textarea.setSelectionRange(selectionStart + 2, selectionStart + 2);
            }, 0);
        }
    };

    const isDisabled = disabled || method === "GET" || method === "DELETE";

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-muted-foreground">JSON</label>
                <button
                    onClick={formatBodyJson}
                    className="px-2 text-xs bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md transition-colors disabled:opacity-0"
                    disabled={isDisabled}
                >
                    Pretty
                </button>
            </div>
            <textarea
                className={`w-full h-32 p-2 border border-border bg-background text-foreground rounded-md resize-none font-mono text-sm outline-0 focus:ring-2 focus:ring-ring ${
                    isDisabled ? "opacity-50 cursor-not-allowed" : ""
                } ${bodyError ? "border-destructive" : ""}`}
                placeholder={isDisabled ? "Body não é usado em requisições " + method : "Raw Request Body"}
                value={value}
                onChange={handleBodyChange}
                onKeyDown={handleBodyKeyDown}
                disabled={isDisabled}
            />
            {bodyError && <div className="text-destructive text-xs mt-1">{bodyError}</div>}
        </div>
    );
};

export default BodyEditor;
