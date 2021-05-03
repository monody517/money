<template>
    <nav>
      <router-link to="/money" class="item" @click="selected" active-class="select">
      <Icon name='money1'/>记账
      </router-link>
      <router-link to="/labels" class="item" active-class="select">
        <Icon name='labels1'/>标签
      </router-link>
      <router-link to="/statistics" class="item" active-class="select">
        <Icon name='statistics1'/>统计
      </router-link>
    </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
@Component
export default class Nav extends Vue {
    selected(){
        let number = 1
        if(number === 1){
            number = 2
        }else if(number === 2){
            number = 1
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav{
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
        color:#fbaa00;
    }
}

</style>