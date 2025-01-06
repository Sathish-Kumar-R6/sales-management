export interface ProductInterface {
  id: string;
  name: string;
  category: string;
}

export interface Order {
  id: string;
  customer_id: string;
  region: string;
  date: Date;
  payment_method: string;
}

export interface OrderDetails {
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  discount: number;
  shipping_cost: number;
}

export interface Customers {
  id: string;
  name?: string;
  address?: string;
}

export interface SalesCsvType {
  "Order ID": string;
  "Product ID": string;
  "Customer ID": string;
  "Product Name": string;
  Category: string;
  Region: string;
  "Date of Sale": string; // Format: 'YYYY-MM-DD'
  "Quantity Sold": string;
  "Unit Price": string;
  Discount: string;
  "Shipping Cost": string;
  "Payment Method": string;
  "Customer Name"?: string;
  "Customer Address"?: string;
}
