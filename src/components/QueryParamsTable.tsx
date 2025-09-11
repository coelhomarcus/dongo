import type { QueryParam } from "../types/index";
import { IoTrash } from "react-icons/io5";

interface QueryParamsTableProps {
    queryParams: QueryParam[];
    onAdd: () => void;
    onUpdate: (id: string, field: keyof QueryParam, value: string | boolean) => void;
    onRemove: (id: string) => void;
}

const QueryParamsTable = ({ queryParams, onAdd, onUpdate, onRemove }: QueryParamsTableProps) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-muted-foreground">Query</label>
                <button
                    onClick={onAdd}
                    className="text-xs text-primary hover:text-primary/80 transition-colors cursor-pointer px-2 rounded-md"
                >
                    + Add Param
                </button>
            </div>
            <div className="border border-border rounded-md bg-card">
                <div className="grid grid-cols-12 gap-2 p-2 text-xs font-medium border-b border-border bg-muted/50">
                    <div className="col-span-1"></div>
                    <div className="col-span-5 text-muted-foreground">NAME</div>
                    <div className="col-span-5 text-muted-foreground">VALUE</div>
                    <div className="col-span-1"></div>
                </div>
                {queryParams.map((param) => (
                    <div key={param.id} className="grid grid-cols-12 gap-2 p-2 border-b border-border last:border-b-0">
                        <div className="col-span-1 flex justify-center items-center">
                            <input
                                type="checkbox"
                                checked={param.enabled}
                                onChange={(e) => onUpdate(param.id, "enabled", e.target.checked)}
                                className="w-4 h-4 accent-primary"
                            />
                        </div>
                        <div className="col-span-5">
                            <input
                                type="text"
                                value={param.name}
                                onChange={(e) => onUpdate(param.id, "name", e.target.value)}
                                placeholder="Parameter name"
                                className="w-full bg-background text-foreground text-xs p-2 border border-border rounded-md outline-0 focus:ring-2 focus:ring-ring"
                            />
                        </div>
                        <div className="col-span-5">
                            <input
                                type="text"
                                value={param.value}
                                onChange={(e) => onUpdate(param.id, "value", e.target.value)}
                                placeholder="Parameter value"
                                className="w-full bg-background text-foreground text-xs p-2 border border-border rounded-md outline-0 focus:ring-2 focus:ring-ring"
                            />
                        </div>
                        <div className="col-span-1 flex justify-center items-center">
                            <button
                                onClick={() => onRemove(param.id)}
                                className="text-muted-foreground hover:text-destructive text-lg cursor-pointer"
                            >
                                <IoTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QueryParamsTable;
