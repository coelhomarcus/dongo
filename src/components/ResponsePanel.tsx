import { useState } from 'react';
import type { ApiResponse } from '../types/index';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

interface ResponsePanelProps {
    response: ApiResponse | null;
    loading: boolean;
}

const ResponsePanel = ({ response, loading }: ResponsePanelProps) => {
    const [responseTab, setResponseTab] = useState("Response");

    const formatSize = (bytes?: number) => {
        if (!bytes) return '0 B';
        
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;
        
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
        
        return `${size.toFixed(size < 10 && unitIndex > 0 ? 1 : 0)} ${units[unitIndex]}`;
    };

    const formatTime = (ms?: number) => {
        if (!ms) return '0 ms';
        return `${ms} ms`;
    };

    return (
        <div className="bg-[#202020] border border-[#303030] h-[600px] rounded overflow-hidden">
            {loading ? (
                <div className="flex items-center justify-center h-full">
                    <div>Carregando...</div>
                </div>
            ) : response ? (
                <div className="h-full flex flex-col">
                    {/* Status da resposta */}
                    <div className="p-2">
                        <div className="flex items-center gap-2">
                            <div className={`px-2 py-1 rounded text-sm ${
                                response.success ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {response.status} {response.statusText}
                            </div>

                            <div className='text-[#5D5D5D] text-xs'>•</div>
                            
                            {response.responseTime && (
                                <div className="text-xs text-[#5D5D5D]">
                                    {formatTime(response.responseTime)}
                                </div>
                            )}
                            
                            <div className='text-[#5D5D5D] text-xs'>•</div>

                            {response.responseSize && (
                                <div className="text-xs text-[#5D5D5D]">
                                    {formatSize(response.responseSize)}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Abas da resposta */}
                    <div className="flex">
                        <button
                            className={`px-4 text-sm font-medium transition-colors ${
                                responseTab === "Response"
                                    ? "text-white"
                                    : "text-[#5D5D5D] hover:text-white"
                            }`}
                            onClick={() => setResponseTab("Response")}
                        >
                            Response
                        </button>
                        <button
                            className={`px-4 text-sm font-medium transition-colors ${
                                responseTab === "Headers"
                                    ? "text-white"
                                    : "text-[#5D5D5D] hover:text-white"
                            }`}
                            onClick={() => setResponseTab("Headers")}
                        >
                            Headers
                        </button>
                    </div>

                    {/* Conteúdo das abas */}
                    <div className="flex-1 overflow-auto px-4 py-2">
                        {responseTab === "Response" && (
                            <div>
                                <div className="bg-[#151515] border border-[#303030] rounded overflow-auto">
                                    <JSONPretty 
                                        data={response.data}
                                        theme={{
                                            main: 'line-height:1.3;color:#f8f8f2;background:#151515;overflow:auto;padding:8px;',
                                            error: 'line-height:1.3;color:#f92672;background:#151515;overflow:auto;padding:8px;',
                                            key: 'color:#66d9ef;',
                                            string: 'color:#a6e22e;',
                                            value: 'color:#ae81ff;',
                                            boolean: 'color:#fd971f;'
                                        }}
                                        style={{ fontSize: '12px' }}
                                    />
                                </div>
                                {response.error && (
                                    <div className="mt-4">
                                        <h3 className="text-sm font-bold mb-2 text-red-400">Error:</h3>
                                        <pre className="text-xs bg-red-900 p-2 rounded overflow-auto">
                                            {response.error}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        )}

                        {responseTab === "Headers" && (
                            <div>
                                <div className="bg-[#151515] border border-[#303030] rounded overflow-auto">
                                    <JSONPretty 
                                        data={response.headers}
                                        theme={{
                                            main: 'line-height:1.3;color:#f8f8f2;background:#151515;overflow:auto;padding:8px;',
                                            error: 'line-height:1.3;color:#f92672;background:#151515;overflow:auto;padding:8px;',
                                            key: 'color:#66d9ef;',
                                            string: 'color:#a6e22e;',
                                            value: 'color:#ae81ff;',
                                            boolean: 'color:#fd971f;'
                                        }}
                                        style={{ fontSize: '12px' }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-full text-[#5D5D5D]">
                    Faça uma requisição para ver a resposta
                </div>
            )}
        </div>
    );
};

export default ResponsePanel;
