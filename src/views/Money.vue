<template>   
    <Layout class-prefix="layout">
        <number-pad @update:value="onUpdateAmount"/>
        <notes @update:value="onUpdateNotes"/> 
        <tags
        :data-source="tags"
        :data-source2="record.type"
        :data-source3="incomeTags"
        :new-data.sync="newTags"
        @update:newData="onUpdateTags"/>
        <types :value.sync='record.type'/>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import NumberPad from '@/components/money/NumberPad.vue'
import Notes from '@/components/money/Notes.vue'
import Tags from '@/components/money/Tags.vue'
import Types from '@/components/money/Types.vue'
import { Component } from 'vue-property-decorator'

type Record = {
    tags:string[];
    incomeTags:string[];
    type:string;
    notes:string;
    amount:number
    newTags:string[];
}

@Component({
    components: { NumberPad, Notes, Tags, Types }
})
export default class Money extends Vue{
    tags = ['餐饮','购物','家居','水果','学习','房租'];
    incomeTags = ['工资','兼职','理财','礼金']
    newTags:string[] | undefined = [];
    record:Record = {tags:[],type:'-',notes:'',amount:0,newTags:[],incomeTags:[]}
    onUpdateTags(value:string[]){
        this.record.newTags=value
    }
    onUpdateNotes(value:string){
        this.record.notes=value
    }
    onUpdateAmount(value:string){
        this.record.amount=parseFloat(value)     
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