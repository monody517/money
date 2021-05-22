<template>
    <div class="wrapper" ref="wrapper">

    </div>
</template>

<script lang="ts">
import {Component,Prop,Vue} from 'vue-property-decorator'
import echarts from 'echarts';
@Component

export default class Chart extends Vue{
    @Prop() options?:any
    mounted(){
        if(this.options === undefined){
            return
        }
        const chart = echarts.init(this.$refs.wrapper as HTMLDivElement)
        chart.setOption(this.options)
    }
}
</script>

<style scoped lang='scss'>
    .wrapper{
        height: 400px;
    }
</style>
