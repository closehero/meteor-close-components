
'use strict';

Template.prototype.variable = function (name, value) {
  this.variables(_.object([ name ], [ value ]));
};

Template.prototype.variables = function (options) {

  var helpers = {};

  this.onCreated(function () {
    var instance = this;
  
    _.each(options, function (value, name) {
      if(!instance.variables) {
        instance.variables = {};
      }
      if (typeof value === 'function') {
        instance.autorun(function () {
          if (!instance.variables[name]) {
            instance.variables[name] = new ReactiveVar(value.call(instance));
          } else {
            instance.variables[name].set(value.call(instance));
          }
        });
      } else {
        instance.variables[name] = new ReactiveVar(value);
      }
    });
  });

  _.each(_.keys(options), function (name) {
    var getter = function () {
      var variable = Template.instance().variables[name];
      if (variable && typeof variable.get === 'function') {
        return variable.get();
      }
    };
    helpers[name] = getter;
    helpers[name + 'Is'] = function (value) {
      return getter() === value;
    };
  });

  this.helpers(helpers);
};

Template.variable = function (name, value) {
  return Template.instance().variable(name, value);
};

Blaze.TemplateInstance.prototype.variable = function (name, value) {
  if (!this.variables || !this.variables[name]) {
    throw new Error('Template variable "' + name + '" is not defined.');
  }
  if (value !== undefined) {
    this.variables[name].set(value);
    return;
  }
  return this.variables[name].get();
};

