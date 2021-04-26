<template>
    <div class="tags">

        <ul class="current" v-if="tagsType === '-'">

            <li :class="{selected:selectedTags.indexOf(item)>=0}"
            v-for="item in dataSource" :key="item.id" @click="select(item)">
            {{item}}   
            <Icon :name='`${item}`'/>
            </li>
            <li :class="{selected:selectedTags.indexOf(item)>=0}" 
                v-for="item in newData" :key="item" @click="select(item)">
                {{item}}
                <Icon name='星星'/>
            </li>
            <div @click="create">
                <Button button-name="新增标签" icon-name="添加"/>
            </div>
            
        </ul>
        <ul class="current" v-if="tagsType === '+'">
            <li :class="{selected:selectedTags.indexOf(item)>=0}"
            v-for="item in dataSource3" :key="item" @click="select(item)">
            {{item}}   
            <Icon :name='`${item}`'/>
            </li>
            <li :class="{selected:selectedTags.indexOf(item)>=0}" 
                v-for="item in newData2" :key="item" @click="select(item)">
                {{item}}
                <Icon name='星星'/>
            </li>
            <div @click="create2">
                <Button button-name="新增标签" icon-name="添加"/>
            </div>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator'
import Button from '@/components/Button.vue'

@Component({components:{Button}})
export default class Tags extends Vue{
    @Prop() readonly dataSource:string[] | undefined;
    @Prop() readonly tagsType:string[] | undefined;
    @Prop() readonly dataSource3:string[] | undefined;
    @Prop() readonly newData:string[] | undefined;
    @Prop() readonly newData2:string[] | undefined;

    selectedTags:string[] = [];
    select(tag:string){
        if(this.selectedTags.length>0){
            this.selectedTags.pop()
        }
        this.selectedTags.push(tag)
        this.$emit('update:value',this.selectedTags)
    }

    create(){
        const name = window.prompt('请输入标签名')
        if(name === ''){
            window.alert('标签名不能为空')

        }else if(name === null){
            return
        }
        else if(this.newData){
            this.$emit('update:newData',[...this.newData,name]);
        }
    }
    create2(){
        const name = window.prompt('请输入标签名')
        if(name === ''){
            window.alert('标签名不能为空')
        }else if(name === null){
            return
        }
        else if(this.newData2){
            this.$emit('update:newData2',[...this.newData2,name]);

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

        > li{
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

            &.selected{
                background: darken(#d9d9d9,50%);
            }
        }
        > .new{
            > button{
                background: transparent;
                border: none;
                padding: 0 4px;
            }
        }
    }
    
}
</style>