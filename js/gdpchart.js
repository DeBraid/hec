var newData = [],
    myJSON = [],
    gdp = {},
    income = {},
    uRate = {};

d3.json('/js/citiesgdp.json', function ( error, data ) { 
  
  data.forEach(function ( d ) {
    var cities = Object.keys(data[0]);

    cities.forEach(function ( city ) {

      gdp[city] = _.zip(d.Period, d[city]);

      var gdpByCity = [];

      gdpByCity.push(gdp[city]);

      var cityByCityData =  {
        "city": city,
        "region": "foo",
        "gdp": gdpByCity   
      };
    
    myJSON.push(cityByCityData);

    });
  
    return gdp;

  });

  newData.push({'gdp': gdp});
  

});


d3.json('/js/citiesIncome.json', function ( error, data ) { 
  
  data.forEach(function ( d ) {
    var cities = Object.keys(data[0]);

    cities.forEach(function ( city ) {
      
      income[city] = _.zip(d.Period, d[city]);

      var incomeByCity = [];

      incomeByCity.push(income[city]);

      var cityByCityData =  {
        "city": city,
        "region": "foo",
        "income": incomeByCity   
      };
    
    myJSON.push(cityByCityData);

    });
  
    return income;

  });

  newData.push({'income': income});

  

});


d3.json('/js/unemprate.json', function ( error, data ) { 
  
  data.forEach(function ( d ) {
    
    var cities = Object.keys(data[0]);

    cities.forEach(function ( city ) {

      uRate[city] = _.zip(d.Period, d[city]);

      var uRateByCity = [];

      uRateByCity.push(uRate[city]);

      var cityByCityData =  {
        "city": city,
        "region": "foo",
        "uRate": uRateByCity   
      };
    
      myJSON.push(cityByCityData);

    });
  
    return uRate;
  });

  newData.push({'uRate': uRate});


  console.log(myJSON);
  console.log('myJSON');
  

});




