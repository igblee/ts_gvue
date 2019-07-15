function generateFn(name, path) {
  let cableName = name.replace(/([A-Z])/g, "-$1").toLowerCase();
  const index = path.indexOf('/components')
  const realPath = path.substring(index)
  if (cableName[0] === '-') {
    cableName = cableName.slice(1);
  }
  return `
<template>
  <div className = "${cableName}-container"></div>
</template>
<script>
/* component path */
/* import ${name} from '@${realPath}' */
  export default {
    name: '${name}',
  }
</script>
<style scoped>
  
</style>
  `
}

function generateHOCFn(name, path, component) {
  let cableName = name.replace(/([A-Z])/g, "-$1").toLowerCase();
  const index = path.indexOf('/components')
  const realPath = path.substring(index)
  if (cableName[0] === '-') {
    cableName = cableName.slice(1);
  }

  return `
export default function ${name}(${component}) {
  return {
    template: '',
    components: {
      ${component},
    },
    data() {return{}},
    methods: {},
  }
}
  `
}
module.exports = {
  generateFn,
  generateHOCFn
}