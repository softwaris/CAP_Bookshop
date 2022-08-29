sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.demo.bookshop.controller.PeopleList", {

		onInit: function () {
			var peopleModel = this.getOwnerComponent().getModel("people");
			var bindings = peopleModel.getAllBindings();
		},

		onFilterInvoices: function (oEvent) {
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("UserName", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("peopleList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		onPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail", {
				invoicePath: window.encodeURIComponent(oItem.getBindingContext("people").getPath().substr(1))
			});
		}
	});

});