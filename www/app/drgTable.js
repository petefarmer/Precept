/**
 * @module app/drgTable
 */
 define(function () {
 var grid;
   return {
     setGrid: function(sel) {
       grid = $(sel);
     },
     DRGTableGrid: function () {
       return grid.jqGrid ({
         url: './php/drgTable.php',
         datatype: 'json',
         method: 'POST',
         colNames: ['id','title'],
         colModel: [
           {name: 'id', index: 'id', key: 'true'},
           {name: 'title', index: 'title'}
         ],
         viewrecords: true,
         caption: 'DRG Table'
         /*
         jsonReader: {
           repeatitems: false,
           page: function() {return 1;},
           root: function(obj) {return obj;},
           records: function(obj) {return obj.length;}
         }
         */
      }); 
     } 
   } 
 });
