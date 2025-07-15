import React from 'react';
import { useGetManagerReportStateQuery } from '../../../services/api/managerApi';


interface Props {
  managerId: string;
}

const ManagerReportPage : React.FC<Props> = ({ managerId }) => {
  const { data, isLoading, error } = useGetManagerReportStateQuery(managerId);


  if (isLoading) return <p>Đang tải tình trạng báo cáo...</p>;
  if (error) return <p>Có lỗi xảy ra!</p>;

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Trạng thái báo cáo</h2>
      <p>Tổng báo cáo: {data?.totalReports}</p>
      <p>Đã xử lý: {data?.resolvedReports}</p>
      <p>Chưa xử lý: {data?.unresolvedReports}</p>
    </div>
  );
};

export default ManagerReportPage;