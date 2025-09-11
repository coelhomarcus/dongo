import { useState } from "react";
import type { ApiResponse } from "../types/index";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { ScrollArea } from "./ui/scroll-area";

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
        <div className="bg-card border border-border rounded-md h-[calc(100vh-90px)] max-h-screen grid grid-rows-[auto_auto_1fr]">
            {loading ? (
                <div className="flex items-center justify-center col-span-full row-span-full">
                    <div className="animate-spin">
                        <ImSpinner3 className="w-6 h-6 text-muted-foreground" />
                    </div>
                </div>
            ) : response ? (
                <>
                    {/* Status da resposta */}
                    <div className="p-2">
                        <div className="flex items-center gap-2">
                            <div
                                className={`px-2 py-1 rounded-md text-sm font-medium ${
                                    response.success
                                        ? "text-green-600 bg-green-100 dark:bg-green-900/20"
                                        : "text-red-600 bg-red-100 dark:bg-red-900/20"
                                }`}
                            >
                                {response.status} {response.statusText}
                            </div>
                            <div className="text-muted-foreground text-xs">•</div>
                            {response.responseTime && (
                                <div className="text-muted-foreground text-sm">{formatTime(response.responseTime)}</div>
                            )}
                            <div className="text-muted-foreground text-xs">•</div>
                            {response.responseSize && (
                                <div className="text-sm text-muted-foreground">{formatSize(response.responseSize)}</div>
                            )}
                        </div>
                    </div>

                    {/* Abas da resposta */}
                    <div className="flex border-b border-border">
                        {["Response", "Headers"].map((tab) => (
                            <button
                                key={tab}
                                className={`px-4 py-2 text-sm transition-colors cursor-pointer border-b-2 ${
                                    responseTab === tab
                                        ? "text-foreground border-primary"
                                        : "text-muted-foreground hover:text-foreground border-transparent"
                                }`}
                                onClick={() => setResponseTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Conteúdo das abas */}
                    <div className="overflow-hidden p-4 flex flex-col flex-1">
                        <div className="bg-muted border border-border rounded-md flex-1 min-h-0 overflow-x-hidden">
                            <ScrollArea className="h-full w-full overflow-x-hidden">
                                <div className="p-2 w-full overflow-hidden json-pretty-container">
                                    <JSONPretty
                                        data={responseTab === "Response" ? response.data : response.headers}
                                        theme={{
                                            main: `line-height:1.3;color:var(--foreground);background:transparent;overflow:visible;padding:8px;word-wrap:break-word;word-break:break-all;white-space:pre-wrap;max-width:100%;`,
                                            error: `line-height:1.3;color:var(--destructive);background:transparent;overflow:visible;padding:8px;word-wrap:break-word;word-break:break-all;white-space:pre-wrap;`,
                                            key: "color:#66d9ef;word-wrap:break-word;",
                                            string: "color:#a6e22e;word-wrap:break-word;word-break:break-all;",
                                            value: "color:#ae81ff;word-wrap:break-word;word-break:break-all;",
                                            boolean: "color:#fd971f;",
                                        }}
                                        style={{
                                            fontSize: "12px",
                                            wordWrap: "break-word",
                                            wordBreak: "break-all",
                                            whiteSpace: "pre-wrap",
                                            maxWidth: "100%",
                                            overflowWrap: "break-word",
                                            overflowX: "hidden",
                                        }}
                                    />
                                </div>
                            </ScrollArea>
                        </div>
                        {responseTab === "Response" && response.error && (
                            <div className="mt-4 bg-destructive/10 border border-destructive/20 rounded-md">
                                <div className="p-2 border-b border-destructive/20">
                                    <h3 className="text-sm font-bold text-destructive">Error:</h3>
                                </div>
                                <ScrollArea className="h-32 w-full">
                                    <div className="p-2 w-full overflow-hidden">
                                        <pre className="text-xs text-destructive whitespace-pre-wrap break-words break-all max-w-full overflow-wrap-anywhere">
                                            {response.error}
                                        </pre>
                                    </div>
                                </ScrollArea>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center col-span-full row-span-full text-xs text-muted-foreground">
                    <div className="text-center flex flex-col gap-3">
                        <div className="mb-2">Send Request</div>
                        <div>
                            <span className="border border-border rounded-sm p-1 font-bold">Ctrl</span> +{" "}
                            <span className="border border-border rounded-sm p-1 font-bold">Enter</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResponsePanel;
