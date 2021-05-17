<template>
    <div>
      <input type="text" readonly="readonly" v-model="date" @click="getDate()">
      <calendar v-if="calendarShow" :format="format" :draftDate="date" @calendarClose="calendarClose"></calendar>
    </div>
</template>

<script>
  import Calendar from '@/components/calendar.vue';
    export default {
        name:"",
        components: {
          Calendar
        },
        props: {
        },
        data () {
            return {
              calendarShow:false,
              format:'YYYY-MM-DD',
              date:''
            };
        },
        created () {
        },
        computed: {

        },
        watch: {

        },
        methods: {
          getDate(){
            this.calendarShow = true;
          },
          calendarClose(res,val2){
            this.calendarShow = false;
            if(res){
              this.date = res;
            }
          }
        }
    };
</script>

<style scoped lang="stylus">

</style>
