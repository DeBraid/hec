function checkFilled( cities ) {

  var inputVal = document.getElementById("searchBox").value;
  var circleId = d3.select("#" + inputVal + "");

  var cities = [];


  d3.selectAll('circle').each(function(d,i){
    
    var myId = d3.select(this).attr("id");
    
    cities.push(myId);
  
  });
  // var cities = ["Hamilton", "Toronto", "Calgary"];

  cities.forEach(function ( city ) {
  
      if (inputVal == null) {

          circleId.style("fill", "white");
          
      }
      else if ( inputVal == city ){

          circleId.style("fill", "red");
                 
      }
  })
  
}

checkFilled();
