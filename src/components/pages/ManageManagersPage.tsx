import React, { useState, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import {
  useAddManagerMutation,
  useDeleteManagerMutation,
  useGetManagersQuery,
  useUpdateManagerInfoMutation,
} from "../../services/api/managerApi";
import { toast } from "react-toastify";
import ManagerInfoPage from "../features/manager/ManagerInfo";

interface Manager {
  id: string;
  name: string;
  email: string;
}

interface FormData {
  name: string;
  email: string;
}

// Component hiển thị danh sách manager
const ManagerList: React.FC<{
  managers: Manager[];
  selectedManagerId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ managers, selectedManagerId, onSelect, onDelete }) => (
  <div className="p-6 bg-white rounded-xl shadow-md">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">
      Danh sách Quản lý
    </h2>
    {managers.length === 0 ? (
      <p className="text-gray-500">Không có quản lý nào.</p>
    ) : (
      <ul className="space-y-3">
        {managers.map((manager) => (
          <li
            key={manager.id}
            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <div>
              <p className="font-medium text-gray-800">{manager.name}</p>
              <p className="text-sm text-gray-600">{manager.email}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onSelect(manager.id)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                  selectedManagerId === manager.id
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
              >
                Chọn
              </button>
              <button
                onClick={() => onDelete(manager.id)}
                className="px-4 py-1.5 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200 transition"
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

// Component form thêm manager
const AddManagerForm: React.FC<{
  newManager: FormData;
  setNewManager: (data: FormData) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}> = ({ newManager, setNewManager, onSubmit, isLoading }) => (
  <div className="p-6 bg-white rounded-xl shadow-md">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">Thêm Quản lý</h2>
    <form
      onSubmit={onSubmit}
      className="space-y-4"
    >
      <input
        type="text"
        placeholder="Tên"
        value={newManager.name}
        onChange={(e) => setNewManager({ ...newManager, name: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        placeholder="Email"
        value={newManager.email}
        onChange={(e) =>
          setNewManager({ ...newManager, email: e.target.value })
        }
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 rounded-md text-white font-medium transition ${
          isLoading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isLoading ? "Đang thêm..." : "Thêm Quản lý"}
      </button>
    </form>
  </div>
);

// Component form cập nhật manager
const UpdateManagerForm: React.FC<{
  managerInfo: FormData;
  setManagerInfo: (data: FormData) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}> = ({ managerInfo, setManagerInfo, onSubmit, isLoading }) => (
  <div className="p-6 bg-white rounded-xl shadow-md">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">
      Cập nhật Thông tin Quản lý
    </h2>
    <form
      onSubmit={onSubmit}
      className="space-y-4"
    >
      <input
        type="text"
        placeholder="Tên"
        value={managerInfo.name}
        onChange={(e) =>
          setManagerInfo({ ...managerInfo, name: e.target.value })
        }
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        placeholder="Email"
        value={managerInfo.email}
        onChange={(e) =>
          setManagerInfo({ ...managerInfo, email: e.target.value })
        }
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 rounded-md text-white font-medium transition ${
          isLoading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isLoading ? "Đang cập nhật..." : "Cập nhật"}
      </button>
    </form>
  </div>
);

export const ManageManagersPage: React.FC = () => {
  const { managerId } = useParams<{ managerId?: string }>();
  const [selectedManagerId, setSelectedManagerId] = useState<string | null>(
    managerId || null
  );
  const [newManager, setNewManager] = useState<FormData>({
    name: "",
    email: "",
  });
  const [managerInfo, setManagerInfo] = useState<FormData>({
    name: "",
    email: "",
  });

  const {
    data: managers = [],
    isLoading: isManagersLoading,
    error: managersError,
  } = useGetManagersQuery();
  const [addManager, { isLoading: isAdding }] = useAddManagerMutation();
  const [deleteManager] = useDeleteManagerMutation();
  const [updateManagerInfo, { isLoading: isUpdating }] =
    useUpdateManagerInfoMutation();

  const handleAddManager = async (e: FormEvent) => {
    e.preventDefault();
    if (!newManager.name || !newManager.email) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    try {
      await addManager(newManager).unwrap();
      toast.success("Thêm quản lý thành công!");
      setNewManager({ name: "", email: "" });
    } catch {
      toast.error("Thêm quản lý thất bại!");
    }
  };

  const handleDeleteManager = async (id: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa quản lý này?")) return;
    try {
      await deleteManager(id).unwrap();
      toast.success("Xóa quản lý thành công!");
      if (selectedManagerId === id) setSelectedManagerId(null);
    } catch {
      toast.error("Xóa quản lý thất bại!");
    }
  };

  const handleUpdateManagerInfo = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedManagerId || !managerInfo.name || !managerInfo.email) {
      toast.error("Vui lòng chọn quản lý và điền đầy đủ thông tin");
      return;
    }
    try {
      await updateManagerInfo({
        id: selectedManagerId,
        data: managerInfo,
      }).unwrap();
      toast.success("Cập nhật thông tin quản lý thành công!");
      setManagerInfo({ name: "", email: "" });
    } catch {
      toast.error("Cập nhật thông tin quản lý thất bại!");
    }
  };

  if (isManagersLoading)
    return (
      <p className="text-center text-gray-600">Đang tải danh sách quản lý...</p>
    );
  if (managersError)
    return (
      <p className="text-center text-red-600">
        Có lỗi xảy ra khi tải danh sách quản lý!
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Quản lý Quản lý</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ManagerList
          managers={managers}
          selectedManagerId={selectedManagerId}
          onSelect={setSelectedManagerId}
          onDelete={handleDeleteManager}
        />
        <div className="space-y-6">
          <AddManagerForm
            newManager={newManager}
            setNewManager={setNewManager}
            onSubmit={handleAddManager}
            isLoading={isAdding}
          />
          {selectedManagerId && (
            <>
              <ManagerInfoPage managerId={selectedManagerId} />
              <UpdateManagerForm
                managerInfo={managerInfo}
                setManagerInfo={setManagerInfo}
                onSubmit={handleUpdateManagerInfo}
                isLoading={isUpdating}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};