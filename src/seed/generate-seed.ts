import path from "path";
import { parseCSV } from "../utils/csv-parser";
import { prisma } from "../prisma";
import {
  ProductInterface,
  Order,
  OrderDetails,
  Customers,
} from "../services/sales.types";
import { logger } from "../utils/logger";

const products: ProductInterface[] = [];
const orders: Order[] = [];
const orderDetails: OrderDetails[] = [];
const customers: Customers[] = [];

async function generateSeedData() {
  try {
    const filePath = path.join(__dirname, "../../data/seed.csv");
    const data = await parseCSV(filePath);
    for (const row of data) {
      const isProductPresent = products.find((p) => p.id === row["Product ID"]);
      if (!isProductPresent) {
        const productDatum = {
          id: row["Product ID"],
          name: row["Product Name"],
          category: row["Category"],
        };
        products.push(productDatum);
      }

      const orderDetailsDatum = {
        order_id: row["Order ID"],
        product_id: row["Product ID"],
        quantity: parseInt(row["Quantity Sold"]),
        unit_price: parseFloat(row["Unit Price"]),
        discount: parseFloat(row["Discount"]),
        shipping_cost: parseFloat(row["Shipping Cost"]),
      };
      orderDetails.push(orderDetailsDatum);

      const orderDatum: Order = {
        id: row["Order ID"],
        customer_id: row["Customer ID"],
        region: row["Region"],
        date: new Date(row["Date of Sale"]),
        payment_method: row["Payment Method"],
      };
      orders.push(orderDatum);

      const isCustomerFound = customers.find(
        (p) => p.id === row["Customer ID"],
      );

      if (!isCustomerFound) {
        const customerDatum: Customers = {
          id: row["Customer ID"],
          name: row["Customer Name"] ?? "",
          address: row["Customer Address"] ?? "",
        };
        customers.push(customerDatum);
      }
    }

    await prisma.$transaction(async (tx) => {
      await tx.products.createMany({
        data: products,
      });

      await tx.customers.createMany({
        data: customers,
      });

      await tx.orders.createMany({
        data: orders,
      });

      await tx.order_details.createMany({
        data: orderDetails,
      });
    });
    logger.info("Seed data generated successfully.");
  } catch (error) {
    logger.error("Error generating seed data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

generateSeedData();
