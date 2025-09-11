import { useState, useEffect } from "react";
// import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import RequestBar from "./components/RequestBar";
import TabSystem from "./components/TabSystem";
import ResponsePanel from "./components/ResponsePanel";
import { useQueryParams, useHeaders, useUrlManager, useHttpRequest, useTabs, useAlert } from "./hooks";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "./components/ui/alert-dialog";

const App = () => {
    const [method, setMethod] = useState("GET");
    const [requestData, setRequestData] = useState("");

    const { queryParams, addQueryParam, updateQueryParam, removeQueryParam } = useQueryParams();
    const { headers, addHeader, updateHeader, removeHeader } = useHeaders();
    const { baseUrl, setBaseUrl, displayUrl, setDisplayUrl, normalizeUrl, updateDisplayUrl } = useUrlManager();
    const { alertState, showAlert, hideAlert } = useAlert();
    const { response, loading, makeRequest } = useHttpRequest(showAlert);
    const { activeTab, setActiveTab } = useTabs();

    // Atualizar displayUrl
    useEffect(() => {
        updateDisplayUrl(queryParams);
    }, [queryParams, baseUrl, updateDisplayUrl]);

    //Normalizar URL ao enviar a requisição
    const handleRequest = async () => {
        const normalizedUrl = normalizeUrl(baseUrl);
        if (normalizedUrl !== baseUrl) {
            setBaseUrl(normalizedUrl);
        }

        await makeRequest(method, normalizedUrl, requestData, queryParams, headers, normalizeUrl);
    };

    const handleUrlChange = (url: string) => {
        setBaseUrl(url);
        setDisplayUrl(url);
    };

    return (
        <div className="bg-background text-foreground min-h-screen">
            <Header />
            <div className="flex">
                {/* <Sidebar /> */}
                <div className="grid grid-cols-2 w-full min-h-[calc(100vh-50px)]">
                    <div id="left" className="p-4 h-full bg-card">
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

                    <div id="right" className="p-4 h-full bg-card border-l border-border">
                        <ResponsePanel response={response} loading={loading} />
                    </div>
                </div>
            </div>

            <AlertDialog open={alertState.isOpen} onOpenChange={hideAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        {alertState.title && <AlertDialogTitle>{alertState.title}</AlertDialogTitle>}
                        <AlertDialogDescription>{alertState.description}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={hideAlert}>OK</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default App;
