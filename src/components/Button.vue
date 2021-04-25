<template>
    <div class="new">
        <button>新增标签</button>
        <Icon name='添加'/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component
export default class Button extends Vue{

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