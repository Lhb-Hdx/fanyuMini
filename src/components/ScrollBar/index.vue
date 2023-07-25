<template>
  <div class="scroll-container"
       ref="scrollContainer"
       @wheel.prevent="handleScroll"
       @click="refresh">
    <div class="scroll-wrapper"
         ref="scrollWrapper"
         :style="{top: top + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { getToken } from '../../utils/auth'
const delta = 15

export default {
  name: 'scrollBar',
  data () {
    return {
      top: 0
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  mounted () {
  },
  methods: {
    refresh () {
      if (this.token !== localStorage.getItem('loginToken')) {
        window.location.reload()
      }
    },
    handleScroll (e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 3
      const $container = this.$refs.scrollContainer
      const $containerHeight = $container.offsetHeight
      const $wrapper = this.$refs.scrollWrapper
      const $wrapperHeight = $wrapper.offsetHeight
      if (eventDelta > 0) {
        this.top = Math.min(0, this.top + eventDelta)
      } else {
        if ($containerHeight - delta < $wrapperHeight) {
          if (this.top < -($wrapperHeight - $containerHeight + delta)) {
            this.top = this.top
          } else {
            this.top = Math.max(this.top + eventDelta, $containerHeight - $wrapperHeight - delta)
          }
        } else {
          this.top = 0
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/variables.scss";

.scroll-container {
  position: relative;
  width: 100%;
  height: 100%;
  border-right: solid 1px #e6e6e6;
  background-color: $menuBg;
  .scroll-wrapper {
    padding-bottom: 50px;
    position: absolute;
    width: 100% !important;
  }
}
</style>
