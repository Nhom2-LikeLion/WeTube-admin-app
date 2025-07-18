import type { FormEvent } from "react";
import type { FormData } from "../../../types/managerTypes/managerVideo";

export const AddManagerForm = ({
  newManager,
  setNewManager,
  onSubmit,
  isLoading,
}: {
  newManager: FormData;
  setNewManager: (data: FormData) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}) => (
  <form onSubmit={onSubmit} className="space-y-4 p-6 bg-white rounded-xl shadow-md w-full mt-4">
    <h2 className="text-xl font-semibold text-gray-800">Tạo mới tài khoản quản lý</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Họ và tên"
        value={newManager.name}
        onChange={(e) => setNewManager({ ...newManager, name: e.target.value })}
        className="p-2 border rounded-md"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={newManager.email}
        onChange={(e) => setNewManager({ ...newManager, email: e.target.value })}
        className="p-2 border rounded-md"
        required
      />
      <input
        type="tel"
        placeholder="Số điện thoại"
        value={newManager.phone}
        onChange={(e) => setNewManager({ ...newManager, phone: e.target.value })}
        className="p-2 border rounded-md"
        required
      />
      <input
        type="text"
        placeholder="Địa chỉ"
        value={newManager.address}
        onChange={(e) => setNewManager({ ...newManager, address: e.target.value })}
        className="p-2 border rounded-md"
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={newManager.password}
        onChange={(e) => setNewManager({ ...newManager, password: e.target.value })}
        className="p-2 border rounded-md"
        required
      />
      <input
        type="password"
        placeholder="Xác nhận mật khẩu"
        value={newManager.confirmPassword}
        onChange={(e) => setNewManager({ ...newManager, confirmPassword: e.target.value })}
        className="p-2 border rounded-md"
        required
      />
      <input
        type="date"
        placeholder="Ngày sinh"
        value={newManager.dateOfBirth}
        onChange={(e) => setNewManager({ ...newManager, dateOfBirth: e.target.value })}
        className="p-2 border rounded-md"
      />
      <select
        value={newManager.status}
        onChange={(e) => setNewManager({ ...newManager, status: e.target.value as 'Pending' })}
        className="p-2 border rounded-md"
      >
        <option value="Pending">Pending</option>
      </select>
      <select
        value={newManager.gender}
        onChange={(e) => setNewManager({ ...newManager, gender: e.target.value as 'male' | 'female' | 'other' })}
        className="p-2 border rounded-md"
      >
        <option value="male">Nam</option>
        <option value="female">Nữ</option>
        <option value="other">Khác</option>
      </select>
      <input
        type="number"
        placeholder="Báo cáo ngày"
        value={newManager.dailyReports || ""}
        onChange={(e) => setNewManager({ ...newManager, dailyReports: Number(e.target.value) || 0 })}
        className="p-2 border rounded-md"
      />
      <input
        type="number"
        placeholder="Báo cáo tuần"
        value={newManager.weeklyReports || ""}
        onChange={(e) => setNewManager({ ...newManager, weeklyReports: Number(e.target.value) || 0 })}
        className="p-2 border rounded-md"
      />
      <input
        type="number"
        placeholder="Báo cáo tháng"
        value={newManager.monthlyReports || ""}
        onChange={(e) => setNewManager({ ...newManager, monthlyReports: Number(e.target.value) || 0 })}
        className="p-2 border rounded-md"
      />
      <input
        type="number"
        placeholder="Báo cáo đã xử lý"
        value={newManager.processedReports || ""}
        onChange={(e) => setNewManager({ ...newManager, processedReports: Number(e.target.value) || 0 })}
        className="p-2 border rounded-md"
      />
      <input
        type="number"
        placeholder="Báo cáo chưa xử lý"
        value={newManager.unprocessedReports || ""}
        onChange={(e) => setNewManager({ ...newManager, unprocessedReports: Number(e.target.value) || 0 })}
        className="p-2 border rounded-md"
      />
    </div>
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full py-2 rounded-md text-white font-medium ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
    >
      {isLoading ? 'Đang tạo...' : 'Tạo Quản lý'}
    </button>
  </form>
);