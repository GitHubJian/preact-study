!(function(t) {
  var e = {}
  function n(r) {
    if (e[r]) return e[r].exports
    var o = (e[r] = { i: r, l: !1, exports: {} })
    return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports
  }
  ;(n.m = t),
    (n.c = e),
    (n.d = function(t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r })
    }),
    (n.r = function(t) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 })
    }),
    (n.t = function(t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t
      if (4 & e && 'object' == typeof t && t && t.__esModule) return t
      var r = Object.create(null)
      if (
        (n.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: t }),
        2 & e && 'string' != typeof t)
      )
        for (var o in t)
          n.d(
            r,
            o,
            function(e) {
              return t[e]
            }.bind(null, o)
          )
      return r
    }),
    (n.n = function(t) {
      var e =
        t && t.__esModule
          ? function() {
              return t.default
            }
          : function() {
              return t
            }
      return n.d(e, 'a', e), e
    }),
    (n.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e)
    }),
    (n.p = '/static/'),
    n((n.s = 3))
})([
  function(t, e, n) {
    t.exports = n(2)(1)
  },
  ,
  function(t, e) {
    t.exports = __vendor_cb77ac8f9044520c3f39__
  },
  function(t, e, n) {
    'use strict'
    n.r(e)
    var r = n(0)
    function o(t) {
      return (o =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(t) {
              return typeof t
            }
          : function(t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t
            })(t)
    }
    function u(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n]
        ;(r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          'value' in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r)
      }
    }
    function i(t, e) {
      return !e || ('object' !== o(e) && 'function' != typeof e)
        ? (function(t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              )
            return t
          })(t)
        : e
    }
    function c(t) {
      return (c = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
          })(t)
    }
    function f(t, e) {
      return (f =
        Object.setPrototypeOf ||
        function(t, e) {
          return (t.__proto__ = e), t
        })(t, e)
    }
    var l = (function(t) {
      function e() {
        return (
          (function(t, e) {
            if (!(t instanceof e))
              throw new TypeError('Cannot call a class as a function')
          })(this, e),
          i(this, c(e).apply(this, arguments))
        )
      }
      var n, o
      return (
        (function(t, e) {
          if ('function' != typeof e && null !== e)
            throw new TypeError(
              'Super expression must either be null or a function'
            )
          ;(t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 }
          })),
            e && f(t, e)
        })(e, r.Component),
        (n = e),
        (o = [
          {
            key: 'render',
            value: function() {
              return Object(r.h)('div', { class: 'main' }, 'Hello, world')
            }
          }
        ]) && u(n.prototype, o),
        e
      )
    })()
    function a(t) {
      return (a =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(t) {
              return typeof t
            }
          : function(t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t
            })(t)
    }
    function p(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n]
        ;(r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          'value' in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r)
      }
    }
    function y(t) {
      return (y = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
          })(t)
    }
    function b(t, e) {
      return (b =
        Object.setPrototypeOf ||
        function(t, e) {
          return (t.__proto__ = e), t
        })(t, e)
    }
    var s,
      d = (function(t) {
        function e() {
          return (
            (function(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            })(this, e),
            (function(t, e) {
              return !e || ('object' !== a(e) && 'function' != typeof e)
                ? (function(t) {
                    if (void 0 === t)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return t
                  })(t)
                : e
            })(this, y(e).apply(this, arguments))
          )
        }
        var n, o
        return (
          (function(t, e) {
            if ('function' != typeof e && null !== e)
              throw new TypeError(
                'Super expression must either be null or a function'
              )
            ;(t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 }
            })),
              e && b(t, e)
          })(e, r.Component),
          (n = e),
          (o = [
            {
              key: 'render',
              value: function() {
                return Object(r.h)(
                  'div',
                  { class: 'layout' },
                  Object(r.h)('div', { class: 'main' }, Object(r.h)(l, null))
                )
              }
            }
          ]) && p(n.prototype, o),
          e
        )
      })()
    s = Object(r.render)(Object(r.h)(d, null), document.body, s)
  }
])
