<template>
  <web-view :src="src"></web-view>
</template>

<script>
export default {
  name: 'outPage',
  data () {
    return {
      src: ''
    }
  },
  onLoad (param) {
    this.src = param.src
  }
}
</script>