<template>
    <div>
        <ul class="types">
            <li :class="value === '-' && 'selected'" @click="selectedType('-')">支出</li>
            <li :class="value === '+' && 'selected'" @click="selectedType('+')">收入</li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator'

@Component
export default class Types extends Vue{
    @Prop() readonly value! : string;
    selectedType(type:string){
        if(type !== '-' && type !== '+'){
            throw new Error('unknow type')
        }
        this.$emit('update:value',type)
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
<<<<<<< HEAD
        height: 54px;
=======
        height: 50px;
>>>>>>> master
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