'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (window, doc) {
  var defaultOptions = {
    path: '../icon/',
    type: 'class',
    className: '',
    selector: '.fonticon'
  };
  var map = {
    array: 'Array',
    object: 'Object',
    function: 'Function',
    string: 'String',
    null: 'Null',
    undefined: 'Undefined',
    boolean: 'Boolean',
    number: 'Number'
  };

  var getType = function getType(item) {
    return Object.prototype.toString.call(item).slice(8, -1);
  }; // Number


  var isType = function isType(item, type) {
    return map[type] && map[type] === getType(item);
  };

  var isWindow = function isWindow(obj) {
    return obj != null && ojb === obj.window;
  };

  var isPlainObject = function isPlainObject(obj) {
    return isType(obj, 'object') && !isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype;
  };

  function _extend() {
    var options, name, src, copy, copyIsArray, clone;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var target = args[0] || {},
        i = 1,
        length = args.length,
        deep = false; // 如果第一个是布尔值，说明它是一个是否深度拷贝的选项

    if (typeof target === 'boolean') {
      deep = target;
      target = args[i] || {};
      i++;
    } // 如果目标值不是对象同事不是方法，则将目标值定义为对象


    if (_typeof(target) != 'object' && isType(target, 'function')) {
      target = {};
    } // 如果只存在一个值，就是他本身，然后返回


    if (i === length) {
      target = this;
      i--;
    }

    for (; i < length; i++) {
      if ((options = args[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];

          if (target === copy) {
            continue;
          }

          if (deep && copy && isPlainObject(copy) || (copyIsArray = isType(copy, 'array'))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && isType(src, 'array') ? src : [];
            } else {
              clone = src && isPlainObject(src) ? src : {};
            }

            target[name] = _extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }

    return target;
  }

  var findIcon = function findIcon(iconname, arr) {
    return arr.find(function (_ref) {
      var name = _ref.name;
      return name === iconname;
    });
  };

  var addStyle = function addStyle(url) {
    // 动态添样式表
    var oStyle = document.createElement('link');
    oStyle.setAttribute('rel', 'stylesheet');
    oStyle.setAttribute('href', url);
    document.head.appendChild(oStyle); // 删除

    oStyle = null;
  };

  function FontIcon(options) {
    var _this = this;

    // 拓展
    options = _extend({}, defaultOptions, options);
    this.iconListElem = doc.querySelectorAll(options.selector);

    if (this.iconListElem.length === 0) {
      console.error('选择器「' + options.selector + '」不存在！');
      return false;
    }

    this._getIconData(options.path).then(function (iconArray) {
      switch (options.type) {
        case 'svg':
          _this._initSvgIcon(options, iconArray);

          break;

        case 'unicode':
          _this._initUnicode(options, iconArray);

          break;

        default:
          _this._initClass(options, iconArray);

          break;
      }
    });
  }

  FontIcon.prototype = {
    _initSvgIcon: function _initSvgIcon(options, iconArray) {
      var path = options.path + '/';
      var iconListElem = this.iconListElem;

      for (var i = 0; i < iconListElem.length; i++) {
        var itemElem = iconListElem[i],
            name = itemElem.dataset.name,
            iconName = findIcon(name, iconArray).font_class;
        itemElem.innerHTML = "<svg class=\"icon\" aria-hidden=\"true\">\n                          <use xlink:href=\"#icon-".concat(iconName, "\"></use>\n                          </svg>");

        if (options.width) {
          itemElem.children[0].style.width = options.width + 'px';
        }

        if (options.height) {
          itemElem.children[0].style.height = options.width + 'px';
        }

        if (options.className) {
          itemElem.children[0].classList.add(options.className);
        }
      } // 动态添加js和样式表


      addStyle('./lib/svg-fonticon.css');
      var oScr = document.createElement('script');
      oScr.src = path + 'iconfont.js';
      document.body.appendChild(oScr);
    },
    _initClass: function _initClass(options, iconArray) {
      var path = options.path + '/';
      var iconListElem = this.iconListElem;
      addStyle(path + 'iconfont.css');

      for (var i = 0; i < iconListElem.length; i++) {
        var iconName = findIcon(iconListElem[i].dataset.name, iconArray).font_class,
            iconElem = document.createElement('span');
        iconElem.className = 'iconfont icon-' + iconName + ' ' + options.className;
        iconElem.style.fontSize = options.size + 'px';
        iconListElem[i].appendChild(iconElem);
        iconElem = null;
      }
    },
    _initUnicode: function _initUnicode(options, iconArray) {
      var path = options.path + '/';
      var iconListElem = this.iconListElem;
      addStyle(path + 'iconfont.css');

      if (options.width || options.height) {
        console.erro('配置项中的宽高度只对「symbol」类型有效，请使用Size!');
      }

      for (var i = 0; i < iconListElem.length; i++) {
        var iconName = findIcon(iconListElem[i].dataset.name, iconArray).unicode,
            iconElem = document.createElement('span');
        iconElem.className = 'iconfont' + ' ' + options.className;
        iconElem.innerHTML = '&#x' + iconName + ';';
        iconElem.style.fontSize = options.size + 'px';
        iconListElem[i].appendChild(iconElem);
        iconElem = null;
      }
    },
    _getIconData: function _getIconData(path) {
      return new Promise(function (resolve, reject) {
        fetch(path + '/iconfont.json').then(function (res) {
          if (res.ok) {
            return res.json();
          }

          reject(res);
        }).then(function (res) {
          resolve(res.glyphs);
        }).catch(function (err) {
          return err;
        });
      });
    }
  };
  window.fontIcon = FontIcon;
})(window, document);