import request from "supertest";
import express from "express";
import { refreshDataController } from "../controllers/refresh-data-controller"; // Update the path as needed
import { refreshData } from "../services/data-refresh-service"; // Update the path as needed

jest.mock("../services/data-refresh-service", () => ({
  refreshData: jest.fn(),
}));

// Initialize a minimal Express app for testing
const app = express();
app.use(express.json());

app.post("/refresh", refreshDataController);

describe("POST /refresh-data", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a success response when data refresh is initiated", async () => {
    const mockFilePath = "/path/to/file.csv";

    (refreshData as jest.Mock).mockResolvedValue(undefined);

    const response = await request(app)
      .post("/refresh")
      .send({ filePath: mockFilePath });

    expect(refreshData).toHaveBeenCalledWith(mockFilePath);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "Data refresh initiated successfully.",
    });
  });
});
