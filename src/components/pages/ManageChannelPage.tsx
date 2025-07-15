import React, { useState } from "react";

export const ManageChannelPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="p-6 max-w-7xl mx-auto border-2 border-gray-300 rounded-lg">
      <div className="mb-6 border-2 border-blue-300 p-4 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-900">Manage Channel</h1>
      </div>

      {/* SearchBar */}
      <div className="mb-6 border-2 border-green-300 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="border border-gray-300 rounded-lg px-4 py-2">
            Placeholder: Select (Name/Email)
          </div>
          <div className="flex-1 border border-gray-300 rounded-lg px-4 py-2">
            Placeholder: Input (Find by name or email...)
          </div>
          <div className="border border-gray-300 rounded-lg px-4 py-2">
            Placeholder: Button (Search)
          </div>
        </div>
      </div>

      {/* FilterSortPanel */}
      <div className="mb-6 border-2 border-yellow-300 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="border border-gray-300 rounded-lg px-4 py-2">
            Placeholder: Select (Filter by...)
          </div>
          <div className="border border-gray-300 rounded-lg px-4 py-2">
            Placeholder: Select (Sort by...)
          </div>
          <div className="border border-gray-300 rounded-lg px-4 py-2">
            Placeholder: Button (Apply)
          </div>
          <div className="border border-gray-300 rounded-lg px-4 py-2">
            Placeholder: Button (Remove filter)
          </div>
        </div>
      </div>

      {/* ChannelList */}
      <div className="border-2 border-red-300 p-4 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Revenue</th>
                <th className="px-6 py-3 text-left">Views</th>
                <th className="px-6 py-3 text-left">Subscribers</th>
                <th className="px-6 py-3 text-left">Report</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="px-6 py-4">Placeholder: Channel 1</td>
                <td className="px-6 py-4">Placeholder: channel1@example.com</td>
                <td className="px-6 py-4">Placeholder: 1.000.000 VNĐ</td>
                <td className="px-6 py-4">Placeholder: 50.000</td>
                <td className="px-6 py-4">Placeholder: 1.000</td>
                <td className="px-6 py-4">Placeholder: 5</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <div className="border border-gray-300 rounded-lg px-3 py-1">
                      Placeholder: Button (Show detail)
                    </div>
                    <div className="border border-gray-300 rounded-lg px-3 py-1">
                      Placeholder: Button (Delete)
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ChannelDetailsModal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="max-w-lg w-full border-2 border-purple-300 p-6 rounded-lg bg-white">
            <div className="border-b border-gray-300 pb-2 mb-4">
              Placeholder: Tiêu đề modal (Chi tiết Channel)
            </div>
            <div className="border border-gray-300 p-2 mb-2">
              Placeholder: Tên: Channel 1
            </div>
            <div className="border border-gray-300 p-2 mb-2">
              Placeholder: Email: channel1@example.com
            </div>
            <div className="border border-gray-300 p-2 mb-2">
              Placeholder: Doanh thu: 1.000.000 VNĐ
            </div>
            <div className="border border-gray-300 p-2 mb-2">
              Placeholder: Lượt xem: 50.000
            </div>
            <div className="border border-gray-300 p-2 mb-2">
              Placeholder: Người đăng ký: 1.000
            </div>
            <div className="border border-gray-300 p-2 mb-2">
              Placeholder: Báo cáo: 5
            </div>
            <div className="border border-gray-300 rounded-lg px-4 py-2 mt-4">
              Placeholder: Button (Đóng)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
