import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/createdId';
import dayjs from 'dayjs'

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
      record2.createdAt = record2.createdAt || dayjs(new Date()).format('YYYY-MM-DD')
      console.log(record2.createdAt);
      
      state.recordList?.push(record2);
      store.commit('saveRecords');
    },
    saveRecords(state){
      window.localStorage.setItem(localStorageKeyName, JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if(state.tagList.length === 0){
        store.commit('createTag',{name:'餐饮',type:'-'})
        store.commit('createTag',{name:'购物',type:'-'})
        store.commit('createTag',{name:'家居',type:'-'})
        store.commit('createTag',{name:'水果',type:'-'})
        store.commit('createTag',{name:'学习',type:'-'})
        store.commit('createTag',{name:'房租',type:'-'})
        store.commit('createTag',{name:'工资',type:'+'})
        store.commit('createTag',{name:'兼职',type:'+'})
        store.commit('createTag',{name:'礼金',type:'+'})
        store.commit('createTag',{name:'理财',type:'+'})
      }
    },
    findTag(state,id: string) {
      return state.tagList.filter(t => t.id === id)[0];
    },
    createTag(state,object:{name: string,type:string}) {
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(object.name) >= 0) {
        window.alert('标签名重复了');
      }
      const id = createId().toString();
      state.tagList.push({id, name: object.name,type:object.type});
      console.log(state.tagList);
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