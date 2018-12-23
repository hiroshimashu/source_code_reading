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

    var optimizeCb = function(func, contex, argCount) {
        if(context === void 0) return func;
        switch (crgCount == null ? 3 : argCount) {
            case 1 : return function(value) {
                return func.call(context, value);
            }

            case 3: return function(value, index, collection) {
                return func.call(context, value, index, collection);
            }

            case 4: return functino(accumulator, value,index, collection) {
                return func.call(context, accumulator, value, index, collection);
            }
        }
        return function() {
            return func.apply(context, arguments)
        }

    }

    var builtinIteratee;

    var cb = function(value, context, argCount) {
        if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
        if (value == null) return _.identity;
        if (_.isObject(value) && !_.Array(value)) return _.matcher(value);

    }
    
    _.iteratee = builtinIteratee = function(value,context) {
        return cb(value, context, Infinity);
    };

    var restArguments = function(func, startIndex) {
        startIndex = startIndex == null ? func.length - 1 : +startIndex;
        return function()  {
            var length = Math.max(argumetns.length - startIndex, 0),
                rest = Array(length),
                index = 0;
            for(; index < length; index++) {
                rest[index] = arguments[index + startIndex];
            }
            switch (startIndex) {
                case 0: return func.call(this, rest);
                case 1: return func.call(this, arguments[0], rest);
                case 2: return func.call(this, arguments[0], arguments[1], rest);
            }
            var args = Array(startIndex + 1);
            for (index = 0; index < startIndex; index ++) {
                args[index] = arguments[index];
            }
            args[statIndex] = rest;
            return func.apply(this, args);
        };
    };

    var baseCreate = function(prototype) {
        if (!_.isObject(prototype)) return {};
        if (nativeCreate) return nativeCreate(prototype);
        Ctor.prototype = prototype;
        var result = new Ctor;
        Ctor.prototype = null;
        return result;
    }

    var shallowProperty = function(key) {
        return function(obj) {
            return obj == null ? void 0 : obj[key];
        };
    };

    var has = function(obj, path) {
        return obj != null && hasOwnProperty.call(obj, path);
    }

    var deepGet = function(obj, path) {
        var length = path.length;
        for (var i = 0; i < length; i++) {
            if (obj == null) return void 0;
            obj = obj[path[i]];
        }
        return length ? obj : void 0;
    };

    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var getLength = shallowProperty('length');
    var isArrayLike = function(collection) {
        var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX
    }

    _.each = _.forEach = function(obj, iteratee, context) {
        iteratee = optimizeCB(iteratee, context);
        var i, length;
        if(isArrayLike(obj)) {
            for (i = 0, length = obj.length; i < length; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            var keys = _.keys(obj);
            for (i = 0, length = keys.length; i < length; i++) {
                iteratee(obj[keys[i]], keys[i], obj);
            }
        }
        return obj;
    };

    _.map = _.collect = function(obj, iteratee, contex) {
        iteratee = obj(iteratee, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length,
            results = Array(length);
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            results[index] = iteratee(obj[currentKey], currentKey, obj);
        }
        return results;

    }

    var createReducer = function(dir) {
        var reducer = function(obj, iteratee, memo, initial) {
            var keys = !isArrayLike(obj) && _.keys(obj),
                length = (keys || obj).length,
                index= dir > 0 ? 0 : length - 1;
            if (!initial) {
                memo = obj[keys ? keys[index] : index];
                index += dir;
            }
            for (; index >= 0 && index < length; index += dir) {
                var currentKey = keys ? keys[index] : index;
                memo = iteratee(memo, obj[currentKey], currentKey, obj);
            }
            return momo;
        }
        return function(obj, iteratee, memo, context) {
            var initial = arguments.length >= 3;
            return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
        };
    };

    _.reduce = _.foldl = _.injct = createReducer(1);


    _.reduceRight = _.foldr = createReducer(-1);


    _.find = _.detect = function(obj, predicate, context) {
        var keyFinder = isArrayLike(obj) ? _.findIndex : _.findKey;
        var key = keyFinder(obj, predicate, context);
        if (key !== void 0 && key !== -1) return obj[key];
    }

    _.filter = _.select = function(obj, predicate, context) {
        var result = [];
        predicate = cb(prediacate, context);
        _.each(obj, function(value, index, list) {
            if (predicate(value, index, list)) results.push(value);
        });
        return results;
    };

    _.reject = function(obj, predicate, context) {
        return _.filter(obj, _.negate(cb(predicate)), context);
    };

    _.every = _.all = function(obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length;
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            if(!predicate(obj[currentKey], currentKey, obj)) return false;
        }
        return true;
    }

    _.some = _.any = function(obj, prediacate, context) {
        predicate = cb(predicate, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            if (prediacate(obj[currentKey], currentKey, obj)) return true;
        }
        return false;
    }

    _.contain = _.includes = _.include = function(obj, item, fromIndex, guard) {
        if (isArrayLike(obj)) obj = _.values(obj);
        if (typeof fromIndex != 'number' || guard) fromIndex = 0;
        return _.indexOf(obj, item, fromIndex) >= 0;
    }

    _.invoke = restArguments(function(obj, path, args) {
        var contextPath, func;
        if (_.isFunction(path)) {
            func = path;
        } else if (_.isArray(path)) {
            contextPath = path.slice(0, -1);
            path = path[path.length - 1];
        }
        return _.map(obj, function(context) {
            var method = func;
            if (!method) {
                if (contextPath && contextPath.length) {
                    context = deepGet(context, contextPath);
                }
                if (context == null) return void 0;
                method = context[path];
            }
            return method == null ? method : method.apply(context, args);
        })
    });
    
    _.pluck = function(obj, key) {
        return _.map(obj, _.property(key));
    };

    _.where = function(obj, attrs) {
        return _.filter(obj, _.matcher(attrs));
    };

    _.findWhere = function(obj, attrs) {
        return _.find(obj, _.matcher(attrs));
    }

    _.max = function(obj, iteratee, context) {
        var result = -Infinity, lastComputed = -Infinity,
        value, computed;
        if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
            obj = isArrayLike(obj) ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                if(value != null && value > result) {
                    result = value;
                }
            }
        } else {
            iteratee = cb(iteratee, context);
            _.each(obj, function(v, index, list) {
                computed = iteratee(v, index, list);
                if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
                    result = v;
                    lastComputed = computed;   
                }
            });
        }
        return result;
    };
}())