<template>
  <el-dialog title="设置屏蔽日期" :visible="visible" @close="cancel" :close-on-click-modal="false">
    <div class="addBox">
      <div class="date-box-top">
        <div class="box-top-item">
          <el-select v-model="year" placeholder="请选择" size="mini" @change="handleChangeYear">
            <el-option
              v-for="(item, index) in dateYearOptions"
              :key="index"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="box-top-item">
          <el-select v-model="month" placeholder="请选择" size="mini" @change="handleChangeMonth">
            <el-option
              v-for="(item, index) in dateMonthOptions"
              :key="index"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!-- <div class="box-top-item">
          <el-select v-model="holiday" placeholder="请选择" size="mini">
            <el-option
              v-for="(item, index) in holidaysOptions"
              :key="index"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </div> -->
        <div class="box-top-item">
          <el-button type="primary" size="mini" @click="backCurrentTime">返回今天</el-button>
        </div>
      </div>
      <div class="calendar-box">
        <table>
          <tr class="table-head">
            <th v-for="(item, index) of weeks" :key="index">{{ item }}</th>
          </tr>
          <tr v-for="(item, indx) of days" :key="indx">
            <td v-for="(ite, idx) of item" :key="idx" @click="toSelectDay(indx, idx)" :class="{'class-weekend': (idx === 5 || idx === 6) && ite.value !== '', 'current-day': currentDay === ite.value, 'can-select': ite.value !== '', 'selected-day': ite.select}">
              <div v-if="ite.name !== ''" class="holiday">{{ite.name}}</div>
              <div v-else>{{ite.value}}</div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="button-box">
      <!-- <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button type="primary" @click="toDeleteForbidenTime">清除屏蔽日期</el-button> -->
      <!-- <el-button @click="cancel">取消</el-button> -->
    </div>
  </el-dialog>
</template>
<script>
import { Loading } from 'element-ui'
import { restDayQuery, restDayDelete, restDayAdd } from '@/api/task'
export default {
  name: 'addSharePoster',
  props: ['visible', 'addType', 'updateTask', 'updateData'],
  data () {
    return {
      loadingInstance: {},
      currentDaysNum: '', // 当前月份的天数
      firstDayOfWeek: '', // 当前月第一天是星期几
      currentDay: new Date().getDate(), // 当前是哪天
      day: new Date().getDate(),
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      holiday: '',
      weeks: ['一', '二', '三', '四', '五', '六', '日'],
      days: [], // 用来渲染日历的list
      alreadyDay: [], // 已经选定的时间列表
      holidaysOptions: [
        {name: '节假日', value: ''},
        {name: '元旦节', value: 1},
        {name: '除夕', value: 2},
        {name: '春节', value: 3},
        {name: '清明节', value: 4},
        {name: '劳动节', value: 5},
        {name: '端午节', value: 6},
        {name: '中秋节', value: 7},
        {name: '国庆节', value: 8}
      ],
      dateMonthOptions: [
        {name: '1月', value: 0},
        {name: '2月', value: 1},
        {name: '3月', value: 2},
        {name: '4月', value: 3},
        {name: '5月', value: 4},
        {name: '6月', value: 5},
        {name: '7月', value: 6},
        {name: '8月', value: 7},
        {name: '9月', value: 8},
        {name: '10月', value: 9},
        {name: '11月', value: 10},
        {name: '12月', value: 11}
      ],
      dateYearOptions: [
        {name: '2020年', value: 2020},
        {name: '2021年', value: 2021},
        {name: '2022年', value: 2022},
        {name: '2023年', value: 2023},
        {name: '2024年', value: 2024},
        {name: '2025年', value: 2025},
        {name: '2026年', value: 2026},
        {name: '2027年', value: 2027},
        {name: '2028年', value: 2028},
        {name: '2029年', value: 2029},
        {name: '2030年', value: 2030},
        {name: '2031年', value: 2031},
        {name: '2032年', value: 2032},
        {name: '2033年', value: 2033},
        {name: '2034年', value: 2034},
        {name: '2035年', value: 2035},
        {name: '2036年', value: 2036},
        {name: '2037年', value: 2037},
        {name: '2038年', value: 2038},
        {name: '2039年', value: 2039},
        {name: '2040年', value: 2040},
        {name: '2041年', value: 2041},
        {name: '2042年', value: 2042},
        {name: '2043年', value: 2043},
        {name: '2044年', value: 2044},
        {name: '2045年', value: 2045}
        // {name: '2046年', value: 2046},
        // {name: '2047年', value: 2047},
        // {name: '2048年', value: 2048},
        // {name: '2049年', value: 2049},
        // {name: '2050年', value: 2050}
      ]
    }
  },
  computed: {
    title () {
      if (this.updateTask) {
        return this.addType === 1 ? '编辑单次任务' : this.addType === 2 ? '编辑循环任务' : '编辑手动任务'
      } else {
        return this.addType === 1 ? '添加单次任务' : this.addType === 2 ? '添加循环任务' : '添加手动任务'
      }
    }
  },
  created () {
    // console.log(123)
  },
  beforeMount () {
    this.loadingInstance = Loading.service({})
    this.getDaysOfCurrentMonth()
    this.toQueryForbidenTime(`${this.year}-${(this.month >= 9 ? this.month + 1 : '0' + (this.month + 1))}`)
  },
  beforeDestroy () {
    console.log(this.days)
  },
  methods: {
    toDeleteForbidenTime () { // 删除已经设置的时间
      let arr = []
      for (let n of this.alreadyDay) {
        arr.push(n.id)
      }
      restDayDelete({lst: arr})
        .then(res => {
          if (res.code === 200) {
            this.toQueryForbidenTime(`${this.year}-${(this.month >= 9 ? this.month + 1 : '0' + (this.month + 1))}`)
          }
        })
    },
    toQueryForbidenTime (month) { // 查询已经保存的日期并渲染
      restDayQuery({month: month})
        .then(res => {
          if (res.code === 200 && res.data.length > 0) {
            let reDays = [...this.days]
            for (let d of res.data) {
              for (let m of reDays) {
                for (let n of m) {
                  if (new Date(d.restDay).getDate() === n.value) {
                    n.select = true
                    n.id = d.id
                  }
                }
              }
            }
            this.days = reDays
          }
          this.loadingInstance.close()
        })
    },
    toSelectDay (indx, idx) { // 选中日期
      if (this.days[indx][idx].value !== '') {
        this.loadingInstance = Loading.service({})
        if (this.days[indx][idx].select) {
          restDayDelete({lst: [this.days[indx][idx].id]})
            .then(res => {
              if (res.code === 200) {
                this.days = []
                this.getDaysOfCurrentMonth()
                this.toQueryForbidenTime(`${this.year}-${(this.month >= 9 ? this.month + 1 : '0' + (this.month + 1))}`)
              }
            })
        } else {
          let arr = []
          let str = this.year + '-' + (this.month >= 9 ? this.month + 1 : '0' + (this.month + 1)) + '-' + (this.days[indx][idx].value > 9 ? this.days[indx][idx].value : '0' + this.days[indx][idx].value)
          arr.push(str)
          restDayAdd({lst: arr})
            .then(res => {
              if (res.code === 200) {
                this.days = []
                this.getDaysOfCurrentMonth()
                this.toQueryForbidenTime(`${this.year}-${(this.month >= 9 ? this.month + 1 : '0' + (this.month + 1))}`)
              }
            })
        }
      } else {
        return false
      }
    },
    backCurrentTime () { // 返回今天
      this.currentDay = new Date().getDate() // 当前是哪天
      this.day = new Date().getDate()
      this.year = new Date().getFullYear()
      this.month = new Date().getMonth()
      this.getDaysOfCurrentMonth()
      this.toQueryForbidenTime(`${this.year}-${(this.month >= 9 ? this.month + 1 : '0' + (this.month + 1))}`)
    },
    getDaysOfCurrentMonth () { // 获取当前的天数渲染列表
      this.currentDaysNum = new Date(this.year, this.month + 1, 0).getDate() // 获取当前月份的天数
      this.firstDayOfWeek = new Date(this.year, this.month, 1).getDay() !== 0 ? new Date(this.year, this.month, 1).getDay() : 7 // 获取当前月份的第一天是星期几
      for (let n = 0; n < 6; n++) {
        this.days[n] = []
        for (let m = 0; m < 7; m++) {
          let obj = {
            select: false,
            value: '',
            name: ''
          }
          if (7 * n + m - this.firstDayOfWeek + 2 > 0 && 7 * n + m - this.firstDayOfWeek + 2 <= this.currentDaysNum) {
            obj.value = 7 * n + m - this.firstDayOfWeek + 2
            if (this.month === 0) {
              if (7 * n + m - this.firstDayOfWeek + 2 === 1) {
                obj.name = '元旦'
              }
            } else if (this.month === 4) {
              if (7 * n + m - this.firstDayOfWeek + 2 === 1) {
                obj.name = '劳动节'
              }
            } else if (this.month === 5) {
              if (7 * n + m - this.firstDayOfWeek + 2 === 1) {
                obj.name = '儿童节'
              }
            } else if (this.month === 8) {
              if (7 * n + m - this.firstDayOfWeek + 2 === 10) {
                obj.name = '教师节'
              }
            } else if (this.month === 9) {
              if (7 * n + m - this.firstDayOfWeek + 2 === 1) {
                obj.name = '国庆'
              }
            }
            if (this.year === 2020) {
              if (this.month === 0) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 24) {
                  obj.name = '除夕'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 25) {
                  obj.name = '春节'
                }
              } else if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 8) {
                  obj.name = '元宵节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 4) {
                  obj.name = '清明节'
                }
              } else if (this.month === 5) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 25) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2021) {
              if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 11) {
                  obj.name = '除夕'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 12) {
                  obj.name = '春节'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 26) {
                  obj.name = '元宵节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 4) {
                  obj.name = '清明节'
                }
              } else if (this.month === 5) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 14) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2022) {
              if (this.month === 0) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 31) {
                  obj.name = '除夕'
                }
              } else if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 15) {
                  obj.name = '元宵节'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 1) {
                  obj.name = '春节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 5) {
                  obj.name = '清明节'
                }
              } else if (this.month === 5) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 3) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2023) {
              if (this.month === 0) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 21) {
                  obj.name = '除夕'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 22) {
                  obj.name = '春节'
                }
              } else if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 5) {
                  obj.name = '元宵节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 5) {
                  obj.name = '清明节'
                }
              } else if (this.month === 5) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 22) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2024) {
              if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 9) {
                  obj.name = '除夕'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 10) {
                  obj.name = '春节'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 24) {
                  obj.name = '元宵节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 4) {
                  obj.name = '清明节'
                }
              } else if (this.month === 5) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 10) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2025) {
              if (this.month === 0) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 28) {
                  obj.name = '除夕'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 29) {
                  obj.name = '春节'
                }
              } else if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 12) {
                  obj.name = '元宵节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 4) {
                  obj.name = '清明节'
                }
              } else if (this.month === 4) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 31) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2026) {
              if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 16) {
                  obj.name = '除夕'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 17) {
                  obj.name = '春节'
                }
              } else if (this.month === 2) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 3) {
                  obj.name = '元宵节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 5) {
                  obj.name = '清明节'
                }
              } else if (this.month === 5) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 19) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2027) {
              if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 5) {
                  obj.name = '除夕'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 6) {
                  obj.name = '春节'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 20) {
                  obj.name = '元宵节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 5) {
                  obj.name = '清明节'
                }
              } else if (this.month === 5) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 9) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2028) {
              if (this.month === 0) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 25) {
                  obj.name = '除夕'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 26) {
                  obj.name = '春节'
                }
              } else if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 9) {
                  obj.name = '元宵节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 4) {
                  obj.name = '清明节'
                }
              } else if (this.month === 4) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 28) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2029) {
              if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 12) {
                  obj.name = '除夕'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 13) {
                  obj.name = '春节'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 27) {
                  obj.name = '元宵节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 4) {
                  obj.name = '清明节'
                }
              } else if (this.month === 5) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 16) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2030) {
              if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 2) {
                  obj.name = '除夕'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 3) {
                  obj.name = '春节'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 17) {
                  obj.name = '元宵节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 5) {
                  obj.name = '清明节'
                }
              } else if (this.month === 5) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 5) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2031) {
              if (this.month === 0) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 22) {
                  obj.name = '除夕'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 23) {
                  obj.name = '春节'
                }
              } else if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 6) {
                  obj.name = '元宵节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 5) {
                  obj.name = '清明节'
                }
              } else if (this.month === 5) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 24) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2032) {
              if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 10) {
                  obj.name = '除夕'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 11) {
                  obj.name = '春节'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 25) {
                  obj.name = '元宵节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 4) {
                  obj.name = '清明节'
                }
              } else if (this.month === 5) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 12) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2033) {
              if (this.month === 0) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 30) {
                  obj.name = '除夕'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 31) {
                  obj.name = '春节'
                }
              } else if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 14) {
                  obj.name = '元宵节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 4) {
                  obj.name = '清明节'
                }
              } else if (this.month === 5) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 1) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2034) {
              if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 18) {
                  obj.name = '除夕'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 19) {
                  obj.name = '春节'
                }
              } else if (this.month === 2) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 5) {
                  obj.name = '元宵节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 5) {
                  obj.name = '清明节'
                }
              } else if (this.month === 5) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 20) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2035) {
              if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 7) {
                  obj.name = '除夕'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 8) {
                  obj.name = '春节'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 22) {
                  obj.name = '元宵节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 5) {
                  obj.name = '清明节'
                }
              } else if (this.month === 5) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 10) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2036) {
              if (this.month === 0) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 27) {
                  obj.name = '除夕'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 28) {
                  obj.name = '春节'
                }
              } else if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 11) {
                  obj.name = '元宵节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 4) {
                  obj.name = '清明节'
                }
              } else if (this.month === 4) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 30) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2037) {
              if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 14) {
                  obj.name = '除夕'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 15) {
                  obj.name = '春节'
                }
              } else if (this.month === 2) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 1) {
                  obj.name = '元宵节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 4) {
                  obj.name = '清明节'
                }
              } else if (this.month === 5) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 18) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2038) {
              if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 3) {
                  obj.name = '除夕'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 4) {
                  obj.name = '春节'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 18) {
                  obj.name = '元宵节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 5) {
                  obj.name = '清明节'
                }
              } else if (this.month === 5) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 7) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2039) {
              if (this.month === 0) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 23) {
                  obj.name = '除夕'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 24) {
                  obj.name = '春节'
                }
              } else if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 7) {
                  obj.name = '元宵节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 5) {
                  obj.name = '清明节'
                }
              } else if (this.month === 4) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 26) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2040) {
              if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 11) {
                  obj.name = '除夕'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 12) {
                  obj.name = '春节'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 26) {
                  obj.name = '元宵节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 4) {
                  obj.name = '清明节'
                }
              } else if (this.month === 5) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 14) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2041) {
              if (this.month === 0) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 31) {
                  obj.name = '除夕'
                }
              } else if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 15) {
                  obj.name = '元宵节'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 1) {
                  obj.name = '春节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 4) {
                  obj.name = '清明节'
                }
              } else if (this.month === 5) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 3) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2042) {
              if (this.month === 0) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 21) {
                  obj.name = '除夕'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 22) {
                  obj.name = '春节'
                }
              } else if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 5) {
                  obj.name = '元宵节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 4) {
                  obj.name = '清明节'
                }
              } else if (this.month === 5) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 22) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2043) {
              if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 9) {
                  obj.name = '除夕'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 10) {
                  obj.name = '春节'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 24) {
                  obj.name = '元宵节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 5) {
                  obj.name = '清明节'
                }
              } else if (this.month === 5) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 11) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2044) {
              if (this.month === 0) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 29) {
                  obj.name = '除夕'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 30) {
                  obj.name = '春节'
                }
              } else if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 13) {
                  obj.name = '元宵节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 4) {
                  obj.name = '清明节'
                }
              } else if (this.month === 4) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 31) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2045) {
              if (this.month === 1) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 16) {
                  obj.name = '除夕'
                } else if (7 * n + m - this.firstDayOfWeek + 2 === 17) {
                  obj.name = '春节'
                }
              } else if (this.month === 2) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 3) {
                  obj.name = '元宵节'
                }
              } else if (this.month === 3) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 4) {
                  obj.name = '清明节'
                }
              } else if (this.month === 5) {
                if (7 * n + m - this.firstDayOfWeek + 2 === 19) {
                  obj.name = '端午节'
                }
              }
            } else if (this.year === 2046) {

            } else if (this.year === 2047) {

            } else if (this.year === 2048) {

            } else if (this.year === 2049) {

            } else if (this.year === 2050) {

            }
            this.days[n][m] = obj
          } else {
            this.days[n][m] = obj
          }
        }
      }
    },
    handleChangeMonth (val) { // 手动修改月份
      this.getDaysOfCurrentMonth()
      if (val === new Date().getMonth() && this.year === new Date().getFullYear()) {
        this.currentDay = new Date().getDate()
      } else {
        this.currentDay = 'change'
      }
      this.toQueryForbidenTime(`${this.year}-${(this.month >= 9 ? this.month + 1 : '0' + (this.month + 1))}`)
    },
    handleChangeYear (val) { // 手动修改年份
      this.getDaysOfCurrentMonth()
      if (val === new Date().getFullYear() && this.month === new Date().getMonth()) {
        this.currentDay = new Date().getDate()
      } else {
        this.currentDay = 'change'
      }
      this.toQueryForbidenTime(`${this.year}-${(this.month >= 9 ? this.month + 1 : '0' + (this.month + 1))}`)
    },
    onSubmit () {
      let arr = []
      for (let n of this.days) {
        for (let m of n) {
          if (m.select) {
            let str = this.year + '-' + (this.month >= 9 ? this.month + 1 : '0' + (this.month + 1)) + '-' + (m.value > 9 ? m.value : '0' + m.value)
            arr.push(str)
          }
        }
      }
      this.$emit('submitHandle', arr)
    },
    cancel () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="less" scoped>
.el-input-number {
  width: auto;
}
.is-selected {
  color: #1989FA;
}
.text-voice {
  margin-top: 0;
}
.el-input {
  /* width: 70% */
}
.addBox {
  // padding: 0 35px;
  margin: 0 auto;
  .date-box-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .box-top-item {
      width: 20%;
    }
    .box-top-item-two {
      width: 30%;
    }
  }
  .calendar-box {
    table {
      width: 100%;
      th {
        width: 60px;
        padding: 15px 0;
      }
      td {
        width: 60px;
        text-align: center;
        padding: 10px 0;
        border: 1px solid #ffffff;
        cursor: pointer;
      }
    }
    .class-weekend {
      background: #e9e9e9;
    }
    .current-day {
      color: #479CFD;
      border: 1px solid #479CFD
    }
    .can-select:hover {
      border: 1px solid #479CFD
    }
    .selected-day {
      background: #479CFD;
      color: #ffffff;
    }
    .holiday {
      color: red
    }
  }
}
</style>
<style>
.el-upload-list{
  width: 70% !important
}
</style>
