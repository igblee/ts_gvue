function checkParamsFn({componentName, template, dir, component}) {
  if(!componentName) throw new Error('component\'s name is required')
}

module.exports = {
  checkParamsFn
}