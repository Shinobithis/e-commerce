/**
 * Orders View Controller
 * Handles all order-related UI interactions
 */

const OrdersView = {
    /**
     * Initialize the orders view
     */
    init: function() {
        this.bindEvents();
        this.loadOrdersList();
    },
    
    /**
     * Bind event handlers
     */
    bindEvents: function() {
        // Delegation for dynamic elements
        $('#app-container').on('click', '.order-edit-btn', this.handleEditOrder);
        $('#app-container').on('click', '.order-delete-btn', this.handleDeleteOrder);
        $('#app-container').on('click', '#add-order-btn', this.showAddOrderForm);
        $('#app-container').on('submit', '#order-form', this.handleOrderSubmit);
        $('#app-container').on('click', '#cancel-order-btn', this.loadOrdersList);
    },
    
    /**
     * Load and display the orders list
     */
    loadOrdersList: function() {
        Helpers.showLoading();
        
        // Render the orders list container
        $('#app-container').html(`
            <div class="mb-6">
                <h2 class="text-2xl font-bold mb-4">Orders Management</h2>
                <button id="add-order-btn" class="btn-primary">
                    <i class="fas fa-plus mr-2"></i>Add New Order
                </button>
            </div>
            <div id="orders-list" class="overflow-x-auto">
                <table class="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                    <thead class="bg-secondary text-white">
                        <tr>
                            <th class="py-3 px-4 text-left">ID</th>
                            <th class="py-3 px-4 text-left">Product ID</th>
                            <th class="py-3 px-4 text-left">Quantity</th>
                            <th class="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="orders-table-body">
                        <!-- Orders will be loaded here -->
                    </tbody>
                </table>
            </div>
        `);
        
        // Fetch orders from API
        API.orders.getAll()
            .then(orders => {
                if (orders.length === 0) {
                    $('#orders-table-body').html(`
                        <tr>
                            <td colspan="4" class="py-4 px-4 text-center text-gray-500">
                                No orders found. Create your first order!
                            </td>
                        </tr>
                    `);
                } else {
                    // Render each order
                    let ordersHtml = '';
                    orders.forEach(order => {
                        ordersHtml += this.renderOrderRow(order);
                    });
                    $('#orders-table-body').html(ordersHtml);
                }
                Helpers.hideLoading();
            })
            .catch(error => {
                $('#orders-table-body').html(`
                    <tr>
                        <td colspan="4" class="py-4 px-4 text-center text-red-500">
                            Error loading orders. Please try again.
                        </td>
                    </tr>
                `);
                console.error('Error loading orders:', error);
                Helpers.hideLoading();
            });
    },
    
    /**
     * Render a single order row
     * @param {object} order - Order data
     * @returns {string} - HTML for order row
     */
    renderOrderRow: function(order) {
        return `
            <tr class="border-b hover:bg-gray-50" data-id="${order.id}">
                <td class="py-3 px-4">${order.id}</td>
                <td class="py-3 px-4">${order.product_id}</td>
                <td class="py-3 px-4">${order.quantity}</td>
                <td class="py-3 px-4">
                    <button class="order-edit-btn mr-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition" data-id="${order.id}">
                        Edit
                    </button>
                    <button class="order-delete-btn px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition" data-id="${order.id}">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    },
    
    /**
     * Show the add order form
     */
    showAddOrderForm: function() {
        OrdersView.loadProductsForOrderForm();
    },
    
    /**
     * Load products for the order form dropdown
     */
    loadProductsForOrderForm: function() {
        Helpers.showLoading();
        
        API.products.getAll()
            .then(products => {
                if (products.length === 0) {
                    Helpers.showNotification('No products available. Please add products first.', 'error');
                    OrdersView.loadOrdersList();
                } else {
                    OrdersView.renderOrderForm(null, products);
                }
                Helpers.hideLoading();
            })
            .catch(error => {
                console.error('Error loading products for order form:', error);
                Helpers.showNotification('Error loading products', 'error');
                Helpers.hideLoading();
            });
    },
    
    /**
     * Handle edit order button click
     */
    handleEditOrder: function() {
        const orderId = $(this).data('id');
        
        Helpers.showLoading();
        
        // Fetch both the order and all products
        Promise.all([
            API.orders.getById(orderId),
            API.products.getAll()
        ])
            .then(([order, products]) => {
                OrdersView.renderOrderForm(order, products);
                Helpers.hideLoading();
            })
            .catch(error => {
                console.error('Error fetching order or products:', error);
                Helpers.showNotification('Error fetching order details', 'error');
                Helpers.hideLoading();
            });
    },
    
    /**
     * Render the order form (add/edit)
     * @param {object} order - Order data for edit mode (null for add mode)
     * @param {array} products - Available products for dropdown
     */
    renderOrderForm: function(order = null, products = []) {
        const isEdit = order !== null;
        const title = isEdit ? 'Edit Order' : 'Add New Order';
        const submitText = isEdit ? 'Update Order' : 'Create Order';
        
        let productOptions = '';
        products.forEach(product => {
            const selected = isEdit && order.product_id == product.id ? 'selected' : '';
            productOptions += `<option value="${product.id}" ${selected}>${product.name} - ${Helpers.formatCurrency(product.price)}</option>`;
        });
        
        $('#app-container').html(`
            <div class="max-w-2xl mx-auto">
                <h2 class="text-2xl font-bold mb-6">${title}</h2>
                
                <form id="order-form" class="bg-white shadow-md rounded-lg p-6">
                    ${isEdit ? `<input type="hidden" name="id" value="${order.id}">` : ''}
                    
                    <div class="mb-4">
                        <label for="product_id" class="form-label">Product</label>
                        <select id="product_id" name="product_id" class="form-input" required>
                            <option value="">Select a product</option>
                            ${productOptions}
                        </select>
                    </div>
                    
                    <div class="mb-6">
                        <label for="quantity" class="form-label">Quantity</label>
                        <input type="number" id="quantity" name="quantity" class="form-input" 
                            min="1" value="${isEdit ? order.quantity : '1'}" required>
                    </div>
                    
                    <div class="flex justify-between">
                        <button type="button" id="cancel-order-btn" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">
                            Cancel
                        </button>
                        <button type="submit" class="btn-primary">
                            ${submitText}
                        </button>
                    </div>
                </form>
            </div>
        `);
    },
    
    /**
     * Handle order form submission
     * @param {Event} e - Form submit event
     */
    handleOrderSubmit: function(e) {
        e.preventDefault();
        
        const form = $(this);
        const orderId = form.find('input[name="id"]').val();
        const isEdit = !!orderId;
        
        const orderData = {
            product_id: form.find('#product_id').val(),
            quantity: parseInt(form.find('#quantity').val())
        };
        
        Helpers.showLoading();
        
        if (isEdit) {
            API.orders.update(orderId, orderData)
                .then(response => {
                    Helpers.showNotification('Order updated successfully');
                    OrdersView.loadOrdersList();
                })
                .catch(error => {
                    console.error('Error updating order:', error);
                    Helpers.showNotification('Error updating order', 'error');
                    Helpers.hideLoading();
                });
        } else {
            API.orders.create(orderData)
                .then(response => {
                    Helpers.showNotification('Order created successfully');
                    OrdersView.loadOrdersList();
                })
                .catch(error => {
                    console.error('Error creating order:', error);
                    Helpers.showNotification('Error creating order', 'error');
                    Helpers.hideLoading();
                });
        }
    },
    
    /**
     * Handle delete order button click
     */
    handleDeleteOrder: function() {
        if (!confirm('Are you sure you want to delete this order?')) {
            return;
        }
        
        const orderId = $(this).data('id');
        
        Helpers.showLoading();
        API.orders.delete(orderId)
            .then(response => {
                Helpers.showNotification('Order deleted successfully');
                OrdersView.loadOrdersList();
            })
            .catch(error => {
                console.error('Error deleting order:', error);
                Helpers.showNotification('Error deleting order', 'error');
                Helpers.hideLoading();
            });
    }
};
