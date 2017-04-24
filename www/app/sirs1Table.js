/**
 * @module app/sirs1
 */
 define(function () {
 var grid,pager;
   return {

    sirs1Button: $(function() {
var url = 'http://localhost/REST/CALLMLM?mlmName=SIRS-Notification1&mlmInstitution=Medexter Healthcare, Vienna, Austria';
      $('#sirs1Button').click(function(e) {
      $.ajax({
        url: url,
        type:'POST',
        crossDomain:true,
        dataType:'json',
        xhrFields: {
          withCredentials: true
        },
        headers: {
         'Authorization':'Basic YWRtaW46czNjcmV0',
         'Accept':'application/json',
         'Content-Type':'application/json'
        },
        data: JSON.stringify({ "type": "number", "primaryTime": null, "applicability": 1, "value": 0 })

      }).done( function(data) {
        var msg = data.value;
        $("#sirs2ButtonDialogText").text("value:" + msg);
        $(function(data) {
         $("#sirs2ButtonDialog").dialog();
        });
        console.log(data);
        console.log(data.value);
        
      })
    })
    }),


     setGrid: function(sel) {
       grid = $(sel);
     },

     setPager: function(sel) {
       pager = $(sel);
     },

     SIRS1TableGrid: function () {
       return grid.jqGrid ({
         url: './php/sirs1Table.php?action=get',
         datatype: 'json',
         method: 'POST',
         //toppager: true,
         loadonce: true,
         shrinkToFit: false,
         width: 500,
         colNames: ['Patient ID','Temp.','Heart rate','Resp. rate','PaCO2','WB cell count','Immature band'],
         colModel: [
           {name: 'IDPatient', index: 'IDPatient', key: 'true'},
           {name: 'temperature', index: 'temperature', editable:true},
           {name: 'heartRate', index: 'heartRate', editable:true},
           {name: 'respRate', index: 'respRate', editable:true},
           {name: 'PaCO2', index: 'PaCO2', editable:true},
           {name: 'WBcellCount', index: 'WBcellCount', editable:true},
           {name: 'immatureBand', index: 'immatureBand', editable:true}
         ],
         viewrecords: true,
         caption: 'SIRS Table 1',
         pager: '#sirs1_pager',
         /*
         jsonReader: {
           repeatitems: false,
           page: function() {return 1;},
           root: function(obj) {return obj;},
           records: function(obj) {return obj.length;}
         }
         */
         ondblClickRow: function(id) {
           grid.jqGrid('editGridRow',id);
         },
//      }).navGrid(pager.selector, {
      }).navGrid('#sirs1_pager', {
          add:true,
          edit:true,
          del:true,
          search:true,
          view:true,
          refresh:true
         // cloneToTop:true
          
      },{}); 
     } 
   } 
 });
