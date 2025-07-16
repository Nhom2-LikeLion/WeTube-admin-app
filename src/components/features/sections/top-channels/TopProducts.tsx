import TopProductRow from "./TopProduct";

const topProducts = [
  { id: 1, name: "Channel A", color: "bg-blue-500", sales: 70 },
  { id: 2, name: "Channel B", color: "bg-green-500", sales: 55 },
  { id: 3, name: "Channel C", color: "bg-yellow-500", sales: 80 },
  { id: 4, name: "Channel D", color: "bg-red-500", sales: 45 },
];

const TopProducts = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Channels</h4>

      <div className="overflow-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 font-medium text-gray-600">#</th>
              <th className="py-3 px-4 font-medium text-gray-600">Name</th>
              <th className="py-3 px-4 font-medium text-gray-600">
                Subscribers
              </th>
              <th className="py-3 px-4 font-medium text-gray-600">Revenue</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {topProducts.map((product) => (
              <TopProductRow key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProducts;
