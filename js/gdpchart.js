// refactor with queue.js
var newData = [],
    myJSON = [],
    myGDP = [],
    myURATE = [],
    myINCOME = [];

queue()
  .defer(d3.json, '/js/citiesgdp.json')
  .defer(d3.json, '/js/citiesIncome.json')
  .defer(d3.json, '/js/unemprate.json')
  .await(makeChart);

function makeChart ( error, gdp, income, uRate ) {
  
  var cities = Object.keys(gdp[0]);
  
  cities.forEach(function ( city ) {
  
    gdp.forEach(function ( d ) {

      gdp[city] = _.zip(d.Period, d[city]);

      var gdpByCity = [];

      gdpByCity.push(gdp[city]);

      var cityByCityGdp =  {
        "city": city,
        "region": "foo",
        "gdp": gdpByCity   
      };

      myGDP.push(cityByCityGdp);
  
    });

    income.forEach(function ( d ) {

      income[city] = _.zip(d.Period, d[city]);

      var incomeByCity = [];

      incomeByCity.push(income[city]);

      var cityByCityIncome =  {
        "city": city,
        "region": "foo",
        "income": incomeByCity   
      };

      myINCOME.push(cityByCityIncome);
  
    });

    uRate.forEach(function ( d ) {

      uRate[city] = _.zip(d.Period, d[city]);

      var uRateByCity = [];

      uRateByCity.push(uRate[city]);

      var cityByCityuRate =  {
        "city": city,
        "region": "foo",
        "uRate": uRateByCity   
      };

      myURATE.push(cityByCityuRate);
  
    });

  });
  
  var moo = _.merge(myGDP,myINCOME, myURATE);
  console.log(moo);
  
};  
