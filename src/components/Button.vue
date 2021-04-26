<template>
    <div class="new">
        <button><span>{{ButtonName}}</span></button>
        <Icon :name= '`${IconName}`' />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator'

@Component
export default class Button extends Vue{
    @Prop({required:true}) ButtonName!:string
    @Prop({required:true}) IconName!:string
}
</script>

<style lang="scss" scoped>
.new{
    display: flex;
    $h:24px;
    width:92px;
    height: 46px;
    border-radius: $h/2;
    margin-right: 20px;
    margin-top: 4px;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    border: 1px solid #c9c9c9;
    .icon{
        width: 50px;
        height: 25px;   
        }
    button{
        background: transparent;
        border: none;
        padding: 0 4px;
    }
}
</style>