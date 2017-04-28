/**
 * Precept Demo's entry point and main loop.
 * @module app/main
 */
define(function (require) {

// Disable closing forms by clicking overlay.
//    $.jqm.params.closeoverlay = false;

// Load all the 3rd-party modules
//    var g = require('jqgrid');
//    var g = require('jqgrid');
    var l = require('en');
    var ts = require('themeswitcher');
    var ms = require('jquerymultiselect');
    var msf = require('jquerymultiselectfilter');
    
// turn on themeswitcher
    $("#switcher").themeswitcher({
       imgPath: './img/images/'
    });
    
    var drg = require('./drgTable');
    drg.setGrid("#drg_table");
    drg.setPager("#drg_pager");
    drg.DRGTableGrid();
    $('#drg_table_container').draggable();
    
    var sirs1 = require('./sirs1Table');
    sirs1.setGrid("#sirs1_table");
    sirs1.setPager("sirs1_pager");
    sirs1.SIRS1TableGrid();
//    sirs1.patientMenu();
    $('#sirs1_table_container').draggable();

    var sirs2 = require('./sirs2Table');
    sirs2.setGrid("#sirs2_table");
    sirs2.setPager("sirs2_pager");
    sirs2.SIRS2TableGrid();
    sirs2.patientMenu();
    $('#sirs2_table_container').draggable();


    $(function() {
      var tabs = $('#tabs').tabs();
      tabs.find(".ui-tabs-nav").sortable({
        axis: "x",
        stop: function() {
          tabs.tabs("refresh"); 
        }
      });
    });
    function UserAction() {
      var xhttp = new XMLHttpRequest();
          xhttp.open("POST", "Your Rest URL Here", false);
          xhttp.setRequestHeader("Content-type", "application/json");
          xhttp.send();
      var response = JSON.parse(xhttp.responseText);
    }

});
