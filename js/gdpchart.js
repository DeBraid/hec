var newData = [],
    gdp = {},
    income = {},
    uRate = {};


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

  var arrGdp = [gdp];
  // console.log(arrGdp);
  newData.push({'gdp': gdp});
  

});


d3.json('/js/citiesIncome.json', function ( error, data ) { 
  
  data.forEach(function ( d ) {
    var headers = Object.keys(data[0]);

    headers.forEach(function ( header ) {
      
      income[header] = _.zip(d.Period, d[header]);

    });
  
    return income;

  });

  var arrInc= [income];
  newData.push({'income': income});

  

});


d3.json('/js/unemprate.json', function ( error, data ) { 
  
  data.forEach(function ( d ) {
    var headers = Object.keys(data[0]);

    headers.forEach(function ( header ) {
      // zip combines 2 arrays by matching 
      // values at same index position
      uRate[header] = _.zip(d.Period, d[header]);

    });
  
    return uRate;

  });

  var arrRate= [uRate];
  // console.log(arrRate);
  // console.log(arrRate.length);

  newData.push({'uRate': uRate});

  console.log(newData);
  console.log('newData ^ '); 

});




