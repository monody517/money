<template>
    <Layout class-prefix="layout">
        <number-pad @update:value="onUpdateAmount" @submit="saveRecord"/>
        <notes 
        field-name="备注"
        placeholder="在这里输入备注"
        @update:value="onUpdateNotes"/> 
        <tags
        :pay-data="tags"
        :tags-type="record.type"
        :income-data="incomeTags"
        @update:newData="onUpdateTags"
        @update:newData2="onUpdateTags2"/>
        <Tabs :data-source='typeList' :value.sync="record.type"/>
    </Layout>
</template>

<script lang="ts">
type RecordItem = {
    tags:string[];
    incomeTags:string[];
    type:string;
    notes:string;
    amount:number
    createdAt?: string
}
import Vue from 'vue'
import NumberPad from '@/components/money/NumberPad.vue'
import Notes from '@/components/money/Notes.vue'
import Tags from '@/components/money/Tags.vue'
import Tabs from '@/components/Tabs.vue'
import { Component } from 'vue-property-decorator'
import typeList from '@/consts/typeList'


@Component({
    components: { NumberPad, Notes, Tags, Tabs }
})
export default class Money extends Vue{
    
    incomeTags = [];
    tags = this.$store.state.tagList;
    record: RecordItem = {
      tags:[],incomeTags:[], notes: '', type: '-', amount: 0
    };
    beforeCreate() {
      this.$store.commit('fetchTags')
    }
    created() {
      this.$store.commit('fetchRecords')  
    }
    typeList = typeList
    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }
    onUpdateTags2(value: string[]) {
      this.record.incomeTags = value;
    }
    onUpdateNotes(value: string) {
      this.record.notes = value;
    }
    onUpdateAmount(value:string){
        this.record.amount=parseFloat(value) 
    }
    saveRecord() {
      this.$store.commit('createRecord',this.record)
    }
}
</script>

<style lang="scss">
    .layout-content{
        display: flex;
        flex-direction: column-reverse;
    }
</style>

<style lang="scss" scoped>





</style>