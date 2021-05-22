<template>
    <div>
        <label class="notes">
            <span>{{fieldName}}</span>
            <template v-if="type === 'datetime-local'">
                <input :type="type || 'text'" :placeholder='placeholder'
                :value="x(value)" @input="onValueChange($event.target.value)" 
                >
            </template>
            <template v-else>
                <input :type="type || 'text'" :placeholder='placeholder'
                :value="value" @input="onValueChange($event.target.value)" 
                >
            </template>
        </label>
    </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import Vue from 'vue'
import {Component,Watch,Prop} from 'vue-property-decorator'

@Component
export default class Notes extends Vue{
    @Prop({default:''}) readonly value!: string;
    @Prop({required:true}) fieldName!:string
    @Prop() placeholder?:string
    @Prop() type?:string
    onValueChange(value:string){
        this.$emit('update:value',value)
    }
    x(isoString:string){
       return dayjs(isoString).format("YYYY-MM-DDTHH:mm:ss")  
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
            height: 50px;
            flex-grow: 1;
            border: none;
            background: transparent;
        }
    }
</style>
