import type { FormEvent } from "react";
import type { FormData } from "../../../types/managerTypes/managerVideo";

export const UpdateManagerForm: React.FC<{
  managerInfo: FormData;
  setManagerInfo: (data: FormData) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}> = ({ managerInfo, setManagerInfo, onSubmit, isLoading }) => (
  <div className="p-6 bg-white rounded-xl shadow-md">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">Cập nhật Thông tin Quản lý</h2>
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
      <select
        value={managerInfo.status || "Pending"}
        onChange={(e) =>
          setManagerInfo({ ...managerInfo, status: e.target.value as 'Pending'})
        }
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Pending">Pending</option>
      </select>
      
      <input
        type="number"
        placeholder="Báo cáo ngày"
        value={managerInfo.dailyReports || ""}
        onChange={(e) =>
          setManagerInfo({ ...managerInfo, dailyReports: Number(e.target.value) || 0 })
        }
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Báo cáo tuần"
        value={managerInfo.weeklyReports || ""}
        onChange={(e) =>
          setManagerInfo({ ...managerInfo, weeklyReports: Number(e.target.value) || 0 })
        }
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Báo cáo tháng"
        value={managerInfo.monthlyReports || ""}
        onChange={(e) =>
          setManagerInfo({ ...managerInfo, monthlyReports: Number(e.target.value) || 0 })
        }
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Báo cáo đã xử lý"
        value={managerInfo.processedReports || ""}
        onChange={(e) =>
          setManagerInfo({ ...managerInfo, processedReports: Number(e.target.value) || 0 })
        }
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Báo cáo chưa xử lý"
        value={managerInfo.unprocessedReports || ""}
        onChange={(e) =>
          setManagerInfo({ ...managerInfo, unprocessedReports: Number(e.target.value) || 0 })
        }
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 rounded-md text-white font-medium transition ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {isLoading ? "Đang cập nhật..." : "Cập nhật"}
      </button>
    </form>
  </div>
);