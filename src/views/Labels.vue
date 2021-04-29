<template>
    <Layout>
        <div class="tags">
            <router-link 
                class="tag"
                v-for="tag in taglist" :key="tag.id"
                :to='`/labels/edit/${tag.id}`'
                >
                <span>{{tag.name}}</span>
            <Icon name='星星'/>
            </router-link>
            <div @click="createTag">
                <Button button-name="新增标签" icon-name="添加"/>
            </div>
        </div>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import Button from '@/components/Button.vue'



@Component({
    components:{Button},
    computed:{
        taglist(){
        return this.$store.state.tagList
        }
    }
})
export default class Labels extends Vue{
    created() {
      this.$store.commit('fetchTags')
    }
    createTag(){
        const name = window.prompt('请输入标签名')
        if(name){
            this.$store.commit('createTag',name)
        }
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