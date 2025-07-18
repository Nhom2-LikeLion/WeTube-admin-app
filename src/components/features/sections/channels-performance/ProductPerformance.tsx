import { useState, useMemo } from "react";

const rows = [
  { id: 1, video: "1", name: "Channel A", views: "Low", budget: 15000 },
  { id: 2, video: "2", name: "Channel B", views: "Medium", budget: 35000 },
  { id: 3, video: "3", name: "Channel C", views: "High", budget: 50000 },
  { id: 4, video: "4", name: "Channel D", views: "Critical", budget: 80000 },
  { id: 5, video: "5", name: "Channel E", views: "Low", budget: 12000 },
  { id: 6, video: "6", name: "Channel F", views: "Medium", budget: 22000 },
  { id: 7, video: "7", name: "Channel G", views: "High", budget: 47000 },
  { id: 8, video: "8", name: "Channel H", views: "Critical", budget: 91000 },
];

const currencyFormat = (value: number) => `$${value.toLocaleString()}`;

const ProductPerformance = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filteredRows = useMemo(() => {
    return rows.filter((row) =>
      row.video.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, currentPage]);

  const totalPages = Math.ceil(filteredRows.length / pageSize);

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
        <h2 className="text-lg font-semibold">Videos Performance</h2>

        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search..."
          className="border px-3 py-2 rounded text-sm w-full md:w-64"
        />
      </div>

      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2 text-left">Videos</th>
            <th className="border px-3 py-2 text-left">Channels</th>
            <th className="border px-3 py-2 text-left">Views</th>
            <th className="border px-3 py-2 text-left">Budget</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-50"
            >
              <td className="border px-3 py-2">{row.video}</td>
              <td className="border px-3 py-2">{row.name}</td>
              <td className="border px-3 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    row.views === "Low"
                      ? "bg-green-100 text-green-800"
                      : row.views === "Medium"
                      ? "bg-blue-100 text-blue-800"
                      : row.views === "High"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {row.views}
                </span>
              </td>
              <td className="border px-3 py-2">{currencyFormat(row.budget)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductPerformance;
