// refactor with queue.js
var myGDP = [],
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

      if ( _.isNull(d[city]) == false ) {

        gdp[city] = _.zip(d.Period, d[city]);

        var cityByCityGdp =  {
          "city": city,
          "region": "foo",
          "gdp": gdp[city]   
        };

        myGDP.push(cityByCityGdp);

      }
  
    });

    income.forEach(function ( d ) {

      if ( _.isNull(d[city]) == false ) {

        income[city] = _.zip(d.Period, d[city]);

        var cityByCityIncome =  {
          "city": city,
          "region": "foo",
          "income": income[city]   
        };

        myINCOME.push(cityByCityIncome);

      }
  
    });

    uRate.forEach(function ( d ) {

      console.log(_.isNull(d[city]));
      
      if ( _.isNull(d[city]) === false ) {

        uRate[city] = _.zip(d.Period, d[city]);

        var cityByCityuRate =  {
          "city": city,
          "region": "foo",
          "uRate": uRate[city]   
        };

        myURATE.push(cityByCityuRate);
  
      }

    });

  });
  
  var finalData = _.merge(myGDP,myINCOME, myURATE);
  console.log(finalData);
  // console.log(JSON.stringify(finalData));
};  
