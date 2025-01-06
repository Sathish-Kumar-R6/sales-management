import request from "supertest";
import express from "express";
import { getRevenue } from "../controllers/revenue-controller";
import { calculateRevenue } from "../services/revenue-service";

jest.mock("../services/revenue-service", () => ({
  calculateRevenue: jest.fn(),
}));

const app = express();
app.use(express.json());
app.get("/revenue", getRevenue);

describe("getRevenue", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the total revenue with valid filters", async () => {
    (calculateRevenue as jest.Mock).mockResolvedValue(12345.678);

    // Query parameters for the test
    const query = {
      start_date: "2023-01-01",
      end_date: "2023-12-31",
      product_id: "123",
      category: "electronics",
      region: "north",
    };

    const response = await request(app).get("/revenue").query(query);

    expect(calculateRevenue).toHaveBeenCalledWith({
      order: {
        date: {
          gte: new Date(query.start_date),
          lte: new Date(query.end_date),
        },
        region: query.region,
      },
      product_id: query.product_id,
      product: {
        category: query.category,
      },
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "Total revenue: 12345.68",
    });
  });

  it("should handle cases with no filters", async () => {
    (calculateRevenue as jest.Mock).mockResolvedValue(1098);

    const response = await request(app).get("/revenue");

    expect(calculateRevenue).toHaveBeenCalledWith({});

    // Verify the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "Total revenue: 1098.00",
    });
  });
});
