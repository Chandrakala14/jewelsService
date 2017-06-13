angular.module('myApp', [
   'ui.router',
   'ngResource',
   'ngCookies',
   'myApp.controllers',

])

.config(function ($interpolateProvider, $httpProvider, $resourceProvider, $stateProvider, $urlRouterProvider){

    $interpolateProvider.startSymbol('[[').endSymbol(']]');

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


    $resourceProvider.defaults.stripTrailingSlashes = false;

    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('dataaa',{
            url:'/',
            //templateUrl: '/partials/welcome.html',
            controller : 'myCtrl',
            // resolve: {
      //         project: function(Restangular, $route){
      //         return Restangular.one('projects', $route.current.params.projectId).get();
   //        }
    })
})

.run([
    '$http', 
    '$cookies', 
    function($http, $cookies) {
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
    }]);






