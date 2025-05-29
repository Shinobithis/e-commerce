/**
 * Main Application Entry Point
 * Initializes the application and handles navigation
 */

$(document).ready(function() {
    // Initialize the application
    initApp();
    
    // Bind navigation events
    bindNavEvents();
});

/**
 * Initialize the application
 */
function initApp() {
    // Default view is products
    loadProductsView();
}

/**
 * Bind navigation event handlers
 */
function bindNavEvents() {
    // Product navigation
    $('#nav-products').on('click', function() {
        loadProductsView();
    });
    
    // Orders navigation
    $('#nav-orders').on('click', function() {
        loadOrdersView();
    });
}

/**
 * Load the products view
 */
function loadProductsView() {
    // Update active navigation
    $('#nav-products').addClass('bg-red-700').removeClass('bg-primary');
    $('#nav-orders').addClass('bg-primary').removeClass('bg-red-700');
    
    // Initialize products view
    ProductsView.init();
}

/**
 * Load the orders view
 */
function loadOrdersView() {
    // Update active navigation
    $('#nav-orders').addClass('bg-red-700').removeClass('bg-primary');
    $('#nav-products').addClass('bg-primary').removeClass('bg-red-700');
    
    // Initialize orders view
    OrdersView.init();
}
