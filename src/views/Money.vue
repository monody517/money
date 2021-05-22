<template>
    <Layout class-prefix="layout">
        <number-pad @update:value="onUpdateAmount" @submit="saveRecord"/>
        <notes 
        field-name="日期"
        placeholder="在这里输入日期"
        type='date'
        :value.sync="record.createdAt"
        />
        <notes 
        field-name="备注"
        placeholder="在这里输入备注"
        :value.sync="record.notes"
        /> 
        <tags
        :pay-data="newTagList"
        :tags-type="record.type"
        @update:value="onUpdateTags"/>
        <Tabs :data-source='typeList' :value.sync="record.type"/>
    </Layout>
</template>

<script lang="ts">
type RecordItem = {
    tags:string[];
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
import clone from '@/lib/clone'
import dayjs from 'dayjs'


@Component({
    components: { NumberPad, Notes, Tags, Tabs }
})
export default class Money extends Vue{
    
    incomeTags = [];
    tags = this.$store.state.tagList;
    get newTagList(){
      const {tags} = this
      const result = clone(tags).filter((t:Tag)=>(t.type === this.record.type))
      return result
    }
    record: RecordItem = {
      tags:[], notes: '', type: '-', amount: 0, createdAt:dayjs(new Date()).format('YYYY-MM-DD')
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
    onUpdateNotes(value: string) {
      this.record.notes = value;
    }
    onUpdateAmount(value:string){
        this.record.amount=parseFloat(value) 
    }
    saveRecord() {
      if(this.record.tags.length === 0 || !this.record.tags){
        window.alert('请选择一个标签')
        return
      }
      this.$store.commit('createRecord',this.record)
      this.record.notes = ''
    }
}
</script>

<style lang="scss">
    .layout-content{
        display: flex;
        flex-direction: column-reverse;
    }
</style>
