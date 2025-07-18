const TopProductRow = ({
  product,
}: {
  product: { id: number; name: string; sub: string };
}) => {
  return (
    <tr className="border-b">
      <td className="py-3 px-4 font-medium text-sm text-gray-700">
        {product.id}
      </td>
      <td className="py-3 px-4 whitespace-nowrap text-center text-sm text-gray-800">
        {product.name}
      </td>
      <td className="py-4 px-4 text-right text-sm text-gray-800">
        {product.sub}
      </td>
      {/* <td className="py-3 px-4">
        <div className="w-44 bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className={`${product.sub} h-full rounded-full`}
            style={{ width: `${product.sales}%` }}
          ></div>
        </div>
      </td> */}
      {/* <td className="py-3 px-4">
        <span
          className={`text-xs font-medium px-2 py-0.5 border rounded-full ${product.sub} text-white`}
        >
          {product.sales}%
        </span>
      </td> */}
    </tr>
  );
};

const topProducts = [
  { id: 1, name: "Channel A", sub: "1M2" },
  { id: 2, name: "Channel B", sub: "500K" },
  { id: 3, name: "Channel C", sub: "350K" },
  { id: 4, name: "Channel D", sub: "120K" },
  { id: 5, name: "Channel D", sub: "256K" },
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
              <th className="py-3 px-4 font-medium text-gray-600 text-center">
                Name
              </th>
              <th className="py-3 px-4 font-medium text-gray-600 text-right">
                Subscribers
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {topProducts.map((product) => (
              <TopProductRow
                key={product.id}
                product={product}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProducts;
