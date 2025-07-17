const TopProduct = ({
  product,
}: {
  product: { id: number; name: string; color: string; sales: number };
}) => {
  return (
    <tr className="border-b">
      <td className="py-3 px-4 font-medium text-sm text-gray-700">
        0{product.id}
      </td>
      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-800">
        {product.name}
      </td>
      <td className="py-3 px-4">
        <div className="w-44 bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className={`${product.color} h-full rounded-full`}
            style={{ width: `${product.sales}%` }}
          ></div>
        </div>
      </td>
      <td className="py-3 px-4">
        <span
          className={`text-xs font-medium px-2 py-0.5 border rounded-full ${product.color} text-white`}
        >
          {product.sales}%
        </span>
      </td>
    </tr>
  );
};

export default TopProduct;
