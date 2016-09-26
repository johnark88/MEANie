var myApp=angular.module( 'myApp', [] );
myApp.controller( 'whereMyPeeps', [ '$scope', '$http', function( $scope, $http ){
  console.log('NG');
  $scope.addRecord = function(){
    event.preventDefault();
    var objectToSend ={
      name: $scope.nameIn,
      location: $scope.locationIn,
    };
    $http({
      method: 'POST',
      url: '/testPost',
      data: objectToSend
    });
    $scope.nameIn ='';
    $scope.locationIn='';
  };
  $scope.getRecords = function(){
    $http({
      method: 'GET',
      url: '/getRecords',
    }) .success( function( response ){
      $scope.allTheRecords = response;
      console.log( $scope.allTheRecords );
    }) .error (function myError( response ){
      console.log( response.statusText );
    });
  };//end scope.getRecords
}]);//end whereMyPeeps controller
