import QueryParamsTable from "./QueryParamsTable";
import HeadersTable from "./HeadersTable";
import BodyEditor from "./BodyEditor";
import type { QueryParam, HeaderItem } from "../types/index";

interface TabSystemProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    queryParams: QueryParam[];
    onAddQueryParam: () => void;
    onUpdateQueryParam: (id: string, field: keyof QueryParam, value: string | boolean) => void;
    onRemoveQueryParam: (id: string) => void;
    requestData: string;
    onRequestDataChange: (data: string) => void;
    method: string;
    headers: HeaderItem[];
    onAddHeader: () => void;
    onUpdateHeader: (id: string, field: keyof HeaderItem, value: string | boolean) => void;
    onRemoveHeader: (id: string) => void;
}

const TabSystem = ({
    activeTab,
    onTabChange,
    queryParams,
    onAddQueryParam,
    onUpdateQueryParam,
    onRemoveQueryParam,
    requestData,
    onRequestDataChange,
    method,
    headers,
    onAddHeader,
    onUpdateHeader,
    onRemoveHeader,
}: TabSystemProps) => {
    const tabs = ["Params", "Body", "Headers"];

    return (
        <div className="mb-4">
            <div className="flex space-x-8 border-b border-border">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`py-2 text-sm font-medium transition-colors cursor-pointer border-b-2 ${
                            activeTab === tab
                                ? "text-foreground border-primary"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                        onClick={() => onTabChange(tab)}
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
                        onAdd={onAddQueryParam}
                        onUpdate={onUpdateQueryParam}
                        onRemove={onRemoveQueryParam}
                    />
                )}

                {activeTab === "Body" && (
                    <BodyEditor value={requestData} onChange={onRequestDataChange} method={method} />
                )}

                {activeTab === "Headers" && (
                    <HeadersTable
                        headers={headers}
                        onAdd={onAddHeader}
                        onUpdate={onUpdateHeader}
                        onRemove={onRemoveHeader}
                    />
                )}
            </div>
        </div>
    );
};

export default TabSystem;
