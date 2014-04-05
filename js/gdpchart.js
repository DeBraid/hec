
d3.csv('/../canGDP.csv', function (data) {


  console.log(data);

})


d3.select('#chart-container').append('svg').attr({"width": 500, "height": 500}); 