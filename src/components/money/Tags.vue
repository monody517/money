<template>
    <div class="tags">
        <!-- <div class="new">
            <button @click="create">新增标签</button>
        </div> -->
        <ul class="current">
            <li :class="{selected:selectedTags.indexOf(item)>=0}"
            v-for="item in dataSource" :key="item" @click="select(item)">
            {{item}}   
            <Icon :name='`${item}`'/>
            </li>
            <li class="new">
                <button @click="create">新增标签</button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator'

@Component
export default class Tags extends Vue{
    @Prop() readonly dataSource:string[] | undefined;
    selectedTags:string[] = [];
    select(tag:string){
        if(this.selectedTags.length>0){
            this.selectedTags.pop()
        }
        this.selectedTags.push(tag)
        this.$emit('update:value',this.selectedTags)
    };
    create(){
        const name = window.prompt('请输入标签名')
        if(name === ''){
            window.alert('标签名不能为空')
        }else if(this.dataSource){
                this.$emit('update:dataSource',[...this.dataSource,name]);
        }
    }
}
</script>

<style lang="scss" scoped>
.tags{
    font-size: 14px;
    padding: 16px;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    > .current{
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        height: 150px;
        overflow: auto;
        ::-webkit-scrollbar{
            width: 0;
        }
        > li{
            display: flex;
            $h:24px;;
            width:92px;
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
            &.selected{
                background: darken(#d9d9d9,50%);
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
    
}
</style>