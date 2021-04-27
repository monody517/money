type RecordItem = {
    tags:string[];
    incomeTags:string[];
    type:string;
    notes:string;
    amount:number
    createdAt?: Date
}
type tag = {
    id:string;
    name:string
}
type TagListModel = {
    data:tag[];
    fetch:()=>tag[];
    create:(name:string)=>string;
    update:(id:string,name:string)=> 'success' | 'not found' | 'duplicated'
    remove:(id:string)=> boolean
    save:()=>void
}

  interface Window{
    tagList:tag[]
  }

