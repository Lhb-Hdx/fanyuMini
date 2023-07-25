<template>
  <div>
    <div class="detail-box">
      <div class="big-title">数据展示</div>
      <div class="detail-left" v-if="homeData.length > 0">
        <!-- <div class="item-top"></div> -->
        <div class="detail-left-item bg1">
          <div class="high"></div>
          <div class="item-top color-two"></div>
          <div class="title">收益</div>
          <div class="infor">
            <div class="infor-item">
              <div class="top">
                <!-- <div class="top-left">
                  <span v-for="(item,index) of homeData"
                        :key="index"
                        class="number">{{item.purchaseProfit}}</span>
                </div> -->
                <div class="top-right">
                  <div class="number">今天</div>
                  <div class="howmuch">{{ homeData[0].purchaseProfit }}</div>
                  <div class="number">本月</div>
                  <div class="howmuch">{{ homeData[1].purchaseProfit }}</div>
                  <div class="number">累计</div>
                  <number-scroll :originData="homeData[2].purchaseProfit" :addNumber="1000" :scrollTime="10"></number-scroll>
                  <!-- <div class="howmuch">{{ homeData[2].purchaseProfit }}</div> -->
                </div>
              </div>
              <!-- <div class="bottom">
              </div> -->
            </div>
            <!-- <div class="line"></div> -->
            <!-- <div class="infor-item">
              <div class="top">
                <div class="top-left">
                  <span v-for="(item,index) of homeData"
                        :key="index"
                        class="number">{{item.mallProfit}}</span>
                </div>
                <div class="top-right">
                  <span class="number">今天</span>
                  <span class="number">本月</span>
                  <span class="number">累计</span>
                </div>
              </div>
              <div class="bottom">
                购物收益
              </div>
            </div> -->
          </div>
        </div>
        <div class="detail-left-item bg2">
          <div class="high"></div>
          <div class="item-top color-two"></div>
          <div class="title">交易</div>
          <div class="infor">
            <div class="infor-item">
              <div class="top">
                <!-- <div class="top-left">
                  <span v-for="(item,index) of homeData"
                        :key="index"
                        class="number">{{item.purchaseAmount}}</span>
                </div> -->
                <div class="top-right">
                  <div class="number">今天</div>
                  <div class="howmuch">{{ homeData[0].purchaseAmount }}</div>
                  <div class="number">本月</div>
                  <div class="howmuch">{{ homeData[1].purchaseAmount }}</div>
                  <div class="number">累计</div>
                  <number-scroll :originData="homeData[2].purchaseAmount" :addNumber="200000" :scrollTime="1"></number-scroll>
                  <!-- <div class="howmuch">{{ homeData[2].purchaseAmount }}</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-left-item bg2">
          <div class="high"></div>
          <div class="item-top color-two"></div>
          <div class="title">商户</div>
          <div class="infor">
            <div class="infor-item">
              <div class="top">
                <!-- <div class="top-left">
                  <span v-for="(item,index) of homeData"
                        :key="index"
                        class="number">{{item.merchant}}</span>
                </div> -->
                <div class="top-right">
                  <div class="number">今天</div>
                  <div class="howmuch">{{ homeData[0].merchant }}</div>
                  <div class="number">本月</div>
                  <div class="howmuch">{{ homeData[1].merchant }}</div>
                  <div class="number">累计</div>
                  <number-scroll :originData="homeData[2].merchant" :addNumber="100" :scrollTime="10"></number-scroll>
                  <!-- <div class="howmuch">{{ homeData[2].merchant }}</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-left-item bg2">
          <div class="high"></div>
          <div class="item-top color-two"></div>
          <div class="title">店主</div>
          <div class="infor">
            <div class="infor-item">
              <div class="top">
                <!-- <div class="top-left">
                  <span v-for="(item,index) of homeData"
                        :key="index"
                        class="number">{{item.partnerAmount}}</span>
                </div> -->
                <div class="top-right">
                  <div class="number">今天</div>
                  <div class="howmuch">{{ homeData[0].partnerAmount }}</div>
                  <div class="number">本月</div>
                  <div class="howmuch">{{ homeData[1].partnerAmount }}</div>
                  <div class="number">累计</div>
                  <number-scroll :originData="homeData[2].partnerAmount" :addNumber="50" :scrollTime="10"></number-scroll>
                  <!-- <div class="howmuch">{{ homeData[2].partnerAmount }}</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-left-item bg2">
          <div class="high"></div>
          <div class="item-top color-two"></div>
          <div class="title">服务商</div>
          <div class="infor">
            <div class="infor-item">
              <div class="top">
                <!-- <div class="top-left">
                  <span v-for="(item,index) of homeData"
                        :key="index"
                        class="number">{{item.agentAmount}}</span>
                </div> -->
                <div class="top-right">
                  <div class="number">今天</div>
                  <div class="howmuch">{{ homeData[0].agentAmount }}</div>
                  <div class="number">本月</div>
                  <div class="howmuch">{{ homeData[1].agentAmount }}</div>
                  <div class="number">累计</div>
                  <number-scroll :originData="homeData[2].agentAmount" :addNumber="50" :scrollTime="10"></number-scroll>
                  <!-- <div class="howmuch">{{ homeData[2].agentAmount }}</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="item-top" style="background-color: rgb(239, 72, 104)"></div> -->
        <!-- <div class="detail-left-item bg3">
          <div class="high"></div>
          <div class="item-top color-three"></div>
          <div class="title">团队</div>
          <div class="infor">
            <div class="infor-item">
              <div class="top">
                <div class="top-left">
                  <span v-for="(item,index) of homeData"
                        :key="index"
                        class="number">{{item.merchant}}</span>
                </div>
                <div class="top-right">
                  <span class="number">今天</span>
                  <span class="number">本月</span>
                  <span class="number">累计</span>
                </div>
              </div>
              <div class="bottom">
                商户
              </div>
            </div>
            <div class="line"></div>
            <div class="infor-item">
              <div class="top">
                <div class="top-left">
                  <span v-for="(item,index) of homeData"
                        :key="index"
                        class="number">{{item.partnerAmount}}</span>
                </div>
                <div class="top-right">
                  <span class="number">今天</span>
                  <span class="number">本月</span>
                  <span class="number">累计</span>
                </div>
              </div>
              <div class="bottom">
                店主
              </div>
            </div>
            <div class="line"></div>
            <div class="infor-item">
              <div class="top">
                <div class="top-left">
                  <span v-for="(item,index) of homeData"
                        :key="index"
                        class="number">{{item.agentAmount}}</span>
                </div>
                <div class="top-right">
                  <span class="number">今天</span>
                  <span class="number">本月</span>
                  <span class="number">累计</span>
                </div>
              </div>
              <div class="bottom">
                服务商
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <!-- <div v-if="roles[0] == '2'" -->
      <div v-if="false"
           class="detail-right">
        <div>
          <div class="title">我的费率</div>
          <div v-if="!rateHided"
               class="seting-box">
            <div class="name">小额结算:{{profitData.levelA * 100 | rounding}}</div>
            <div class="name">A类结算:{{profitData.levelB * 100 | rounding}}</div>
            <div class="name">B类结算:{{profitData.levelC * 100 | rounding}}</div>
            <div class="name">C类结算:{{singleSettlementPrice == null ? profitData.payProfit : singleSettlementPrice}}</div>
            <el-button @click="setStatus"
                       type="text">隐藏</el-button>
          </div>
          <div v-if="rateHided"
               class="seting-box">
            <div class="name">结算费率:******</div>
            <el-button @click="setStatus"
                       type="text">显示</el-button>
          </div>
        </div>
        <div class="title">公告</div>
        <div class="notice-box">
          <div v-for="(item,index) of contentData"
               :key="index"
               class="notice-box-item">
            <div class="tip">{{item.reserveOne}}</div>
            <span @click="showDetail(item.id,item.title)">{{item.title.length >= 12 ? item.title.substring(0,12) + '...':item.title}}</span>
          </div>
        </div>
      </div>
    </div>
    <confirmRelationDialog v-if="confirmRelationDialogVisible"
                           @signContent="signContent"
                           ref="confirmRelationDialog"></confirmRelationDialog>
    <updatePasswordDialog v-if="updatePasswordDialogVisible"
                          @confirmRelation="confirmRelation"
                          ref="updatePasswordDialog"></updatePasswordDialog>
    <signContentDialog v-if="signContentDialogVisible"
                       @signContent="signContent"
                       ref="signContentDialog"></signContentDialog>
    <contentDetailDialog v-if="contentDetailDialogVisible"
                         @pushContent="pushContent"
                         ref="contentDetailDialog"></contentDetailDialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { homeStat, checkUserModifyPassword } from '@/api/home'
import { agentPushContent } from '@/api/pushContent'
import { getAgentRate } from '@/api/rate'
import { getAgentInfo } from '@/api/agent'
import updatePasswordDialog from './updatePasswordDialog'
import signContentDialog from './signContentDialog'
import contentDetailDialog from './contentDetailDialog'
import confirmRelationDialog from './confirmRelationDialog'
import numberScroll from '@/components/numberScroll'
export default {
  name: 'home',
  components: {
    updatePasswordDialog,
    signContentDialog,
    contentDetailDialog,
    confirmRelationDialog,
    numberScroll
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  data () {
    return {
      homeData: [],
      contentData: [],
      profitData: {},
      signList: [],
      rateHided: true,
      isRequired: false,
      singleSettlementPrice: null,
      updatePasswordDialogVisible: false,
      signContentDialogVisible: false,
      contentDetailDialogVisible: false,
      confirmRelationDialogVisible: false
    }
  },
  beforeMount () {
    // this.init()
  },
  filters: {
    rounding (value) {
      return value.toFixed(2)
    }
  },
  methods: {
    init () {
      homeStat().then(res => {
        this.homeData = res.data
      })
      this.agentRate()
      this.confirmFirstLogin()
    },
    agentRate () {
      if (this.roles[0] === '2') {
        getAgentRate().then(res => {
          this.profitData = res.data
        })
        this.pushContent()
      }
    },
    pushContent () {
      agentPushContent().then(res => {
        this.contentData = res.data
      })
    },
    showDetail (id, title) {
      this.contentDetailDialogVisible = true
      this.$nextTick(() => {
        this.$refs.contentDetailDialog.init(id, title)
      })
    },
    confirmRelation () {
      if (this.roles[0] === '2') {
        getAgentInfo().then(res => {
          this.singleSettlementPrice = res.data.singleSettlementPrice
          if (res.data && res.data.comfirmRelation !== 1 && res.data.parentAgentId != null) {
            this.confirmRelationDialogVisible = true
            this.$nextTick(() => {
              this.$refs.confirmRelationDialog.init()
            })
          } else {
            this.signContent()
          }
        })
      }
    },
    updatePassword () {
      this.updatePasswordDialogVisible = true
      this.$nextTick(() => {
        this.$refs.updatePasswordDialog.init()
      })
    },
    confirmFirstLogin () {
      checkUserModifyPassword().then(res => {
        this.isRequired = res.data
        if (this.isRequired) {
          this.updatePassword()
        } else {
          this.confirmRelation()
        }
      })
    },
    signContent () {
      if (this.roles[0] === '2') {
        this.signContentDialogVisible = true
        this.$nextTick(() => {
          this.$refs.signContentDialog.init()
        })
      }
    },
    setStatus () {
      if (this.rateHided) {
        this.rateHided = false
      } else {
        this.rateHided = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.detail-box {
  padding: 20px 40px;
  // display: flex;
  // flex-direction: row;
  // justify-content: space-between;
  // align-items: flex-start;
  .big-title {
    font-size: 22px;
    font-weight: 500;
  }
  .detail-left {
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    .detail-left-item {
      width: 18%;
      height: 60vh;
      border-radius: 8px;
      overflow: hidden;
      // padding: 10px 20px;
      box-shadow: 1px 2px 10px #eee;
      // border:1px solid #e6e6e6;
      // border-top: 1px;
      // border-block-start-color: aqua;
      margin-bottom: 34px;
      .item-top{
        height: 6px;
      }
      .color-one {
        background: rgb(128, 134, 149);
      }
      .color-two {
        background: rgb(255, 168, 32);
      }
      .color-three {
        background: rgb(239, 72, 104);
      }
      .title {
        margin-bottom: 30px;
        // font-size: 16px;
        // font-weight: 600;
        // border: 1px solid #dcdfe6;
        text-align: center;
        padding: 40px 0 10px;
        font-size: 20px;
        font-weight: 500
      }
      .infor {
        // width: 100%;
        // display: flex;
        // flex-direction: row;
        // justify-content: space-around;
        // align-items: stretch;
        .infor-item {
          // display: flex;
          // flex-direction: column;
          // justify-content: flex-start;
          // align-items: center;
          .top {
            // display: flex;
            // flex-direction: row;
            // justify-content: flex-start;
            // align-items: center;
            .top-left {
              // margin-right: 15px;
              // display: flex;
              // flex-direction: column;
              // justify-content: flex-start;
              // align-items: flex-end;
            }
            .top-right {
              text-align: center;
              // display: flex;
              // flex-direction: column;
              // justify-content: flex-start;
              // align-items: flex-start;
              .number {
                padding: 10px 0;
                margin-top: 40px;
              }
              .howmuch {
                font-size: 16px;
                font-weight: 500;
              }
            }
            span {
              margin-bottom: 10px;
            }
          }
          .bottom {
            margin-top: 20px;
          }
        }
        .line {
          width: 0;
          height: auto;
          border-left: 1px solid #dcdfe6;
        }
      }
    }
  }
  .detail-right {
    height: 50vh;
    width: 18%;
    border: 1px solid #dcdfe6;
    .title {
      // //margin-bottom: 30px;
      font-size: 16px;
      font-weight: 600;
      padding: 15px;
      // border: 1px solid #dcdfe6;
      // text-align: center;
      // padding: 20px 0 10px;
      // font-size: 20px;
      // font-weight: 200;
    }
    .seting-box {
      padding: 15px;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #dcdfe6;
      .name {
        margin: 10px;
      }
    }
    .notice-box {
      .notice-box-item {
        padding: 10px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1px solid #dcdfe6;
        .tip {
          margin-right: 10px;
          padding: 6px;
          border: 1px solid #474747;
          border-radius: 4px;
        }
      }
    }
  }
}
.detail-left-item{
      -webkit-box-shadow: 1px 2px 10px #eee;
}
</style>
