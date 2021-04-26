<template>
    <Layout class="body">
        <div class="nav">
            <router-link to='/labels'>
                <icon name="left"/>
                <span>编辑标签</span>
            </router-link>
        </div>
        <Notes
        field-name="标签名"
        placeholder="在这里输入标签名"
        @update:value="updateTag"
        :value="tag.name"/>
        <div @click="remove">
            <Button class="delect" button-name="删除标签" icon-name="删除"/>
        </div>
        
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import tagListModel from '@/model/tagListModel'
import Notes from '@/components/money/Notes.vue'
import Button from '@/components/Button.vue'

@Component({
    components: { Notes,Button }
})
export default class EditLabel extends Vue{
    tag?:{id:string,name:string} = undefined
    created(){
        tagListModel.fetch()
        const id = this.$route.params.id
        const tags = tagListModel.data
        const tag = tags.filter(t=>t.id === id)[0]
        this.tag = tag
    }
    updateTag(name:string) {
        if(this.tag){
            tagListModel.update(this.tag.id,name)
        } 
    }
    remove(){
        if(this.tag){
            if(tagListModel.remove(this.tag.id)){
                tagListModel.remove(this.tag.id)
                this.$router.back()
            }
        }
        
    }
}
</script>

<style lang="scss" scoped>
.nav{
    padding: 10px 0;
}
span{
    position: relative;
    left: 45%;
    margin-left: -32px;
}
.delect{
    position: relative;
    left: 50%;
    margin-left: -46px;
    top: 430px;
    }


</style>