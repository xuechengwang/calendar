<template>
  <div class="Calendar-box" id="Calendar-box">
    <div style="width: 100%;height: 100%;" @click.capture="close"></div>
    <div class="calendar-wrapper">
      <calendars :months="months" :value="value" @next="next" @prev="prev" :events="events" lunar clean @select="select"
        ref="calendar" :responsive="true" @selectMonth="selectMonth" @selectYear="selectYear" :tileContent="tileContent"
        :almanacs="almanacs"></calendars>
    </div>
  </div>
</template>

<script>
  import Calendars from 'mpvue-calendar'
  import 'mpvue-calendar/src/browser-style.css'
  export default {
    name: 'Calendar',
    components: {
      Calendars,
    },
    props: {
      format: {
        type: String,
        default: 'YYYY-MM-DD'
      },
      draftDate: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        // disabledArray: ['2018-6-27', '2018-6-25'],//禁止点击的时间
        begin: [2016, 1, 1], //设置可用日期开始时间，在此之前的日期会被禁用，不传则不限制。
        end: [2020, 1, 1], //设置可用日期结束时间，在此之后的日期会被禁用，不传则不限制。
        events: { //自定义备注
          // '2018-6-7': '今日备注',
          // '2020-12-8': '一条很长的明日备注'
        },
        almanacs: { //自定义节日
          // '9-3': '抗战胜利日',
          // '11-17': '学生日'
        },
        //为每个具体日期自定义class和插入文本内容
        tileContent: [
          // {
          //     date: '2020-10-1',
          //     className: 'holiday',
          //     content: '休'
          // },
          // {
          //     date: '2020-10-9',
          //     className: 'work',
          //     content: '班'
          // },
        ],
        // arrowLeft: arrowLeft
        year: ''
      }
    },
    computed: {
      value(){
        if (this.draftDate) {
          let dateArr = this.$moment(this.draftDate).format('YYYY-MM-DD').split('-');
          let dates = [];
          dateArr.forEach(item => {
            dates.push(parseInt(item))
          })
          return dates
        } else {
          let newDate = new Date();
          return [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()]
        }
      }
    },
    watch: {
      year: function() {
        this.getDateRecord();
      }
    },
    created() {
      if (this.draftDate) {
        let date = this.$moment(this.draftDate).format('YYYY-MM-DD');
        this.year = parseInt(date.split('-')[0]);
      } else {
        this.year = new Date().getFullYear();
      }
    },
    mounted() {},
    methods: {
      //左箭头
      prev(year, month, weekIndex) {
        // console.log(year, month, weekIndex)
        this.year = year;
      },
      //右箭头
      next(year, month, weekIndex) {
        this.year = year;
      },
      //选择年
      selectYear(year) {
        this.year = year;
      },
      //选择月
      selectMonth(month, year) {
        // console.log(year, month)
      },
      setToday() {
        this.$refs.calendar.setToday()
      },
      dateInfo() {
        const info = this.$refs.calendar.dateInfo(2018, 8, 23)
        // console.log(info)
      },
      renderer() {
        this.$refs.calendar.renderer(2018, 8) //渲染2018年8月份
      },
      //选择日期
      select(val, val2) {
        let date = this.$moment(val2.date).format(this.format);
        this.$emit('calendarClose', date,val2);
      },
      close() {
        this.$emit('calendarClose', '');
      },
      //获取每年的法定节假日,可以获取外网的，也可以获取自己系统配置的。
      getDateRecord() {
        this.tileContent = [{"date":"2021-1-1","className":"holiday","content":"休"},{"date":"2021-1-2","className":"holiday","content":"休"},{"date":"2021-1-3","className":"holiday","content":"休"},{"date":"2021-2-7","className":"work","content":"班"},{"date":"2021-2-11","className":"holiday","content":"休"},{"date":"2021-2-12","className":"holiday","content":"休"},{"date":"2021-2-13","className":"holiday","content":"休"},{"date":"2021-2-14","className":"holiday","content":"休"},{"date":"2021-2-15","className":"holiday","content":"休"},{"date":"2021-2-16","className":"holiday","content":"休"},{"date":"2021-2-17","className":"holiday","content":"休"},{"date":"2021-2-20","className":"work","content":"班"},{"date":"2021-4-3","className":"holiday","content":"休"},{"date":"2021-4-4","className":"holiday","content":"休"},{"date":"2021-4-5","className":"holiday","content":"休"},{"date":"2021-4-25","className":"work","content":"班"},{"date":"2021-5-1","className":"holiday","content":"休"},{"date":"2021-5-2","className":"holiday","content":"休"},{"date":"2021-5-3","className":"holiday","content":"休"},{"date":"2021-5-4","className":"holiday","content":"休"},{"date":"2021-5-5","className":"holiday","content":"休"},{"date":"2021-5-8","className":"work","content":"班"},{"date":"2021-6-12","className":"holiday","content":"休"},{"date":"2021-6-13","className":"holiday","content":"休"},{"date":"2021-6-14","className":"holiday","content":"休"},{"date":"2021-9-18","className":"work","content":"班"},{"date":"2021-9-19","className":"holiday","content":"休"},{"date":"2021-9-20","className":"holiday","content":"休"},{"date":"2021-9-21","className":"holiday","content":"休"},{"date":"2021-9-26","className":"work","content":"班"},{"date":"2021-10-1","className":"holiday","content":"休"},{"date":"2021-10-2","className":"holiday","content":"休"},{"date":"2021-10-3","className":"holiday","content":"休"},{"date":"2021-10-4","className":"holiday","content":"休"},{"date":"2021-10-5","className":"holiday","content":"休"},{"date":"2021-10-6","className":"holiday","content":"休"},{"date":"2021-10-7","className":"holiday","content":"休"},{"date":"2021-10-9","className":"work","content":"班"}]
      },
    }
  }
</script>

<style scoped lang="stylus">
  .Calendar-box {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;

    /deep/ .mpvue-calendar {
      table {
        margin-bottom: 0;
      }
    }

    .calendar-wrapper {
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      right: 0;
      z-index: 9;

      /deep/ .holiday {
        background: #fff0f0;

        .slot-element {
          background: #ea6151;
          padding: 0 2px;
          color: #fff;
          top: 0;
        }
      }

      /deep/ .work {
        background: #f5f5f5;

        .slot-element {
          background: #969799;
          padding: 0 2px;
          color: #fff;
          top: 0;
        }
      }
    }

    /deep/ td {
      border: none !important;
      width: 14.28571429% !important;
      padding: 0 !important;
    }

    /deep/ tr {
      border-top: 1px solid #ddd !important;
    }

    /deep/ .mc-dot {
      bottom: 0;
    }
  }

  .datePicker {
    background-color: #f7f8fd;
    padding-top: 85px;
    height: 100%
  }
</style>
