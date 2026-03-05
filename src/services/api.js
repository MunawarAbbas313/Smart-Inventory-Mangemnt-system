// ============================================================
// API Service Layer - Complete mock API for InventraIQ
// Auth, Products, Customers, Bills, Suppliers, POs, Transactions,
// Notifications, Locations, Dashboard analytics, Global Search
// ============================================================

import {
    mockUsers, mockProducts, mockCustomers, mockBills,
    mockSuppliers, mockPurchaseOrders, mockTransactions,
    mockNotifications, mockLocations
} from '../data/mockData';

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory stores
let products = [...mockProducts];
let customers = [...mockCustomers];
let bills = [...mockBills];
let suppliers = [...mockSuppliers];
let purchaseOrders = [...mockPurchaseOrders];
let transactions = [...mockTransactions];
let notifications = [...mockNotifications];
let locations = [...mockLocations];

let nextId = { prod: 15, cust: 7, bill: 9, sup: 5, po: 5, txn: 9, notif: 8 };
const genId = (prefix) => `${prefix}_${String(nextId[prefix]++).padStart(3, '0')}`;

// ---- Auth ----
export const loginUser = async ({ email, password }) => {
    await delay(400);
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) throw { response: { data: { message: 'Invalid email or password' } } };
    const { password: _, ...safe } = user;
    return { data: { user: safe } };
};
export const registerUser = async ({ name, email, password }) => {
    await delay(400);
    if (mockUsers.find(u => u.email === email)) throw { response: { data: { message: 'User already exists' } } };
    return { data: { message: 'User registered successfully' } };
};

// ---- Products ----
export const getProducts = async ({ createdBy, search, location: loc, category } = {}) => {
    await delay(200);
    let f = products.filter(p => !createdBy || p.createdBy === createdBy);
    if (search) { const q = search.toLowerCase(); f = f.filter(p => p.name.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q)); }
    if (loc) f = f.filter(p => p.location === loc);
    if (category && category !== 'all') f = f.filter(p => p.category === category);
    return { data: f };
};
export const addProduct = async (d) => { await delay(200); const np = { ...d, _id: genId('prod'), createdAt: new Date().toISOString() }; products.push(np); return { data: np }; };
export const updateProduct = async (d) => { await delay(200); const i = products.findIndex(p => p._id === d.productId); if (i !== -1) { products[i] = { ...products[i], ...d }; return { data: products[i] }; } throw { response: { data: { message: 'Product not found' } } }; };
export const deleteProduct = async ({ productId }) => { await delay(200); products = products.filter(p => p._id !== productId); return { data: { message: 'Deleted' } }; };

// ---- Customers ----
export const getCustomers = async () => { await delay(200); return { data: customers }; };
export const getCustomersByPhone = async ({ phone, createdBy }) => { await delay(150); return { data: customers.filter(c => c.phone.includes(phone) && (!createdBy || c.createdBy === createdBy)) }; };
export const addCustomer = async (d) => { await delay(200); const nc = { ...d, _id: genId('cust'), createdAt: new Date().toISOString() }; customers.push(nc); return { data: { customer: nc } }; };
export const updateCustomer = async (d) => { await delay(200); const i = customers.findIndex(c => c._id === d.customerId); if (i !== -1) { customers[i] = { ...customers[i], ...d }; return { data: customers[i] }; } throw { response: { data: { message: 'Customer not found' } } }; };
export const deleteCustomer = async ({ customerId }) => { await delay(200); customers = customers.filter(c => c._id !== customerId); return { data: { message: 'Deleted' } }; };

// ---- Bills ----
export const getBills = async ({ createdBy } = {}) => { await delay(200); return { data: bills.filter(b => !createdBy || b.createdBy === createdBy) }; };
export const addBill = async (d) => { await delay(200); const nb = { ...d, _id: genId('bill'), createdAt: new Date().toISOString() }; bills.push(nb); return { data: nb }; };

// ---- Suppliers ----
export const getSuppliers = async () => { await delay(200); return { data: suppliers }; };
export const addSupplier = async (d) => { await delay(200); const ns = { ...d, _id: genId('sup'), createdAt: new Date().toISOString() }; suppliers.push(ns); return { data: ns }; };
export const updateSupplier = async (d) => { await delay(200); const i = suppliers.findIndex(s => s._id === d.supplierId); if (i !== -1) { suppliers[i] = { ...suppliers[i], ...d }; return { data: suppliers[i] }; } throw { response: { data: { message: 'Supplier not found' } } }; };
export const deleteSupplier = async ({ supplierId }) => { await delay(200); suppliers = suppliers.filter(s => s._id !== supplierId); return { data: { message: 'Deleted' } }; };

// ---- Purchase Orders ----
export const getPurchaseOrders = async () => { await delay(200); return { data: purchaseOrders }; };
export const addPurchaseOrder = async (d) => { await delay(200); const npo = { ...d, _id: genId('po'), status: 'pending', createdAt: new Date().toISOString() }; purchaseOrders.push(npo); return { data: npo }; };
export const updatePurchaseOrder = async (d) => { await delay(200); const i = purchaseOrders.findIndex(po => po._id === d.poId); if (i !== -1) { purchaseOrders[i] = { ...purchaseOrders[i], ...d }; return { data: purchaseOrders[i] }; } throw { response: { data: { message: 'PO not found' } } }; };

// ---- Inventory Transactions ----
export const getTransactions = async ({ search, type, location: loc } = {}) => {
    await delay(200);
    let f = [...transactions];
    if (search) { const q = search.toLowerCase(); f = f.filter(t => t.productName.toLowerCase().includes(q) || t.sku?.toLowerCase().includes(q)); }
    if (type && type !== 'all') f = f.filter(t => t.type === type);
    if (loc) f = f.filter(t => t.location === loc);
    return { data: f.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) };
};
export const addTransaction = async (d) => { await delay(200); const nt = { ...d, _id: genId('txn'), createdAt: new Date().toISOString() }; transactions.push(nt); return { data: nt }; };

// ---- Notifications ----
export const getNotifications = async () => { await delay(100); return { data: notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) }; };
export const markNotificationRead = async (id) => { await delay(100); const n = notifications.find(n => n._id === id); if (n) n.read = true; return { data: { message: 'Marked read' } }; };
export const markAllNotificationsRead = async () => { await delay(100); notifications.forEach(n => n.read = true); return { data: { message: 'All read' } }; };

// ---- Locations ----
export const getLocations = async () => { await delay(100); return { data: locations }; };

// ---- Dashboard ----
export const getDashboardStats = async ({ createdBy, dateRange } = {}) => {
    await delay(300);
    let userBills = bills.filter(b => !createdBy || b.createdBy === createdBy);
    if (dateRange) {
        const { start, end } = dateRange;
        if (start) userBills = userBills.filter(b => new Date(b.createdAt) >= new Date(start));
        if (end) { const ed = new Date(end); ed.setHours(23, 59, 59, 999); userBills = userBills.filter(b => new Date(b.createdAt) <= ed); }
    }
    const userProducts = products.filter(p => !createdBy || p.createdBy === createdBy);
    const userCustomers = customers.filter(c => !createdBy || c.createdBy === createdBy);
    const totalRevenue = userBills.reduce((s, b) => s + b.totalAmount, 0);
    const totalCost = userBills.reduce((s, b) => s + b.cartItems.reduce((cs, item) => { const prod = products.find(p => p._id === item._id); return cs + (prod?.cost || 0) * item.quantity; }, 0), 0);
    const lowStockProducts = userProducts.filter(p => p.stock > 0 && p.stock <= (p.minStock || 5));
    const outOfStockProducts = userProducts.filter(p => p.stock === 0);
    const expiringProducts = userProducts.filter(p => p.expiryDate && new Date(p.expiryDate) <= new Date(Date.now() + 30 * 86400000));
    const productSales = {};
    userBills.forEach(bill => { bill.cartItems.forEach(item => { if (!productSales[item._id]) productSales[item._id] = { name: item.name, totalQty: 0, totalRevenue: 0 }; productSales[item._id].totalQty += item.quantity; productSales[item._id].totalRevenue += item.price * item.quantity; }); });
    const allProductSales = Object.values(productSales);
    const topProducts = [...allProductSales].sort((a, b) => b.totalRevenue - a.totalRevenue).slice(0, 5);
    const lowSellingProducts = [...allProductSales].sort((a, b) => a.totalQty - b.totalQty).slice(0, 5);
    const hotSellingProducts = [...allProductSales].sort((a, b) => b.totalQty - a.totalQty).slice(0, 5);
    const categorySales = {};
    userBills.forEach(bill => { bill.cartItems.forEach(item => { const prod = products.find(p => p._id === item._id); const cat = prod?.category || 'unknown'; if (!categorySales[cat]) categorySales[cat] = { category: cat, totalQty: 0, totalRevenue: 0, orders: 0 }; categorySales[cat].totalQty += item.quantity; categorySales[cat].totalRevenue += item.price * item.quantity; categorySales[cat].orders += 1; }); });
    const categoryBreakdown = Object.values(categorySales).sort((a, b) => b.totalRevenue - a.totalRevenue);
    const paymentMethods = {};
    userBills.forEach(b => { const m = b.paymentMethod || 'cash'; paymentMethods[m] = (paymentMethods[m] || 0) + b.totalAmount; });
    const dailySales = [];
    const days = dateRange?.start && dateRange?.end ? Math.min(Math.ceil((new Date(dateRange.end) - new Date(dateRange.start)) / 86400000) + 1, 30) : 7;
    const startDate = dateRange?.start ? new Date(dateRange.start) : new Date();
    if (!dateRange?.start) startDate.setDate(startDate.getDate() - (days - 1));
    for (let i = 0; i < days; i++) { const d = new Date(startDate); d.setDate(d.getDate() + i); const ds = d.toISOString().substring(0, 10); const dayBills = userBills.filter(b => b.createdAt.substring(0, 10) === ds); dailySales.push({ date: ds, day: d.toLocaleDateString('en-PK', { weekday: 'short' }), total: dayBills.reduce((s, b) => s + b.totalAmount, 0), orders: dayBills.length }); }
    const custSpend = {};
    userBills.forEach(b => { if (!custSpend[b.customerName]) custSpend[b.customerName] = { name: b.customerName, totalSpent: 0, orders: 0 }; custSpend[b.customerName].totalSpent += b.totalAmount; custSpend[b.customerName].orders += 1; });
    const topCustomers = Object.values(custSpend).sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5);
    const profitMargins = allProductSales.map(ps => { const prod = products.find(p => p.name === ps.name); const cost = (prod?.cost || 0) * ps.totalQty; return { name: ps.name, revenue: ps.totalRevenue, cost, profit: ps.totalRevenue - cost, margin: cost > 0 ? ((ps.totalRevenue - cost) / ps.totalRevenue * 100).toFixed(1) : 0 }; }).sort((a, b) => b.profit - a.profit).slice(0, 5);
    // Pending POs count
    const pendingPOs = purchaseOrders.filter(po => po.status === 'pending' || po.status === 'in_transit').length;
    const unreadNotifs = notifications.filter(n => !n.read).length;
    return { data: { totalRevenue, totalProfit: totalRevenue - totalCost, totalOrders: userBills.length, totalCustomers: userCustomers.length, totalProducts: userProducts.length, lowStockProducts, outOfStockProducts, expiringProducts, topProducts, lowSellingProducts, hotSellingProducts, topCustomers, paymentMethods, dailySales, categoryBreakdown, profitMargins, avgOrderValue: userBills.length > 0 ? totalRevenue / userBills.length : 0, pendingPOs, unreadNotifs, totalSuppliers: suppliers.length } };
};

// ---- Global Search ----
export const globalSearch = async (query) => {
    await delay(100);
    if (!query || query.length < 2) return { data: { products: [], customers: [], bills: [], suppliers: [] } };
    const q = query.toLowerCase();
    return {
        data: {
            products: products.filter(p => p.name.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q)).slice(0, 5),
            customers: customers.filter(c => c.name.toLowerCase().includes(q) || c.phone.includes(q)).slice(0, 5),
            bills: bills.filter(b => b.customerName.toLowerCase().includes(q) || b._id.toLowerCase().includes(q)).slice(0, 5),
            suppliers: suppliers.filter(s => s.name.toLowerCase().includes(q) || s.contact.toLowerCase().includes(q)).slice(0, 5),
        }
    };
};
