
import clone from '@/lib/clone'

const localStorageKeyName = 'recordList';
let data:RecordItem[] | undefined = undefined

function fetch() {
    data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return data;
}

function create(record: RecordItem) {
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date();
    if(data){
        data.push(record2);
        save();
    }
}
function save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
}


const recordStore={
    fetch:fetch,
    save:save,
    recordList: fetch(),
    createRecord: (record:RecordItem) => {create(record)},
}
export default recordStore