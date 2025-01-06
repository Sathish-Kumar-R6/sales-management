import { prisma } from "../prisma";
import { loadData } from "./data-loader";
import { refreshData } from "./data-refresh-service";

jest.mock("../prisma", () => ({
  prisma: {
    $transaction: jest.fn(),
    order_details: { deleteMany: jest.fn(), createMany: jest.fn() },
    orders: { deleteMany: jest.fn(), createMany: jest.fn() },
    products: { deleteMany: jest.fn(), createMany: jest.fn() },
    refresh_logs: { create: jest.fn() },
  },
}));

jest.mock("./data-loader");

describe("refreshData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock implementation for nested transaction calls
    (prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
      const tx = {
        products: {
          deleteMany: prisma.products.deleteMany,
          createMany: prisma.products.createMany,
        },
        orders: {
          deleteMany: prisma.orders.deleteMany,
          createMany: prisma.orders.createMany,
        },
        order_details: {
          deleteMany: prisma.order_details.deleteMany,
          createMany: prisma.order_details.createMany,
        },
        refresh_logs: {
          create: prisma.refresh_logs.create,
        },
      };
      return callback(tx);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete existing data and load new data from file", async () => {
    const mockFilePath = "test-file.csv";
    const mockData = {
      products: [{ id: 1, name: "Product 1", category: "Category 1" }],
      orders: [
        {
          id: 1,
          customer_id: 1,
          region: "Region 1",
          date: new Date(),
          payment_method: "Credit Card",
        },
      ],
      orderDetails: [
        {
          order_id: 1,
          product_id: 1,
          quantity: 10,
          unit_price: 20.5,
          discount: 2.0,
          shipping_cost: 5.0,
        },
      ],
    };

    (loadData as jest.Mock).mockResolvedValue(mockData);

    await refreshData(mockFilePath);

    expect(prisma.$transaction).toHaveBeenCalledTimes(2);

    expect(prisma.products.deleteMany).toHaveBeenCalled();
    expect(prisma.orders.deleteMany).toHaveBeenCalled();
    expect(prisma.order_details.deleteMany).toHaveBeenCalled();

    expect(prisma.products.createMany).toHaveBeenCalledWith({
      data: mockData.products,
    });
    expect(prisma.orders.createMany).toHaveBeenCalledWith({
      data: mockData.orders,
    });
    expect(prisma.order_details.createMany).toHaveBeenCalledWith({
      data: mockData.orderDetails,
    });

    expect(prisma.refresh_logs.create).toHaveBeenCalledWith({
      data: {
        status: "success",
        message: "Data refresh completed successfully",
      },
    });
  });
});
