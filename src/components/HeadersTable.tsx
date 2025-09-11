import type { HeaderItem } from "../types/index";
import { IoTrash } from "react-icons/io5";

interface HeadersTableProps {
    headers: HeaderItem[];
    onAdd: () => void;
    onUpdate: (id: string, field: keyof HeaderItem, value: string | boolean) => void;
    onRemove: (id: string) => void;
}

const HeadersTable = ({ headers, onAdd, onUpdate, onRemove }: HeadersTableProps) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-muted-foreground">Headers</label>
                <button
                    onClick={onAdd}
                    className="text-xs text-primary hover:text-primary/80 transition-colors cursor-pointer px-2 rounded-md"
                >
                    + Add Header
                </button>
            </div>
            <div className="border border-border rounded-md bg-card">
                <div className="grid grid-cols-12 gap-2 p-2 text-xs font-medium border-b border-border bg-muted/50">
                    <div className="col-span-1"></div>
                    <div className="col-span-5 text-muted-foreground">NAME</div>
                    <div className="col-span-5 text-muted-foreground">VALUE</div>
                    <div className="col-span-1"></div>
                </div>
                {headers.map((header) => (
                    <div key={header.id} className="grid grid-cols-12 gap-2 p-2 border-b border-border last:border-b-0">
                        <div className="col-span-1 flex justify-center items-center">
                            <input
                                type="checkbox"
                                checked={header.enabled}
                                onChange={(e) => onUpdate(header.id, "enabled", e.target.checked)}
                                className="w-4 h-4 accent-primary"
                            />
                        </div>
                        <div className="col-span-5">
                            <input
                                type="text"
                                value={header.name}
                                onChange={(e) => onUpdate(header.id, "name", e.target.value)}
                                placeholder="Header name"
                                className="w-full bg-background text-foreground text-xs p-2 border border-border rounded-md outline-0 focus:ring-2 focus:ring-ring"
                            />
                        </div>
                        <div className="col-span-5">
                            <input
                                type="text"
                                value={header.value}
                                onChange={(e) => onUpdate(header.id, "value", e.target.value)}
                                placeholder="Header value"
                                className="w-full bg-background text-foreground text-xs p-2 border border-border rounded-md outline-0 focus:ring-2 focus:ring-ring"
                            />
                        </div>
                        <div className="col-span-1 flex justify-center items-center">
                            <button
                                onClick={() => onRemove(header.id)}
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

export default HeadersTable;
