<template>
    <Layout  class-prefix="layout">
        <div class="createdTag" @click="createTag">
            <span>新增标签</span>
        </div> 
        <div class="tags">
            <router-link
                class="tag"
                v-for="tag in newTagList" :key="tag.id"
                :to='`/labels/edit/${tag.id}`'
                >
                <span>{{tag.name}}</span>
            <Icon :name='tag.name'/>
            </router-link>
        </div>
        <Tabs :data-source='typeList' :value.sync="record.type"/>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Tags from '@/components/money/Tags.vue'
import {Component} from 'vue-property-decorator'
import Button from '@/components/Button.vue'
import typeList from '@/consts/typeList'
import Tabs from '@/components/Tabs.vue'
import clone from '@/lib/clone'

@Component({
    components:{Button,Tabs,Tags},
    computed:{
        taglist(){
        return this.$store.state.tagList
        }
    }
})
export default class Labels extends Vue{ 
    typeList = typeList
    record: RecordItem = {
        tags:[],incomeTags:[], notes: '', type: '-', amount: 0
    };
    created() {
        this.$store.commit('fetchTags')
        this.tags = this.$store.state.tagList
    }
    tags = this.$store.state.tagList
    get newTagList(){
        const {tags} = this
        const result = clone(tags).filter((t:Tag)=>(t.type === this.record.type))
        return result
    }
    createTag(){
        const name = window.prompt('请输入标签名')
        if(name){
            this.$store.commit('createTag',{name:name,type:this.record.type})
        }
        
    }   
}
</script>

<style lang="scss" scoped>
.layout-content{
    display: flex;

    .tags{
        display: flex;
        margin-left: 23px;
        flex-wrap: wrap;
        overflow: hidden;
        flex-grow: 1;
        > .tag{
            display: flex;
            $h:24px;
            width:92px;
            height: 46px;
            border-radius: $h/2;
            margin-right: 20px;
            margin-top: 10px;
            flex-direction: column-reverse;
            justify-content: center;
            align-items: center;
            border: 1px solid #c9c9c9;
            .icon{
                width: 50px;
                height: 25px;   
                }  
        }
    }
    .createdTag{
        display: flex;
        background: #FCE300;
        padding: 15px 0;
        
        span{
            color: white;
            position: relative;
            left: 50%;
            margin-left: -32px;
        }
    }
}

</style>