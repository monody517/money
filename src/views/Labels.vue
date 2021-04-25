<template>
    <Layout>
        <div class="tags">
            <router-link 
                class="tag"
                v-for="tag in tags" :key="tag.id"
                :to='`/labels/edit/${tag.id}`'
                >
                {{tag.name}}
            <Icon name='星星'/>
            </router-link>
            <div class="new" @click="createTag">
                <button>新增标签</button>
                <Icon name='添加'/>
            </div>
        </div>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import tagListModel from '@/model/tagListModel'



@Component
export default class Labels extends Vue{
    tags = tagListModel.data
    createTag(){
        const name = window.prompt('请输入标签名')
        if(name){
            const x = tagListModel.create(name)
            if(x === 'duplicated'){
                alert('输入了重复的标签名')
            }
        }
    }
    created(){
        tagListModel.fetch()
    }
}
</script>

<style lang="scss" scoped>
.tags{
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    > .tag, .new{
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
        button{
            background: transparent;
            border: none;
            padding: 0 4px;
            }
        }
}
</style>