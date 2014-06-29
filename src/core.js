// Main namespace
adron = {};

if(typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = adron;
}

// Export a module
adron.export = function(name, value) {
    if(typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = value;
    } else {
        window.adron[name] = value;
    }
};

adron.define = (function() {
    function parseParameters(fn) {
        var fnStr = (fn || '').toString();
        return fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(/([^\s,]+)/g) || [];
    }

    function dig(source, name) {
        name = typeof name === 'string' ? name.split(/\./g) : name;

        return name.length < 2 ? source[name] : dig(source[name[0]], name.slice(1));
    }

    function assign(source, name, value) {
        name = typeof name === 'string' ? name.split(/\./g) : name;
        var key = name[0];

        if(key === undefined) return;

        if(typeof source[key] === 'undefined') source[key] = {};

        if(name.length < 2) {
            source[key] = value;
        } else {
            assign(source[key], name.slice(1), value);
        }
    }

    return function(name, imports, definition) {
        if (typeof definition === 'undefined') {
            definition = imports;
            imports = [];
        } else {
            imports = imports.map(function(name) {
                return dig(adron, name);
            });
        }
        imports.push(adron);

        var params = parseParameters(definition)
            , args = params.map(function(param) {
                return imports.reduce(function(p, c){
                    return c[param] ? c[param] : p;
                });
            });

        assign(adron, name, definition.apply(adron, args));
    }
}());