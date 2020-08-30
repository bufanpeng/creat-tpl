// 写入tsx
function templateVue() {
  const str = `<template>
  <div>
  {{activeName}}
  </div>
</template>

<script>

export default {
  name: 'list',
  components: {
  },
  data () {
    return {
      activeName: '1'
    }
  },
  watch: {
  },
  mounted() {

  },
  methods: {
    changeTab () {
    },
    hasAuth (val) {
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
</style>`;
  return str;
}
module.exports = templateVue;
