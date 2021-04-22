<template>
    <div class="numberPad">
        <div class="output">{{output || '0'}}</div>
        <div class="buttons">
            <button @click="inputContent">1</button>
            <button @click="inputContent">2</button>
            <button @click="inputContent">3</button>
            <button @click="remove">删除</button>
            <button @click="inputContent">4</button>            
            <button @click="inputContent">5</button>
            <button @click="inputContent">6</button>
            <button @click="clear">清空</button>
            <button @click="inputContent">7</button>
            <button @click="inputContent">8</button>
            <button @click="inputContent">9</button>
            <button @click="ok" class="ok">OK</button>
            <button @click="inputContent" class="zero">0</button>
            <button @click="inputContent">.</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator'

@Component
export default class NumberPad extends Vue{
    output: string= '0';
    inputContent(event:MouseEvent){
        const button = event.target as HTMLButtonElement
        const text = button.textContent as string
        if(this.output.length === 16){return}    
        if(this.output === '0'){
            if('0123456789'.indexOf(text)>=0){
                this.output = text
            }else{
                this.output += text
            }
            return
        }
        if(this.output.indexOf('.')>=0 && text === '.'){return}
        this.output += text
    }
    remove(){
        this.output = this.output.substring(0, this.output.length - 1);
    }
    clear(){
        this.output = ''
    }
    ok(){

    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
.numberPad{
    .output{
        @extend %clearFix;
        @extend %innerShadow;
        font-size: 36px;
        font-family: Consolas, monospace;
        padding: 5px 16px;
        text-align: right;
    }
    .buttons{
        @extend %clearFix;
        > button{
            width: 25%;
            height: 64px;
            background: transparent;
            border: none;
            border-right: 1px #d9d9d9 solid;
            border-bottom: 1px #d9d9d9 solid;
            float: left;
            &.ok{
                height: 64 * 2px;
                float: right;
                background: #FCE300;
            }
            &.zero{
                width: 25% * 2; 
            }

        }
    }
}
</style>