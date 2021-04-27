import clone from '@/lib/clone'

const localStorageKeyName = 'recordList';
const recordListModel = {
    data:[] as RecordItem[],
    create(record:RecordItem){
        const record2:RecordItem = clone(record)
    },
    fetch(){
        return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]'
        ) as RecordItem[];
    },
    save(data:RecordItem[]){
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
    },
};

export default recordListModel