/**
 * @module app/sirs1
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

    sirs1Button: $(function() {
      var url = 'http://dev.precepthealth.ch:8079/REST/CALLMLM?mlmName=SIRS-Notification1&mlmInstitution=Medexter Healthcare, Vienna, Austria';
      $('#sirs1Button').click(function(e) {
      $.ajax({
        url: url,
        type:'POST',
        dataType:'json',
        headers: {
         'Authorization':'Basic YWRtaW46czNjcmV0',
         'Accept':'application/json',
         'Content-Type':'application/json'
        },
        data: JSON.stringify({ "type": "number", "primaryTime": null, "applicability": 1, "value": 0 })

      }).done( function(data) {
        var msg = data.value;
        $("#sirs1ButtonDialogText").text("value:" + msg);
        $(function(data) {
         $("#sirs1ButtonDialog").dialog();
           title: "SIRS test result"
        });
        console.log(data);
        console.log(data.value);
      })
    })
    }),

    runMLM2Button: $(function() {
      var url = 'http://dev.precepthealth.ch:8079/REST/CALLMLM?mlmName=SIRS-Notification2&mlmInstitution=Medexter Healthcare, Vienna, Austria';
      $('#runMLM2Button').click(function(e) {
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
        data: JSON.stringify({ "type": "number", "primaryTime": null, "applicability": 1, "value": 123 })

      }).done( function(data) {
        var msg = data.value;
        $("#runMLM2ButtonDialogText").text("value:" + msg);
        $(function(data) {
         $("#runMLM2ButtonDialog").dialog();
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


     SIRS1TableGrid: function () {
     var lastsel2;
       return grid.jqGrid ({
         url: './php/sirs1Table.php?action=get',
         datatype: 'json',
         method: 'POST',
         loadonce: true,
         shrinkToFit: false,
         width: 500,
         colNames: ['id','Patient ID','Temp.','Heart rate','Resp. rate','PaCO2','WB cell count','Immature band'],
         colModel: [
           {name: 'id', index: 'id', key: 'true',hidden:true},
           {name: 'IDPatient', index: 'IDPatient'},
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
         editurl: './php/sirs1Table.php?action=edit',
         onSelectRow: function(id) {
           if(id && id!=lastsel2) {
             grid.restoreRow(lastsel2);
             grid.editRow(id,true);
             lastset2=id;
           }
         },
      });
     } 
   } 
 });
