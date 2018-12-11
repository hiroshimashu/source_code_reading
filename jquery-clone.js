var 
    version = "@VERSION",
    jQuery = function(selector, context) {
        return jQuery.fn.init(selector, context);
    },
    
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        
        constructor: jQuery,

        length : 0,
    
        toArray: function() {
            return slice.call( this );
        },



    }
    