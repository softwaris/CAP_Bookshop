sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"sap/m/IllustrationPool"
], function (Controller, JSONModel, Fragment, IllustrationPool) {
	"use strict";

	return Controller.extend("sap.ui.demo.bookshop.controller.App", {

		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());

			var oView = this.getView();

			this.oModel = new JSONModel({
				bIsExpiring: true,
				iSecondsLeft: 99
			});

			oView.setModel(this.oModel, "timeout");

			//var invoiceModel = this.getOwnerComponent().getModel("invoice");
			//invoiceModel.attachRequestCompleted(this.resetTimeOutDialog, this);	
			
			var peopleModel = this.getOwnerComponent().getModel("people");
			// peopleModel.attachSessionTimeout(this.resetTimeOutDialog, this);
			// var promise = peopleModel.getMetaModel().requestObject("/");
			// promise.then(this.setTimeOutDialog);

			var bindings = peopleModel.getAllBindings();

		},

		setTimeOutDialog: function () {
			// var self = this;
			// this.intervalHandle = setInterval(function () {
			//    self.handleOpenDialog();
			// }, 10000);
		 },
   
		 resetTimeOutDialog: function () {
			clearInterval(this.intervalHandle);
			this.setTimeOutDialog();
		 },

		handleOpenDialog : function () {
/* 			if (!this._oDialog) {
				Fragment.load({
					name: "sap.ui.demo.walkthrough.view.TimeOutDialog",
					controller: this
				}).then(function (oDialog) {
					this._oDialog = oDialog;

					this.getView().addDependent(this._oDialog);

					this.onDialogOpen();
				}.bind(this));
			} else {
				this.onDialogOpen();
			} */
		},

		onDialogOpen : function () {
			this._oDialog.open();
			this._startCounter();
		},

		onDialogClose : function () {
			this._oDialog.close();
			this._stopCounter();
			this.setTimeOutDialog();
		},

		onContinueWork: function () {
			//this.getOwnerComponent().getModel("people").refresh();
			this._oDialog.close();
			this._stopCounter();        
		 },		

		onExit: function () {
			this._stopCounter();
		},

		_decrementCounter : function () {
			this._onUpdateStatus();
			if (this.iSeconds === 0) {
				this._stopCounter();
				this._onCounterEnd();
				clearInterval(this.intervalHandle);
				return;
			}
			this.iSeconds--;
		},

		_startCounter : function () {
			this.iSeconds = 5;
			this._onCounterStart();
			clearInterval(this.oTimer);
			this.oTimer = setInterval(this._decrementCounter.bind(this), 1000);
		},

		_stopCounter : function () {
			clearInterval(this.oTimer);
			this.oTimer = null;
		},

		_onUpdateStatus : function () {
			this.getView().getModel("timeout").setProperty('/iSecondsLeft', this.iSeconds);
		},

		_onCounterStart : function () {
			this.getView().getModel("timeout").setProperty('/bIsExpiring', true);
			this.getView().getModel("timeout").setProperty('/iSecondsLeft', this.iSeconds);
			this.iSeconds--;
		},

		_onCounterEnd : function () {
			this.getView().getModel("timeout").setProperty('/bIsExpiring', false);
		}		

	});

});