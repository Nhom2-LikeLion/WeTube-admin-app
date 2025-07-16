import React from 'react';
import { useGetManagerInfoQuery } from '../../../services/api/managerApi';

interface Props {
  managerId: string;
}

const ManagerInfoPage: React.FC<Props> = ({ managerId }) => {
  const { data, isLoading, error } = useGetManagerInfoQuery(managerId);

  if (isLoading) return <p>Đang tải thông tin...</p>;
  if (error) return <p>Có lỗi xảy ra!</p>;

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Thông tin Quản lý</h2>
      <p>Tên: {data?.name}</p>
      <p>Email: {data?.email}</p>
      <p>Tổng video: {data?.totalVideos}</p>
    </div>
  );
};

export default ManagerInfoPage;