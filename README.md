# OMSSC 🚲

## ⚙️ Tech Stack

- **Next.js 15** – For server components and modern routing
- **React 19** – For building user interfaces
- **TypeScript** – For type safety and modern JavaScript features
- **Tailwind CSS v3.4** – For rapid, responsive styling
- **Prisma** – For type-safe database access
- **NextAuth.js** – For authentication and authorization
- **Radix UI** – For accessible UI components
- **Zod** – For runtime type validation
- **React Hook Form** – For form handling
- **Nodemailer** – For email functionality

## ⚡️ Features

### 🛍️ E-commerce Features
- Dynamic product catalog with filtering and sorting
- Real-time cart management
- Secure checkout process
- Product categories and search functionality
- Detailed product pages with images and descriptions

### 👨‍💼 Admin Dashboard
- Secure admin authentication
- Product management (CRUD operations)
- Order management
- User management
- Analytics and reporting

### 🎨 UI/UX Features
- Responsive design for all devices
- Modern, clean interface
- Interactive product carousel
- Dynamic product filters
- Real-time price updates

### 🔒 Security Features
- Secure authentication with NextAuth.js
- Protected admin routes
- Type-safe database operations
- Input validation with Zod
- Secure API endpoints

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (recommended) or npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/omssc.git
cd omssc
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="your_database_url"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```

4. Set up the database:
```bash
pnpm prisma generate
pnpm prisma db push
```

5. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`



## 🔧 Development

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
