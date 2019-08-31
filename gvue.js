#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const ejs = require('ejs');
const packageJson = require(path.resolve(__dirname, './package.json'));
const fs = require('fs');
const {checkParamsFn} = require('./util.js')
program
  .version(packageJson.version, '-v, --version')
  .option('-n --componentName <componentName>', 'name of component')
  .option('-d, --dir <dirname>', 'path of dir')
  .option('-t, --template <template>', 'template of component', 'normal')
  .option('-c, --component <component>', 'component wraps HOC',)
  .parse(process.argv);

const {
  componentName,
  dir,
  template,
  component
} = program;
checkParamsFn({componentName, dir, template, component})
const componentPath = template === 'container' ?
  path.resolve(__dirname, '..', '..', './src/containers') :
  path.resolve(__dirname, '..', '..', './src/components');
const ownDir = dir ? dir : './';
const ownComponent = component ? component : 'Test';
const realDirPath = path.resolve(componentPath, ownDir);
let cableName = componentName.replace(/([A-Z])/g, "-$1").toLowerCase();
if (cableName[0] === '-') {
  cableName = cableName.slice(1);
}
const dirExist = fs.existsSync(realDirPath);
let data = null;
let fileExist = false;
if (!dirExist) {
  fs.mkdirSync(realDirPath, {
    recursive: true
  }, (err) => {
    if (err) throw err;
  });
}
if (template === 'normal') {
  const filePath = path.resolve(realDirPath, componentName + '.vue')
  const relativePath = filePath.slice(filePath.indexOf('/components'))
  fileExist = fs.existsSync(filePath);
  if (fileExist) {
    throw new Error('file is already exist');
  }
  rowData = fs.readFileSync(path.resolve(__dirname, 'template/common.js'), {
    encoding: 'utf8'
  });
  const data = ejs.render(rowData, {
    name: componentName,
    relativePath,
    cableName,
  });
  fs.writeFileSync(path.resolve(realDirPath, componentName + '.vue'), data, {
    encoding: 'utf8'
  });
} else if (template.toLowerCase() === 'hoc') {
  fileExist = fs.existsSync(path.resolve(realDirPath, componentName + '.js'));
  if (fileExist) {
    throw new Error('file is already exist');
  }
  rowData = fs.readFileSync(path.resolve(__dirname, 'template/hoc.js'), {
    encoding: 'utf8'
  });
  const data = ejs.render(rowData, {
    name:componentName,
    component: ownComponent,
  });
  fs.writeFileSync(path.resolve(realDirPath, componentName + '.js'), data, {
    encoding: 'utf8'
  });
} else if (template.toLowerCase() === 'container') {
  const filePath = path.resolve(realDirPath, componentName + '.vue')
  const relativePath = filePath.slice(filePath.indexOf('/containers'))
  fileExist = fs.existsSync(filePath);
  if (fileExist) {
    throw new Error('file is already exist');
  }
  rowData = fs.readFileSync(path.resolve(__dirname, 'template/container.js'), {
    encoding: 'utf8'
  });
  const data = ejs.render(rowData, {
    name: componentName,
    relativePath,
    cableName,
  });
  fs.writeFileSync(path.resolve(realDirPath, componentName + '.vue'), data, {
    encoding: 'utf8'
  });
}
console.info('create component successfully!')