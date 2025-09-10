import { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import QueryParamsTable from "./components/QueryParamsTable";
import ResponsePanel from "./components/ResponsePanel";
import BodyEditor from "./components/BodyEditor";
import type { ApiResponse, QueryParam } from "./types/index";

import { IoSend } from "react-icons/io5";


const App = () => {
    const [method, setMethod] = useState("GET");
    const [baseUrl, setBaseUrl] = useState("http://localhost:3000/tasks");
    const [displayUrl, setDisplayUrl] = useState("http://localhost:3000/tasks");
    const [requestData, setRequestData] = useState("");
    const [response, setResponse] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [headers, setHeaders] = useState("{}");
    const [queryParams, setQueryParams] = useState<QueryParam[]>([
        { id: "1", name: "", value: "", enabled: true }
    ]);
    const [activeTab, setActiveTab] = useState("Body");

    // Atualizar a URL exibida sempre que os parâmetros mudarem
    useEffect(() => {
        try {
            // Filtrar parâmetros habilitados que tenham pelo menos o nome preenchido
            const enabledParams = queryParams.filter(param => param.enabled && param.name.trim());
            
            if (enabledParams.length > 0 && baseUrl.trim()) {
                const urlObj = new URL(baseUrl);
                
                // Limpar parâmetros existentes
                urlObj.search = '';
                
                // Adicionar novos parâmetros
                enabledParams.forEach(param => {
                    const paramName = param.name.trim();
                    const paramValue = param.value.trim() || ''; // Usar string vazia se não houver valor
                    urlObj.searchParams.append(paramName, paramValue);
                });
                
                setDisplayUrl(urlObj.toString());
            } else {
                setDisplayUrl(baseUrl);
            }
        } catch {
            // Se a URL base não for válida, manter como está
            setDisplayUrl(baseUrl);
        }
    }, [queryParams, baseUrl]);

    // Funções para gerenciar query parameters

    // Funções para gerenciar query parameters
    const addQueryParam = () => {
        const newParam: QueryParam = {
            id: Date.now().toString(),
            name: "",
            value: "",
            enabled: true
        };
        setQueryParams([...queryParams, newParam]);
    };

    const updateQueryParam = (id: string, field: keyof QueryParam, value: string | boolean) => {
        setQueryParams(queryParams.map(param => 
            param.id === id ? { ...param, [field]: value } : param
        ));
    };

    const removeQueryParam = (id: string) => {
        setQueryParams(queryParams.filter(param => param.id !== id));
    };

    const handleRequest = async () => {
        if (!baseUrl.trim()) {
            alert("Por favor, insira uma URL");
            return;
        }

        // Verificar se a API do Electron está disponível
        if (!window.electronAPI) {
            alert("API do Electron não está disponível. Certifique-se de que o preload script foi carregado.");
            setResponse({
                success: false,
                status: 0,
                statusText: "Electron API não disponível",
                headers: {},
                data: "A API do Electron não foi carregada corretamente",
                error: "window.electronAPI não está definido"
            });
            return;
        }

        setLoading(true);
        try {
            let parsedData = undefined;
            let parsedHeaders = {};
            let finalUrl = baseUrl;

            // Processar parâmetros da URL
            const enabledParams = queryParams.filter(param => param.enabled && param.name.trim() && param.value.trim());
            if (enabledParams.length > 0) {
                const urlObj = new URL(finalUrl);
                
                enabledParams.forEach(param => {
                    urlObj.searchParams.append(param.name.trim(), param.value.trim());
                });
                
                finalUrl = urlObj.toString();
            }

            // Parse do JSON do body (se houver)
            if (requestData.trim() && (method === "POST" || method === "PUT" || method === "PATCH")) {
                try {
                    parsedData = JSON.parse(requestData);
                } catch {
                    alert("JSON inválido no body da requisição");
                    setLoading(false);
                    return;
                }
            }

            // Parse dos headers (se houver)
            if (headers.trim()) {
                try {
                    parsedHeaders = JSON.parse(headers);
                } catch {
                    alert("JSON inválido nos headers");
                    setLoading(false);
                    return;
                }
            }

            const result = await window.electronAPI.makeRequest(
                method,
                finalUrl,
                parsedData,
                parsedHeaders
            );
            
            setResponse(result);
        } catch (error) {
            console.error("Erro ao fazer requisição:", error);
            setResponse({
                success: false,
                status: 0,
                statusText: "Erro interno",
                headers: {},
                data: `Erro: ${error instanceof Error ? error.message : String(error)}`,
                error: "Erro interno da aplicação"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-white">
            <Header />
            <div className="flex">
                <Sidebar />
                <div className="grid grid-cols-2 w-full">
                    <div id="left" className="p-4">
                        <div id="request-bar" className="flex items-center space-x-2 mb-4">
                            <select 
                                className="border border-[#303030] bg-transparent text-white p-2 rounded"
                                value={method}
                                onChange={(e) => setMethod(e.target.value)}
                            >
                                <option>GET</option>
                                <option>POST</option>
                                <option>PUT</option>
                                <option>PATCH</option>
                                <option>DELETE</option>
                            </select>
                            <div className="flex justify-between border border-[#303030] bg-transparent rounded flex-1">
                                <input 
                                    className="text-white p-2 ml-2 outline-0 flex-1 bg-transparent" 
                                    placeholder="https://api.exemplo.com/users"
                                    value={displayUrl}
                                    onChange={(e) => {
                                        setBaseUrl(e.target.value);
                                        setDisplayUrl(e.target.value);
                                    }}
                                />
                                <button 
                                    className="text-white p-2 px-4 rounded ml-2 cursor-pointer disabled:opacity-50"
                                    onClick={handleRequest}
                                    disabled={loading}
                                >
                                    {loading ? "..." : <IoSend className="text-neutral-300 hover:text-white"/>  }
                                </button>
                            </div>
                        </div>

                        {/* Sistema de Abas */}
                        <div className="mb-4">
                            <div className="flex space-x-8">
                                {["Params", "Body", "Headers"].map((tab) => (
                                    <button
                                        key={tab}
                                        className={`py-2 text-sm font-medium transition-colors cursor-pointer ${
                                            activeTab === tab
                                                ? 'text-white'
                                                : 'border-transparent text-[#3C3A3A] hover:text-white'
                                        }`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Conteúdo das Abas */}
                            <div className="mt-4">
                                {activeTab === "Params" && (
                                    <QueryParamsTable
                                        queryParams={queryParams}
                                        onAdd={addQueryParam}
                                        onUpdate={updateQueryParam}
                                        onRemove={removeQueryParam}
                                    />
                                )}

                                {activeTab === "Body" && (
                                    <BodyEditor
                                        value={requestData}
                                        onChange={setRequestData}
                                        method={method}
                                    />
                                )}

                                {activeTab === "Headers" && (
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Headers (JSON):</label>
                                        <textarea
                                            className="w-full h-32 p-2 border border-[#303030] bg-transparent text-white rounded resize-none"
                                            placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}'
                                            value={headers}
                                            onChange={(e) => setHeaders(e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div id="right" className="p-4">
                        <ResponsePanel response={response} loading={loading} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
