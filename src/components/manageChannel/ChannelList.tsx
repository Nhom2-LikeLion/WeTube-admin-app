import { useEffect, useMemo, useState } from "react";
import { useGetAllChannelsQuery } from "../../services/api/channelApi";
import type { IChannelListProps } from "../../types/channelTypes/channel";
import { getErrorMessage } from "../../utils/helpers";

export const ChannelList: React.FC<IChannelListProps> = ({
  filters,
  sort,
  onShowDetail,
  // onEditChannel,
}) => {
  const {
    data: allChannels,
    error,
    isLoading,
    isFetching,
  } = useGetAllChannelsQuery();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Number of items to display per page

  const statusColors: Record<string, string> = {
    Active: "bg-green-500",
    Banned: "bg-red-500",
    Strike: "bg-orange-500",
    Warning: "bg-yellow-500",
  };

  const processedChannels = useMemo(() => {
    if (!allChannels) return [];

    let currentChannels = [...allChannels];

    // Apply filters from the complex filter object
    if (filters.searchTerm) {
      currentChannels = currentChannels.filter(
        (channel) =>
          channel.channelName
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
          channel.email.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Apply numerical range filters
    if (filters.minRevenue > 0 || filters.maxRevenue < Infinity) {
      currentChannels = currentChannels.filter(
        (channel) =>
          channel.revenue >= filters.minRevenue &&
          channel.revenue <= filters.maxRevenue
      );
    }
    if (filters.minViews > 0 || filters.maxViews < Infinity) {
      currentChannels = currentChannels.filter(
        (channel) =>
          channel.views >= filters.minViews && channel.views <= filters.maxViews
      );
    }
    if (filters.minSubscribers > 0 || filters.maxSubscribers < Infinity) {
      currentChannels = currentChannels.filter(
        (channel) =>
          channel.subscribers >= filters.minSubscribers &&
          channel.subscribers <= filters.maxSubscribers
      );
    }
    if (filters.minReports > 0 || filters.maxReports < Infinity) {
      currentChannels = currentChannels.filter(
        (channel) =>
          channel.reports >= filters.minReports &&
          channel.reports <= filters.maxReports
      );
    }

    // Apply sort
    switch (sort) {
      case "name-asc":
        currentChannels.sort((a, b) =>
          a.channelName.localeCompare(b.channelName)
        );
        break;
      case "name-desc":
        currentChannels.sort((a, b) =>
          b.channelName.localeCompare(a.channelName)
        );
        break;
      case "revenue-desc":
        currentChannels.sort((a, b) => b.revenue - a.revenue);
        break;
      case "revenue-asc":
        currentChannels.sort((a, b) => a.revenue - b.revenue);
        break;
      case "subscribers-desc":
        currentChannels.sort((a, b) => b.subscribers - a.subscribers);
        break;
      case "subscribers-asc":
        currentChannels.sort((a, b) => a.subscribers - b.subscribers);
        break;
      default:
        break;
    }
    return currentChannels;
  }, [allChannels, filters, sort]);

  // Reset page to 1 when filters or sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sort]);

  // Pagination logic
  const totalPages = Math.ceil(processedChannels.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = processedChannels.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`px-4 py-2 rounded-lg mx-1 transition duration-200 ease-in-out
            ${
              currentPage === i
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  if (isLoading || isFetching) {
    return (
      <div className="text-center py-8 text-gray-600">Loading channels...</div>
    );
  }

  if (error) {
    // Use the imported getErrorMessage helper function
    const errorMessage = getErrorMessage(error);
    return (
      <div className="text-center py-8 text-red-600">
        Error loading channels: {errorMessage}
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Channel List</h2>
      {processedChannels.length === 0 ? (
        <p className="text-gray-600 text-center py-8">
          No channels found matching your criteria.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {currentItems.map((channel) => (
              <div
                key={channel.id}
                className="bg-gray-50 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition duration-200 ease-in-out overflow-hidden cursor-pointer"
                onClick={() => onShowDetail(channel.id)} // Added onClick to the entire card
              >
                {/* Profile Section (Top Half) - Blurred Cover Image */}
                <div className="relative h-28 overflow-hidden">
                  {/* Blurred Cover Image */}
                  <img
                    src={
                      channel.cover || // Assuming 'cover' is the property for the background image
                      `https://placehold.co/400x112/e0e0e0/000000?text=Cover`
                    }
                    alt={`${channel.channelName} cover`}
                    className="absolute inset-0 w-full h-full object-cover filter transform scale-110"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/400x112/e0e0e0/000000?text=Cover`;
                      e.currentTarget.classList.remove(
                        "filter",
                        "blur-md",
                        "transform",
                        "scale-110"
                      );
                      e.currentTarget.style.backgroundColor = "#e0e0e0";
                    }}
                  />
                  {/* Dark Overlay for readability of text */}
                  <div className="absolute inset-0 bg-opacity-30"></div>
                </div>

                {/* Content overlapping cover and details */}
                <div className="relative -mt-10 px-4 flex items-end justify-between">
                  {/* Circular Avatar */}
                  <img
                    src={
                      channel.avatar ||
                      `https://placehold.co/80x80/cccccc/333333?text=${channel.channelName.charAt(
                        0
                      )}`
                    }
                    alt={`${channel.channelName} avatar`}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg z-10"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/80x80/cccccc/333333?text=${channel.channelName.charAt(
                        0
                      )}`;
                    }}
                  />
                </div>

                {/* Channel Details Section (Bottom Half) */}
                <div className="p-4 pt-4">
                  {/* Channel Name and Status Dot - Moved here */}
                  <div className="flex items-center mb-2">
                    <span
                      className={`w-3 h-3 rounded-full mr-2 ${
                        statusColors[channel.status] || statusColors.default
                      }`}
                      aria-label={`Channel status: ${
                        channel.status || "Unknown"
                      }`}
                    ></span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {channel.channelName}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-1">
                    Email: {channel.email}
                  </p>
                  {/* Shortened data display */}
                  <p className="text-gray-600 text-sm mb-2">
                    Revenue:{" "}
                    <span className="font-medium text-blue-700">
                      {channel.revenue.toLocaleString("en-US")} USD
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 ease-in-out"
              >
                Previous
              </button>
              {renderPageNumbers()}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 ease-in-out"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
