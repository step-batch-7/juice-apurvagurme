const getProcess = function(object, action) {
  if (object.hasOwnProperty(action)) {
    return object[action];
  }
  return defaultAction();
};

const defaultAction = function() {
  return [];
};

exports.getProcess = getProcess;
