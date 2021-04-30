<template>
    <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
        <div class="content" :class="classPrefix && `${classPrefix}-content`">
            <slot/>
        </div>
        <Nav/>
    </div>
</template>

<script>
    export default {
        name:'Layout',
        props:['classPrefix']
    }
</script>

<style lang="scss" scoped>
.layout-wrapper{
    display: flex;
    min-height: 100vh;
    flex-direction: column;
}
.content{
    flex-grow: 1;
    overflow: auto;
    background: #f7f7f7;
}
</style>