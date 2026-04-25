# G Store - Premium Customized Mugs Ecommerce

This is a full-stack e-commerce web application for selling customized printed mugs. It features a completely integrated WhatsApp checkout flow, admin dashboard, product management, and a shopping cart system. 

The application uses **React + Vite** for the frontend, and **Node.js + Express + MongoDB** for the backend.

## Project Structure

- `frontend/` - React frontend application
- `backend/` - Node.js Express backend API

## Setup Instructions

### 1. Backend Environment Setup
1. Navigate to the `backend` folder: `cd backend`
2. Run `npm install` to install dependencies.
3. Open `backend/.env` and update `MONGO_URI` to your actual MongoDB connection string (local or Atlas). Example:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/gstore
   JWT_SECRET=your_super_secret_key
   JWT_EXPIRES_IN=7d
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```

### 2. Frontend Environment Setup
1. Navigate to the `frontend` folder: `cd frontend`
2. Run `npm install` to install dependencies.
3. Open `frontend/.env` and ensure the `VITE_API_URL` points to your backend. Example:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### 3. Database Seeding
To populate the database with initial sample products, site settings, and demo users, run the seed script from the `backend` directory:

```bash
cd backend
npm run seed
```
*Note: Make sure your `MONGO_URI` is correctly configured before running the seed script, otherwise it will fail.*

### 4. Running the Application
You will need two terminals to run both servers concurrently.

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

- Backend runs on: `http://localhost:5000`
- Frontend runs on: `http://localhost:5173`

## Login Credentials

Once the database has been seeded, you can use the following credentials to access the application:

**Admin Account (Access Admin Portal via `/admin/login`):**
- **Email:** `admin@gstore.com`
- **Password:** `Admin12345`

**Normal User Account (Access via `/login`):**
- **Email:** `user@gstore.com`
- **Password:** `User12345`

## How WhatsApp Checkout Works

Instead of using a traditional payment gateway like Stripe or PayPal, this application routes the final checkout phase through an automated WhatsApp message to the Admin.

1. **Cart & Customization:** A user adds items to their cart, configuring customizations such as printed names, custom text, or colors.
2. **Profile Validation:** Upon clicking "Buy Now via WhatsApp", the app checks if the user's profile is complete (Name, Phone, Address). If incomplete, it redirects the user to their profile page.
3. **Message Generation:** Once validated, the frontend securely requests the backend to generate the order. The backend calculates totals and dynamically builds a beautifully formatted string containing all line items, customizations, and customer details.
4. **Redirection:** The backend creates an `Order` document with the status `whatsapp_pending` and returns a `whatsappUrl` configured with the Admin's phone number (configured in Admin Settings).
5. **Send Order:** The frontend opens the WhatsApp URL in a new tab. The user simply hits "Send" to place the order with the store owner, containing all necessary formatting and information.