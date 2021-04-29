<template>
    <Layout>
        <Tabs :data-source="typeArr" :value.sync="type" class-prefix="type"/>
        <Tabs :data-source="intervalArr" :value.sync='interval'
        class-prefix="interval"/>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import Tabs from '@/components/Tabs.vue'

@Component({components:{Tabs}})
export default class Statistics extends Vue{
    type = '-'
    interval = 'day'
    intervalArr = [
        {text:'按日',value:'day'},
        {text:'按周',value:'week'},
        {text:'按月',value:'month'},
    ]
    typeArr = [
        {text:'支出',value:'-'},
        {text:'收入',value:'+'}
    ]
}
</script>

<style lang="scss" scoped>
::v-deep type-item{

}
</style>