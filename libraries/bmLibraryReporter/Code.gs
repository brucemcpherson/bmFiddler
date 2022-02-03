function myFunction() {
  // Trackmyself.deleteAllProperties()
  Trackmyself.stamp({})
  console.log(JSON.stringify(Trackmyself.getAllVisits()))
  console.log(JSON.stringify(Trackmyself.getAllScriptUsage()))

  console.log(Trackmyself.exportUsage())
  console.log(Trackmyself.currentUserUsage())
}
