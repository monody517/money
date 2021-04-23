<template>   
    <Layout class-prefix="layout">  
        {{record}}
        <number-pad @update:value="onUpdateAmount"/>
        <notes @update:value="onUpdateNotes"/> 
        <tags :data-source.sync="tags" @update:value="onUpdateTags"/>
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
    type:string;
    notes:string;
    amount:number
}

@Component({
    components: { NumberPad, Notes, Tags, Types }
})
export default class Money extends Vue{
    tags = ['餐饮','购物','家居','水果','学习','房租'];
    record:Record = {tags:[],type:'-',notes:'',amount:0}
    onUpdateTags(value:string[]){
        this.record.tags=value  
    };
    onUpdateNotes(value:string){
        this.record.notes=value
    };
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