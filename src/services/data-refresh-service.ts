import { prisma } from "../prisma";
import { loadData } from "./data-loader";

export async function refreshData(filePath: string): Promise<void> {
  await prisma.$transaction(async (tx) => {
    await tx.order_details.deleteMany();
    await tx.orders.deleteMany();
    await tx.products.deleteMany();
  });
  const { products, orders, orderDetails } = await loadData(filePath);
  await prisma.$transaction(async (tx) => {
    await tx.products.createMany({
      data: products,
    });
    await tx.orders.createMany({
      data: orders,
    });
    await tx.order_details.createMany({
      data: orderDetails,
    });
    await tx.refresh_logs.create({
      data: {
        status: "success",
        message: "Data refresh completed successfully",
      },
    });
  });
}
