sap.ui.define([
    "sap/ui/core/mvc/Controller"
 ], function (Controller) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.Overview", {
 
       onInit: function () {
          this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
 
       }
 
    });
 });