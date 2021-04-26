<template>
    <div class="tags">

        <ul class="current" v-if="tagsType === '-'">

            <li :class="{selected:selectedTags.indexOf(item)>=0}"
            v-for="item in payData" :key="item.id" @click="select(item)">
            {{item}}   
            <Icon :name='`${item.name}`'/>
            </li>
            <div @click="management">
                <Button button-name="标签管理" icon-name="添加"/>
            </div>
            
        </ul>
        <!-- <ul class="current" v-if="tagsType === '+'">
            <li :class="{selected:selectedTags.indexOf(item)>=0}"
            v-for="item in incomeData" :key="item" @click="select(item)">
            {{item}}
            <Icon :name='`${item}`'/>
            </li>
            <div @click="create2">
                <Button button-name="新增标签" icon-name="添加"/>
            </div>
        </ul> -->
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator'
import Button from '@/components/Button.vue'

@Component({components:{Button}})
export default class Tags extends Vue{
    @Prop() readonly payData:string[] | undefined;
    @Prop() readonly tagsType:string[] | undefined;
    @Prop() readonly incomeData:string[] | undefined;

    selectedTags:string[] = [];
    select(tag:string){
        if(this.selectedTags.length>0){
            this.selectedTags.pop()
        }
        this.selectedTags.push(tag)
        this.$emit('update:value',this.selectedTags)
    }

    management(){
        this.$router.push('/labels')
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