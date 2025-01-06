import { RevenueFilterTypes } from "../controllers/revenue.types";
import { prisma } from "../prisma";

export const calculateRevenue = async (filters: RevenueFilterTypes) => {
  const result = await prisma.order_details.findMany({
    where: filters,
    select: {
      quantity: true,
      unit_price: true,
      discount: true,
      shipping_cost: true,
    },
  });
  return result.reduce((total, detail) => {
    const revenue =
      detail.quantity * detail.unit_price * (1 - detail.discount) -
      detail.shipping_cost;
    return total + revenue;
  }, 0);
};
