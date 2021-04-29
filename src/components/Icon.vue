<template>
        <svg class="icon">
          <use :xlink:href="'#' + name"/>
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
}
</script>

<style lang="scss" scoped>
.icon{
    width: 1em;
    height: 1em;
}
</style>