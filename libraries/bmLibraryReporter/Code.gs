function myFunction() {
  // Trackmyself.deleteAllProperties()
  console.log(JSON.stringify(Trackmyself.getAllVisits()))
  console.log(Trackmyself.exportUsage())
  console.log(Trackmyself.currentUserUsage())
}
