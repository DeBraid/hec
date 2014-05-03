This is a recreation of Wealth and Health of Nations bubble chart in <a href="http://d3js.org/">D3</a> of Gapminder’s <a href="http://gapminder.org/world/">Wealth & Health of Nations</a>, made famous by Hans Rosling’s memorable <a href="http://www.ted.com/talks/hans_rosling_shows_the_best_stats_you_ve_ever_seen.html">2006 TED talk</a>. 

Build by <a href="http://www.cacheflow.ca/">Derek Braid</a> with code from Mike Bostock (d3js.org, ) using d3, lodash, queue.js, angular-ui. 

Studies GDP, Employment and Per Capita Income from 1987-2018(est) for the largest 28 cities in Canada.  Data from Conference Board of Canada.  


<p>As <a href="http://randometc.github.com/mind-gapper-js/">Tom Carden</a> noted, there’s a surprising amount of work that goes into making something look simple. For one, data collected in recent years is consistent, while data prior to 1950 is sparse; although potentially misleading, these visualizations use <a href="http://en.wikipedia.org/wiki/Lerp_(computing)">linear interpolation</a> for missing data points. The lookup for the two interpolation values at each frame is accelerated using <a href="http://en.wikipedia.org/wiki/Binary_search_algorithm">bisection</a> of sorted arrays per dimension.

<p>Interested to see how the original chart was implemented? <a href="https://github.com/mbostock/bost.ocks.org/blob/gh-pages/mike/nations/index.html">View source!</a> 

Other sources: <a href="https://github.com/RandomEtc/mind-gapper-js">Tom Carden</a>, <a href="http://gapminder.org">Gapminder</a>.
