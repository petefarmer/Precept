/**
 * Precept Demo's entry point and main loop.
 * @module app/main
 */
define(function (require) {

// Disable closing forms by clicking overlay.
//    $.jqm.params.closeoverlay = false;

// Load all the 3rd-party modules
    var g = require('jqgrid');
    var l = require('en');
    var ts = require('themeswitcher');
    var ms = require('jquerymultiselect');
    var msf = require('jquerymultiselectfilter');
    
// turn on themeswitcher
    $("#switcher").themeswitcher({
       imgPath: './img/themeImages/'
    });
    
    var drg = require('./drgTable');
    drg.setGrid("#drg_table");
    drg.DRGTableGrid();
    $('#drg_table_container').draggable();
    
    $('#tabs').tabs({});
});
