<template>
    <div>
        <label class="notes">
            <span>{{fieldName}}</span>
            <input type="text" :placeholder='placeholder'
            :value="value" @input="onValueChange($event.target.value)" 
            >
        </label>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component,Watch,Prop} from 'vue-property-decorator'

@Component
export default class Notes extends Vue{
    @Prop({default:''}) readonly value!: string;
    @Prop({required:true}) fieldName!:string
    @Prop() placeholder?:string
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