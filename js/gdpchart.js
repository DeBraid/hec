
// d3.csv('/../citygdp.csv', function (error, data) {
  
//   var nest = d3.nest()
//     .key(function(d) { return d.Period; })
//     .key(function(d) { return d.Hamilton; })
//     .key(function(d) { return d.Toronto; })
//     .entries(parsed);;  
// })

d3.json('/js/citiesgdp.json', function ( error, data ) { 
  

  // console.log(data[0].Hamilton);

  data.forEach(function (d){
    
    var headers = Object.keys(data[0]);
    console.log(headers);

    var arr = _.zip(d.Period, d.Toronto);
    console.log(arr);

    
  
  })

  
})
