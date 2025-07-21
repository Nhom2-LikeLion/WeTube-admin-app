import React, { useState, useCallback, useEffect, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useAddManagerMutation,
  useDeleteManagerMutation,
  useGetManagersQuery,
  useUpdateManagerInfoMutation,
  useRejectManagerMutation,
  useGetManagerInfoQuery,
} from "../../services/api/managerApi";
import { toast } from "react-toastify";
import ManagerInfoPage from "../features/manager/ManagerInfo";
import type { RHFRegisterFormValues } from "../../types/managerTypes/registerManager";
import { UpdateManagerForm } from "../features/manager/UpdateManagerForm";
import { ManagerList } from "../features/manager/ManagerList";
import AddManagerForm from "../features/manager/AddManagerForm";

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
    managerInfo: RHFRegisterFormValues;
  }>({
    showAddForm: false,
    showUpdateForm: false,
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
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [banTargetId, setBanTargetId] = useState<string | null>(null);
  const { data: managerInfo, isLoading: isManagerLoading } = useGetManagerInfoQuery(selectedManagerId!, { skip: !selectedManagerId });

  useEffect(() => {
  if (managerInfo) {
    setFormState((prev) => ({
      ...prev,
      managerInfo: {
        name: managerInfo.name,
        email: managerInfo.email,
        phone: managerInfo.phone,
        password: "",
        confirmPassword: "",
        gender: managerInfo.gender,
        dateOfBirth: managerInfo.dateOfBirth,
        status: managerInfo.status,
      },
    }));
  }
}, [managerInfo]);



  const renderLoadingOrError = () => {
    if (isManagersLoading) return <p className="text-center text-gray-600">Loading manager list...</p>;
    if (managersError) return <p className="text-center text-red-600">An error occurred while loading the manager list!</p>;
    return null;
  };


  const handleAddManager = useCallback(
  async (data: RHFRegisterFormValues) => {
      try {
      await addManager(data).unwrap();
        toast.success("Manager added successfully!");
        setFormState((prev) => ({
          ...prev,
          showAddForm: false,
        }));
      } catch {
        toast.error("Failed to add manager!");
      }
    },
  [addManager]
  );

const handleEditManager = useCallback((id: string) => {
  setSelectedManagerId(id);
  setFormState((prev) => ({
    ...prev,
    showUpdateForm: true,
  }));
}, []);

  const confirmBanManager = useCallback( async () => {
    if (!banTargetId) return;
      try {
        toast.success("Manager banned successfully!");
        if (selectedManagerId === banTargetId) {
          setSelectedManagerId(null);
          navigate("/managers");
        }
      } catch {
        toast.error("Failed to deactive manager!");
      }
    }, [ banTargetId ,selectedManagerId, navigate]
  );
  const handleBanManager = (id: string) => {
  setBanTargetId(id);
};



  const handleUpdateManagerInfo = useCallback(
  async (data: RHFRegisterFormValues) => {
    if (!selectedManagerId) {
      toast.error("Please select a manager!");
        return;
      }
      try {
      await updateManagerInfo({ id: selectedManagerId, data }).unwrap();
        toast.success("Manager information updated successfully!");
        setFormState((prev) => ({ ...prev, showUpdateForm: false }));
      } catch {
        toast.error("Failed to update manager information!");
      }
    },
  [updateManagerInfo, selectedManagerId]
);


   const handleDeleteManager = useCallback(
    async () => {
      if(!deleteTargetId) return;
      
      try {
        await deleteManager(deleteTargetId).unwrap();
        toast.success("Manager deleted successfully!");
        if (selectedManagerId === deleteTargetId) setSelectedManagerId(null);
      } catch {
        toast.error("Failed to delete manager!");
      } finally {
        setDeleteTargetId(null);
      }
    }, [deleteManager, deleteTargetId ,selectedManagerId]
  );

  const handleDeleteClick = useCallback((id: string) => {
  setDeleteTargetId(id);
}, []);


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
            <div className="w-full ">
              <ManagerList
                managers={managers}
                selectedManagerId={selectedManagerId}
                onSelect={setSelectedManagerId}
                onView ={setSelectedManagerId}
                onEdit={handleEditManager}
                onDelete ={handleDeleteClick}
                onBanned ={handleBanManager}
              />
            </div>

            <Modal
              isOpen={formState.showAddForm}
              onClose={() => setFormState((prev) => ({ ...prev, showAddForm: false }))}
            > 
              <AddManagerForm onSubmit={handleAddManager} />
            </Modal>

            <Modal
              isOpen={!!selectedManagerId}
              onClose={() => setSelectedManagerId(null)}
            >
              {selectedManagerId && (
                <ManagerInfoPage managerId={selectedManagerId} />
              )}
            </Modal>

           <Modal
            isOpen={formState.showUpdateForm}
            onClose={() => setFormState((prev) => ({ ...prev, showUpdateForm: false }))}
            >
            <UpdateManagerForm
              defaultValues={{
                name: managerInfo?.name || "",
                email: managerInfo?.email || "",
                phone: managerInfo?.phone || "",
                password: "",
                confirmPassword: "",
                gender: managerInfo?.gender || "male",
                dateOfBirth: managerInfo?.dateOfBirth || "",
                status: managerInfo?.status || "Pending",
              }}
              onSubmit={handleUpdateManagerInfo}
              isLoading={isUpdating}
            />

            </Modal>
            <Modal
              isOpen={!!banTargetId}
              onClose={() => setBanTargetId(null)}
            >
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800">Ban Confirmation</h2>
                <p>Are you sure you want to deactivate this manager?</p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setBanTargetId(null)}
                    className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmBanManager}
                    className="px-4 py-2 rounded-md bg-yellow-600 text-white hover:bg-yellow-700"
                  >
                    Deactivate
                  </button>
                </div>
              </div>
            </Modal>

            <Modal
                isOpen={!!deleteTargetId}
                onClose={() => setDeleteTargetId(null)}
              >
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-800">Delete Confirmation</h2>
                  <p>Are you sure you want to delete this manager?</p>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => setDeleteTargetId(null)}
                      className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteManager}
                      className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
            </Modal>
        </div>
      )}
    </div>
  );
};