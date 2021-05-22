<template>
    <Layout>
        <Tabs :data-source="typeList" :value.sync="type" class-prefix="type"/>
        <div class="charts-wrapper" ref="chartWrapper">
            <Chart class="charts" :options= chartOptions />
        </div>
            <ol v-if="groupedList.length>0">
                <li v-for="(group,index) in groupedList" :key="index">
                    <h3 class="title">{{beautify(group.title)}}<span>￥{{group.total}}</span></h3> 
                    <ol>
                        <li v-for="item in group.items" :key="item.id" class="record">
                            <span>{{tagString(item.tags).name}}</span>
                            <span class="notes">{{item.notes}}</span>
                            <span>￥{{item.amount}}</span>    
                        </li>
                    </ol>    
                </li>
            </ol>
            <div v-else class="noRecord">
                没有记录，快去记账吧
            </div>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import Tabs from '@/components/Tabs.vue'
import intervalList from '@/consts/intervalList'
import typeList from '@/consts/typeList'
import dayjs from 'dayjs'
import clone from '@/lib/clone'
import Chart from '@/components/money/Chart.vue'
import _ from 'lodash'

@Component({components:{Tabs,Chart}})
export default class Statistics extends Vue{
    created() {
        this.$store.commit('fetchRecords')
    }
    mounted(){
        const div = (this.$refs.chartWrapper as HTMLDivElement)
        div.scrollLeft = div.scrollWidth
    }
    get keyValueList(){
        const today = new Date()
        const array = []
        for(let i = 0;i <=29;i++){
            const dateString = dayjs(today).subtract(i,'day').format('YYYY-MM-DD')
            const found = _.find(this.groupedList,{title:dateString})
            array.push({
                key:dateString,
                value:found? found.total : 0              
                })           
        }
        array.sort((a,b)=>{
            if(a.key > b.key){
                return 1
            }else if(a.key === b.key){
                return 0
            }else{
                return -1
            }
        })
        return array
    }
    get chartOptions() {
        const keys = this.keyValueList.map(item=>item.key)
        const values = this.keyValueList.map(item=>item.value)
        return {
            grid:{
                left:0,
                right:0
            },
             xAxis: {
                type: 'category',
                data: keys,
                axisTick:{alignWithLabel:true},
                axisLine:{lineStyle:{color:'#666'}},
                axisLabel:{
                    formatter:function (value:string,index:number){
                        return value.substr(5)
                    }
                }
            },
            yAxis: {
                type: 'value',
                show:false
            },
            series: [{
                symbolSize:12,
                data: values,
                type: 'line',
                lineStyle:{color:'#fbaa00'}
            }],
            tooltip:{show:true}
        }
    }
    get recordList(){
        return (this.$store.state as RootState).recordList 
    }
    get groupedList(){
        const {recordList} = this
        const newRecordList = clone(recordList)
        .filter(r=>(r.type === this.type)).sort((a,b)=>dayjs(b.createdAt).valueOf()-dayjs(a.createdAt).valueOf())
        if(newRecordList.length === 0){return [] as Result}
        type Result = {title:string,total?:number,items:RecordItem[]}[]
        const result:Result = [{title:dayjs(newRecordList[0].createdAt).format('YYYY-MM-DD'),items:[newRecordList[0]]}]
        for(let i = 1;i<newRecordList.length;i++){
            const current = newRecordList[i]
            const last = result[result.length-1]
            if(dayjs(last.title).isSame(dayjs(current.createdAt),'day')){
                last.items.push(current)
            }else{
                result.push({title:dayjs(newRecordList[i].createdAt).format('YYYY-MM-DD'),items:[newRecordList[i]]})
            }
        } 
        result.map(group=>{
            group.total = group.items.reduce((sum,item)=>sum+item.amount,0)
        })
        return result  
    }
    tagString(tags:Tag[]){
        return tags[0]
    }
    beautify(string:string){
        const day = dayjs(string)
        const now = dayjs()
        if(day.isSame(now,'day')){
            return '今天'
        }else if(day.isSame(now.subtract(1,'day'),'day')){
            return '昨天'
        }else if(day.isSame(now.subtract(2,'day'),'day')){
            return '前天'
        }else if(day.isSame(now,'year')){
            return day.format('MM月D日')
        }else{
            return day.format('YYYY年MM月D日')
        }
    }
    type = '-'
    interval = 'day'
    intervalList = intervalList
    typeList = typeList
}
</script>

<style lang="scss" scoped>
%item{
    padding:8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.title{
    @extend %item;
    font-size: 13px;
}
.record{
    @extend %item;
    background: white;
    margin: 6px;
    height: 48px;
    border-radius: 5px;
    .notes{
        margin-right: auto;
        margin-left: 16px;
        color:#999;
        font-size: 13px;
    }
}
.noRecord{
    padding: 16px;
    text-align: center;
}
.charts{
    width:430%;
    &-wrapper{
        overflow: auto;
        &::-webkit-scrollbar{
            display: none;
        }
    }
    
}
</style>