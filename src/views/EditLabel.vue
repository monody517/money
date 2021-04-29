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
import Notes from '@/components/money/Notes.vue'
import Button from '@/components/Button.vue'


@Component({
    components: { Notes,Button }
})
export default class EditLabel extends Vue{
    get tag(){
        return this.$store.state.currentTag
    }
    created(){
        this.$store.commit('fetchTags')
        const id = this.$route.params.id
        this.$store.commit('setCurrentTag',id)
        if(!this.tag){
            this.$router.replace('/404')
        }
    }
    updateTag(name:string) {
        if(this.tag){    
            this.$store.commit('updateTag',{id:this.tag.id,name})
        }
    }
    remove(){
        if(this.tag){
            this.$store.commit('removeTag',this.tag.id)
            this.$router.back()
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