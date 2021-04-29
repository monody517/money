<template>
    <Layout>
        <Tabs :data-source="typeList" :value.sync="type" class-prefix="type"/>
        <Tabs :data-source="intervalList" :value.sync='interval'
        class-prefix="interval"/>
        <div>
            <ol>
                <li v-for="(group,index) in result" :key="index">
                    <ol>
                        <li v-for="item in group" :key="item.id">
                            {{item.amount}}{{item.createdAt}}
                        </li>
                    </ol>    
                </li>
            </ol>
        </div>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import Tabs from '@/components/Tabs.vue'
import intervalList from '@/consts/intervalList'
import typeList from '@/consts/typeList'

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
        return hashTable
    }
    type = '-'
    interval = 'day'
    intervalList = intervalList
    typeList = typeList
}
</script>

<style lang="scss" scoped>

</style>