#!/usr/bin/env node


const program = require('commander');
const path = require('path');
const ejs = require('ejs');
const packageJson = require(path.resolve(__dirname, './package.json'));
const fs = require('fs');

program
  .version(packageJson.version, '-v, --version')
  .option('-n --name <name>', 'name of component')
  .option('-d, --dir <dirname>', 'path of dir')
  .option('-t, --template <template>', 'template of component', 'normal')
  .option('-c, --component <component>', 'component wraps HOC',)
  .parse(process.argv);

const {
  name,
  dir,
  template,
  component
} = program;
const componentPath = template === 'container' ?
  path.resolve(__dirname, '..', '..', './src/containers') :
  path.resolve(__dirname, '..', '..', './src/components');
const ownDir = dir ? dir : './';
const ownComponent = component ? component : 'Test';
const realDirPath = path.resolve(componentPath, ownDir);
let cableName = name.replace(/([A-Z])/g, "-$1").toLowerCase();
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
  const filePath = path.resolve(realDirPath, name + '.vue')
  const relativePath = filePath.slice(filePath.indexOf('/components'))
  fileExist = fs.existsSync(filePath);
  if (fileExist) {
    throw new Error('file is already exist');
  }
  rowData = fs.readFileSync(path.resolve(__dirname, 'template/common.js'), {
    encoding: 'utf8'
  });
  const data = ejs.render(rowData, {
    name,
    relativePath,
    cableName,
  });
  fs.writeFileSync(path.resolve(realDirPath, name + '.vue'), data, {
    encoding: 'utf8'
  });
} else if (template.toLowerCase() === 'hoc') {
  fileExist = fs.existsSync(path.resolve(realDirPath, name + '.js'));
  if (fileExist) {
    throw new Error('file is already exist');
  }
  rowData = fs.readFileSync(path.resolve(__dirname, 'template/hoc.js'), {
    encoding: 'utf8'
  });
  const data = ejs.render(rowData, {
    name,
    component: ownComponent,
  });
  fs.writeFileSync(path.resolve(realDirPath, name + '.js'), data, {
    encoding: 'utf8'
  });
} else if (template.toLowerCase() === 'container') {
  const filePath = path.resolve(realDirPath, name + '.vue')
  const relativePath = filePath.slice(filePath.indexOf('/containers'))
  fileExist = fs.existsSync(filePath);
  if (fileExist) {
    throw new Error('file is already exist');
  }
  rowData = fs.readFileSync(path.resolve(__dirname, 'template/container.js'), {
    encoding: 'utf8'
  });
  const data = ejs.render(rowData, {
    name,
    relativePath,
    cableName,
  });
  fs.writeFileSync(path.resolve(realDirPath, name + '.vue'), data, {
    encoding: 'utf8'
  });
}
console.info('create component successfully!')