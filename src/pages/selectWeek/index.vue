<template>
  <div class="select-device-container">
    <div class="select-device-box">
      <div class="container">
        <checkbox-group @change="selectDevice">
          <div class="check-box">
            <label v-for="(item, index) of areaList" :key="index"
              :class="{ 'no-underline': index === areaList.length - 1 }">
              <div class="device-item">
                <div class="device-item-left">
                  <image src="/static/icon/execution-date.png" mode="widthFix" />
                  <div class="title">{{ item.name }}</div>
                </div>
                <div class="device-item-right">
                  <checkbox :value="index" color="#f5b619" :checked="item.checked" />
                </div>
              </div>
              <div class="content"></div>
            </label>
          </div>
        </checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      pushItem: {
        id: '',
        name: ''
      },
      areaList: [
        { name: '全部', value: '*', checked: false },
        { name: '星期一', value: '1', checked: false },
        { name: '星期二', value: '2', checked: false },
        { name: '星期三', value: '3', checked: false },
        { name: '星期四', value: '4', checked: false },
        { name: '星期五', value: '5', checked: false },
        { name: '星期六', value: '6', checked: false },
        { name: '星期日', value: '7', checked: false }
      ],
      devices: [],
      show: true
    }
  },
  beforeMount () {
    wx.setNavigationBarTitle({ title: '选择星期' })
  },
  onLoad (query) {
    const formData = JSON.parse(query.form)
    this.areaList.forEach((res, index) => {
      formData.forEach(item => {
        if (res.value === item) {
          this.$set(this.areaList[index], 'checked', true);
        }
      })
    })
  },
  onUnload () {
    this.week = []
    this.weekName = []
  },
  methods: {
    ...mapMutations(['changeWeekList', 'changeWeekNameList']),
    // 选择‘全部’
    checkLastZero (arr) {
      if (arr.length === 0) {
        return false;
      }
      const lastElement = arr[arr.length - 1];
      return lastElement === '0';
    },
    // 从‘全部’选到其他日期则返回true
    isFirstZeroAndSecondNonZero (arr) {
      if (arr.length >= 2) {
        if (arr[0] === '0' && arr[1] !== '0') {
          return true;
        }
      }
      return false;
    },
    // 设置日期和日期名
    setWeek (data) {
      this.week = []
      this.weekName = []
      if (data.length > 0) {
        for (let m of data) {
          let obj = ''
          obj = this.areaList[+m].name
          this.weekName.push(obj)
          this.week.push(this.areaList[+m].value)
        }
      }
      this.changeWeekList(this.week)
      console.log(this.week);
      this.changeWeekNameList(this.weekName)
    },
    // 从区域列表选择区域
    selectDevice (e) {
      const containZero = this.checkLastZero(e.target.value)
      const ZeroAndSecondNonZero = this.isFirstZeroAndSecondNonZero(e.target.value)
      if (containZero) {
        this.$set(this.areaList[0], 'checked', true);
        this.areaList.forEach((item, index) => {
          if (item.value !== '*') {
            this.$set(item, 'checked', false);
          }
        });
        this.changeWeekList(['*'])
        this.changeWeekNameList(['全部'])
      } else if (ZeroAndSecondNonZero) {
        this.$set(this.areaList[0], 'checked', false);
        this.areaList.forEach((res, index) => {
          if (res.value === e.target.value[e.target.value.length - 1]) {
            this.$set(this.areaList[index], 'checked', true);
          }
        })
        this.setWeek(e.target.value[e.target.value.length - 1])
      } else {
        this.$set(this.areaList[0], 'checked', false);
        this.setWeek(e.target.value)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.select-device-container {
  .select-device-box {
    width: 100vw;
    height: 100vh;
    background: #F2F2F2;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;

    .container {
      // padding: 0 40rpx;
      height: 100%;
      overflow-y: scroll;

      .check-box {
        border-radius: 20rpx;
        overflow: hidden;
      }

      .content {
        border-bottom: 1px solid #eee;
        margin: 0 30rpx;
        z-index: 9;
      }

      .no-underline .content {
        border-bottom: none;
      }

      .device-item {
        background: #ffffff;
        // margin: 40rpx 0;
        padding: 30rpx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        // border-radius: 20rpx;

        .device-item-left {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;

          image {
            width: 40rpx;
          }

          .title {
            color: #1A1A1A;
            font-size: 30rpx;
            margin-left: 20rpx;
          }
        }

        .device-item-right {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
        }
      }
    }
  }
}
</style>
