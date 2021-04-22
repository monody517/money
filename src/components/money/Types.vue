<template>
    <div>
        <ul class="types">
            <li :class="type === '-' && 'selected'" @click="selectedType('-')">支出</li>
            <li :class="type === '+' && 'selected'" @click="selectedType('+')">收入</li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator'

@Component
export default class Types extends Vue{
    type = '-'
    @Prop(Number) propA:number | undefined;
    selectedType(type:string){
                if(type !== '-' && type !== '+'){
                    throw new Error('unknow type')
                }
                this.type = type
            }
}
</script>

<style lang="scss" scoped>
.types{
    background: #c4c4c4;
    display: flex;
    text-align: center;

    font-size: 24px;
    > li{
        width: 50%;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        &.selected::after{
            content: '';
            position: absolute;
            width: 100%;
            height: 4px;
            background: #444;
            bottom: 0;
            left: 0;
        }
    }
}
</style>