
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

    headers.forEach(function(header) {
      var gdp = _.zip(d.Period, d[header]); 
      console.log(gdp);
      
      

      // var arrInv = _.invoke(d.Period, d.Toronto, 'sort');
      // console.log(arrInv);
      // console.log('arrInv - ');
      
      // var arrZip = _.zip(d.Period, d.Toronto);
      // console.log(arrZip);
      // console.log('arrZip - - ');

    })
  })

  
})
