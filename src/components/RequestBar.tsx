import { IoSend } from "react-icons/io5";
import { useEffect } from "react";

interface RequestBarProps {
    method: string;
    onMethodChange: (method: string) => void;
    displayUrl: string;
    onUrlChange: (url: string) => void;
    onSendRequest: () => void;
    loading: boolean;
}

const RequestBar = ({ method, onMethodChange, displayUrl, onUrlChange, onSendRequest, loading }: RequestBarProps) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === "Enter" && !loading) {
                event.preventDefault();
                onSendRequest();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onSendRequest, loading]);
    return (
        <div id="request-bar" className="flex items-center space-x-2 mb-4">
            <select
                className={`text-center border border-border px-3 py-2 h-10 rounded-md outline-0 bg-background cursor-pointer font-medium appearance-none ${
                    method === "GET"
                        ? "text-green-500"
                        : method === "POST"
                          ? "text-yellow-500"
                          : method === "PUT"
                            ? "text-blue-500"
                            : method === "PATCH"
                              ? "text-purple-500"
                              : method === "DELETE"
                                ? "text-red-500"
                                : "text-foreground"
                }`}
                value={method}
                onChange={(e) => onMethodChange(e.target.value)}
            >
                <option className="text-green-500 bg-background" value="GET">
                    GET
                </option>
                <option className="text-yellow-500 bg-background" value="POST">
                    POST
                </option>
                <option className="text-blue-500 bg-background" value="PUT">
                    PUT
                </option>
                <option className="text-purple-500 bg-background" value="PATCH">
                    PATCH
                </option>
                <option className="text-red-500 bg-background" value="DELETE">
                    DELETE
                </option>
            </select>
            <div className="flex justify-between border border-border bg-background rounded-md flex-1 h-10">
                <input
                    className="text-foreground px-3 py-2 outline-0 flex-1 bg-background text-sm rounded-l-md"
                    placeholder="https://coelhomarcus.com"
                    value={displayUrl}
                    onChange={(e) => onUrlChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !loading) {
                            e.preventDefault();
                            onSendRequest();
                        }
                    }}
                />
                <button
                    className="text-foreground px-3 py-2 rounded-r-md mr-1 cursor-pointer disabled:opacity-50"
                    onClick={onSendRequest}
                    disabled={loading}
                    title="Enviar requisição (Ctrl+Enter)"
                >
                    <IoSend className="text-muted-foreground hover:text-foreground transition-colors" />
                </button>
            </div>
        </div>
    );
};

export default RequestBar;
