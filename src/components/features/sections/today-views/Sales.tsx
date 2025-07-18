import { Icon } from '@iconify/react';          // hoặc IconifyIcon wrapper cũ
import { sales } from '../../../../data/sales';
import SaleCard from './SaleCard';

const Sales = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm pt-6 pb-8 px-8">
      
      <div className="flex items-center justify-between mb-10">
        <div>
          
          <h4 className="text-2xl font-semibold mb-1">Today's Summary</h4>

        </div>

        
        <button
          type="button"
          className="
            inline-flex items-center gap-2
            border border-primary-600 text-primary-600
            hover:bg-primary-50
            px-4 py-2 rounded-md text-sm font-medium
            transition-colors
          "
        >
          <Icon icon="solar:upload-linear" className="w-5 h-5" />
          Export
        </button>
      </div>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-4
          gap-8         /* ≈ spacing={3.875} (31 px)  */
          xl:gap-5      /* ≈ spacing={2} (16 px) khi ≥1280px */
        "
      >
        {sales.map((item) => (
          <SaleCard key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Sales;