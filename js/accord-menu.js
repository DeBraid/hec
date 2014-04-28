angular.module('accord', ['ui.bootstrap']);
function AccordionCtrl($scope) {
  $scope.oneAtATime = true;

  $scope.groups = [
    {
      title: "GDP",
      content: "Measure of all goods and services traded.  A broad and widely used measure of total economic activity."
    },
    {
      title: "Income",
      content: "Per capita income held constant in 2002 dollars."
    },
    {
      title: "Employment",
      content: "The size of each circle is determined by the employment level in each city.  Large circles indicate more individuals in the workforce."
    }
  ];

}