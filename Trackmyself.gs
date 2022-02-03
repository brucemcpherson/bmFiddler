// tracking usage of library snippet to a centralized store
var Trackmyself = ((trackingOptions) => {
  const track  = bmLibraryReporter.Trackmyself
  
  // so we can get reports 
  return {
    exportUsage: (options = {}) => track.exportUsage({...trackingOptions,...options}),
    currentUserUsage: (options = {}) => track.currentUserUsage({...trackingOptions,...options}),
    stamp: ()=>track.stamp(trackingOptions)
  }
  
})({
  name: 'bmFiddler',
  version: '25',
  failSilently: true,
  singleStamp: true
})

