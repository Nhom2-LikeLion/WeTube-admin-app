import OrderIcon from "../components/icons/OrderIcon";
import SalesIcon from "../components/icons/SalesIcon";
import type { JSX } from "react";

export interface SaleItem {
  label: string;
  value: string;
  growth: string;
  bgColorClass: string; // vd: 'bg-red-50'
  iconBgColorClass: string; // vd: 'bg-red-500'
  icon?: string; // tên icon cho Iconify
  SvgIcon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

export const sales: SaleItem[] = [
  {
    label: "Total Users",
    value: "1M8",
    growth: "+8%",
    bgColorClass: "bg-red-50",
    iconBgColorClass: "bg-red-500",
    SvgIcon: SalesIcon,
  },
  {
    label: "Total Views",
    value: "300T",
    growth: "+5%",
    bgColorClass: "warning.lighter",
    iconBgColorClass: "error.dark",
    SvgIcon: OrderIcon,
  },
  {
    label: "Total Pro Users",
    value: "500K",
    growth: "+1.2%",
    bgColorClass: "success.lighter",
    iconBgColorClass: "success.darker",
    icon: "ion:pricetag",
  },
  {
    label: "Active Users",
    value: "800K",
    growth: "+0.5%",
    bgColorClass: "secondary.lighter",
    iconBgColorClass: "secondary.main",
    icon: "material-symbols:person-add",
  },
];
