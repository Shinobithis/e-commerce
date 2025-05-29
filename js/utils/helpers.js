/**
 * Helper functions for the E-Commerce Platform
 */

const Helpers = {
    /**
     * Show a notification message to the user
     * @param {string} message - Message to display
     * @param {string} type - 'success' or 'error'
     */
    showNotification: function(message, type = 'success') {
        const alertClass = type === 'success' ? 'alert-success' : 'alert-error';
        const notification = $(`<div class="${alertClass}">${message}</div>`);
        
        // Remove any existing notifications
        $('.alert-success, .alert-error').remove();
        
        // Add the new notification at the top of the container
        $('#app-container').prepend(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            notification.fadeOut(300, function() {
                $(this).remove();
            });
        }, 3000);
    },
    
    /**
     * Format currency values
     * @param {number} value - Value to format
     * @returns {string} - Formatted currency string
     */
    formatCurrency: function(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    },
    
    /**
     * Format date values
     * @param {string} dateString - Date string to format
     * @returns {string} - Formatted date string
     */
    formatDate: function(dateString) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    },
    
    /**
     * Clear form inputs
     * @param {string} formSelector - jQuery selector for the form
     */
    clearForm: function(formSelector) {
        $(formSelector).find('input, textarea, select').val('');
    },
    
    /**
     * Show loading spinner
     */
    showLoading: function() {
        $('#loading').show();
    },
    
    /**
     * Hide loading spinner
     */
    hideLoading: function() {
        $('#loading').hide();
    }
};
