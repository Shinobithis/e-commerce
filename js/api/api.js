/**
 * API Service for E-Commerce Platform
 * Handles all API requests to the backend
 */

const API = {
    baseUrl: 'http://localhost/e-commerce/public/index.php?endpoint=',
    
    /**
     * Generic request method
     * @param {string} endpoint - API endpoint
     * @param {string} method - HTTP method
     * @param {object} data - Request payload
     * @returns {Promise} - Promise with response data
     */
    request: function(endpoint, method = 'GET', data = null) {
        const url = `${this.baseUrl}${endpoint}`;
        
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        if (data && (method === 'POST' || method === 'PUT')) {
            options.data = JSON.stringify(data);
        }
        
        return $.ajax(url, options)
            .catch(error => {
                console.error('API Error:', error);
                throw error;
            });
    },
    
    // Product API Methods
    products: {
        getAll: function() {
            return API.request('products');
        },
        
        getById: function(id) {
            return API.request(`products/${id}`);
        },
        
        create: function(productData) {
            return API.request('products', 'POST', productData);
        },
        
        update: function(id, productData) {
            return API.request(`products/${id}`, 'PUT', productData);
        },
        
        delete: function(id) {
            return API.request(`products/${id}`, 'DELETE');
        }
    },
    
    // Order API Methods
    orders: {
        getAll: function() {
            return API.request('orders');
        },
        
        getById: function(id) {
            return API.request(`orders/${id}`);
        },
        
        create: function(orderData) {
            return API.request('orders', 'POST', orderData);
        },
        
        update: function(id, orderData) {
            return API.request(`orders/${id}`, 'PUT', orderData);
        },
        
        delete: function(id) {
            return API.request(`orders/${id}`, 'DELETE');
        }
    }
};
