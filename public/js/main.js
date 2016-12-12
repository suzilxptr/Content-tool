/* global toastr */

'use strict';

$(document).ready(function () {

    var app = {
        init: function () {
            $("#sortable").sortable();
            $("#sortable").disableSelection();
            this.generateSortable();

            this.getCollectionAndTemplate();
         
            this.populateTemplate();
            this.bindEventHandlers();
        },
        getCollectionAndTemplate: function () {


     
     
         $.get(app.ajaxUrl.collectionGetUrl,function(data){
      
                   app.populateCollection(data);
               
             
         });


        },
        toastrOption: {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "positionClass": "toast-top-center",
            "preventDuplicates": true,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "2000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        },
        bindEventHandlers: function () {
            for (var i = 0; i < this.eventHandlers.length; i++) {
                this.bindEvent(this.eventHandlers[i]);
            }
        },
        bindEvent: function (e) {
            e.$el.on(e.event, e.handler);
        },
        ajaxUrl: {
            newCollectionPostUrl: '/collectionEvents', //add new collection to the db
            collectionGetUrl: "/collectionEvents", //get all existing collections from the db
            addNewEntryToExistingCollection: "/objectEvents", //add new object to the existing collection
            deleteAnEntryFromACollection: "", //delete an object from a collection
            editAnEntryFromACollection: "", //edit an object from a collection
            templateGetUr: "", //get all the templates in the db -- probably template is a collection and we store individual collection objects to it
            newTemplatePostUrl: "", //add new template to db
            editTemplateUrl: "", //edit an existing template 
            deleteTemplateUrl: "", 
            getObjectsForACollection:"/objectEvents",
            deleteACollection:"/collectionEvents/delete"
        },
        currentCollectionId:null
        ,
        
        setCurrentCollectionId: function(id){
            
            this.currentCollectionId=id;
        },
        sortableItems: null,
        objectProperties: ["src", "src_2", "alt", "title", "div_class", "img_class", "img_num", "gfy", "gal_next", "start_gallery", "top_text_1", "top_text_2", "bottom_text_1", "bottom_text_2", "adbox_01"],
        generateSortable: function () {
            var items = "";
            $.each(this.objectProperties, function (index, value) {
                items += '<div class="form-horizontal">' +
                        '<div class="form-group">' +
                        '<label class="control-label col-sm-2" for="key-' + value + '">' + value + ':</label>' +
                        '<div class="col-sm-10">' +
                        '<input  class="form-control" id="' + value + '" placeholder="Enter ' + value + '" type="text">' +
                        '</div> </div></div>';
            });


            this.sortableItems = items;
        },
        showToast: function (message, type) {
            if (typeof type === 'undefined') {
                type = "success";
            }
            toastr.options = app.toastrOption;
            toastr[type](message);
          

        },
        currentCollection: null,
        currentTemplate: null,
        setCurrentCollection: function (currentCollection) {
            this.currentCollection = currentCollection;
        },
        setCurrentTemplate: function (currentTemplate) {
            this.currentTemplate = currentTemplate;
        },
        strings: {
            addNewObjcetToCollectionStr: function () {
                return "Add new object to " + app.currentCollection;
            },
            toastrMessageAddCollection: function () {
                return "New collection " + app.currentCollection + " has been added to databse.";
            },
            toastrMessageDeleteCollection: function () {
                return "Collection " + app.currentCollection + " has been deleted from database.";
            },
            
             toastrMessageDeleteTemplate: function () {
                return "Collection " + app.currentTemplate + " has been deleted from database.";
            },
            toastrMessageEditCollection: function () {
                return "Collection " + app.currentCollection + " has been successfully saved.";
            },
            toastrMessageObjectAdded: "Object has been successfully saved.",
            toastrMessageAddTemplate: function () {
                return "Template " + app.currentTemplate + " has been successully added to database.";
            },
            deleteCurrentTitle: function (itemName) {
                return "Delete collection " + itemName;
            },
            deleteCurrentMessage: function (itemName) {
                return "Are you sure you want to delete " + itemName + "?";

            },
            
            objectDeletedMessage:"Object is successfully deleted"
 
            





        },
        collectionsInDatabase: {},
        templatesInDatabase: {},
        populateCollection: function (collectionData) {
      
            $.each(collectionData, function (index, value) {
                $('#collection-list').append('<li>' + value.name + ' <button data-collectionid="'+value._id+'"data-collectionname="' + value.name + '" class="btn btn-edit-collection btn-xs btn-success">Edit</button> <button  data-collectionid="'+value._id+'"data-collectionname="' + value.name + '" class="btn btn-delete-collection btn-xs btn-danger">Delete</button></li>');
            });



        },

        populateTemplate: function () {

            $.each(this.templatesInDatabase, function (index, value) {
                $('#template-list').append('<li>' + index + ' <button  data-templatename="' + index + '" class="btn btn-edit-template btn-xs btn-success">Edit</button> <button data-templatename="' + index + '" class="btn btn-delete-template btn-xs btn-danger">Delete</button></li>');

            });

        },
        populateObjectList: function(){
            $('#each-object ol').empty();
        console.log(app.currentCollectionId);
            $.get("/objectEvents",{'collectionId':app.currentCollectionId},function(data){
                console.log(data);
              var dataInCurrentCollection=data;
              $.each(dataInCurrentCollection, function (index, value) {
                                    
                  $('#each-object ol').append('<li>Object ' + (index+1) + ' <button  data-objectindex="' + index + '" class="btn btn-edit-object btn-xs btn-success">Edit</button> <button data-objectindex="' + index + '" class="btn btn-delete-object btn-xs btn-danger">Delete</button></li>');

            });
                
                
            });
            
            
          
        },
        
        populateObjectToEdit: function(objectIndex){
            
            console.log(this.collectionsInDatabase[app.currentCollection]);
            
            var items = "";
            $.each(this.collectionsInDatabase[app.currentCollection][objectIndex], function (index, value) {
                items += '<div class="form-horizontal">' +
                        '<div class="form-group">' +
                        '<label class="control-label col-sm-2" for="' + index + '">' + index + ':</label>' +
                        '<div class="col-sm-10">' +
                        '<input  class="form-control" id="' + index + '" value="'+value+'" type="text">' +
                        '</div> </div></div>';
            });
            
            
            $('.sortable').append(items);
            $('.sortable').sortable();
            
        },
        
        populateEditTemplate: function(currentTemplate){
            var element='<div class="form-group">'+
                                '<label for="input-template-name">Enter template name</label>'+
                                '<input value="'+currentTemplate+'"id="input-template-name" type="text" class="form-control input-group-sm"></div>'+                          
                                '<div class="form-group">'+
                                '<label for="textarea-template-data">Enter a template</label>'+
                                '<textarea class="form-control" id="edit-textarea-template-data" style="min-width: 100%">'+app.templatesInDatabase[currentTemplate]+'</textarea>  </div>';
                          
            
            $('#template-edit').append(element);
            
        }
        
        ,

        currentObject: {},
        eventHandlers: [{
                $el: $('#btn-add-new-collection'),
                event: "click",
                handler: function () {
                    event.preventDefault();

                    var collectionName = $('#input-collection-name').val();

                    app.setCurrentCollection(collectionName);
                    console.log(app.strings.currentCollection);

                    $('#add-object-header').html(app.strings.addNewObjcetToCollectionStr());
                    $("#sortable").append(app.sortableItems);

                    $('#add-new-object-to-collection').modal('show');
                   
                    console.log('here to post ' + collectionName);
                    $.post(app.ajaxUrl.newCollectionPostUrl, {
                        'name': collectionName
                    }, function (data) {
                        console.log(data);
                        if (data.status ===200){
                    console.log(data.data._id);
                        $('#btn-add-new-object').attr({'data-collectionid':data.data._id});
                             app.showToast(app.strings.toastrMessageAddCollection());
                    
                        }

                    });
                }
            }, {
                $el: $('#btn-add-new-object'),
                event: "click",
                handler: function () {

                    $("#sortable :input").each(function (inputElement) {
                        app.currentObject[this.id] = $('#' + this.id).val();
                    });

                    console.log(app.currentObject);
                    $('#add-new-object-to-collection').modal('hide');
                    $('#add-new-collection-modal').modal('hide');

                    $('#sortable').empty();
                    app.currentObject.collectionId=this.getAttribute('data-collectionid');
                    app.showToast(app.strings.toastrMessageObjectAdded);
                    console.log("My current object");
                    console.log(app.currentObject);
                    $.post(app.ajaxUrl.addNewEntryToExistingCollection,app.currentObject,function(data){
                        
                        console.log(data);
                        
                    });


                }
            },

            {
                $el: $('#btn-edit-template-save'),
                event: "click",
                handler: function () {
                    
                var templateName = this.getAttribute("data-templatename");
        $('#edit-template-modal').hide();
        app.showToast(app.strings.toastrMessageAddTemplate);
                
                    
                    
                    
                }


            },
            
             {
                $el: $('#btn-edit-object-save'),
                event: "click",
                handler: function () {
                    
                var objectIndex = this.getAttribute("data-objectindex");
        $('#edit-each-object-modal').hide();
        app.showToast(app.strings.toastrMessageObjectAdded);
                
                    
                    
                    
                }


            },

            {
                $el: $('.btn-confirm-delete'),
                event: "click",
                handler: function () {
                    
                    var currentType=this.getAttribute('data-currenttype');
                    var currentItem=this.getAttribute('data-currentdata');
                    
                    if(currentType ==="collection"){
                     
                    app.showToast(app.strings.toastrMessageDeleteCollection(), "warning");
                    
                    
                    $.get(app.ajaxUrl.deleteACollection,{'collectionId':app.currentCollectionId},function(data){
                        
                        
                        console.log(data);
                        
                        
                    });
                    
                    
                    $('#collection-list').empty();
                    app.populateCollection();
                    return;
                    }
                    
                    delete app.templatesInDatabase[app.currentTemplate];
                    console.log(app.collectionsInDatabase);
                    $('#template-list').empty();
                    app.showToast(app.strings.toastrMessageDeleteTemplate(), "warning");
                    app.populateTemplate();


                }


            },

            {
                $el: $('.btn-edit-template'),
                event: "click",
                handler: function () {}


            },

            {
                $el: $('#btn-add-new-template'),
                event: "click",
                handler: function () {


                    var templateName = $('#input-template-name').val();
                    var templateValue = $('#textarea-template-data').val();

                    app.setCurrentTemplate(templateName);

                    app.showToast(app.strings.toastrMessageAddTemplate());
                    $('#new-template-input-modal').hide();

                }


            }


        ]
    };


    app.init();




    $(document).on("click", '.btn-delete-collection', function () {

        var collectionName = this.getAttribute("data-collectionname");
          var collectionId = this.getAttribute("data-collectionid");
        $('.btn-confirm-delete').attr({'data-currentdata':collectionName,'data-currenttype':'collection'});
        app.setCurrentCollection(collectionName);
        app.setCurrentCollectionId(collectionId);
        $('#delete-title').html(app.strings.deleteCurrentTitle(app.currentCollection));
        $('#delete-message').html(app.strings.deleteCurrentMessage(app.currentCollection));
        $('#delete-item-modal').modal('show');

    });


    $(document).on("click", '.btn-delete-template', function () {
        var templateName = this.getAttribute("data-templatename");
        $('.btn-confirm-delete').attr({'data-currentdata':templateName,'data-currenttype':'template'});
        app.setCurrentTemplate(templateName);

        $('#delete-title').html(app.strings.deleteCurrentTitle(app.currentTemplate));
        $('#delete-message').html(app.strings.deleteCurrentMessage(app.currentTemplate));
        $('#delete-item-modal').modal('show');

    });
    
    
    
    $(document).on("click",'.btn-edit-collection',function(){
        
        var collectionId = this.getAttribute("data-collectionid");
        app.setCurrentCollectionId(collectionId);
        app.populateObjectList();
       $('#list-all-objects-modal').modal('show');
        
    });
    
       $(document).on("click",'.btn-edit-object',function(){
        
        var objectIndex = this.getAttribute("data-objectindex");
        
        $('#btn-edit-object-save').attr({'data-objectindex':objectIndex});
  
        app.populateObjectToEdit(objectIndex);
         $('#list-all-objects-modal').hide();
       $('#edit-each-object-modal').modal('show');
        
    });
    
    
    $(document).on("click",'.btn-edit-template',function(){
        
         var templateName = this.getAttribute("data-templatename");
         app.setCurrentTemplate(templateName);
        $('#btn-edit-template-save').attr({'data-templatename':templateName});
        app.populateEditTemplate(templateName);
        
        $('#edit-template-modal').show();
        
        
        
    });
    
    $(document).on("click",'.btn-delete-object',function(){
        
         var objectIndex = this.getAttribute("data-objectindex");
        
       app.collectionsInDatabase[app.currentCollection].splice(objectIndex,1);
       app.showToast(app.strings.objectDeletedMessage,"warning");
       $('#list-all-objects-modal').hide();
       console.log(app.collectionsInDatabase);
        
        
    });
    

});

