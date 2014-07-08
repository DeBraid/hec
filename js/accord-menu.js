angular.module('app', ['ui.bootstrap']);

function AccordionCtrl($scope) {
  $scope.oneAtATime = true;

  $scope.groups = [
    {
      title: "GDP",
      axis: "higher values represent larger economies (y-axis)",
      content: "Gross Domestic Product (GDP) is the total of all goods and services produced within the stated geographical boundaries. For example, GDP in Canada includes goods and services produced by Canadian and foreign-owned corporations inside Canada, but it does not include goods and services produced by Canadian corporations outside Canada.  GDP at basic prices: Equals GDP at market prices, minus taxes and subsidies on products."
    },
    {
      title: "INCOME",
      axis: "relatively rich on the right, poor on the left (x-axis)",
      content: "Personal Income Per Capita: sum of all revenues (wages, dividends, self-employment, etc) received in a year, divided by total population."
    },
    {
      title: "EMPLOYMENT",
      axis: "larger circles show greater employment rates (diameter)",
      content: "The size of each circle is determined by the employment level in each city.  Large circles indicate more individuals in the workforce per capita."
    }
  ];

}

function TypeaheadCtrl($scope) {

  $scope.selected = undefined;
  $scope.cities = ["Saguenay","St. John's","Trois-Rivieres","Saint John","Montreal","Vancouver","Victoria","Saskatoon","Abbotsford","Edmonton","Quebec City","Winnipeg","Calgary","Windsor","Halifax","Regina","Thunder Bay","Sherbrooke","Kingston","St. Catharines-Niagara","Oshawa","Ottawa and Gatineau","Hamilton","London","Kitchener","Toronto","Sudbury"];

}


