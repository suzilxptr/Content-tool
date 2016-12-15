

$( function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
    $( "#sortable_1" ).sortable();
    $( "#sortable_1" ).disableSelection();

} );




var app=angular.module('content-tool',['ui.sortable'])

   app.controller('IndexController', ['$scope','$http', function($scope, $http) {
        $scope.list = ["one", "two", "three", "four", "five", "six"];
        $scope.loadCollection=function(){
            $http.get('/collectionEvents').then(function(data){
               $scope.allCollection=data.data;
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

       function sort(){
           $http.post('objectEvents/edit/sort',$scope.objectData).then(function(data){

           },function(err){
               throw err;
           })
       }


       $scope.editCollection=function(){
            $http.post('/collectionEvents/edit',{name:$scope.editedName,collectionId:$scope.collectionId}).then(function(obj){
              $scope.loadCollection();
            },function(err){
                throw err;
            })
            $scope.name="";
        }


        $scope.edit=function(collectionId,collectionName) {
            $scope.collectionId = collectionId;
            $scope.collectionName=collectionName;
            $http.get('/objectEvents/?collectionId='+ collectionId).then(function(data){
                $scope.objectData=data.data;
            },function(err){
                throw err;
            })
        }
        $scope.deleteObject=function(objectId,array,index){

            $http.get('/objectEvents/delete/?objectId='+ objectId).then(function(data){
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
            currentObject.index=null;
            $http.post('/objectEvents',currentObject).then(function(obj){
                $scope.objectData.push(obj.data.data);
            },function(err){
                throw err;
            })
        }
        $scope.objectIdset=function(objectId,$index){
            $scope.objectId=objectId;
            $scope.index=$index;
            defaultValueSet($scope.objectData[$index]);



        }

        function defaultValueSet(obj){

            for(value in $scope.object){
                console.log(value);
                if(obj[value]!=null){
                    $("#"+ value).attr("value", obj[value]);
                }
            }

        }
        $scope.editObject=function(){
            var currentObject={};
            $("#sortable :input").each(function (inputElement,value) {
                currentObject[this.id] = $(value).val();
            });

            currentObject.objectId=$scope.objectId;
            for(item in currentObject){}
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
                array.splice(index,1);

            },function(err){
                throw err;
            })


        }
       $scope.sortableOptions = {
           // called after a node is dropped
           stop: function(e, ui) {
                sort();
           }
       };
        $scope.templateID=function(templateId,templateName,template){
            $scope.templateId=templateId;
            $scope.templateName=templateName;
            $scope.edittedTemplate=template;

        }
        $scope.editTemplate=function(){

            $http.post('/templateEvents/edit',{"templateId":$scope.templateId,"name":$scope.editName,"template":$scope.edittedTemplate}).then(function(data){
                $scope.loadTemplate();
            },function(err){
                throw err;
            })
        }

       $scope.renderObjectInTemplate=function(templateId,templateName){
           $scope.allobjs="";
           var eachObjs=[];
           $scope.templateRender=templateName;
           $http.get('/templateEvents/getTemplate/?templateId='+templateId).then(function(templateObject){
               $scope.templateToRender=templateObject.data[0].template;
               angular.forEach(($scope.objectData), function(obj){
                   var template=$scope.templateToRender;

                   angular.forEach(obj,function(value,key){
                       var s='{{'+key.toUpperCase()+'}}';
                       if (typeof value === 'string' || value instanceof String){
                           value=value.replace(/"/g, '\\"');

                       }
                       template=template.replace(s, value);
                       // console.log(template);
                   });

                   template=template+"\n";
                   $scope.allobjs+=template;
                   console.log(eachObjs);
               });


           },function(err){
               throw err;
           });

       }





    }]);

