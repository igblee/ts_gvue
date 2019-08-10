function generateFn(name, path) {
  let cableName = name.replace(/([A-Z])/g, "-$1").toLowerCase();
  const index = path.indexOf('/components')
  const realPath = path.substring(index)
  if (cableName[0] === '-') {
    cableName = cableName.slice(1);
  }
  return `
<template>
  <div class= "${cableName}-container"></div>
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
import ${component} from '?'
export default {
  name: '${name}',
  components: {
    ${component},
  },
  props: {
  },
  data () {
    return {}
  },
  methods: {},
  render (h) {
    return h('${component}', {
    })
  },
}
  `
}
module.exports = {
  generateFn,
  generateHOCFn
}