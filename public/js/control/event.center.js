define([], function() {
  return new (function() {
    var __l = {};
    this.register = function(_name, _instance) {
      __l[_name] = {};
      __l[_name].instant =  _instance;
    };
    this.on = function(_name, _event, _event_fun) {
      __l[_name][_event] = _event_fun;
    };
    this.trigger = function(_name, _event, para) {
      return __l[_name][_event].call(__l[_name].instant, para);
    };

  });
});