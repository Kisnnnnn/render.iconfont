'use strict'
;(function(window, doc) {
  let defaultOptions = {
    path: '../icon/',
    type: 'class',
    className: '',
    selector: '.fonticon'
  }

  let map = {
    array: 'Array',
    object: 'Object',
    function: 'Function',
    string: 'String',
    null: 'Null',
    undefined: 'Undefined',
    boolean: 'Boolean',
    number: 'Number'
  }

  let getType = item => Object.prototype.toString.call(item).slice(8, -1) // Number

  let isType = (item, type) => map[type] && map[type] === getType(item)

  let isWindow = obj => obj != null && ojb === obj.window

  let isPlainObject = obj =>
    isType(obj, 'object') &&
    !isWindow(obj) &&
    Object.getPrototypeOf(obj) === Object.prototype

  function _extend(...args) {
    let options, name, src, copy, copyIsArray, clone

    let target = args[0] || {},
      i = 1,
      length = args.length,
      deep = false

    // 如果第一个是布尔值，说明它是一个是否深度拷贝的选项
    if (typeof target === 'boolean') {
      deep = target
      target = args[i] || {}
      i++
    }

    // 如果目标值不是对象同事不是方法，则将目标值定义为对象
    if (typeof target != 'object' && isType(target, 'function')) {
      target = {}
    }

    // 如果只存在一个值，就是他本身，然后返回
    if (i === length) {
      target = this
      i--
    }

    for (; i < length; i++) {
      if ((options = args[i]) != null) {
        for (name in options) {
          src = target[name]
          copy = options[name]

          if (target === copy) {
            continue
          }
          if (
            (deep && copy && isPlainObject(copy)) ||
            (copyIsArray = isType(copy, 'array'))
          ) {
            if (copyIsArray) {
              copyIsArray = false
              clone = src && isType(src, 'array') ? src : []
            } else {
              clone = src && isPlainObject(src) ? src : {}
            }

            target[name] = _extend(deep, clone, copy)
          } else if (copy !== undefined) {
            target[name] = copy
          }
        }
      }
    }
    return target
  }

  let findIcon = (iconname, arr) => arr.find(({ name }) => name === iconname)

  let addStyle = async url => {
    // 动态添样式表
    var oStyle = document.createElement('link')

    oStyle.setAttribute('rel', 'stylesheet')
    oStyle.setAttribute('href', url)

    document.head.appendChild(oStyle)

    // 删除
    oStyle = null
  }
  function FontIcon(options) {
    // 拓展
    options = _extend({}, defaultOptions, options)

    this.iconListElem = doc.querySelectorAll(options.selector)

    if (this.iconListElem.length === 0) {
      throw new Error('选择器「' + options.selector + '」不存在！')
    }

    switch (options.type) {
      case 'Symbol':
        this._initSvgIcon(options)
        break
      case 'unicode':
        this._initUnicode(options)
      default:
        this._initClass(options)
        break
    }
  }
  FontIcon.prototype = {
    async _initSvgIcon(options) {
      let path = options.path

      let iconArray = await this._getIconData(path),
        iconListElem = this.iconListElem

      for (let i = 0; i < iconListElem.length; i++) {
        let itemElem = iconListElem[i],
          name = itemElem.dataset.name,
          iconName = findIcon(name, iconArray).font_class

        itemElem.innerHTML = `<svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-${iconName}"></use>
                          </svg>`
        if (options.width) {
          itemElem.children[0].style.width = options.width + 'px'
        }

        if (options.height) {
          itemElem.children[0].style.height = options.width + 'px'
        }

        if (options.className) {
          itemElem.children[0].classList.add(options.className)
        }
      }
      // 动态添加js和样式表
      await addStyle('./svg-fonticon.css')

      var oScr = document.createElement('script')

      oScr.src = path + 'iconfont.js'
      document.body.appendChild(oScr)
    },
    async _initClass(options) {
      let path = options.path

      let iconArray = await this._getIconData(path),
        iconListElem = this.iconListElem

      await addStyle(path + 'iconfont.css')

      for (let i = 0; i < iconListElem.length; i++) {
        let iconName = findIcon(iconListElem[i].dataset.name, iconArray)
            .font_class,
          iconElem = document.createElement('span')

        iconElem.className =
          'iconfont icon-' + iconName + ' ' + options.className
        iconElem.style.fontSize = options.size + 'px'
        iconListElem[i].appendChild(iconElem)

        iconElem = null
      }
    },
    async _initUnicode(options) {
      let path = options.path

      let iconArray = await this._getIconData(path),
        iconListElem = this.iconListElem

      await addStyle(path + 'iconfont.css')

      if (options.width || options.height) {
        console.erro('配置项中的宽高度只对「symbol」类型有效，请使用Size!')
      }

      for (let i = 0; i < iconListElem.length; i++) {
        let iconName = findIcon(iconListElem[i].dataset.name, iconArray)
            .unicode,
          iconElem = document.createElement('span')

        iconElem.className = 'iconfont' + ' ' + options.className
        iconElem.innerHTML = '&#x' + iconName + ';'
        iconElem.style.fontSize = options.size + 'px'
        iconListElem[i].appendChild(iconElem)
        iconElem = null
      }
    },
    async _getIconData(path) {
      let iconJson = await fetch(path + '/iconfont.json')
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(res)
        })
        .catch(err => {
          return -1
        })

      return iconJson.glyphs
    }
  }

  window.fontIcon = FontIcon
})(window, document)
