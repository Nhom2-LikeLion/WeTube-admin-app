import type { managerData } from "../../../types/managerTypes/managerInfo";

export const ManagerList: React.FC<{
  managers: managerData[];
  selectedManagerId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onBanned: (id: string) => void;
}> = ({ managers, selectedManagerId, onSelect, onDelete, onEdit, onBanned }) => {
  return (
    <div className="p-5 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Manager List</h2>
      {managers.length === 0 ? (
        <p className="text-gray-500 text-center">No managers available.</p>
      ) : (
        <ul className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
          {managers.map((manager) => (
            <li
              key={manager.id}
              onClick={() => onSelect(manager.id)}
              className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition ${
                selectedManagerId === manager.id ? "bg-blue-100" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={manager.avatarUrl || "https://via.placeholder.com/40"}
                  alt={`${manager.name}'s avatar`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-gray-800">{manager.name}</p>
                  <p className="text-xs text-gray-600">{manager.email}</p>
                  <p className="text-xs text-gray-600">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-semibold ${
                        manager.status === "Approved"
                          ? "text-green-600"
                          : manager.status === "Rejected"
                          ? "text-red-600"
                          : manager.status === "Banned"
                          ? "text-red-500"
                          : "text-yellow-600"
                      }`}
                    >
                      {manager.status}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(manager.id);
                  }}
                  className="px-3 py-1.5 text-xs rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(manager.id);
                  }}
                  className="px-3 py-1.5 text-xs rounded-md bg-red-100 text-red-700 hover:bg-red-200"
                >
                  Delete
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBanned(manager.id);
                  }}
                  className="px-3 py-1.5 text-xs rounded-md bg-yellow-200 text-yellow-700 hover:bg-yellow-300"
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
