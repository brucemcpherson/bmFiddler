// tracking usage of library snippet
// just enter the name of the library and the version in the arguments
var Trackmyself = ((options) => {
  const track = bmLibraryTracking.Track

  const trackingOptions = {
    ...options,
    userStore: PropertiesService.getUserProperties(),
    scriptStore: PropertiesService.getScriptProperties()
  }
  track.stamp(trackingOptions)

  // so we can get reports 
  return {
    exportUsage: (options = {}) => track.scriptReport({...trackingOptions,...options}),
    currentUserUsage: (options = {}) => track.userReport({...trackingOptions, ...options})
  }
  
})({
  name: 'bmFiddler',
  version: '8'
})

