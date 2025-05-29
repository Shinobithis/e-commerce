/**
 * Products View Controller
 * Handles all product-related UI interactions
 */

const ProductsView = {
    /**
     * Initialize the products view
     */
    init: function() {
        this.bindEvents();
        this.loadProductsList();
    },
    
    /**
     * Bind event handlers
     */
    bindEvents: function() {
        // Delegation for dynamic elements
        $('#app-container').on('click', '.product-edit-btn', this.handleEditProduct);
        $('#app-container').on('click', '.product-delete-btn', this.handleDeleteProduct);
        $('#app-container').on('click', '#add-product-btn', this.showAddProductForm);
        $('#app-container').on('submit', '#product-form', this.handleProductSubmit);
        $('#app-container').on('click', '#cancel-product-btn', this.loadProductsList);
    },
    
    /**
     * Load and display the products list
     */
    loadProductsList: function() {
        Helpers.showLoading();
        
        // Render the products list container
        $('#app-container').html(`
            <div class="mb-6">
                <h2 class="text-2xl font-bold mb-4">Products Management</h2>
                <button id="add-product-btn" class="btn-primary">
                    <i class="fas fa-plus mr-2"></i>Add New Product
                </button>
            </div>
            <div id="products-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Products will be loaded here -->
            </div>
        `);
        
        // Fetch products from API
        API.products.getAll()
            .then(products => {
                if (products.length === 0) {
                    $('#products-list').html(`
                        <div class="col-span-full text-center py-8">
                            <p class="text-gray-500">No products found. Add your first product!</p>
                        </div>
                    `);
                } else {
                    // Render each product
                    let productsHtml = '';
                    products.forEach(product => {
                        productsHtml += this.renderProductCard(product);
                    });
                    $('#products-list').html(productsHtml);
                }
                Helpers.hideLoading();
            })
            .catch(error => {
                $('#products-list').html(`
                    <div class="col-span-full text-center py-8">
                        <p class="text-red-500">Error loading products. Please try again.</p>
                    </div>
                `);
                console.error('Error loading products:', error);
                Helpers.hideLoading();
            });
    },
    
    /**
     * Render a single product card
     * @param {object} product - Product data
     * @returns {string} - HTML for product card
     */
    renderProductCard: function(product) {
        return `
            <div class="card bg-white rounded-lg shadow-md overflow-hidden" data-id="${product.id}">
                <div class="p-4 bg-secondary text-white">
                    <h3 class="text-xl font-semibold truncate">${product.name}</h3>
                </div>
                <div class="p-4">
                    <p class="text-2xl font-bold text-primary mb-4">${Helpers.formatCurrency(product.price)}</p>
                    <div class="flex justify-between mt-4">
                        <button class="product-edit-btn px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition" data-id="${product.id}">
                            Edit
                        </button>
                        <button class="product-delete-btn px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition" data-id="${product.id}">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    },
    
    /**
     * Show the add product form
     */
    showAddProductForm: function() {
        ProductsView.renderProductForm();
    },
    
    /**
     * Handle edit product button click
     */
    handleEditProduct: function() {
        const productId = $(this).data('id');
        
        Helpers.showLoading();
        API.products.getById(productId)
            .then(product => {
                ProductsView.renderProductForm(product);
                Helpers.hideLoading();
            })
            .catch(error => {
                console.error('Error fetching product:', error);
                Helpers.showNotification('Error fetching product details', 'error');
                Helpers.hideLoading();
            });
    },
    
    /**
     * Render the product form (add/edit)
     * @param {object} product - Product data for edit mode (null for add mode)
     */
    renderProductForm: function(product = null) {
        const isEdit = product !== null;
        const title = isEdit ? 'Edit Product' : 'Add New Product';
        const submitText = isEdit ? 'Update Product' : 'Create Product';
        
        $('#app-container').html(`
            <div class="max-w-2xl mx-auto">
                <h2 class="text-2xl font-bold mb-6">${title}</h2>
                
                <form id="product-form" class="bg-white shadow-md rounded-lg p-6">
                    ${isEdit ? `<input type="hidden" name="id" value="${product.id}">` : ''}
                    
                    <div class="mb-4">
                        <label for="name" class="form-label">Product Name</label>
                        <input type="text" id="name" name="name" class="form-input" 
                            value="${isEdit ? product.name : ''}" required>
                    </div>
                    
                    <div class="mb-6">
                        <label for="price" class="form-label">Price</label>
                        <input type="number" id="price" name="price" class="form-input" 
                            min="0" step="0.01" value="${isEdit ? product.price : ''}" required>
                    </div>
                    
                    <div class="flex justify-between">
                        <button type="button" id="cancel-product-btn" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">
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
     * Handle product form submission
     * @param {Event} e - Form submit event
     */
    handleProductSubmit: function(e) {
        e.preventDefault();
        
        const form = $(this);
        const productId = form.find('input[name="id"]').val();
        const isEdit = !!productId;
        
        const productData = {
            name: form.find('#name').val(),
            price: parseFloat(form.find('#price').val())
        };
        
        Helpers.showLoading();
        
        if (isEdit) {
            API.products.update(productId, productData)
                .then(response => {
                    Helpers.showNotification('Product updated successfully');
                    ProductsView.loadProductsList();
                })
                .catch(error => {
                    console.error('Error updating product:', error);
                    Helpers.showNotification('Error updating product', 'error');
                    Helpers.hideLoading();
                });
        } else {
            API.products.create(productData)
                .then(response => {
                    Helpers.showNotification('Product created successfully');
                    ProductsView.loadProductsList();
                })
                .catch(error => {
                    console.error('Error creating product:', error);
                    Helpers.showNotification('Error creating product', 'error');
                    Helpers.hideLoading();
                });
        }
    },
    
    /**
     * Handle delete product button click
     */
    handleDeleteProduct: function() {
        if (!confirm('Are you sure you want to delete this product?')) {
            return;
        }
        
        const productId = $(this).data('id');
        
        Helpers.showLoading();
        API.products.delete(productId)
            .then(response => {
                Helpers.showNotification('Product deleted successfully');
                ProductsView.loadProductsList();
            })
            .catch(error => {
                console.error('Error deleting product:', error);
                Helpers.showNotification('Error deleting product', 'error');
                Helpers.hideLoading();
            });
    }
};
