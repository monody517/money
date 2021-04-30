<template>
    <Layout>
        <Tabs :data-source="typeList" :value.sync="type" class-prefix="type"/>
        <Tabs :data-source="intervalList" :value.sync='interval'
        class-prefix="interval"/>
            <ol>
                <li v-for="(group,index) in result" :key="index">
                    <h3 class="title">{{beautify(group.title)}}</h3>
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

@Component({components:{Tabs}})
export default class Statistics extends Vue{
    created() {
        this.$store.commit('fetchRecords')
    }
    get recordList(){
        return (this.$store.state as RootState).recordList
        
    }
    get result(){
        const {recordList} = this
        type Items = RecordItem[]
        const hashTable:{[key:string]:{title:string ,items:Items}} = {}
        for(let i = 0;i<recordList.length;i++){
           const [date,time] = recordList[i].createdAt!.split('T')
           hashTable[date] = hashTable[date] || {title:date,items:[]}
           hashTable[date].items.push(recordList[i])
        }  
        console.log(this.$store.state.recordList);  
        return hashTable        
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