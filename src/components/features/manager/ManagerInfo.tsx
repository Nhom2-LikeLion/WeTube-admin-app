import React from "react";
import { useGetManagerInfoQuery, useGetManagersQuery } from "../../../services/api/managerApi";

interface Props {
  managerId: string;
}

const ManagerInfoPage: React.FC<Props> = ({ managerId }) => {
  const { data: managerData, isLoading: isManagerLoading, error: managerError } = useGetManagerInfoQuery(managerId);
  const { data: managers = [], isLoading: isManagersLoading, error: managersError } = useGetManagersQuery();

  if (isManagerLoading || isManagersLoading) return <p>Đang tải thông tin...</p>;
  if (managerError || managersError) return <p>Có lỗi xảy ra!</p>;

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Thông tin Quản lý</h2>
      <p>Tên: {managerData?.name}</p>
      <p>Email: {managerData?.email}</p>
      <p>Số điện thoại: {managerData?.phone || "Chưa cập nhật"}</p>
      <p>Ngày sinh: {managerData?.dateOfBirth || "Chưa cập nhật"}</p>
      <p>Giới tính: {managerData?.gender || "Chưa cập nhật"}</p>
      <p>Trạng thái: {managerData?.status || "Chưa cập nhật"}</p>
    </div>
  );
};

export default ManagerInfoPage;