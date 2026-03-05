<div align="center">

# 🇵🇰 Smart POS System

### Intelligent Point of Sale & Inventory Management

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Ant Design](https://img.shields.io/badge/Ant_Design-5.x-0170FE?style=for-the-badge&logo=antdesign&logoColor=white)](https://ant.design/)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**A modern, feature-rich POS system built for Pakistani businesses — with real-time analytics, smart inventory alerts, keyboard shortcuts, and a beautiful UI.**

[Live Demo](#getting-started) · [Features](#-features) · [Screenshots](#-screenshots) · [Getting Started](#-getting-started) · [Tech Stack](#-tech-stack)

---

</div>

## ✨ Features

### 📊 Analytics Dashboard
- **Real-time business overview** — Revenue, profit, orders, customers at a glance
- **Date range filters** — Today, This Week, This Month, All Time, or custom range
- **Sales trend chart** — Daily sales bar chart with order counts
- **🔥 Hot selling items** — Top products by quantity sold
- **📉 Low selling items** — Underperformers that need attention
- **📊 Category breakdown** — Visual bars for each product category
- **💹 Profit margins** — Per-product profit with margin percentages
- **💳 Payment breakdown** — Cash, Card, Easypaisa, JazzCash
- **👥 Top customers** — Spending leaderboard with order counts

### 🛒 POS System (Point of Sale)
- **Category filters** — Pizzas, Burgers, Drinks, Desi with one-click filtering
- **Smart product cards** — Beautiful cards with hover animations
- **Discount display** — Discount badges, strikethrough prices, "Save Rs. XXX"
- **Stock visualization** — Progress bars showing inventory levels
- **Out-of-stock detection** — Products automatically marked unavailable
- **One-click add to cart** — Instant cart updates with success feedback

### 📦 Product Management
- **Full CRUD** — Add, edit, delete products with modal forms
- **Live search** — Debounced search-as-you-type
- **Cost tracking** — Track cost price for profit calculation
- **Stock monitoring** — Color-coded stock levels (green/red)
- **Category support** — Pizzas, Burgers, Drinks, Desi

### 🧾 Invoice & Billing
- **Smart customer lookup** — Enter phone number, auto-fills name & address
- **Auto customer creation** — New customers created automatically during billing
- **Stock validation** — Prevents overselling with real-time stock checks
- **Tax calculation** — Automatic 5% tax computation
- **Multiple payment methods** — Cash, Card, Easypaisa, JazzCash
- **Invoice preview** — Detailed invoice modal with print support
- **🖨️ Print invoices** — One-click print with react-to-print

### 👥 Customer Management
- **Customer directory** — Full list with contact info and join dates
- **Phone search** — Search customers by phone number (+92)
- **CRUD operations** — Add, edit, delete with validation

### 🔍 Global Search (`Ctrl+K`)
- **Search everywhere** — Products, customers, and bills from one place
- **Live results** — Instant results as you type
- **Quick navigation** — Click any result to navigate

### ⌨️ Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `Ctrl + K` | Open Global Search |
| `Alt + 1` | Go to Dashboard |
| `Alt + 2` | Go to POS |
| `Alt + 3` | Go to Products |
| `Alt + 4` | Go to Customers |
| `Alt + 5` | Go to Bills |
| `Alt + C` | Open Cart |
| `Alt + /` | Show All Shortcuts |
| `Escape` | Close any modal/overlay |

### 📖 Built-in Guide
- **How to Use page** — Comprehensive documentation right inside the app
- **Quick start guide** — Get started in 5 steps
- **Pro tips** — Best practices for efficient POS usage
- **Shortcuts reference** — All keyboard shortcuts in one place

### 🎨 Design & UX
- **9 CSS animations** — fadeInUp, scaleIn, pulse, float, bounceIn, etc.
- **Staggered animations** — Cards and sections animate in sequence
- **Hover effects** — Image zoom, card lift, button glow
- **Responsive design** — Works on desktop, tablet, and mobile
- **Premium footer** — Branded footer with quick links and shortcuts hint
- **Inter font** — Modern, clean typography throughout

---

## 📸 Screenshots

### Dashboard — Analytics Overview
> Real-time business metrics with date filtering, sales charts, and smart insights

### POS — Product Browsing
> Category filters, discount badges, stock bars, and one-click cart

### Products — Inventory Management
> Full CRUD with search, stock monitoring, and inline cart actions

### Bills — Invoice Management
> View, preview, and print invoices with payment method tracking

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v16+ ([Download](https://nodejs.org/))
- **npm** v8+ (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/MunawarAbbas313/Smart-Inventory-Mangemnt-system.git

# 2. Navigate to client directory
cd Smart-Inventory-Mangemnt-system

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

The app will open at **http://localhost:3000** 🎉

### Test Credentials

| Role | Email | Password |
|------|-------|----------|
| 👑 Admin | `admin@test.com` | `admin123` |
| 🧑‍💼 Agent | `agent@test.com` | `agent123` |
| 👤 User | `user@test.com` | `user123` |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework with hooks |
| **Vite 5** | Lightning-fast build tool & dev server |
| **Ant Design 5** | UI component library (CSS-in-JS) |
| **Redux Toolkit** | State management (cart, loading) |
| **React Router 6** | Client-side routing |
| **react-to-print** | Invoice printing |
| **dayjs** | Date handling for filters |

---

## 📁 Project Structure

```
src/
├── asset/images/          # Brand logos and icons
├── components/
│   ├── GlobalSearch.jsx   # Ctrl+K search modal
│   ├── Layout.jsx         # Main layout with sidebar, header, footer
│   ├── Product.jsx        # Enhanced product card component
│   └── Spinner.jsx        # Loading overlay
├── data/
│   └── mockData.js        # Pakistani test data (users, products, etc.)
├── pages/
│   ├── dashboard/         # Analytics dashboard with date filter
│   ├── home/              # POS system (browse & add to cart)
│   ├── products/          # Product management (CRUD)
│   ├── cart/              # Shopping cart & invoice generation
│   ├── bills/             # Invoice list & print
│   ├── customers/         # Customer management (CRUD)
│   ├── guide/             # How to Use documentation
│   ├── login/             # Login with test credentials
│   └── register/          # User registration
├── redux/
│   ├── rootReducer.js     # Cart & loading state
│   └── store.js           # Redux Toolkit store
├── services/
│   └── api.js             # Mock API with analytics engine
├── App.jsx                # Routes & protected routes
├── main.jsx               # Entry point
└── index.css              # Design system & animations
```

---

## 🌟 What Makes This "Smart"?

Unlike traditional POS systems, Smart POS offers:

| Feature | Traditional POS | Smart POS ✅ |
|---------|----------------|-------------|
| Stock alerts | Manual checking | **Automatic low-stock & out-of-stock alerts** |
| Analytics | Basic sales total | **Revenue, profit, margins, top sellers, categories** |
| Customer lookup | Manual entry every time | **Auto-fill by phone number** |
| Navigation | Mouse-only | **Full keyboard shortcuts** |
| Search | Page-by-page | **Global search across everything** |
| Date filtering | No filtering | **Today, week, month, custom range** |
| Profit tracking | Not available | **Per-product profit margins** |
| User guide | External docs | **Built-in How to Use page** |

---

## 🔮 Roadmap

- [ ] Connect to backend API (Node.js + MongoDB)
- [ ] User role-based access control (Admin vs Agent vs User)
- [ ] Export reports to PDF/Excel
- [ ] Dark mode theme toggle
- [ ] Barcode scanner integration
- [ ] Multi-branch support
- [ ] SMS notifications for low stock (via Twilio)
- [ ] Urdu language support

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### Built with ❤️ by Munawar Abbas

🇵🇰 Made in Pakistan

[![GitHub](https://img.shields.io/badge/GitHub-MunawarAbbas313-181717?style=for-the-badge&logo=github)](https://github.com/MunawarAbbas313)

</div>
