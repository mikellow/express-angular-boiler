angular.module('app',[]).
config(function(){
    console.log('hi bitch')
}).
run(function(){

});





angular.module('app',[]).
controller('mainCtrl',['$scope', function($scope){
    $scope.hello="hello on expres-anuglar-boiler by green-code.net";
}]);
