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
    <div className="p-6 bg-white rounded-xl shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Thông tin Quản lý</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-gray-700"><strong>Tên:</strong> {managerData?.name || "Chưa cập nhật"}</p>
          <p className="text-gray-700"><strong>Email:</strong> {managerData?.email || "Chưa cập nhật"}</p>
          <p className="text-gray-700"><strong>Số điện thoại:</strong> {managerData?.phone || "Chưa cập nhật"}</p>
          <p className="text-gray-700"><strong>Ngày sinh:</strong> {managerData?.dateOfBirth || "Chưa cập nhật"}</p>
          <p className="text-gray-700"><strong>Giới tính:</strong> {managerData?.gender || "Chưa cập nhật"}</p>
          <p className="text-gray-700"><strong>Trạng thái:</strong> {managerData?.status || "Chưa cập nhật"}</p>
          <p className="text-gray-700"><strong>Tổng số báo cáo:</strong> {managerData?.dailyReports ?? 0}</p>
          <p className="text-gray-700"><strong>Báo cáo đã xử lý:</strong> {managerData?.processedReports ?? 0}</p>
          <p className="text-gray-700"><strong>Báo cáo chưa xử lý:</strong> {managerData?.unprocessedReports ?? 0}</p>
        </div>
        {managerData?.avatarUrl && (
          <div className="flex justify-center">
            <img
              src={managerData.avatarUrl}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Báo cáo đã xử lý gần đây (mới nhất)</h3>
        {managerData?.recentProcessedReports?.length ? (
          <ul className="space-y-2">
            {managerData.recentProcessedReports.slice(0, 3).map((report) => (
              <li key={report.id} className="p-3 bg-gray-100 rounded-md">
                <p><strong>Tiêu đề:</strong> {report.title}</p>
                 <p><strong>Trạng thái:</strong> {report.status}</p>
                <p><strong>Ngày xử lý:</strong> {new Date(report.processedDate).toLocaleDateString()}</p>
                {report.description && <p><strong>Mô tả:</strong> {report.description}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Chưa có báo cáo nào được xử lý.</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Video đã xử lý gần đây (mới nhất)</h3>
        {managerData?.recentProcessedVideos?.length ? (
          <ul className="space-y-2">
            {managerData.recentProcessedVideos.slice(0, 5).map((video) => (
              <li key={video.id} className="p-3 bg-gray-100 rounded-md">
                <p><strong>Tiêu đề:</strong> {video.title}</p>
                 <p><strong>Trạng thái:</strong> {video.status}</p>
                <p><strong>Ngày xử lý:</strong> {new Date(video.processedDate).toLocaleDateString()}</p>
                {video.url && (
                  <p>
                    <strong>Link:</strong>{" "}
                    <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Xem video
                    </a>
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Chưa có video nào được xử lý.</p>
        )}
      </div>
    </div>
  );
};
export default ManagerInfoPage;