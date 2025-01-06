import { parseCSV } from "../utils/csv-parser";
import { ProductInterface, Order, OrderDetails } from "./sales.types";

const products: ProductInterface[] = [];
const orders: Order[] = [];
const orderDetails: OrderDetails[] = [];

export async function loadData(filePath: string) {
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
  }
  return {
    products,
    orders,
    orderDetails,
  };
}
