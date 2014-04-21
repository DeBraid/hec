var newData = [],
    myJSON = [],
    lastData = [],
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

  myJSON.map(function ( d , i ) { 
        
      if (d.city == d.city ) { 
      
        var moo = { 
            "city": d.city,
            'gdp': d.gdp, 
        } 

        var mob = { 
            "city": d.city,
            "income": d.income, 
        } 

        var cob = { 
            "city": d.city,
            "uRate": d.uRate, 
        } 
        
        var haz = _.merge(moo,mob,cob);

        lastData.push(haz);


      } 
  })
      console.log(lastData);

});




