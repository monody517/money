<template>
    <Layout class-prefix="layout">
        <number-pad @update:value="onUpdateAmount" @submit="saveRecord"/>
        <notes @update:value="onUpdateNotes"/> 
        <tags
        :data-source="tags"
        :data-source2="record.type"
        :data-source3="incomeTags"
        :new-data.sync="newTags"
        :new-data2.sync="newTags2"
        @update:newData="onUpdateTags"
        @update:newData2="onUpdateTags2"/>
        <types :value.sync='record.type'/>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import NumberPad from '@/components/money/NumberPad.vue'
import Notes from '@/components/money/Notes.vue'
import Tags from '@/components/money/Tags.vue'
import Types from '@/components/money/Types.vue'

import { Component,Watch } from 'vue-property-decorator'

type Record = {
    tags:string[];
    incomeTags:string[];
    type:string;
    notes:string;
    amount:number
    newTags:string[];
    newTags2:string[];
    createdAt?: Date
}

const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');

@Component({
    components: { NumberPad, Notes, Tags, Types }
})
export default class Money extends Vue{
    tags = ['餐饮','购物','家居','水果','学习','房租'];

    incomeTags = ['工资','兼职','理财','礼金']
    newTags:string[] | undefined = [];
    newTags2:string[] | undefined = [];
    record:Record = {tags:[],type:'-',notes:'',amount:0,newTags:[],incomeTags:[],newTags2:[]}
    recordList: Record[] = recordList;

    onUpdateTags(value:string[]){
        this.record.newTags=value
    }
    onUpdateTags2(value:string[]){
        this.record.newTags2=value
    }
    onUpdateNotes(value:string){
        this.record.notes=value
    }
    onUpdateAmount(value:string){
        this.record.amount=parseFloat(value)     
    }
    saveRecord() {
      const record2: Record = JSON.parse(JSON.stringify(this.record));
      record2.createdAt = new Date();
      this.recordList.push(record2);
    }
    @Watch('recordList')
    onRecordListChange() {
      window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
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