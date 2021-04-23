<template>
    <div>
        <label class="notes">
            <span>备注</span>
            <input type="text" placeholder="在这里输入备注"
            v-model="value" 
            >
        </label>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component,Watch} from 'vue-property-decorator'

@Component
export default class Notes extends Vue{
    value:string ='';
    @Watch('value')
    onValueChange(value:string,){
        this.$emit('update:value',value)
    }
}

</script>

<style lang="scss" scoped>
.notes{
    font-size: 14px;
    background: #f5f5f5;
    padding-left: 16px;
    display: flex;
    align-items: center;
    > span{
        padding-right: 16px;
    }
    > input{
        height: 54px;
        flex-grow: 1;
        border: none;
        background: transparent;
    }
}
</style>