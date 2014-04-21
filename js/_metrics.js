  console.log(myJSON);
  console.log('myJSON');

  myJSON.map(function ( d , i ) { 

    var hunter = _.where(d.income, d.gdp);
    console.log(hunter);
    
    var metrics = ['gdp', 'income', 'uRate'];
    
    if (d.city == d.city ) { 

      metrics.forEach(function ( metric ) {
        
        var moo = { 
            "city": d.city,
            metric: d.metric, 
            "income": d.income, 
            "uRate": d.uRate, 
        } 

      

  // console.log(moo);
  // console.log('moo');
      })
    
    } 

    // console.log(d);
  })
