import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/createdId';

Vue.use(Vuex)

type rootState = {
  recordList: RecordItem[],
  tagList:Tag[],
  currentTag?:Tag
}

const localStorageKeyName = 'recordList';
const store = new Vuex.Store({
  state: {
    recordList:[],
    tagList:[],
    currentTag:undefined
  } as rootState,
  mutations:{
    fetchRecords(state){
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    }, 
    createRecord(state, record) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date().toISOString(); 
      state.recordList?.push(record2);
      store.commit('saveRecords'); 
    },
    saveRecords(state){
      window.localStorage.setItem(localStorageKeyName, JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if(state.tagList.length === 0){
        store.commit('createTag','餐饮')
        store.commit('createTag','购物')
        store.commit('createTag','家居')
        store.commit('createTag','水果')
        store.commit('createTag','学习')
        store.commit('createTag','房租')  
      }
    },
    findTag(state,id: string) {
      return state.tagList.filter(t => t.id === id)[0];
    },
    createTag(state,name: string) {
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复了');
      }
      const id = createId().toString();
      state.tagList.push({id, name: name});
      store.commit('saveTags');
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    setCurrentTag(state,id:string){
      
      state.currentTag = state.tagList.filter(t=>t.id === id)[0]
    },
    updateTag(state,object:{id: string, name: string}) {
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(object.id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(object.name) >= 0) {
          window.alert('标签名重复了')
        } else {
          const tag = state.tagList.filter(item => item.id === object.id)[0];
          tag.name = object.name;
          store.commit('saveTags');
        }
      }
    },
    removeTag(state,id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      state.tagList.splice(index, 1);
      store.commit('saveTags');
    },
  }
})



export default store