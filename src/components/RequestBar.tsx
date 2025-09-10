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
                className={`text-center border border-[#303030] px-3 py-2 h-10 rounded outline-0 bg-[#141414] cursor-pointer font-medium appearance-none ${
                    method === "GET"
                        ? "text-lime-400"
                        : method === "POST"
                        ? "text-yellow-500"
                        : method === "PUT"
                        ? "text-blue-500"
                        : method === "PATCH"
                        ? "text-purple-500"
                        : method === "DELETE"
                        ? "text-red-500"
                        : "text-white"
                }`}
                value={method}
                onChange={(e) => onMethodChange(e.target.value)}
            >
                <option className="text-lime-400" value="GET">
                    GET
                </option>
                <option className="text-yellow-500" value="POST">
                    POST
                </option>
                <option className="text-blue-500" value="PUT">
                    PUT
                </option>
                <option className="text-purple-500" value="PATCH">
                    PATCH
                </option>
                <option className="text-red-500" value="DELETE">
                    DELETE
                </option>
            </select>
            <div className="flex justify-between border border-[#303030] bg-transparent rounded flex-1 h-10">
                <input
                    className="text-white px-3 py-2 outline-0 flex-1 bg-transparent text-sm"
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
                    className="text-white px-3 py-2 rounded mr-1 cursor-pointer disabled:opacity-50"
                    onClick={onSendRequest}
                    disabled={loading}
                    title="Enviar requisição (Ctrl+Enter)"
                >
                    <IoSend className="text-neutral-500 hover:text-white" />
                </button>
            </div>
        </div>
    );
};

export default RequestBar;
