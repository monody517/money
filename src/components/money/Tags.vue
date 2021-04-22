<template>
    <div class="tags">
        <div class="new">
            <button>新增标签</button>
        </div>
        <ul class="current">
            <li :class="{selected:selectedTags.indexOf(item)>=0}"
            v-for="item in dataSource" :key="item" @click="select(item)">{{item}}</li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator'

@Component
export default class Tags extends Vue{
    @Prop() dataSource:string[] | undefined;
    selectedTags:string[] = [];
    select(tag:string){
        if(this.selectedTags.length>0){
            this.selectedTags.pop()
        }
        this.selectedTags.push(tag)
    }
}
</script>

<style lang="scss" scoped>
.tags{
    font-size: 14px;
    padding: 16px;
    display: flex;
    flex-grow: 1;
    flex-direction: column-reverse;
    > .current{
        display: flex;
        flex-wrap: wrap;
        overflow: auto;
        > li{
            $h:24px;
            height: $h;
            line-height: $h;
            border-radius: $h/2;
            padding: 0 16px;
            margin-right: 16px;
            margin-top: 4px;
            background: #d9d9d9;
            &.selected{
                background: darken(#d9d9d9,50%);
            }
        }
    }
    > .new{
        padding-top: 16px;
        > button{
            background: transparent;
            border: none;
            border-bottom: 1px black solid;
            color: #999;
            padding: 0 4px;
        }
    }
}
</style>