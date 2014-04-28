This is a recreation of Wealth and Health of Nations bubble chart. 

Build with code from Mike Bostock (d3js.org) using d3, lodash, queue.js. 

Data from Conference Board of Canada.  

Studies GDP, Employment and Per Capita Income from 1987-2018(est) for the largest 28 cities in Canada.

Source: <a href="https://github.com/RandomEtc/mind-gapper-js">Tom Carden</a>, <a href="http://gapminder.org">Gapminder</a>.

This is a recreation in <a href="http://d3js.org/">D3</a> of Gapminder’s <a href="http://gapminder.org/world/">Wealth & Health of Nations</a>, made famous by Hans Rosling’s memorable <a href="http://www.ted.com/talks/hans_rosling_shows_the_best_stats_you_ve_ever_seen.html">2006 TED talk</a>. It shows the dynamic fluctuation in per-capita income (<i>x</i>), life expectancy (<i>y</i>) and population (radius) of 180 nations over the last 209 years. Nations are colored by geographic region; mouseover to read their names.

<p>As <a href="http://randometc.github.com/mind-gapper-js/">Tom Carden</a> noted, there’s a surprising amount of work that goes into making something look simple. For one, data collected in recent years is consistent, while data prior to 1950 is sparse; although potentially misleading, these visualizations use <a href="http://en.wikipedia.org/wiki/Lerp_(computing)">linear interpolation</a> for missing data points. The lookup for the two interpolation values at each frame is accelerated using <a href="http://en.wikipedia.org/wiki/Binary_search_algorithm">bisection</a> of sorted arrays per dimension.

<p>Interested to see how this chart was implemented? <a href="https://github.com/mbostock/bost.ocks.org/blob/gh-pages/mike/nations/index.html">View source!</a> Want a fun project? Try adding a <a href="https://github.com/mbostock/d3/wiki/Voronoi-Geom">Voronoi overlay</a> (as in this <a href="http://mbostock.github.com/d3/talk/20111116/airports.html">airport diagram</a>) to improve mouseover interaction on small targets. Or try a static version, using trails instead of motion. 



]