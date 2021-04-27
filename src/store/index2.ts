import tagListModel from '@/model/tagListModel'
import recordListModel from '@/model/recordListModel'

const store={
    //在window上添加recordModel
    recordList: recordListModel.fetch(),
    createRecord: (record:RecordItem) => {recordListModel.create(record)},
  
    //在window上添加tagModel
    tagList: tagListModel.fetch(),
    createTag: (name:string) => {
      const message = tagListModel.create(name)
        if(message === 'duplicated'){
          alert('输入了重复的标签名')
        }else if (message === 'success') {
          window.alert('添加成功');
        }
    },
    removeTag: (id:string) => {
      if(tagListModel.remove(id)){
        return true
      }else{
        return false
      }
    },
    upDateTag: (id:string,name:string) => {
      return tagListModel.update(id,name)
    }
  }

  export default store