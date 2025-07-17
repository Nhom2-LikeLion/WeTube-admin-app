import type { managerData } from "../../../types/managerTypes/managerInfo";
import { useNavigate } from "react-router-dom";

export const ManagerList: React.FC<{
  managers: managerData[];
  selectedManagerId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onBanned: (id: string) => void;
}> = ({ managers, selectedManagerId, onSelect, onDelete, onEdit, onBanned }) => {
  const Navigate = useNavigate();
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Danh sách Quản lý</h2>
      {managers.length === 0 ? (
        <p className="text-gray-500">Không có quản lý nào.</p>
      ) : (
        <ul className="space-y-2 max-h-[500px] overflow-y-auto">
          {managers.map((manager) => (
            <li
              key={manager.id}
              onClick={() => onSelect(manager.id)}
              className={`flex justify-between items-center p-2 rounded cursor-pointer ${
                selectedManagerId === manager.id ? "bg-blue-100" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <img
                  src={manager.avatarUrl || "https://via.placeholder.com/32"}
                  alt={`${manager.name}'s avatar`}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">{manager.name}</p>
                  <p className="text-xs text-gray-600">{manager.email}</p>
                  <p className="text-xs text-gray-600">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`${
                        manager.status === "Approved"
                          ? "text-green-600"
                          : manager.status === "Rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {manager.status === "Approved"
                        ? "Approved"
                        : manager.status === "Rejected"
                        ? "Rejected"
                        : "Pading"}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(manager.id);
                  }}
                  className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(manager.id);
                  }}
                  className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded hover:bg-red-200"
                >
                  Xoá
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBanned(manager.id);
                  }}
                  className="px-2 py-1 bg-yellow-200 text-red-700 text-xs rounded hover:bg-red-200"
                >
                  Ban
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};