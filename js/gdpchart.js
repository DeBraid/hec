var gdp = {};

d3.json('/js/citiesgdp.json', function ( error, data ) { 
  console.log(data);
  console.log('data ^^ - ');
  data.forEach(function ( d ) {
    
    var headers = Object.keys(data[0]);

    headers.forEach(function(header) {

      gdp[header] = _.zip(d.Period, d[header]); 

    })

    return gdp;

  })

  console.log(gdp);
  console.log(gdp.length);


})

