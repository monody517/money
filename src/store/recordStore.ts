
import clone from '@/lib/clone'

const localStorageKeyName = 'recordList';
let recordList:RecordItem[] | undefined = undefined

const recordStore={
    fetchRecords(){
        recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        return recordList;
    }, 
    saveRecords(){
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(recordList));
    },
    recordList: recordList,
    createRecord(record: RecordItem) {
        const record2: RecordItem = clone(record);
        record2.createdAt = new Date();
            recordList?.push(record2);
            recordStore.saveRecords();

    }
}
recordStore.fetchRecords()
export default recordStore