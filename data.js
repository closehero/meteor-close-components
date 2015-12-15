Template.closestData = function(key) {
  var i = 0;
  var data = Template.parentData(i);
  while(data) {
    if(data.hasOwnProperty(key)) return data;
    i += 1;
    data = Template.parentData(i);
  }
  return null;
};

Template.closestDataFetch = function(key) {
  var data = Template.closestData(key);
  return data ? data[key] : null;
};

Template.viewDataMarker = '_thisIsViewData';

Template.viewData = function() {
  return Template.closestData(Template.viewDataMarker);
};


