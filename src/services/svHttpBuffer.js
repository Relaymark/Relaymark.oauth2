svHttpBuffer.$inject = ['$injector'];
export default function svHttpBuffer($injector) {

  var buffer = [];

  /** Service initialized later because of circular dependency problem. */
  var $http;

  var retryHttpRequest = function (config, deferred) {
    function successCallback(response) {
      deferred.resolve(response);
    }

    function errorCallback(response) {

      deferred.reject(response);
    }

    $http = $http || $injector.get('$http');
    $http(config).then(successCallback, errorCallback);
  };


  return {
    /**
     * @ngdoc method
     * @name append
     * @methodOf relaymark.shared.svHttpBuffer
     * @kind function
     * @description
     * Appends HTTP request configuration object with deferred response attached to buffer.
     *
     * @param {object} config Request to append
     * @param {deferred} deferred Promise deferred.
     */
    append(config, deferred) {
      buffer.push({
        config: config,
        deferred: deferred
      });
    },

    /**
     * @ngdoc method
     * @name rejectAll
     * @methodOf relaymark.shared.svHttpBuffer
     * @kind function
     * @description
     * Abandon or reject (if reason provided) all the buffered requests.
     *
     * @param {string} reason Reason to reject
     */
    rejectAll(reason) {
      if (reason) {
        for (let i = 0; i < buffer.length; ++i) {
          buffer[i].deferred.reject(reason);
        }
      }
      buffer = [];
    },

    /**
     * @ngdoc method
     * @name retryAll
     * @methodOf relaymark.shared.svHttpBuffer
     * @kind function
     * @description
     * Retries all the buffered requests clears the buffer.
     *
     * @param {function} updater Function which can update the url request (example: updating authorization header).
     */
    retryAll(updater) {

      for (let i = 0; i < buffer.length; ++i) {
        retryHttpRequest(updater(buffer[i].config), buffer[i].deferred);
      }
      buffer = [];
    }
  };
}
