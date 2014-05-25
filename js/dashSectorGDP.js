var labels = [],
    figures = [];

queue()
  .defer(d3.csv, 'gdpBySectorAll-clean.csv')
  .await(makeChart);

function makeChart ( error, data ) {
  

  console.log(data);
  console.log('data ***');


}
