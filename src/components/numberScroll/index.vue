<template>
  <div class="howmuch">{{ scrollNumber }}</div>
</template>

<script>
export default {
  name: 'numberScroll',
  props: ['originData', 'addNumber', 'scrollTime'],
  data () {
    return {
      interval: null,
      scrollNumber: 0
    }
  },
  mounted () {
    this.toScrollNumber()
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    toScrollNumber () {
      this.interval = setInterval(() => {
        if (this.scrollNumber < this.originData) {
          this.scrollNumber += this.addNumber
        } else {
          this.scrollNumber = this.originData
          clearInterval(this.interval)
        }
      }, this.scrollTime)
    }
  }
}
</script>

<style lang="less" scoped>
.howmuch {
  font-size: 16px;
  font-weight: 500;
}
</style>
