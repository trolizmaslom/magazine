 var app = angular.module('myApp', ["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider
        .when('/login',{
        templateUrl:'login.html',
        controller:'FirstCtrl'
        })
        .when('/home',{
        templateUrl:'home.html',
        controller:'HomeCtrl'
        })
        .when('/regUser',{
        templateUrl:'regUser.html',
        controller:'RegUserCtrl'
        });

    $routeProvider.otherwise({redirectTo:'login'});
});


app.factory('AuthorizationService', function(){
        function auth (first){
            if(first.login === 'admin' && first.pass === 'admin'){
                return true;
            }
            return false;
        }
        return {
            auth:auth
        }
    });




app.controller('FirstCtrl',function($location, $scope, AuthorizationService){

            $scope.login = function (){
                if (AuthorizationService.auth($scope.first)){
                    $location.path('home');
                }else{
                    $scope.err = "Ошибка авторизации";
                }
                console.log($scope.err);
            };
        }

 );
app.controller('HomeCtrl',['$location','$scope', '$http', function(loc, scp, http){
            scp.logout = function (){
                loc.path('login');
            };
            http.get("connget.php").success(function (response) {scp.users = response.records;});



        }
    ]
);

app.controller('RegUserCtrl', function($scope, $http){
            $scope.response={};

            $scope.submit = function(regForm){
                alert('see console');
                console.log($scope.regForm);
                $http({
                    method:'POST',
                    data:$scope.regForm,
                    url:'connpost.php'
                }).then(function successCallback() {
                    alert('good');
                }, function errorCallback() {
                    alert('bad');
                });
            };
        });


app.filter('greeting', function(){
    return function(name){
        if (!name) {name="petro"}
        return "hello "+name+"!"
    }
});

app.directive('copyright', function(){
    return{
        restrict:"AE",
        template:"(c) 2015 trolizmaslom"
    }
});
 app.directive('draggable', function($document){
     return function(scope,element,attr){
         var startX= 0, startY= 0, x = 0, y = 0;
         element.css({
             position:'relative',
             border:'1px solid red',
             backgroundColor:'yellow',
             cursor:'pointer'
         });

         element.on('mousedown', function(event){
             event.preventDefault();
             startX = event.pageX-x;
             startY = event.pageY-y;
             $document.on('mousemove', mousemove);
             $document.on('mouseup', mouseup)
         });

         function mousemove(event) {
             y = event.pageY - startY;
             x = event.pageX - startX;
             element.css({
                 top: y + 'px',
                 left: x + 'px'
             });
         }
         function mouseup(){
             $document.unbind('mousemove', mousemove);
             $document.unbind('mouseup', mouseup);
         }
     }
 });



