import React, { useState, useCallback, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import {
  useAddManagerMutation,
  useDeleteManagerMutation,
  useGetManagersQuery,
  useUpdateManagerInfoMutation,
} from "../../services/api/managerApi";
import { toast } from "react-toastify";
import ManagerInfoPage from "../features/manager/ManagerInfo";
import type { FormData } from "../../types/managerTypes/managerVideo";
import { AddManagerForm } from "../features/manager/AddManagerForm";
import { UpdateManagerForm } from "../features/manager/UpdateManagerForm";
import { ManagerList } from "../features/manager/ManagerList";

import ReportCharts from "../features/manager/ReportCharts";

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = React.memo(({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black font-bold text-xl"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
});

export const ManageManagersPage: React.FC = () => {
  const { managerId } = useParams<{ managerId?: string }>();
  const [selectedManagerId, setSelectedManagerId] = useState<string | null>(managerId || null);
  const [formState, setFormState] = useState<{
    showAddForm: boolean;
    showUpdateForm: boolean;
    newManager: FormData;
    managerInfo: FormData;
  }>({
    showAddForm: false,
    showUpdateForm: false,
    newManager: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      address: "",
      gender: "male",
      dateOfBirth: "",
      status: "Pending",
      dailyReports: 0,
      weeklyReports: 0,
      monthlyReports: 0,
      processedReports: 0,
      unprocessedReports: 0,
    },
    managerInfo: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      address: "",
      gender: "male",
      dateOfBirth: "",
      status: "Pending",
      dailyReports: 0,
      weeklyReports: 0,
      monthlyReports: 0,
      processedReports: 0,
      unprocessedReports: 0,
    },
  });

  const {
    data: managers = [],
    isLoading: isManagersLoading,
    error: managersError,
  } = useGetManagersQuery();
  const [addManager, { isLoading: isAdding }] = useAddManagerMutation();
  const [deleteManager] = useDeleteManagerMutation();
  const [updateManagerInfo, { isLoading: isUpdating }] = useUpdateManagerInfoMutation();

  const selectedManager = managers.find((manager) => manager.id === selectedManagerId);

  const renderLoadingOrError = () => {
    if (isManagersLoading) return <p className="text-center text-gray-600">Đang tải danh sách quản lý...</p>;
    if (managersError) return <p className="text-center text-red-600">Có lỗi xảy ra khi tải danh sách quản lý!</p>;
    return null;
  };

  const handleAddManager = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (
        !formState.newManager.name ||
        !formState.newManager.email ||
        formState.newManager.password !== formState.newManager.confirmPassword
      ) {
        toast.error("Vui lòng kiểm tra thông tin hợp lệ!");
        return;
      }
      try {
        await addManager(formState.newManager).unwrap();
        toast.success("Thêm quản lý thành công!");
        setFormState((prev) => ({
          ...prev,
          showAddForm: false,
          newManager: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            address: "",
            gender: "male",
            dateOfBirth: "",
            status: "Pending",
            timestamp: "",
            visitCount: 0,
            revenue: 0,
            dailyReports: 0,
            weeklyReports: 0,
            monthlyReports: 0,
            processedReports: 0,
            unprocessedReports: 0,
          },
        }));
      } catch {
        toast.error("Thêm quản lý thất bại!");
      }
    },
    [addManager, formState.newManager]
  );

  const handleDeleteManager = useCallback(
    async (id: string) => {
      if (!window.confirm("Bạn có chắc muốn xóa quản lý này?")) return;
      try {
        await deleteManager(id).unwrap();
        toast.success("Xóa quản lý thành công!");
        if (selectedManagerId === id) setSelectedManagerId(null);
      } catch {
        toast.error("Xóa quản lý thất bại!");
      }
    },
    [deleteManager, selectedManagerId]
  );

  const handleUpdateManagerInfo = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!selectedManagerId || !formState.managerInfo.name || !formState.managerInfo.email) {
        toast.error("Vui lòng chọn quản lý và điền đầy đủ thông tin");
        return;
      }
      try {
        await updateManagerInfo({
          id: selectedManagerId,
          data: formState.managerInfo,
        }).unwrap();
        toast.success("Cập nhật thông tin quản lý thành công!");
        setFormState((prev) => ({ ...prev, showUpdateForm: false }));
      } catch {
        toast.error("Cập nhật thông tin quản lý thất bại!");
      }
    },
    [updateManagerInfo, selectedManagerId, formState.managerInfo]
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Manager</h1>
        <button
          onClick={() => setFormState((prev) => ({ ...prev, showAddForm: !prev.showAddForm }))}
          className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
        >
          {formState.showAddForm ? "Đóng" : "Tạo mới"}
        </button>
      </div>

      {renderLoadingOrError() || (
        <div className="space-y-6">
          <ReportCharts
            dailyReports={selectedManager?.dailyReports || 0}
            weeklyReports={selectedManager?.weeklyReports || 0}
            monthlyReports={selectedManager?.monthlyReports || 0}
            processedReports={selectedManager?.processedReports || 0}
            unprocessedReports={selectedManager?.unprocessedReports || 0}
          />
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <ManagerList
                managers={managers}
                selectedManagerId={selectedManagerId}
                onSelect={setSelectedManagerId}
                onDelete={handleDeleteManager}
                onApprove={() => {}}
                onReject={() => {}}
              />
            </div>
            {selectedManagerId && (
              <div className="w-full md:w-1/2">
                <ManagerInfoPage managerId={selectedManagerId} />
              </div>
            )}
          </div>

          <Modal
            isOpen={formState.showAddForm}
            onClose={() => setFormState((prev) => ({ ...prev, showAddForm: false }))}
          >
            <AddManagerForm
              newManager={formState.newManager}
              setNewManager={(newManager) =>
                setFormState((prev) => ({ ...prev, newManager }))
              }
              onSubmit={handleAddManager}
              isLoading={isAdding}
            />
          </Modal>
          <Modal
            isOpen={formState.showUpdateForm}
            onClose={() => setFormState((prev) => ({ ...prev, showUpdateForm: false }))}
          >
            <UpdateManagerForm
              managerInfo={formState.managerInfo}
              setManagerInfo={(managerInfo) =>
                setFormState((prev) => ({ ...prev, managerInfo }))
              }
              onSubmit={handleUpdateManagerInfo}
              isLoading={isUpdating}
            />
          </Modal>
        </div>
      )}
    </div>
  );
};