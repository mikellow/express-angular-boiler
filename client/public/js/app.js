angular.module('app',[]).
config(function(){
    console.log('hi bitch')
}).
run(function(){

});





angular.module('app',[]).
controller('mainCtrl',['$scope', function($scope){
    $scope.hello="hello madafaka";
}]);
