import type { managerData } from "../../../types/managerTypes/managerInfo";

export const ManagerList: React.FC<{
  managers: managerData[];
  selectedManagerId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}> = ({ managers, selectedManagerId, onSelect, onDelete, onApprove, onReject }) => (
  <div className="p-4 bg-white rounded-lg shadow">
    <h2 className="text-lg font-semibold mb-4 text-gray-800">Danh sách Quản lý</h2>
    {managers.length === 0 ? (
      <p className="text-gray-500">Không có quản lý nào.</p>
    ) : (
      <ul className="space-y-2">
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
              </div>
            </div>
            <div className="flex gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onApprove(manager.id);
                }}
                className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded hover:bg-green-200"
              >
                Approve
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onReject(manager.id);
                }}
                className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded hover:bg-red-200"
              >
                Reject
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(manager.id);
                }}
                className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded hover:bg-red-200"
              >
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);