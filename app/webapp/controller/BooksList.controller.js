sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.demo.bookshop.controller.BooksList", {

		onInit: function () {
			var peopleModel = this.getOwnerComponent().getModel("books");
			var bindings = peopleModel.getAllBindings();
		},

		onFilterBooks: function (oEvent) {
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("BookName", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("booksList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		onPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail", {
				invoicePath: window.encodeURIComponent(oItem.getBindingContext("books").getPath().substr(1))
			});
		}
	});

});