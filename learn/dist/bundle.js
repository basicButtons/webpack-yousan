((function (modules) {

    function require(id){
      const [fn,mapping] = modules[id]

      function localRequire(relativePath){
        return require(mapping[relativePath])
      }

      const localModule = {exports:{}}

      fn(localRequire, localModule, localModule.exports)
      
      return localModule.exports
    }

    require(0)

  })(
    {0: [function(require,module,exports){
      const b = require("./b.js");
console.log(b.some);

    },{"./b.js":1}],
1: [function(require,module,exports){
      module.exports = {
  some: 1,
};

    },{}],
}
  ))