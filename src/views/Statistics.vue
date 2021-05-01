<template>
    <Layout>
        <Tabs :data-source="typeList" :value.sync="type" class-prefix="type"/>

            <ol>
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

@Component({components:{Tabs}})
export default class Statistics extends Vue{
    created() {
        this.$store.commit('fetchRecords')
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
</style>