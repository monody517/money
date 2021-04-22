<template>
    <Layout class-prefix="layout">  
        <number-pad/>
        <notes/>
        <types/>
        <tags :data-source="tags"/>
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
            tags:['衣','食','住','行']
        }
    }
}
</script>

<style lang="scss">
    .layout-content{
        border: 1px solid red;
        display: flex;
        flex-direction: column-reverse;
    }
</style>

<style lang="scss" scoped>





</style>