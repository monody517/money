import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/createdId';

Vue.use(Vuex)

const localStorageKeyName = 'recordList';
const store = new Vuex.Store({
  state: {
    recordList:[] as RecordItem[],
    tagList:[] as Tag[]
  },
  mutations:{
    fetchRecords(state){
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    }, 
    createRecord(state, record) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date();
          state.recordList?.push(record2);
          store.commit('saveRecords');      
    },
    saveRecords(state){
      window.localStorage.setItem(localStorageKeyName, JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    },
    findTag(state,id: string) {
      return state.tagList.filter(t => t.id === id)[0];
    },
    createTag(state,name: string) {
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复了');
        return 'duplicated';
      }
      const id = createId().toString();
      state.tagList.push({id, name: name});
      store.commit('saveTags');
      window.alert('添加成功');
      return 'success';
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
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
      return true;
    },
  }
})



export default store