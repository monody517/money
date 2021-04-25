const localStorageKeyName = 'tagList';
type Tag = {
    id:string;
    name:string
}
type TagListModel = {
    data:Tag[];
    fetch:()=>string[];
    create:(name:string)=>string;
    save:()=>void
}
const tagListModel:TagListModel = {
    data:[],
    fetch(){
        return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    },
    save(){
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
    create(name:string){
        const names = this.data.map(item => item.name)
        if(names.indexOf(name)>=0){return 'duplicated'}
        this.data.push({id:name,name:name})
        this.save()
        return 'success'
    }
};

export default tagListModel