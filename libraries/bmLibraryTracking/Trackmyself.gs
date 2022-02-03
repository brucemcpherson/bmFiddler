// tracking usage of library snippet
var Trackmyself = ((basicOptions) => {

  const track = Track

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
    stamp: (options = {}) => track.stamp(getTrackingOptions(options)),
    getAllScriptUsage: () => track.getAllScriptUsage(getTrackingOptions()),
    getVisitorReport: () => track.getVisitorReport(getTrackingOptions())
  }

})({
  name: 'bmLibraryTracking',
  version: '7',
  failSilently: true,
  singleStamp: true
})