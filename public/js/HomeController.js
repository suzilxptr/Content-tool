/**
 * Created by The BigBang on 11.12.2016.
 */
angular.module('content-tool',[])
    .controller('IndexController', ['$scope','$http', function($scope, $http) {
        $scope.loadCollection=function(){
            $http.get('/collectionEvents').then(function(data){
               $scope.allCollection=data.data;
                console.log(data);
            },function(err){
                throw err;
            });

        }
        $scope.fetchObjects=function(collectionId){


        }
        $scope.deleteCollection=function(collectionId,array,index){
            array.splice(index,1);
            $http.get('/collectionEvents/delete?collectionId='+ collectionId).then(function(data){
                $scope.objectData=data.data;
                console.log(data);

            },function(err){
                throw err;
            })

        }
        $scope.newCollection=function(event){

            $http.post('/collectionEvents',{name:$scope.name}).then(function(obj){
              $scope.allCollection.push(obj.data.data);

            },function(err){
                throw err;
            })
            $scope.name="";
        }

        $scope.editCollection=function(){
            $http.post('/collectionEvents/edit',{name:$scope.editedName,collectionId:$scope.collectionId}).then(function(obj){
              $scope.loadCollection();
            },function(err){
                throw err;
            })
            $scope.name="";
        }


        $scope.edit=function(collectionId) {
            $scope.collectionId = collectionId;
            $http.get('/objectEvents/?collectionId='+ collectionId).then(function(data){
                $scope.objectData=data.data;
                console.log(data);

            },function(err){
                throw err;
            })
        }
    }]);


