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
                <label className="block text-sm font-medium text-[#5D5D5D]">Headers</label>
                <button
                    onClick={onAdd}
                    className="text-xs text-blue-500 hover:text-blue-300 transition-colors cursor-pointer px-2 rounded"
                >
                    + Add Header
                </button>
            </div>
            <div className="border border-[#303030] rounded-sm">
                <div className="grid grid-cols-12 gap-2 p-2 text-xs font-medium border-b border-[#303030]">
                    <div className="col-span-1"></div>
                    <div className="col-span-5">NAME</div>
                    <div className="col-span-5">VALUE</div>
                    <div className="col-span-1"></div>
                </div>
                {headers.map((header) => (
                    <div
                        key={header.id}
                        className="grid grid-cols-12 gap-2 p-2 border-b border-[#303030] last:border-b-0"
                    >
                        <div className="col-span-1 flex justify-center items-center">
                            <input
                                type="checkbox"
                                checked={header.enabled}
                                onChange={(e) => onUpdate(header.id, "enabled", e.target.checked)}
                                className="w-4 h-4"
                            />
                        </div>
                        <div className="col-span-5">
                            <input
                                type="text"
                                value={header.name}
                                onChange={(e) => onUpdate(header.id, "name", e.target.value)}
                                placeholder="Header name"
                                className="w-full bg-transparent text-white text-xs p-2 border border-[#303030] rounded outline-0"
                            />
                        </div>
                        <div className="col-span-5">
                            <input
                                type="text"
                                value={header.value}
                                onChange={(e) => onUpdate(header.id, "value", e.target.value)}
                                placeholder="Header value"
                                className="w-full bg-transparent text-white text-xs p-2 border border-[#303030] rounded outline-0"
                            />
                        </div>
                        <div className="col-span-1 flex justify-center items-center">
                            <button
                                onClick={() => onRemove(header.id)}
                                className="text-[#5D5D5D] hover:text-red-400 text-lg cursor-pointer"
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
