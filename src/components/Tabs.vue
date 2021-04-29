<template>
    <ul class="tabs">
        <li 
        v-for="item in dataSource" :key="item.text"
        :class="{[classPrefix+'-item']:classPrefix,selected: item.value === value}"
        @click="select(item)">{{item.text}}</li>
    </ul>
</template>

<script lang="ts">
import Vue from "vue";
import {Component,Prop} from 'vue-property-decorator'

type dataSourceItem = {text:string,value:string}

@Component({})
export default class Tabs extends Vue {
    @Prop({required:true,type:Array}) dataSource!: {text:string,value:string}[]
    @Prop(String) readonly value! : string;
    @Prop(String) classPrefix?:string;
    select(item:dataSourceItem){
        this.$emit('update:value',item.value)
    }
}
</script>

<style lang="scss" scoped>
.tabs{
    display: flex;
    text-align: center;

    font-size: 24px;
    > li{
        width: 50%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        &.selected::after{
            content: '';
            position: absolute;
            width: 100%;
            height: 4px;
            background: #FCE300;
            bottom: 0;
            left: 0;
        }
    }
}
</style>