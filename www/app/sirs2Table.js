/**
 * @module app/sirs2
 */
 define(function () {
 var grid,pager;
   return {

     setGrid: function(sel) {
       grid = $(sel);
     },

     setPager: function(sel) {
       pager = $(sel);
     },

     SIRS2TableGrid: function () {
       var formEditingOptions = {
         reloadAfterSubmit:true,
         closeAfterAdd:true,
         afterComplete: function () {
           grid.setGridParam({datatype: 'json'}).trigger('reloadGrid');
         }
       }
       return grid.jqGrid ({
         url: './php/sirs2Table.php?action=get',
//         url: 'http://dev.precepthealth.ch/php/sirs2Table.php?action=get',
//         editurl: 'http://dev.precepthealth.ch/php/sirs2Table.php?action=edit',
         editurl: './php/sirs2Table.php?action=edit',
         datatype: 'json',
         method: 'POST',
         //toppager: true,
         loadonce: true,
         shrinkToFit: false,
         width: 500,
         colNames: ['id','Patient ID','Date','Temp.','Heart rate','Resp. rate','PaCO2','WB cell count','Immature band'],
         colModel: [
           {name: 'id', index: 'id', hidden:true},
           {name: 'IDPatient', index: 'IDPatient', editable:true},
           {name: 'Date', index: 'Date'},
           {name: 'temperature', index: 'temperature', editable:true},
           {name: 'heartRate', index: 'heartRate', editable:true},
           {name: 'respRate', index: 'respRate', editable:true},
           {name: 'PaCO2', index: 'PaCO2', editable:true},
           {name: 'WBcellCount', index: 'WBcellCount', editable:true},
           {name: 'immatureBand', index: 'immatureBand', editable:true}
         ],
         viewrecords: true,
         caption: 'SIRS Table 2',
         pager: '#sirs2_pager',
         jsonReader: {
           repeatitems: false,
           page: function() {return 1;},
           root: function(obj) {return obj;},
           records: function(obj) {return obj.length;}
         },
         ondblClickRow: function(id) {
           grid.jqGrid('editGridRow',id,formEditingOptions);
         },
//      }).navGrid(pager.selector, {
      }).navGrid('#sirs2_pager', {
          add:true, 
          edit:true,
          del:true,
          search:true,
          view:true,
          refresh:true
          
      },formEditingOptions,
      formEditingOptions,{    
      }); 
     } 
   } 
 });
