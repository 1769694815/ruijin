import IndexDBWrapper from 'indexdbwrapper'

export default {
  indexedDB: new IndexDBWrapper('ruijin', 1, {
    onupgradeneeded: e => {
      const db = e.target.result
      const objStore = db.createObjectStore('user', {
        autoIncrement: true,
        keyPath: 'id'
      })
      objStore.createIndex('id', 'id', { unique: true })
      objStore.createIndex('idCard', 'idCard', { unique: true })
      objStore.createIndex('name', 'name', { unique: !1 })
      objStore.createIndex('iconographyNum', 'iconographyNum', { unique: !1 })
      objStore.createIndex('phone', 'phone', { unique: !1 })
      objStore.createIndex('birthday', 'birthday', { unique: !1 })
      objStore.createIndex('age', 'age', { unique: !1 })
      objStore.createIndex('category', 'category', { unique: !1 })
      objStore.createIndex('followUpRecords', 'followUpRecords', { multiEntry: true })
      objStore.createIndex('lastRecordsTime', 'lastRecordsTime', { unique: !1 })
      objStore.createIndex('nextRecordsTime', 'nextRecordsTime', { unique: !1 })
      objStore.createIndex('note', 'note', { unique: !1 })
    }
  }),
  openDB: function () {
    this.indexedDB.openDB()
  }
}
