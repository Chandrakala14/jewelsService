var myApp = angular.module('myApp.controllers',[]);

  console.log("I am Module");

//myApp.factory('city', ['$http', function($http){

   // var city = function(data) {
   //     angular.extend(this, data);
    //};
//}]);

myApp.controller('myCtrl',function($scope,$resource,$http){
	console.log("I am Controller");
    var getemps = function(emps){
         $http.get('http://localhost:2000/getuser').success(function(data){
          $scope.emps = data;
          console.log('retrieved successfully');
          console.log($scope.emps);
        });
    };
    getemps();
  
    $scope.button = 'Save';
    $scope.addemps = function(emps){
        if($scope.button === 'Save'){
               console.log($scope.emps);
                var Name = $scope.emps.Name;
                var District = $scope.emps.District;
                var Population = $scope.emps.Population;
                console.log(Name+''+District +''+Population); 
                return $http.post('http://localhost:2000/adduser?Name='+Name+'&District='+District+'&Population='+Population);
				
            }else{
				
              console.log($scope.emps);
              var Name = $scope.emps.Name;
              var District = $scope.emps.District;
              var Population = $scope.emps.Population;
              var id = $scope.emps.id;
              console.log(Name+''+District+''+Population);  
              return $http.put('http://localhost:2000/updateuser?id='+id+'&Name='+Name+'&District='+District+'&Population='+Population);
                // address
            }  
    };
            $scope.click = function(data){
            $scope.emps = data;
            $scope.button = 'Update';
            };
        var clear = function(){
            $scope.button = 'Save';
            $scope.emps = '';
        }
     $scope.deleteemps= function(id){
            $http.delete('http://localhost:2000/removeuser?id='+id)
                .then(function(response){
                   $scope.emps = response.data;
                     console.log(response.data);
                     getemps();
                    // clear();
                },function(error){
                    console.log(error);
                });
      };

});



