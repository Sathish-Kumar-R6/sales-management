# sales-management

This a sales manager application to manage the revenue data

## Schema diagram

Below image shows the schema diagram for the sales management application
![image](https://github.com/user-attachments/assets/e2f369c8-71e2-4eb7-acd0-6d67203c2bdb)

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- Node.js (LTS version)
- Yarn
- PostgreSQL

Place your seed.csv file and any other csv files inside the `data` folder

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   ```

2. Install the dependencies:

   ```bash
   cd sales-management-app
   yarn
   ```

3. Create a `.env` file in the root directory and add the following:
   Replace username and password with your fields

   ```env
   DATABASE_URL=postgresql://<username>:<password>@localhost:5432/sales_db?schema=public
   PORT=3000
   HOST=localhost
   NODE_ENV=development
   ```

4. Run Prisma to generate the database tables:

   ```bash
   yarn prisma:generate
   ```

5. Push the schema to your PostgreSQL database:

   ```bash
   yarn db:push
   ```

6. Seed the database:
   Remember before running this command make sure you have seed.csv file inside `data/seed.csv`
   
   ```bash
   yarn seed
   ```

### Running the Application

1. To generate swagger doc first and start the development server, use the following command:
   
   ```bash
   yarn doc:generate
   yarn dev
   ```

   The app will be running at http://localhost:3000.

3. Swagger UI:

   - The Swagger UI will be available at http://localhost:3000/api-docs.
   - It will display the auto-generated API documentation based on your routes and annotations.

### API Endpoints

1. **Upload CSV to Refresh Data**

   - **Route**: `POST /api/refresh`
   - **Description**: Specify a CSV file path to reload data to db.
   - **Scheduler**: This api also automatically triggers everyday at 00:00 with the specified path to csv file

2. **Get Revenue Details with Filters**

   - **Route**: `GET /api/revenue-details`
   - **Description**: Apply filters and retrieve the sales revenue details.
   - **Query Parameters**:
     - `start_date`: (Optional) Start date for revenue data.
     - `end_date`: (Optional) End date for revenue data.
     - `region`: (Optional) Filter by region.
     - `product_id`: (Optional) Filter by salesperson.
