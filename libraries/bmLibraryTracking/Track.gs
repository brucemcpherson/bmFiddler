var Track = (() => {
  // get a tracker instance
  const getTracker = ({failSilently = true, name = 'track', version = '1', trackerVersion , userStore, scriptStore, prefix ='ptrack_', meta}) => {
    const key = `${prefix}${name}`
    return new Ptrack({
      userKey: key,
      scriptKey: key,
      userStore,
      scriptStore,
      version,
      trackerVersion,
      name,
      failSilently,
      meta
    })
  }

  return {
    stamp: (options, visitMeta) => getTracker (options).incrementUser (visitMeta),
    scriptReport: (options) => getTracker (options).getScriptReport(),
    userReport: (options) => getTracker (options).getUserReport(),
    clearUserHistory :(options) => getTracker (options).clearUserHistory(),
    clearScriptHistory :(options) => getTracker (options).clearScriptHistory()
  }
})()
