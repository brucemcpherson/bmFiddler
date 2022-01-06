// tracking usage of library snippet
var Trackmyself = ((options) => {
  const track = bmLibraryTracking.Track

  const trackingOptions = {
    ...options,
    userStore: PropertiesService.getUserProperties(),
    scriptStore: PropertiesService.getScriptProperties()
  }

  // optionally record usage of this script
  // this could generate a bunch of traffic you are not interested in
  // if you have a lof of libraries aggregating
  // however it will allow you to track unique users across all your libraries
  // track.stamp(trackingOptions)

  // so we can get reports to report on other scripts
  return {
    exportUsage: (options = {}) => track.scriptReport({...trackingOptions,...options}),
    currentUserUsage: (options = {}) => track.userReport({...trackingOptions, ...options}),
    getAllVisits: () => track.getAllVisits(trackingOptions),
    // this can be used to centralize trackin of other libraries
    stamp: (options = {}) => track.stamp({...trackingOptions, ...options}),
    // danger: just for testing only - clear out all stores
    deleteAllProperties: () => {
      trackingOptions.userStore.deleteAllProperties()
      trackingOptions.scriptStore.deleteAllProperties()
    },
    getAllScriptUsage: ()=> track.getAllScriptUsage(trackingOptions),
    getVisitorReport: ()=>track.getVisitorReport(trackingOptions)
  }
  
})({
  name: 'bmLibraryReporter',
  version: '8',
  failSilently: false
})