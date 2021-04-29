<template>
    <Layout>
        <Tabs :data-source="typeList" :value.sync="type" class-prefix="type"/>
        <Tabs :data-source="intervalList" :value.sync='interval'
        class-prefix="interval"/>
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
    type = '-'
    interval = 'day'
    intervalList = intervalList
    typeList = typeList
}
</script>

<style lang="scss" scoped>
::v-deep type-item{

}
</style>