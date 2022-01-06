class Ptrack {
  constructor(options) {
    this.options = this.validateOptions(options)
  }

  validateOptions (options = {} ) {
    return  Utils.validateOptions({
      opts: new Map([
        ['prefix', ''],
        ['meta', null],
        ['name', ''],
        ['trackerVersion', 'v1.2'],
        ['version', '1'],
        ['userKey', ''],
        ['userStore', null],
        ['scriptStore', null],
        ['scriptKey', ''],
        ['visitorKey', ''],
        ['failSilently', true]]),
      options,
      thisOptions: this.options || {}
    })
  }
  incrementScript(userVisit) {
    let value = this.getScriptReport()
    if (!value) {
      value = {
        scriptId: Utils.generateUniqueString(),
        firstVisit: userVisit.lastVisit,
        visits: 0,
        uniqueUsers: 0,
        versions: [],
        name: this.options.name,
        scriptKey: this.options.scriptKey
      }
    }

    // mark a use of the library
    value.visits++;
    value.lastVisit = userVisit.lastVisit

    // record all seen versions, plus first and last time seen
    const v = this.recordVersion({ value, userVisit })

    // this is this users first visit
    if (userVisit.visits < 2) value.uniqueUsers++;

    // this could be used to track changes in tracking model
    value.trackerVersion = userVisit.trackerVersion

    this.putToStore({ store: this.options.scriptStore, key: this.options.scriptKey, value })
    return value
  }

  recordVersion({ value, userVisit }) {
    let v = value.versions.find(f => userVisit.version === f.versionId)
    if (!v) {
      v = {
        versionId: userVisit.version,
        versionFirstVisit: userVisit.lastVisit,
        versionVisits: 0
      }
      value.versions.push(v)
    }
    v.versionLastVisit = userVisit.lastVisit
    v.versionVisits++
    return v
  }

  /**
   * get all the entries for a given user
   */
  getAllVisits() {
    // get all the proerties with this prefix
    const value = this.makeVisitor()
    const props = this.options.userStore.getProperties()
    return Object.keys(props).filter(f => f.startsWith(this.options.prefix)).map(f => JSON.parse(props[f])).filter(f => value.userId === f.userId)
  }

  /**
   * get all script usage 
   */
  getAllScriptUsage() {
    // get all the proerties with this prefix
    const props = this.options.scriptStore.getProperties()
    return Object.keys(props).filter(f => f.startsWith(this.options.prefix)).map(f => JSON.parse(props[f]))
  }
  /** 
  * make a visitor record
  */
  makeVisitor() {
    let value = this.getVisitorReport()
    const now = new Date().getTime()
    if (!value) {
      value = {
        userId: Utils.generateUniqueString(),
        firstVisit: now,
        visits: 0
      }

    }
    value.lastVisit = now
    value.visits++;
    this.putToStore({ store: this.options.userStore, key: this.options.visitorKey, value })
    return value
  }
  /**
   * update or set user store
   */
  incrementUser(visitMeta) {
    // there'll be just one of these in each user propertyStore
    // the reason it's a separate thing is so that if multiple tracking is being done in the same store
    // we can tie them together
    const visitor = this.makeVisitor()

    // this userreport is specific to the name being tracked
    // so there could be multiple per store, all tied together via the userId
    let value = this.getUserReport()
    const now = new Date().getTime()

    if (!value) {
      value = {
        userId: visitor.userId,
        visits: 0,
        firstVisit: now,
        name: this.options.name,
        userKey: this.options.userKey,
        versions: []
      }

    }
    // maybe there's a meta upgrade, otherwise leave as is
    if (this.options.meta) value.meta = this.options.meta
    value.version = this.options.version

    // deal with legacy potental missing versions array
    if (!value.versions) value.versions = []

    value.lastVisit = now
    value.visits++;

    // this could be used to track changes in tracking model
    value.trackerVersion = this.options.trackerVersion

    // always clear out the visit metadata if there's nothing this time
    value.visitMeta = visitMeta || undefined

    // record all seen versions, plus first and last time seen
    this.recordVersion({ value, userVisit: value })
    const scriptValue = this.incrementScript(value)
    value.scriptId = scriptValue.scriptId
    this.putToStore({ store: this.options.userStore, key: this.options.userKey, value })
    return value;
  }
  clearUserHistory() {
    return this.options.userStore.deleteProperty(this.options.userKey)
  }
  clearScriptHistory() {
    return this.options.scriptStore.deleteProperty(this.options.scriptKey)
  }
  getUserReport() {
    return this.getFromStore({ store: this.options.userStore, key: this.options.userKey })
  }
  getVisitorReport() {
    return this.getFromStore({ store: this.options.userStore, key: this.options.visitorKey })
  }
  getScriptReport() {
    return this.getFromStore({ store: this.options.scriptStore, key: this.options.scriptKey })
  }
  getFromStore({ store, key }) {
    return Utils.runner({
      action: () => {
        const p = store.getProperty(key)
        return p ? JSON.parse(p) : null
      },
      failSilently: this.options.failSilently
    })
  }
  putToStore({ store, key, value }) {

    return Utils.runner({
      action: () => store.setProperty(key, JSON.stringify(value)),
      failSilently: this.options.failSilently
    })
  }
}
