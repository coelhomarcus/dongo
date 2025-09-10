import { useState } from "react";
import type { ApiResponse } from "../types/index";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";

import { ImSpinner3 } from "react-icons/im";

interface ResponsePanelProps {
    response: ApiResponse | null;
    loading: boolean;
}

const ResponsePanel = ({ response, loading }: ResponsePanelProps) => {
    const [responseTab, setResponseTab] = useState("Response");

    const formatSize = (bytes?: number) => {
        if (!bytes) return "0 B";

        const units = ["B", "KB", "MB", "GB"];
        let size = bytes;
        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }

        return `${size.toFixed(size < 10 && unitIndex > 0 ? 1 : 0)} ${units[unitIndex]}`;
    };

    const formatTime = (ms?: number) => {
        if (!ms) return "0 ms";
        return `${ms} ms`;
    };

    return (
        <div className="bg-[#202020] border border-[#303030] rounded h-[calc(100vh-90px)] max-h-screen grid grid-rows-[auto_auto_1fr]">
            {loading ? (
                <div className="flex items-center justify-center col-span-full row-span-full">
                    <div className="animate-spin">
                        <ImSpinner3 className="w-6 h-6 text-[#5D5D5D]" />
                    </div>
                </div>
            ) : response ? (
                <>
                    {/* Status da resposta */}
                    <div className="p-2">
                        <div className="flex items-center gap-2">
                            <div
                                className={`px-2 py-1 rounded text-sm ${
                                    response.success ? "text-lime-600" : "text-red-600"
                                }`}
                            >
                                {response.status} {response.statusText}
                            </div>
                            <div className="text-[#5D5D5D] text-xs">•</div>
                            {response.responseTime && (
                                <div className="text-[#5D5D5D] text-sm">{formatTime(response.responseTime)}</div>
                            )}
                            <div className="text-[#5D5D5D] text-xs">•</div>
                            {response.responseSize && (
                                <div className="text-sm text-[#5D5D5D]">{formatSize(response.responseSize)}</div>
                            )}
                        </div>
                    </div>

                    {/* Abas da resposta */}
                    <div className="flex">
                        {["Response", "Headers"].map((tab) => (
                            <button
                                key={tab}
                                className={`px-4 py-2 text-sm transition-colors cursor-pointer ${
                                    responseTab === tab ? "text-white" : "text-[#5D5D5D] hover:text-neutral-300"
                                }`}
                                onClick={() => setResponseTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Conteúdo das abas */}
                    <div className="overflow-hidden p-4 flex flex-col">
                        <div className="bg-[#151515] border border-[#303030] rounded flex-1 overflow-auto custom-scrollbar">
                            <JSONPretty
                                data={responseTab === "Response" ? response.data : response.headers}
                                theme={{
                                    main: "line-height:1.3;color:#f8f8f2;background:#151515;overflow:visible;padding:8px;min-height:100%;text-wrap:break-word;white-space:pre-wrap;",
                                    error: "line-height:1.3;color:#f92672;background:#151515;overflow:visible;padding:8px;min-height:100%;",
                                    key: "color:#66d9ef;",
                                    string: "color:#a6e22e;",
                                    value: "color:#ae81ff;",
                                    boolean: "color:#fd971f;",
                                }}
                                style={{ fontSize: "12px", minHeight: "100%" }}
                            />
                        </div>
                        {responseTab === "Response" && response.error && (
                            <div className="mt-4 bg-red-900 p-2 rounded">
                                <h3 className="text-sm font-bold mb-2 text-red-400">Error:</h3>
                                <pre className="text-xs overflow-auto custom-scrollbar">{response.error}</pre>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center col-span-full row-span-full text-xs text-[#5D5D5D] border-[#5D5D5D]">
                    <div className="text-center flex flex-col gap-3">
                        <div className="mb-2">Send Request</div>
                        <div>
                            <span className="border rounded-sm p-1 border-b-3 font-bold">Ctrl</span> +{" "}
                            <span className="border rounded-sm p-1 border-b-3 font-bold">Enter</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResponsePanel;
