import { useState, useEffect } from "react";
// import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import RequestBar from "./components/RequestBar";
import TabSystem from "./components/TabSystem";
import ResponsePanel from "./components/ResponsePanel";
import { useQueryParams, useHeaders, useUrlManager, useHttpRequest, useTabs } from "./hooks";

const App = () => {
    const [method, setMethod] = useState("GET");
    const [requestData, setRequestData] = useState("");

    const { queryParams, addQueryParam, updateQueryParam, removeQueryParam } = useQueryParams();
    const { headers, addHeader, updateHeader, removeHeader } = useHeaders();
    const { baseUrl, setBaseUrl, displayUrl, setDisplayUrl, normalizeUrl, updateDisplayUrl } = useUrlManager();
    const { response, loading, makeRequest } = useHttpRequest();
    const { activeTab, setActiveTab } = useTabs();

    // Atualizar a URL exibida sempre que os parâmetros mudarem
    useEffect(() => {
        updateDisplayUrl(queryParams);
    }, [queryParams, baseUrl, updateDisplayUrl]);

    const handleRequest = async () => {
        await makeRequest(method, baseUrl, requestData, queryParams, headers, normalizeUrl);
    };

    const handleUrlChange = (url: string) => {
        setBaseUrl(url);
        setDisplayUrl(url);
    };

    return (
        <div className="text-white">
            <Header />
            <div className="flex">
                {/* <Sidebar /> */}
                <div className="grid grid-cols-2 w-full min-h-[calc(100vh-50px)]">
                    <div id="left" className="p-4 h-full">
                        <RequestBar
                            method={method}
                            onMethodChange={setMethod}
                            displayUrl={displayUrl}
                            onUrlChange={handleUrlChange}
                            onSendRequest={handleRequest}
                            loading={loading}
                        />

                        <TabSystem
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            queryParams={queryParams}
                            onAddQueryParam={addQueryParam}
                            onUpdateQueryParam={updateQueryParam}
                            onRemoveQueryParam={removeQueryParam}
                            requestData={requestData}
                            onRequestDataChange={setRequestData}
                            method={method}
                            headers={headers}
                            onAddHeader={addHeader}
                            onUpdateHeader={updateHeader}
                            onRemoveHeader={removeHeader}
                        />
                    </div>

                    <div id="right" className="p-4 h-full">
                        <ResponsePanel response={response} loading={loading} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
