/**
 * Created by The BigBang on 11.12.2016.
 */

$( function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
    $( "#sortable_1" ).sortable();
    $( "#sortable_1" ).disableSelection();
} );


var app=angular.module('content-tool',[])


    app.controller('IndexController', ['$scope','$http', function($scope, $http) {
        $scope.list = ["one", "two", "three", "four", "five", "six"];
        $scope.loadCollection=function(){
            $http.get('/collectionEvents').then(function(data){
               $scope.allCollection=data.data;
                console.log(data);
            },function(err){
                throw err;
            });

        }
        $scope.loadTemplate=function(){
            $http.get('/templateEvents').then(function(templateObject){
                $scope.templateObj=templateObject.data;
            },function(err){
                throw err;
            })

        }

        $scope.deleteCollection=function(collectionId,array,index){

            $http.get('/collectionEvents/delete?collectionId='+ collectionId).then(function(data){
                array.splice(index,1);

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
        $scope.deleteObject=function(objectId,array,index){

            $http.get('/objectEvents/delete/?objectId='+ objectId).then(function(data){
                console.log(data);
                array.splice(index,1);

            },function(err){
                throw err;
            })


        }
        $scope.object={
            "src":"",
            "src_2":"",
            "alt":"",
            "title":"",
            "div_class":"",
            "img_class":"",
            "img_num":"",
            "gfy":"",
            "gal_next":"",
            "start_gallery":"",
            "top_text_1":"",
            "top_text_2":"",
            "bottom_text_1":"",
            "bottom_text_2":"",
            "adbox_01":"",

        };

        $scope.addObject=function(){
            var currentObject={};
            $("#sortable_1 :input").each(function (inputElement,value) {
                currentObject[this.id] = $(value).val();
            });
               currentObject.collectionId=$scope.collectionId;
            $http.post('/objectEvents',currentObject).then(function(obj){
                $scope.objectData.push(obj.data.data);
            },function(err){
                throw err;
            })
        }
        $scope.objectId=function(objectId){
            $scope.objectId=objectId;

        }
        $scope.editObject=function(){
            var currentObject={};
            $("#sortable :input").each(function (inputElement,value) {
                currentObject[this.id] = $(value).val();
            });

            currentObject.objectId=$scope.objectId;
            for(item in currentObject){
                console.log(item);
            }
            console.log("The object id is"+currentObject.objectId);
            $http.post('/objectEvents/edit',currentObject).then(function(data){
                console.log(data);
            },function(err){
                throw err;
            })
        }

        $scope.addTemplate=function(){

            $http.post('/templateEvents',{"name":$scope.name,"template":$scope.template}).then(function(newTemplate){

                $scope.templateObj.push(newTemplate.data.data);
            },function(err){
                throw err;
            })

        }
        $scope.deleteTemplate=function(templateId,array,index){

            $http.get('/templateEvents/delete/?templateId='+ templateId).then(function(data){
                console.log(data);
                array.splice(index,1);

            },function(err){
                throw err;
            })


        }
        $scope.templateID=function(templateId){
            $scope.templateId=templateId;

        }
        $scope.editTemplate=function(){

            $http.post('/templateEvents/edit',{"templateId":$scope.templateId,"name":$scope.editName,"template":$scope.edittedTemplate}).then(function(data){
                console.log(data);
                $scope.loadTemplate();
            },function(err){
                throw err;
            })
        }
        $scope.renderObjectInTemplate=function(templateId){
            console.log(templateId);
            $http.get('/templateEvents/getTemplate/?templateId='+templateId).then(function(templateObject){
                console.log(templateObject);
              $scope.templateToRender=templateObject.data[0];
                console.log($scope.templateToRender);
                console.log($scope.objectData);
            },function(err){
                throw err;
            })

        }

    }]);

