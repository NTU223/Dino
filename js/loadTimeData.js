// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview This file defines a singleton which provides access to all data
 * that is available as soon as the page's resources are loaded (before DOM
 * content has finished loading). This data includes both localized strings and
 * any data that is important to have ready from a very early stage (e.g. things
 * that must be displayed right away).
 */

/** @type {!LoadTimeData} */ var loadTimeData;

// Expose this type globally as a temporary work around until
// https://github.com/google/closure-compiler/issues/544 is fixed.
/** @constructor */
function LoadTimeData() {}

(function() {
  'use strict';

  LoadTimeData.prototype = {
    /**
     * Sets the backing object.
     *
     * Note that there is no getter for |data_| to discourage abuse of the form:
     *
     *     var value = loadTimeData.data()['key'];
     *
     * @param {Object} value The de-serialized page data.
     */
    set data(value) {
      expect(!this.data_, 'Re-setting data.');
      this.data_ = value;
    },

    /**
     * Returns a JsEvalContext for |data_|.
     * @returns {JsEvalContext}
     */
    createJsEvalContext: function() {
      return new JsEvalContext(this.data_);
    },

    /**
     * @param {string} id An ID of a value that might exist.
     * @return {boolean} True if |id| is a key in the dictionary.
     */
    valueExists: function(id) {
      return id in this.data_;
    },

    /**
     * Fetches a value, expecting that it exists.
     * @param {string} id The key that identifies the desired value.
     * @return {*} The corresponding value.
     */
    getValue: function(id) {
      expect(this.data_, 'No data. Did you remember to include strings.js?');
      var value = this.data_[id];
      expect(typeof value != 'undefined', 'Could not find value for ' + id);
      return value;
    },

    /**
     * As above, but also makes sure that the value is a string.
     * @param {string} id The key that identifies the desired string.
     * @return {string} The corresponding string value.
     */
    getString: function(id) {
      var value = this.getValue(id);
      expectIsType(id, value, 'string');
      return /** @type {string} */ (value);
    },

    /**
     * Returns a formatted localized string where $1 to $9 are replaced by the
     * second to the tenth argument.
     * @param {string} id The ID of the string we want.
     * @param {...(string|number)} var_args The extra values to include in the
     *     formatted output.
     * @return {string} The formatted string.
     */
    getStringF: function(id, var_args) {
      var value = this.getString(id);
      if (!value)
        return '';

      var varArgs = arguments;
      return value.replace(/\$[$1-9]/g, function(m) {
        return m == '$$' ? '$' : varArgs[m[1]];
      });
    },

    /**
     * As above, but also makes sure that the value is a boolean.
     * @param {string} id The key that identifies the desired boolean.
     * @return {boolean} The corresponding boolean value.
     */
    getBoolean: function(id) {
      var value = this.getValue(id);
      expectIsType(id, value, 'boolean');
      return /** @type {boolean} */ (value);
    },

    /**
     * As above, but also makes sure that the value is an integer.
     * @param {string} id The key that identifies the desired number.
     * @return {number} The corresponding number value.
     */
    getInteger: function(id) {
      var value = this.getValue(id);
      expectIsType(id, value, 'number');
      expect(value == Math.floor(value), 'Number isn\'t integer: ' + value);
      return /** @type {number} */ (value);
    },

    /**
     * Override values in loadTimeData with the values found in |replacements|.
     * @param {Object} replacements The dictionary object of keys to replace.
     */
    overrideValues: function(replacements) {
      expect(typeof replacements == 'object',
             'Replacements must be a dictionary object.');
      for (var key in replacements) {
        this.data_[key] = replacements[key];
      }
    }
  };

  /**
   * Checks condition, displays error message if expectation fails.
   * @param {*} condition The condition to check for truthiness.
   * @param {string} message The message to display if the check fails.
   */
  function expect(condition, message) {
    if (!condition) {
      console.error('Unexpected condition on ' + document.location.href + ': ' +
                    message);
    }
  }

  /**
   * Checks that the given value has the given type.
   * @param {string} id The id of the value (only used for error message).
   * @param {*} value The value to check the type on.
   * @param {string} type The type we expect |value| to be.
   */
  function expectIsType(id, value, type) {
    expect(typeof value == type, '[' + value + '] (' + id +
                                 ') is not a ' + type);
  }

  expect(!loadTimeData, 'should only include this file once');
  loadTimeData = new LoadTimeData;
})();

loadTimeData.data = {"details":"Details","diagnose":"Diagnose errors...","errorCode":"DNS_PROBE_POSSIBLE","errorDetails":"Waiting for DNS probe.","fontfamily":"'Segoe UI', Tahoma, sans-serif","fontsize":"75%","heading":{"hostName":"ceiba.ntu.edu.tw","msg":"This site can’t be reached"},"hideDetails":"Hide details","iconClass":"icon-generic","language":"en","reloadButton":{"msg":"Reload","reloadTrackingId":-1,"reloadUrl":"https://ceiba.ntu.edu.tw/"},"suggestions":[],"summary":{"dnsDefinition":"DNS is the network service that translates a website’s name to its Internet address.","failedUrl":"https://ceiba.ntu.edu.tw/","hostName":"ceiba.ntu.edu.tw","msg":"\u003Cstrong jscontent=\"hostName\">\u003C/strong>’s \u003Cabbr id=\"dnsDefinition\">DNS address\u003C/abbr> could not be found. Diagnosing the problem.","productName":"Google Chrome"},"textdirection":"ltr","title":"https://ceiba.ntu.edu.tw/ is not available"};