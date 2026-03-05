// ============================================================
// MOCK DATA - Pakistani static test data for development
// Extended with: SKU, locations, suppliers, POs, transactions
// ============================================================

// Test Users
export const mockUsers = [
    { _id: 'user_001', name: 'Muhammad Ali', email: 'admin@test.com', password: 'admin123', role: 'admin', phone: '3001234567', createdAt: '2026-01-15T08:00:00.000Z' },
    { _id: 'user_002', name: 'Ahmed Khan', email: 'agent@test.com', password: 'agent123', role: 'agent', phone: '3119876543', createdAt: '2026-02-01T10:30:00.000Z' },
    { _id: 'user_003', name: 'Ayesha Malik', email: 'user@test.com', password: 'user123', role: 'user', phone: '3215551234', createdAt: '2026-02-20T14:15:00.000Z' },
];

// Test Products with SKU, location, expiry
export const mockProducts = [
    { _id: 'prod_001', sku: 'PIZ-CTK-001', name: 'Chicken Tikka Pizza', category: 'pizzas', price: 1250, originalPrice: 1500, cost: 650, stock: 25, minStock: 5, location: 'Main Store', expiryDate: null, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop', createdBy: 'user_001', createdAt: '2026-01-20T09:00:00.000Z' },
    { _id: 'prod_002', sku: 'PIZ-SKB-002', name: 'Seekh Kebab Pizza', category: 'pizzas', price: 1450, originalPrice: null, cost: 750, stock: 18, minStock: 5, location: 'Main Store', expiryDate: null, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop', createdBy: 'user_001', createdAt: '2026-01-21T10:00:00.000Z' },
    { _id: 'prod_003', sku: 'PIZ-CKB-003', name: 'Chapli Kebab Pizza', category: 'pizzas', price: 1550, originalPrice: 1800, cost: 800, stock: 12, minStock: 5, location: 'Main Store', expiryDate: null, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop', createdBy: 'user_001', createdAt: '2026-01-22T11:00:00.000Z' },
    { _id: 'prod_004', sku: 'BRG-ZNG-004', name: 'Zinger Burger', category: 'burgers', price: 650, originalPrice: 750, cost: 280, stock: 30, minStock: 10, location: 'Main Store', expiryDate: null, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', createdBy: 'user_001', createdAt: '2026-01-23T08:30:00.000Z' },
    { _id: 'prod_005', sku: 'BRG-MGT-005', name: 'Mighty Burger', category: 'burgers', price: 850, originalPrice: null, cost: 380, stock: 22, minStock: 10, location: 'Main Store', expiryDate: null, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop', createdBy: 'user_001', createdAt: '2026-01-24T09:00:00.000Z' },
    { _id: 'prod_006', sku: 'BRG-DBL-006', name: 'Double Decker Burger', category: 'burgers', price: 1100, originalPrice: 1350, cost: 500, stock: 5, minStock: 10, location: 'Main Store', expiryDate: null, image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=400&h=300&fit=crop', createdBy: 'user_001', createdAt: '2026-01-25T10:30:00.000Z' },
    { _id: 'prod_007', sku: 'DRK-PKL-007', name: 'Pakola', category: 'drinks', price: 80, originalPrice: null, cost: 35, stock: 100, minStock: 20, location: 'Warehouse A', expiryDate: '2026-12-31', image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop', createdBy: 'user_001', createdAt: '2026-01-26T07:00:00.000Z' },
    { _id: 'prod_008', sku: 'DRK-SGC-008', name: 'Fresh Sugarcane Juice', category: 'drinks', price: 150, originalPrice: 200, cost: 50, stock: 45, minStock: 15, location: 'Main Store', expiryDate: '2026-04-15', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop', createdBy: 'user_001', createdAt: '2026-01-27T08:00:00.000Z' },
    { _id: 'prod_009', sku: 'DRK-MLS-009', name: 'Mango Lassi', category: 'drinks', price: 200, originalPrice: null, cost: 70, stock: 3, minStock: 10, location: 'Main Store', expiryDate: '2026-03-20', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop', createdBy: 'user_001', createdAt: '2026-01-28T09:00:00.000Z' },
    { _id: 'prod_010', sku: 'PIZ-PNR-010', name: 'Paneer Tikka Pizza', category: 'pizzas', price: 1350, originalPrice: 1600, cost: 700, stock: 0, minStock: 5, location: 'Main Store', expiryDate: null, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop', createdBy: 'user_001', createdAt: '2026-01-29T10:00:00.000Z' },
    { _id: 'prod_011', sku: 'DSI-BRY-011', name: 'Biryani Box', category: 'desi', price: 450, originalPrice: 550, cost: 180, stock: 40, minStock: 10, location: 'Warehouse A', expiryDate: null, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop', createdBy: 'user_001', createdAt: '2026-02-01T09:00:00.000Z' },
    { _id: 'prod_012', sku: 'DSI-NHR-012', name: 'Nihari Plate', category: 'desi', price: 550, originalPrice: null, cost: 220, stock: 15, minStock: 5, location: 'Main Store', expiryDate: null, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop', createdBy: 'user_001', createdAt: '2026-02-02T10:00:00.000Z' },
    { _id: 'prod_013', sku: 'DSI-HLM-013', name: 'Haleem Bowl', category: 'desi', price: 400, originalPrice: 500, cost: 150, stock: 8, minStock: 5, location: 'Main Store', expiryDate: null, image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&h=300&fit=crop', createdBy: 'user_001', createdAt: '2026-02-05T09:00:00.000Z' },
    { _id: 'prod_014', sku: 'DRK-KCH-014', name: 'Kashmiri Chai', category: 'drinks', price: 180, originalPrice: null, cost: 60, stock: 50, minStock: 15, location: 'Warehouse A', expiryDate: '2026-06-30', image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop', createdBy: 'user_001', createdAt: '2026-02-08T10:00:00.000Z' },
];

// Test Customers
export const mockCustomers = [
    { _id: 'cust_001', name: 'Usman Tariq', phone: '3001234567', address: 'Gulberg III, Lahore', createdBy: 'user_001', createdAt: '2026-02-01T10:00:00.000Z' },
    { _id: 'cust_002', name: 'Fatima Zahra', phone: '3119876543', address: 'DHA Phase 5, Karachi', createdBy: 'user_001', createdAt: '2026-02-05T11:30:00.000Z' },
    { _id: 'cust_003', name: 'Bilal Hussain', phone: '3215551234', address: 'F-7 Markaz, Islamabad', createdBy: 'user_001', createdAt: '2026-02-10T14:00:00.000Z' },
    { _id: 'cust_004', name: 'Sana Riaz', phone: '3451112233', address: 'Hayatabad, Peshawar', createdBy: 'user_001', createdAt: '2026-02-15T09:00:00.000Z' },
    { _id: 'cust_005', name: 'Imran Shah', phone: '3337778899', address: 'Cantt Area, Rawalpindi', createdBy: 'user_001', createdAt: '2026-02-20T16:00:00.000Z' },
    { _id: 'cust_006', name: 'Zainab Noor', phone: '3068889990', address: 'Johar Town, Lahore', createdBy: 'user_001', createdAt: '2026-02-22T11:00:00.000Z' },
];

// Suppliers
export const mockSuppliers = [
    { _id: 'sup_001', name: 'Lahore Food Distributors', contact: 'Rashid Ali', phone: '3001112233', email: 'info@lfd.pk', address: 'Badami Bagh, Lahore', rating: 4.5, leadTimeDays: 2, categories: ['pizzas', 'burgers'], status: 'active', createdBy: 'user_001', createdAt: '2026-01-10T09:00:00.000Z' },
    { _id: 'sup_002', name: 'Karachi Beverages Co.', contact: 'Salman Raza', phone: '3112223344', email: 'sales@kbc.pk', address: 'SITE Area, Karachi', rating: 4.0, leadTimeDays: 3, categories: ['drinks'], status: 'active', createdBy: 'user_001', createdAt: '2026-01-12T10:00:00.000Z' },
    { _id: 'sup_003', name: 'Islamabad Desi Kitchen', contact: 'Nadia Butt', phone: '3223334455', email: 'orders@idk.pk', address: 'Blue Area, Islamabad', rating: 4.8, leadTimeDays: 1, categories: ['desi'], status: 'active', createdBy: 'user_001', createdAt: '2026-01-15T11:00:00.000Z' },
    { _id: 'sup_004', name: 'Punjab Spice Traders', contact: 'Tariq Mehmood', phone: '3334445566', email: 'pst@email.pk', address: 'Anarkali, Lahore', rating: 3.5, leadTimeDays: 4, categories: ['desi', 'pizzas'], status: 'inactive', createdBy: 'user_001', createdAt: '2026-01-20T12:00:00.000Z' },
];

// Purchase Orders
export const mockPurchaseOrders = [
    { _id: 'po_001', supplierId: 'sup_001', supplierName: 'Lahore Food Distributors', items: [{ productId: 'prod_001', productName: 'Chicken Tikka Pizza', sku: 'PIZ-CTK-001', quantity: 50, unitCost: 650 }, { productId: 'prod_004', productName: 'Zinger Burger', sku: 'BRG-ZNG-004', quantity: 40, unitCost: 280 }], totalCost: 43700, status: 'delivered', expectedDelivery: '2026-02-22', actualDelivery: '2026-02-21', notes: 'Weekly restock', createdBy: 'user_001', createdAt: '2026-02-18T09:00:00.000Z' },
    { _id: 'po_002', supplierId: 'sup_002', supplierName: 'Karachi Beverages Co.', items: [{ productId: 'prod_007', productName: 'Pakola', sku: 'DRK-PKL-007', quantity: 200, unitCost: 35 }, { productId: 'prod_009', productName: 'Mango Lassi', sku: 'DRK-MLS-009', quantity: 30, unitCost: 70 }], totalCost: 9100, status: 'in_transit', expectedDelivery: '2026-03-08', actualDelivery: null, notes: 'Monthly beverage order', createdBy: 'user_001', createdAt: '2026-03-04T10:00:00.000Z' },
    { _id: 'po_003', supplierId: 'sup_003', supplierName: 'Islamabad Desi Kitchen', items: [{ productId: 'prod_011', productName: 'Biryani Box', sku: 'DSI-BRY-011', quantity: 60, unitCost: 180 }, { productId: 'prod_012', productName: 'Nihari Plate', sku: 'DSI-NHR-012', quantity: 25, unitCost: 220 }], totalCost: 16300, status: 'pending', expectedDelivery: '2026-03-10', actualDelivery: null, notes: 'Desi menu expansion', createdBy: 'user_001', createdAt: '2026-03-05T11:00:00.000Z' },
    { _id: 'po_004', supplierId: 'sup_001', supplierName: 'Lahore Food Distributors', items: [{ productId: 'prod_010', productName: 'Paneer Tikka Pizza', sku: 'PIZ-PNR-010', quantity: 20, unitCost: 700 }], totalCost: 14000, status: 'cancelled', expectedDelivery: '2026-02-28', actualDelivery: null, notes: 'Cancelled — supplier issue', createdBy: 'user_001', createdAt: '2026-02-25T14:00:00.000Z' },
];

// Inventory Transactions
export const mockTransactions = [
    { _id: 'txn_001', type: 'in', productId: 'prod_001', productName: 'Chicken Tikka Pizza', sku: 'PIZ-CTK-001', quantity: 50, location: 'Main Store', reference: 'PO-001', notes: 'Purchase order delivery', createdBy: 'user_001', createdAt: '2026-02-21T10:00:00.000Z' },
    { _id: 'txn_002', type: 'out', productId: 'prod_001', productName: 'Chicken Tikka Pizza', sku: 'PIZ-CTK-001', quantity: 2, location: 'Main Store', reference: 'BILL-001', notes: 'Sale', createdBy: 'user_001', createdAt: '2026-02-20T12:30:00.000Z' },
    { _id: 'txn_003', type: 'out', productId: 'prod_004', productName: 'Zinger Burger', sku: 'BRG-ZNG-004', quantity: 2, location: 'Main Store', reference: 'BILL-002', notes: 'Sale', createdBy: 'user_001', createdAt: '2026-02-21T14:00:00.000Z' },
    { _id: 'txn_004', type: 'adjust', productId: 'prod_010', productName: 'Paneer Tikka Pizza', sku: 'PIZ-PNR-010', quantity: -5, location: 'Main Store', reference: 'WASTE', notes: 'Expired items disposed', createdBy: 'user_001', createdAt: '2026-02-22T09:00:00.000Z' },
    { _id: 'txn_005', type: 'in', productId: 'prod_007', productName: 'Pakola', sku: 'DRK-PKL-007', quantity: 100, location: 'Warehouse A', reference: 'PO-002', notes: 'Bulk order', createdBy: 'user_001', createdAt: '2026-02-25T11:00:00.000Z' },
    { _id: 'txn_006', type: 'transfer', productId: 'prod_011', productName: 'Biryani Box', sku: 'DSI-BRY-011', quantity: 10, location: 'Main Store', fromLocation: 'Warehouse A', reference: 'TRF-001', notes: 'Transfer to main store', createdBy: 'user_001', createdAt: '2026-03-01T08:00:00.000Z' },
    { _id: 'txn_007', type: 'out', productId: 'prod_006', productName: 'Double Decker Burger', sku: 'BRG-DBL-006', quantity: 2, location: 'Main Store', reference: 'BILL-005', notes: 'Sale', createdBy: 'user_001', createdAt: '2026-03-01T11:00:00.000Z' },
    { _id: 'txn_008', type: 'adjust', productId: 'prod_009', productName: 'Mango Lassi', sku: 'DRK-MLS-009', quantity: -7, location: 'Main Store', reference: 'WASTE', notes: 'Near-expiry waste', createdBy: 'user_001', createdAt: '2026-03-03T09:00:00.000Z' },
];

// Notifications
export const mockNotifications = [
    { _id: 'notif_001', type: 'low_stock', title: 'Low Stock Alert', message: 'Double Decker Burger has only 5 units left', severity: 'warning', read: false, productId: 'prod_006', createdAt: '2026-03-05T12:00:00.000Z' },
    { _id: 'notif_002', type: 'low_stock', title: 'Low Stock Alert', message: 'Mango Lassi has only 3 units left', severity: 'warning', read: false, productId: 'prod_009', createdAt: '2026-03-05T12:00:00.000Z' },
    { _id: 'notif_003', type: 'out_of_stock', title: 'Out of Stock', message: 'Paneer Tikka Pizza is out of stock', severity: 'error', read: false, productId: 'prod_010', createdAt: '2026-03-04T10:00:00.000Z' },
    { _id: 'notif_004', type: 'expiry', title: 'Expiring Soon', message: 'Mango Lassi expires on 2026-03-20', severity: 'warning', read: true, productId: 'prod_009', createdAt: '2026-03-03T08:00:00.000Z' },
    { _id: 'notif_005', type: 'po_update', title: 'PO In Transit', message: 'PO-002 from Karachi Beverages is in transit', severity: 'info', read: true, poId: 'po_002', createdAt: '2026-03-04T14:00:00.000Z' },
    { _id: 'notif_006', type: 'po_update', title: 'PO Delivered', message: 'PO-001 from Lahore Food Distributors delivered', severity: 'success', read: true, poId: 'po_001', createdAt: '2026-02-21T15:00:00.000Z' },
    { _id: 'notif_007', type: 'demand_spike', title: 'Demand Spike', message: 'Biryani Box sales up 200% this week!', severity: 'info', read: false, productId: 'prod_011', createdAt: '2026-03-05T16:00:00.000Z' },
];

// Locations/Warehouses
export const mockLocations = [
    { _id: 'loc_001', name: 'Main Store', address: 'Gulberg III, Lahore', type: 'store', isDefault: true },
    { _id: 'loc_002', name: 'Warehouse A', address: 'Township, Lahore', type: 'warehouse', isDefault: false },
    { _id: 'loc_003', name: 'DHA Branch', address: 'DHA Phase 5, Lahore', type: 'store', isDefault: false },
];

// Bills
export const mockBills = [
    { _id: 'bill_001', customerName: 'Usman Tariq', customerPhone: 3001234567, customerAddress: 'Gulberg III, Lahore', cartItems: [{ _id: 'prod_001', name: 'Chicken Tikka Pizza', price: 1250, quantity: 2 }, { _id: 'prod_007', name: 'Pakola', price: 80, quantity: 3 }], subTotal: 2740, tax: 137, totalAmount: 2877, paymentMethod: 'cash', createdBy: 'user_001', customerId: 'cust_001', createdAt: '2026-02-20T12:30:00.000Z' },
    { _id: 'bill_002', customerName: 'Fatima Zahra', customerPhone: 3119876543, customerAddress: 'DHA Phase 5, Karachi', cartItems: [{ _id: 'prod_004', name: 'Zinger Burger', price: 650, quantity: 2 }, { _id: 'prod_008', name: 'Fresh Sugarcane Juice', price: 150, quantity: 2 }], subTotal: 1600, tax: 80, totalAmount: 1680, paymentMethod: 'card', createdBy: 'user_001', customerId: 'cust_002', createdAt: '2026-02-21T14:00:00.000Z' },
    { _id: 'bill_003', customerName: 'Bilal Hussain', customerPhone: 3215551234, customerAddress: 'F-7 Markaz, Islamabad', cartItems: [{ _id: 'prod_002', name: 'Seekh Kebab Pizza', price: 1450, quantity: 1 }, { _id: 'prod_005', name: 'Mighty Burger', price: 850, quantity: 2 }, { _id: 'prod_009', name: 'Mango Lassi', price: 200, quantity: 3 }], subTotal: 3750, tax: 187.5, totalAmount: 3937.5, paymentMethod: 'easypaisa', createdBy: 'user_001', customerId: 'cust_003', createdAt: '2026-02-25T10:00:00.000Z' },
    { _id: 'bill_004', customerName: 'Sana Riaz', customerPhone: 3451112233, customerAddress: 'Hayatabad, Peshawar', cartItems: [{ _id: 'prod_011', name: 'Biryani Box', price: 450, quantity: 4 }, { _id: 'prod_007', name: 'Pakola', price: 80, quantity: 4 }], subTotal: 2120, tax: 106, totalAmount: 2226, paymentMethod: 'jazzcash', createdBy: 'user_001', customerId: 'cust_004', createdAt: '2026-02-28T16:30:00.000Z' },
    { _id: 'bill_005', customerName: 'Imran Shah', customerPhone: 3337778899, customerAddress: 'Cantt Area, Rawalpindi', cartItems: [{ _id: 'prod_006', name: 'Double Decker Burger', price: 1100, quantity: 2 }, { _id: 'prod_012', name: 'Nihari Plate', price: 550, quantity: 1 }, { _id: 'prod_008', name: 'Fresh Sugarcane Juice', price: 150, quantity: 2 }], subTotal: 3050, tax: 152.5, totalAmount: 3202.5, paymentMethod: 'cash', createdBy: 'user_001', customerId: 'cust_005', createdAt: '2026-03-01T11:00:00.000Z' },
    { _id: 'bill_006', customerName: 'Zainab Noor', customerPhone: 3068889990, customerAddress: 'Johar Town, Lahore', cartItems: [{ _id: 'prod_003', name: 'Chapli Kebab Pizza', price: 1550, quantity: 1 }, { _id: 'prod_009', name: 'Mango Lassi', price: 200, quantity: 2 }], subTotal: 1950, tax: 97.5, totalAmount: 2047.5, paymentMethod: 'card', createdBy: 'user_001', customerId: 'cust_006', createdAt: '2026-03-03T13:00:00.000Z' },
    { _id: 'bill_007', customerName: 'Usman Tariq', customerPhone: 3001234567, customerAddress: 'Gulberg III, Lahore', cartItems: [{ _id: 'prod_011', name: 'Biryani Box', price: 450, quantity: 3 }, { _id: 'prod_004', name: 'Zinger Burger', price: 650, quantity: 1 }], subTotal: 2000, tax: 100, totalAmount: 2100, paymentMethod: 'easypaisa', createdBy: 'user_001', customerId: 'cust_001', createdAt: '2026-03-05T09:30:00.000Z' },
    { _id: 'bill_008', customerName: 'Fatima Zahra', customerPhone: 3119876543, customerAddress: 'DHA Phase 5, Karachi', cartItems: [{ _id: 'prod_013', name: 'Haleem Bowl', price: 400, quantity: 2 }, { _id: 'prod_014', name: 'Kashmiri Chai', price: 180, quantity: 3 }], subTotal: 1340, tax: 67, totalAmount: 1407, paymentMethod: 'jazzcash', createdBy: 'user_001', customerId: 'cust_002', createdAt: '2026-03-05T18:00:00.000Z' },
];
