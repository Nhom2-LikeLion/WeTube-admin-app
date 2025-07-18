import { Calendar, Clock, Flag, Tag, User, X } from "lucide-react";
import React from "react";
import type { VideoInfo } from "../../../types/managerVideoTypes/videoInfo";
import ConfirmationModal from "./ConfirmationModalProps";

interface VideoDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: VideoInfo | null;
}

const VideoDetailModal: React.FC<VideoDetailModalProps> = ({
  isOpen,
  onClose,
  video,
}) => {
  const [confirmationModal, setConfirmationModal] = React.useState<{
    isOpen: boolean;
    type: "approve" | "reject" | "delete" | "remove";
    title: string;
    message: string;
    onConfirm: (reason?: string) => void;
    showReasonInput?: boolean;
    reasonPlaceholder?: string;
  }>({
    isOpen: false,
    type: "approve",
    title: "",
    message: "",
    onConfirm: () => {},
    showReasonInput: false,
    reasonPlaceholder: "",
  });

  if (!isOpen || !video) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ duyệt";
      case "approved":
        return "Đã phê duyệt";
      case "rejected":
        return "Vi phạm";
      default:
        return status;
    }
  };

  const handleApproveVideo = () => {
    setConfirmationModal({
      isOpen: true,
      type: "approve",
      title: "Phê duyệt video",
      message: `Bạn có chắc chắn muốn phê duyệt video "${video.title}"? Video sẽ được hiển thị công khai trên nền tảng.`,
      onConfirm: () => {
        // Logic phê duyệt video
        console.log("Video approved:", video.id);
      },
    });
  };

  const handleRejectVideo = () => {
    setConfirmationModal({
      isOpen: true,
      type: "reject",
      title: "Từ chối video",
      message: `Bạn có chắc chắn muốn từ chối video "${video.title}"? Video sẽ bị đánh dấu vi phạm và không được hiển thị.`,
      onConfirm: (reason) => {
        // Logic từ chối video
        console.log("Video rejected:", video.id, "Reason:", reason);
      },
      showReasonInput: true,
      reasonPlaceholder:
        "Ví dụ: Video chứa nội dung không phù hợp, vi phạm quy định cộng đồng...",
    });
  };

  const handleRemoveVideo = () => {
    setConfirmationModal({
      isOpen: true,
      type: "remove",
      title: "Gỡ xuống video",
      message: `Bạn có chắc chắn muốn gỡ xuống video "${video.title}"? Video sẽ không còn hiển thị công khai.`,
      onConfirm: () => {
        // Logic gỡ xuống video
        console.log("Video removed:", video.id);
      },
    });
  };

  const handleDeleteVideo = () => {
    setConfirmationModal({
      isOpen: true,
      type: "delete",
      title: "Xóa video vĩnh viễn",
      message: `Bạn có chắc chắn muốn xóa vĩnh viễn video "${video.title}"? Hành động này không thể hoàn tác.`,
      onConfirm: () => {
        // Logic xóa video
        console.log("Video deleted:", video.id);
        onClose();
      },
    });
  };

  const closeConfirmationModal = () => {
    setConfirmationModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Chi tiết Video</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Video Preview */}
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute bottom-3 right-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                    {video.duration_seconds}
                  </div>
                  <div
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      video.status
                    )}`}
                  >
                    {getStatusText(video.status)}
                  </div>
                </div>

                {/* Reports */}
                {video.reports && video.reports > 0 && (
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Flag className="text-red-600" size={20} />
                      <div>
                        <p className="text-sm text-red-600 font-medium">
                          Báo cáo vi phạm
                        </p>
                        <p className="text-lg font-bold text-red-900">
                          {video.reports} báo cáo
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-600">
                    {video.description ||
                      "Đây là một video hướng dẫn chi tiết về React Hook. Video này sẽ giúp bạn hiểu rõ hơn về cách sử dụng useState, useEffect và các hook khác trong React. Nội dung được trình bày một cách dễ hiểu và có ví dụ thực tế."}
                  </p>
                </div>

                {/* Upload Info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="text-gray-500" size={18} />
                    <div>
                      <p className="text-sm text-gray-500">Người tải lên</p>
                      <p className="font-medium text-gray-900">
                        {video.user_id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="text-gray-500" size={18} />
                    <div>
                      <p className="text-sm text-gray-500">Ngày tải lên</p>
                      <p className="font-medium text-gray-900">
                        {new Date(video.upload_date).toLocaleDateString(
                          "vi-VN"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="text-gray-500" size={18} />
                    <div>
                      <p className="text-sm text-gray-500">Thời lượng</p>
                      <p className="font-medium text-gray-900">
                        {video.duration_seconds}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <p className="text-sm text-gray-500 mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  {video.status === "pending" && (
                    <>
                      <button
                        onClick={handleApproveVideo}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Phê duyệt
                      </button>
                      <button
                        onClick={handleRejectVideo}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Từ chối
                      </button>
                    </>
                  )}
                  {video.status === "approved" && (
                    <button
                      onClick={handleRemoveVideo}
                      className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Gỡ xuống
                    </button>
                  )}
                  <button
                    onClick={handleDeleteVideo}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Xóa vĩnh viễn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={closeConfirmationModal}
        onConfirm={confirmationModal.onConfirm}
        title={confirmationModal.title}
        message={confirmationModal.message}
        type={confirmationModal.type}
        showReasonInput={confirmationModal.showReasonInput}
        reasonPlaceholder={confirmationModal.reasonPlaceholder}
        confirmText={
          confirmationModal.type === "approve"
            ? "Phê duyệt"
            : confirmationModal.type === "reject"
            ? "Từ chối"
            : confirmationModal.type === "delete"
            ? "Xóa vĩnh viễn"
            : "Gỡ xuống"
        }
      />
    </>
  );
};

export default VideoDetailModal;
