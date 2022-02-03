var Track = (() => {
  const ewrap = (f) => f()

  // get a tracker instance
  const getTracker = ({ failSilently = false, name = 'track', version = '1', trackerVersion, userStore, scriptStore, prefix = 'ptrack_', meta }) => {
    try {
      const key = `${prefix}${name}`
      const visitorKey = `visitor_${prefix}`
      const track =  new Ptrack({
        userKey: key,
        scriptKey: key,
        visitorKey,
        userStore,
        scriptStore,
        version,
        trackerVersion,
        name,
        failSilently,
        meta,
        prefix
      })
    
      return track
    }
    catch (err) {
      console.log(err)
      if (failSilently) return null
      throw new Error(err)
    }

  }

  return {
    stamp: (options, visitMeta) => ewrap(() => getTracker(options).incrementUser(visitMeta)),
    scriptReport: (options) => ewrap(() => getTracker(options).getScriptReport()),
    userReport: (options) => ewrap(() => getTracker(options).getUserReport()),
    clearUserHistory: (options) => ewrap(() => getTracker(options).clearUserHistory()),
    clearScriptHistory: (options) => ewrap(() => getTracker(options).clearScriptHistory()),
    getAllVisits: (options) => ewrap(() => getTracker(options).getAllVisits()),
    getVisitorReport: (options) => ewrap(() => getTracker(options).getVisitorReport()),
    getAllScriptUsage: (options) => ewrap(() => getTracker(options).getAllScriptUsage())
  }
})()
