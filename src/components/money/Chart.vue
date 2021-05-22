<template>
    <div class="wrapper" ref="wrapper">

    </div>
</template>

<script lang="ts">
import {Component,Prop,Vue, Watch} from 'vue-property-decorator'
import echarts, { ECharts, EChartsOption } from 'echarts';
@Component

export default class Chart extends Vue{
    @Prop() options?:any
    charts?:ECharts

    mounted(){
        if(this.options === undefined){
            return
        }
        this.charts = echarts.init(this.$refs.wrapper as HTMLDivElement)
        this.charts.setOption(this.options)
    }
    @Watch('options')
    onOptionsChange(newValue:EChartsOption){
        this.charts!.setOption(newValue)
    }
}
</script>

<style scoped lang='scss'>
    .wrapper{
        height: 400px;
    }
</style>
