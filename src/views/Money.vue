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
        <types :value.sync='record.type'/>
    </Layout>
</template>

<script lang="ts">
type RecordItem = {
    tags:string[];
    incomeTags:string[];
    type:string;
    notes:string;
    amount:number
    createdAt?: Date
}
import Vue from 'vue'
import NumberPad from '@/components/money/NumberPad.vue'
import Notes from '@/components/money/Notes.vue'
import Tags from '@/components/money/Tags.vue'
import Types from '@/components/money/Types.vue'
import recordListModel from '@/model/recordListModel'
import tagListModel from '@/model/tagListModel'


import { Component,Watch } from 'vue-property-decorator'


  const recordList = recordListModel.fetch();
  const tagList = tagListModel.fetch();

@Component({
    components: { NumberPad, Notes, Tags, Types }
})
export default class Money extends Vue{
    // tags = ['餐饮','购物','家居','水果','学习','房租'];

    tags = tagList;
    incomeTags = ['工资','兼职','理财','礼金']
    recordList: RecordItem[] = recordList;
    record: RecordItem = {
      tags:[''],incomeTags:[''], notes: '', type: '-', amount: 0
    };

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
      recordListModel.create(this.record)
    }
    @Watch('recordList')
    onRecordListChange() {
      recordListModel.save(this.recordList);
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