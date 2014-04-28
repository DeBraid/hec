// refactor with queue.js
var myGDP = [],
    myURATE = [],
    myINCOME = [];

queue()
  .defer(d3.json, '/js/citiesgdp.json')
  .defer(d3.json, '/js/citiesIncome.json')
  .defer(d3.json, '/js/unemprate.json')
  .await(makeChart);

function makeChart ( error, gdp, income, urate ) {
  
  var cities = Object.keys(gdp[0]);
  
  cities.forEach(function ( city ) {
  
    gdp.forEach(function ( d ) {

      gdp[city] = _.zip(d.Period, d[city]);

      var cityByCityGdp =  {
        "city": city,
        "region": "foo",
        "gdp": gdp[city]   
      };

      myGDP.push(cityByCityGdp);
  
    });

    income.forEach(function ( d ) {

      income[city] = _.zip(d.Period, d[city]);

      var cityByCityIncome =  {
        "city": city,
        "region": "foo",
        "income": income[city]   
      };

      myINCOME.push(cityByCityIncome);
  
    });

    urate.forEach(function ( d ) {

      urate[city] = _.zip(d.Period, d[city]);

      var cityByCityurate =  {
        "city": city,
        "region": "foo",
        "urate": urate[city]   
      };

      myURATE.push(cityByCityurate);
  
    });

  });
    
    var finalData = _.merge(myGDP,myINCOME, myURATE);

};  
