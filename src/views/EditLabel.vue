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
        placeholder="在这里输入标签名"/>
        <Button class="delect" button-name="删除标签" icon-name="删除"/>
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
    created(){
        tagListModel.fetch()
        const id = this.$route.params.id
        const tags = tagListModel.data
        const tag = tags.filter(t=>t.id === id)[0]
        if(tag){
            console.log(tag);
        }else{
            this.$router.replace('/404')
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