<template>
    <Layout class-prefix="layout">
        {{RecordItemList}}
        <number-pad @update:value="onUpdateAmount" @submit="saveRecordItem"/>
        <notes 
        field-name="备注"
        placeholder="在这里输入备注"
        @update:value="onUpdateNotes"/> 
        <tags
        :data-source="tags"
        :data-source2="RecordItem.type"
        :data-source3="incomeTags"
        :new-data.sync="newTags"
        :new-data2.sync="newTags2"
        @update:newData="onUpdateTags"
        @update:newData2="onUpdateTags2"/>
        <types :value.sync='RecordItem.type'/>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import NumberPad from '@/components/money/NumberPad.vue'
import Notes from '@/components/money/Notes.vue'
import Tags from '@/components/money/Tags.vue'
import Types from '@/components/money/Types.vue'
import recordListModel from '@/model/recordListModel'
import tagListModel from '@/model/tagListModel'


import { Component,Watch } from 'vue-property-decorator'

type RecordItem = {
    tags:string[];
    incomeTags:string[];
    type:string;
    notes:string;
    amount:number
    newTags:string[];
    newTags2:string[];
    createdAt?: Date
}

const RecordItemList = recordListModel.fetch()
const tagList = tagListModel.fetch()

@Component({
    components: { NumberPad, Notes, Tags, Types }
})
export default class Money extends Vue{
    // tags = ['餐饮','购物','家居','水果','学习','房租'];
    tags = tagList
    incomeTags = ['工资','兼职','理财','礼金']
    newTags:string[] | undefined = [];
    newTags2:string[] | undefined = [];
    RecordItem:RecordItem = {tags:[],type:'-',notes:'',amount:0,newTags:[],incomeTags:[],newTags2:[]}
    RecordItemList: RecordItem[] = RecordItemList;

    onUpdateTags(value:string[]){
        this.RecordItem.newTags=value
    }
    onUpdateTags2(value:string[]){
        this.RecordItem.newTags2=value
    }
    onUpdateNotes(value:string){
        this.RecordItem.notes=value
    }
    onUpdateAmount(value:string){
        this.RecordItem.amount=parseFloat(value)     
    }
    saveRecordItem() {
      const RecordItem2:RecordItem = recordListModel.clone(this.RecordItemList);
      RecordItem2.createdAt = new Date();
      this.RecordItemList.push(RecordItem2);
    }
    @Watch('RecordItemList')
    onRecordItemListChange() {
      recordListModel.save(this.RecordItemList)
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