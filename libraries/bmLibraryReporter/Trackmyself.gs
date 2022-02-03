// tracking usage of library snippet
var Trackmyself = ((basicOptions) => {

  const track = bmLibraryTracking.Track

  const getTrackingOptions = (options = {}) => {

    try {
      return {
        ...basicOptions,
        userStore: PropertiesService.getUserProperties(),
        scriptStore: PropertiesService.getScriptProperties(),
        ...options
      }
    }
    catch (err) {
      if (basicOptions.failSilently) return {}
      throw new Error(err)
    }
  }

  // optionally record usage of this script
  // this could generate a bunch of traffic you are not interested in
  // if you have a lof of libraries aggregating
  // however it will allow you to track unique users across all your libraries
  // track.stamp(trackingOptions)

  // so we can get reports to report on other scripts
  return {
    exportUsage: (options = {}) => track.scriptReport(getTrackingOptions(options)),
    currentUserUsage: (options = {}) => track.userReport(getTrackingOptions(options)),
    getAllVisits: () => track.getAllVisits(getTrackingOptions()),
    // this can be used to centralize trackin of other libraries
    stamp: (options = {}) => track.stamp(getTrackingOptions(options)),
    // danger: just for testing only - clear out all stores
    deleteAllProperties: () => {
      trackingOptions.userStore.deleteAllProperties()
      trackingOptions.scriptStore.deleteAllProperties()
    },
    getAllScriptUsage: () => track.getAllScriptUsage(getTrackingOptions()),
    getVisitorReport: () => track.getVisitorReport(getTrackingOptions())
  }

})({
  name: 'bmLibraryReporter',
  version: '13',
  failSilently: true,
  singleStamp: true
})