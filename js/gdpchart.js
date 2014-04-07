var gdp = {};

d3.json('/js/citiesgdp.json', function ( error, data ) { 
  
  data.forEach(function ( d ) {
    var headers = Object.keys(data[0]);

    headers.forEach(function ( header ) {
      // zip combines 2 arrays by matching 
      // values at same index position
      gdp[header] = _.zip(d.Period, d[header]);

    });
  
    return gdp;

  });

  console.log(gdp);

});

