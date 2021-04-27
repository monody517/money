import createdId from '@/lib/createdId';

const localStorageKeyName = 'tagList';
let data:Tag[]
type Tag = {
    id:string;
    name:string
}

function fetch(){
  data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
  return data;
}
function create(name:string){
  const names = data.map(item => item.name)
  if(names.indexOf(name)>=0){return 'duplicated'}
  const id = createdId().toString()
  data.push({id,name:name})
  save()
  return 'success'
}

function update(id:string,name:string){
  const idList = data.map(item=>item.id)
  if(idList.indexOf(id)>=0){
      const names = data.map(item=>item.name)
      if(names.indexOf(name)>=0){
          return 'duplicated'
      }else{
          const tag = data.filter(item=> item.id === id)[0]
          tag.name = name
          save()
          return 'success'
      }
  }else{
      return 'not found'
  }
}

function remove(id:string){
  let index=-1
  for(let i = 0;i<data.length;i++){
      if(data[i].id === id){
          index = i
          break
      }   
  }
  data.splice(index,1)
  save() 
  return true
}

function save(){
  window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
}

const tagStore={
  fetch:fetch,
  create:create,
  update:update,
  remove:remove,
  save:save,
    tagList: fetch(),
    createTag: (name:string) => {
      const message = create(name)
        if(message === 'duplicated'){
          alert('输入了重复的标签名')
        }else if (message === 'success') {
          window.alert('添加成功');
        }
    },
    removeTag: (id:string) => {
      if(remove(id)){
        return true
      }else{
        return false
      }
    },
    upDateTag: (id:string,name:string) => {
      return update(id,name)
    }
  }

  export default tagStore