function checkFilled() {

  var inputVal = document.getElementById("searchBox").value;
  var circleId = d3.select("#" + inputVal + "");
  console.log(circleId);
  console.log('circleId ^^');
  var cities = ["Hamilton", "Toronto", "Calgary"];

  cities.forEach(function ( city ) {
  
      if (inputVal == "") {

          circleId.style("fill", "white");
          
      }
      else if ( inputVal == city ){

          circleId.style("fill", "red");
                 
      }
  })
  
}
 
checkFilled();
