'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = svQueryStringHelper;
/**
 * @ngdoc service
 * @name relaymark.shared.svQueryStringHelper
 * @description
 * svQueryStringHelper is a helper which parse a query string to an object. It can also stringify an object to a string.
 *
 */
function svQueryStringHelper() {
  return {
    /**
     * @ngdoc method
     * @name svQueryStringHelper#parse
     * @methodOf relaymark.shared.svQueryStringHelper
     * @kind function
     * @description
     * Parse a query string to an object.
     *
     * @param {string} str Query string to parse
     * @returns {object} Object formed from the query string.
     */

    parse: function parse(str) {
      if (typeof str !== 'string') {
        return {};
      }

      str = str.trim().replace(/^(\?|#)/, '');

      if (!str) {
        return {};
      }

      return str.trim().split('&').reduce(function (ret, param) {
        var parts = param.replace(/\+/g, ' ').split('=');
        var key = parts[0];
        var val = parts[1];

        key = decodeURIComponent(key);
        // missing `=` should be `null`:
        // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
        val = val === undefined ? null : decodeURIComponent(val);

        if (!ret.hasOwnProperty(key)) {
          ret[key] = val;
        } else if (Array.isArray(ret[key])) {
          ret[key].push(val);
        } else {
          ret[key] = [ret[key], val];
        }

        return ret;
      });
    },


    /**
     * @ngdoc method
     * @name svQueryStringHelper#stringify
     * @methodOf relaymark.shared.svQueryStringHelper
     * @kind function
     * @description
     * Stringify an object to a query string.
     *
     * @param {string} obj Object to parse
     * @returns {string} Query string
     */
    stringify: function stringify(obj) {
      return obj ? Object.keys(obj).map(function (key) {
        var val = obj[key];

        if (Array.isArray(val)) {
          return val.map(function (val2) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
          }).join('&');
        }

        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
      }).join('&') : '';
    }
  };
}