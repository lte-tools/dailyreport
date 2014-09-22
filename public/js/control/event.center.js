define([], function () {
  'use strict';
  var EC = function () {
    var l = {};
    this.register = function (name, instance) {
      l[name] = {};
      l[name].instant =  instance;
    };
    this.on = function (name, event, event_fun) {
      l[name][event] = event_fun;
    };
    this.trigger = function (name, event, para) {
      return l[name][event].call(l[name].instant, para);
    };

  };
  return (new EC());
});