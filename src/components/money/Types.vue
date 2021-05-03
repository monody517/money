<template>
    <div>
        <ul class="types">
            <li :class="{[classPrefix+'-item']:classPrefix,selected: value === '-'}" 
            @click="selectedType('-')">支出</li>
            <li :class="{[classPrefix+'-item']:classPrefix,selected: value === '+'}"
            @click="selectedType('+')">收入</li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator'

type dataSourceItem = {text:string,value:string}

@Component
export default class Types extends Vue{
    @Prop(String) readonly value! : string;
    @Prop(String) classPrefix?:string;
    selectedType(item:dataSourceItem){
        if(item.text !== '-' && item.text !== '+'){
            throw new Error('unknow type')
        }
        this.$emit('update:value',item.text)
    }
            

}
</script>

<style lang="scss" scoped>
.types{
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
            background: #fbaa00;
            bottom: 0;
            left: 0;
        }
    }
}
</style>