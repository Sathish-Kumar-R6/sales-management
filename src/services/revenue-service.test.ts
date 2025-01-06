import { calculateRevenue } from "../services/revenue-service"; // Update the path as needed
import { prisma } from "../prisma";
import { RevenueFilterTypes } from "../controllers/revenue.types"; // Update the path as needed

jest.mock("../prisma", () => ({
  prisma: {
    order_details: {
      findMany: jest.fn(),
    },
  },
}));

describe("calculateRevenue", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should calculate the total revenue correctly", async () => {
    const mockFilters: RevenueFilterTypes = {
      product_id: "123",
      product: { category: "electronics" },
    };

    const mockOrderDetails = [
      {
        quantity: 10,
        unit_price: 50,
        discount: 0.1,
        shipping_cost: 5,
      },
      {
        quantity: 5,
        unit_price: 100,
        discount: 0.2,
        shipping_cost: 10,
      },
    ];

    (prisma.order_details.findMany as jest.Mock).mockResolvedValue(
      mockOrderDetails,
    );

    const result = await calculateRevenue(mockFilters);
    expect(result).toBe(835);

    expect(prisma.order_details.findMany).toHaveBeenCalledWith({
      where: mockFilters,
      select: {
        quantity: true,
        unit_price: true,
        discount: true,
        shipping_cost: true,
      },
    });
  });

  it("should return 0 if no order details are found", async () => {
    const mockFilters: RevenueFilterTypes = {
      product_id: "456",
      region: "North",
    };

    (prisma.order_details.findMany as jest.Mock).mockResolvedValue([]);

    const result = await calculateRevenue(mockFilters);

    expect(result).toBe(0);

    expect(prisma.order_details.findMany).toHaveBeenCalledWith({
      where: mockFilters,
      select: {
        quantity: true,
        unit_price: true,
        discount: true,
        shipping_cost: true,
      },
    });
  });
});
