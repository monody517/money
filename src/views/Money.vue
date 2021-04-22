<template>
    <Layout class-prefix="layout">  
        <number-pad/>
        <notes/> 
        <tags :data-source.sync="tags"/>
        <types/>
    </Layout>
</template>

<script>
import NumberPad from '@/components/money/NumberPad.vue'
import Notes from '@/components/money/Notes.vue'
import Tags from '@/components/money/Tags.vue'
import Types from '@/components/money/Types.vue'

export default {
    components: { NumberPad, Notes, Tags, Types },
    name: 'Money',
    data(){
        return{
            tags:['餐饮','购物','家居','水果','学习','房租']
        }
    }
}
</script>

<style lang="scss">
    .layout-content{
        display: flex;
        flex-direction: column-reverse;
    }
</style>

<style lang="scss" scoped>





</style>