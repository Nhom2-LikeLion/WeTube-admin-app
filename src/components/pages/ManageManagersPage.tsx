import React, { useState, useCallback, useEffect, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useAddManagerMutation,
  useDeleteManagerMutation,
  useGetManagersQuery,
  useUpdateManagerInfoMutation,
  useRejectManagerMutation,
} from "../../services/api/managerApi";
import { toast } from "react-toastify";
import ManagerInfoPage from "../features/manager/ManagerInfo";
import type { FormData } from "../../types/managerTypes/registerManager";
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
  const navigate = useNavigate();
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
      gender: "male",
      dateOfBirth: "",
      status: "Pending",
    },
    managerInfo: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      gender: "male",
      dateOfBirth: "",
      status: "Pending",
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
  const [rejectManager, { isLoading: isRejecting }] = useRejectManagerMutation();


  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setFormState((prev) => ({
          ...prev,
          showAddForm: false,
          showUpdateForm: false,
        }));
      }
    };
    handleResize(mediaQuery);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const selectedManager = managers.find((manager) => manager.id === selectedManagerId);

  const renderLoadingOrError = () => {
    if (isManagersLoading) return <p className="text-center text-gray-600">Loading manager list...</p>;
    if (managersError) return <p className="text-center text-red-600">An error occurred while loading the manager list!</p>;
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
        toast.error("Please check the validity of the information!");
        return;
      }
      try {
        await addManager(formState.newManager).unwrap();
        toast.success("Manager added successfully!");
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
          },
        }));
      } catch {
        toast.error("Failed to add manager!");
      }
    },
    [addManager, formState.newManager]
  );

  const handleDeleteManager = useCallback(
    async (id: string) => {
      if (!window.confirm("Are you sure you want to delete this manager?")) return;
      try {
        await deleteManager(id).unwrap();
        toast.success("Manager deleted successfully!");
        if (selectedManagerId === id) setSelectedManagerId(null);
      } catch {
        toast.error("Failed to delete manager!");
      }
    },
    [deleteManager, selectedManagerId]
  );

  const handleEditManager = useCallback(
    (id: string) => {
      const manager = managers.find((m) => m.id === id);
      if (manager) {
        setFormState((prev) => ({
          ...prev,
          showUpdateForm: true,
          managerInfo: {
            name: manager.name,
            email: manager.email,
            phone: manager.phone || "",
            password: "",
            confirmPassword: "",
            address: "",
            gender: manager.gender,
            dateOfBirth: manager.dateOfBirth || "",
            status: manager.status,
            dailyReports: manager.dailyReports || 0,
            processedReports: manager.processedReports || 0,
            unprocessedReports: manager.unprocessedReports || 0,
          },
        }));
      }
    },
    [managers]
  );

  const handleBanManager = useCallback(
    async (id: string) => {
      if (isRejecting) return;
      if (!window.confirm("Are you sure you want to ban this manager?")) return;
      try {
        await rejectManager(id).unwrap();
        toast.success("Manager banned successfully!");
        if (selectedManagerId === id) {
          setSelectedManagerId(null);
          navigate("/managers");
        }
      } catch {
        toast.error("Failed to ban manager!");
      }
    },
    [rejectManager, isRejecting, selectedManagerId, navigate]
  );

  const handleUpdateManagerInfo = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!selectedManagerId || !formState.managerInfo.name || !formState.managerInfo.email) {
        toast.error("Please select a manager and fill in all required information!");
        return;
      }
      try {
        await updateManagerInfo({
          id: selectedManagerId,
          data: formState.managerInfo,
        }).unwrap();
        toast.success("Manager information updated successfully!");
        setFormState((prev) => ({ ...prev, showUpdateForm: false }));
      } catch {
        toast.error("Failed to update manager information!");
      }
    },
    [updateManagerInfo, selectedManagerId, formState.managerInfo]
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Managers</h1>
        <button
          onClick={() => setFormState((prev) => ({ ...prev, showAddForm: !prev.showAddForm }))}
          className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
        >
          {formState.showAddForm ? "Close" : "Create New"}
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
                onEdit={handleEditManager}
                onBanned={handleBanManager}
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