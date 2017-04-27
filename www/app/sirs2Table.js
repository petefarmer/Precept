/**
 * @module app/sirs2
 */
 define(function () {
 var grid,pager;
   return {
    sirs2Button: $(function() {
      var url = 'http://dev.precepthealth.ch:8079/REST/CALLMLM?mlmName=SIRS-Notification2&mlmInstitution=Medexter Healthcare, Vienna, Austria';
      $('#sirs2Button').click(function(e) {
//      var patientid = $('#patientMenu').val();
//      console.log("button value =",patiendid);
      $.ajax({
        url: url,
        type:'POST',
//        crossDomain:true,
        dataType:'json',
//        xhrFields: {
//          withCredentials: true
//        },
        headers: {
         'Authorization':'Basic YWRtaW46czNjcmV0',
         'Accept':'application/json',
         'Content-Type':'application/json'
        },
        data: JSON.stringify({ "type": "number", "primaryTime": null, "applicability": 1, "value": 126 })

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

    patientMenu: function() {
      $.ajax({
        url: './php/getPatientMenu.php',
      }).done( function(data) {
        $("#patientMenuContainer").html(data);
        $("#patientMenu").selectmenu({
          width:100,        
          select: function(event, ui) {
            var value = $(this).val();
            console.log("value =",value);
          }
        });

        
      })
    },


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
           patientMenu();
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
