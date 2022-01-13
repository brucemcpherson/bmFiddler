// tracking usage of library snippet to a centralized store
var Trackmyself = ((trackingOptions) => {
  const track  = bmLibraryReporter.Trackmyself
  
  // this will record usage in central library store
  track.stamp(trackingOptions)

  // so we can get reports 
  return {
    exportUsage: (options = {}) => track.scriptReport({...trackingOptions,...options}),
    currentUserUsage: (options = {}) => track.userReport({...trackingOptions,...options})
  }
  
})({
  name: 'bmFiddler',
  version: '20',
  failSilently: false
})

