import type { QueryParam } from '../types/index';
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
                <label className="block text-sm font-medium text-[#5D5D5D]">Query</label>
                <button
                    onClick={onAdd}
                    className="text-xs text-blue-500 hover:text-blue-300 transition-colors cursor-pointer px-2 rounded"
                >
                    + Add Param
                </button>
            </div>
            <div className="border border-[#303030] rounded-sm">
                <div className="grid grid-cols-12 gap-2 p-2 text-xs font-medium border-b border-[#303030]">
                    <div className="col-span-1"></div>
                    <div className="col-span-5">NAME</div>
                    <div className="col-span-5">PATH</div>
                    <div className="col-span-1"></div>
                </div>
                {queryParams.map((param) => (
                    <div key={param.id} className="grid grid-cols-12 gap-2 p-2 border-b border-[#303030] last:border-b-0">
                        <div className="col-span-1 flex justify-center items-center">
                            <input
                                type="checkbox"
                                checked={param.enabled}
                                onChange={(e) => onUpdate(param.id, 'enabled', e.target.checked)}
                                className="w-4 h-4"
                            />
                        </div>
                        <div className="col-span-5">
                            <input
                                type="text"
                                value={param.name}
                                onChange={(e) => onUpdate(param.id, 'name', e.target.value)}
                                placeholder="Parameter name"
                                className="w-full bg-transparent text-white text-xs p-2 border border-[#303030] rounded outline-0"
                            />
                        </div>
                        <div className="col-span-5">
                            <input
                                type="text"
                                value={param.value}
                                onChange={(e) => onUpdate(param.id, 'value', e.target.value)}
                                placeholder="Parameter value"
                                className="w-full bg-transparent text-white text-xs p-2 border border-[#303030] rounded outline-0"
                            />
                        </div>
                        <div className="col-span-1 flex justify-center items-center">
                            <button
                                onClick={() => onRemove(param.id)}
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

export default QueryParamsTable;
