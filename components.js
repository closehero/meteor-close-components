'use strict';

Template.prototype.component = function (name, value) {
  this.components(_.object([ name ], [ value ]));
};

Template.prototype.components = function (options) {

  var helpers = {};

  this.onCreated(function () {
    var instance = this;
  
    _.each(options, function (value, name) {
      if(!instance.components) {
        instance.components = {};
      }
      if (typeof value === 'function') {
        instance.components[name] = value.call(instance);
      } else {
        instance.components[name] = value;
      }
    });
  });

  _.each(_.keys(options), function (name) {
    helpers[name] = function () {
      return Template.instance().components[name];
    };
  });

  this.helpers(helpers);
};

Template.component = function (name) {
  var instance = Template.instance();
  return instance.components && instance.components[name];
};


