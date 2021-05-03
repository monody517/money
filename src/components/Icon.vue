<template>
        <svg class="icon">
          <use :xlink:href="'#' + findTagName(name)"/>
        </svg>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator'
  let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
  try {importAll(require.context('../assets/icons', true, /\.svg$/));} catch (error) {console.log(error);}
@Component
export default class Icon extends Vue {
  @Prop(String) name!:String
  existTags = ['left','添加','labels','money','statistics','餐饮','购物','家居','水果','学习','房租','工资','兼职','理财','礼金'];
  findTagName(name:string){
    if(this.existTags.indexOf(name)>=0){
      return name
    }else{
      return '星星'
    }
  }

}
</script>

<style lang="scss" scoped>
.icon{
    width: 1em;
    height: 1em;
}
</style>