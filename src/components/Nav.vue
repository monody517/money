<template>
    <nav>
      <router-link to="/money" class="item" active-class="select">
      <Icon name='money'/>记账
      </router-link>
      <router-link to="/labels" class="item" active-class="select">
        <Icon name='labels'/>标签
      </router-link>
      <router-link to="/statistics" class="item" active-class="select">
        <Icon name='statistics'/>统计
      </router-link>
    </nav>
</template>

<script lang="ts">
    export default {
        name: 'Nav'
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav{
    border-top: 1px solid red;
    display: flex;
    >.item{
        padding: 2px 0;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction:column;
        .icon{
            width: 32px;
            height: 32px;
        }
    }
    > .item.select{
        color: $color-highlight;
    }
}

</style>