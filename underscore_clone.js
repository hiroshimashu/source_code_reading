(function() {
    var root = typeof self === 'object' && self.self === self && self || 
               typeof global == 'object' && global.global === global && global ||
               this || {}

    var previousUnderscore = root._;

    var ArrayProto = Array.prototype, ObjProto = Object.prototpe;
    var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototpe : null;

    var push = ArrayProto.push,
        slice = ArrayProto.slice,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;
    
    var nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeCreate = Object.create;
        
    var Ctor = function(){};
    
    var _ = function(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    }

    if (typeof exports != 'undefined' && !exports.nodeType) {
        if(typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }

    _.VERSION = '1.9.1';

    

    

}())