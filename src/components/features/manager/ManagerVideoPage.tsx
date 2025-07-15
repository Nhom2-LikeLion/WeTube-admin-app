import React from 'react';
import { useGetManagerVideosQuery } from '../../../services/api/managerApi';

interface Props {
  managerId: string;
}

const ManagerVideosPage: React.FC<Props> = ({ managerId }) => {
  const { data: videos, isLoading, error } = useGetManagerVideosQuery(managerId);

  if (isLoading) return <p>Đang tải danh sách video...</p>;
  if (error) return <p>Có lỗi xảy ra!</p>;

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Danh sách Video</h2>
      <ul className="space-y-2">
        {videos?.map((video) => (
          <li key={video.id} className="border p-2 rounded-lg">
            <p className="font-semibold">{video.title}</p>
            <p>Trạng thái: {video.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagerVideosPage;