sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter"
], function(Controller, formatter) {
	"use strict";

	return Controller.extend("sap.ui.demo.basicTemplate.controller.App", {

		formatter: formatter,

		onChangeDarkTheme: function (oEvent) {
			sap.ui.getCore().applyTheme(oEvent.getParameter("state") ? "sap_fiori_3_dark" : "sap_fiori_3")
		},

		onSearchHome : function (oEvent) {
			this.byId("page").setBusy(true)

			const oModel = new sap.ui.model.json.JSONModel()

			let sQuery = oEvent.getParameter("query").toLowerCase().replace(" ", "+")
			let sCallUrl = '/api/search/?s=' + sQuery

			oModel.loadData(sCallUrl)
			oModel.attachRequestCompleted(this._handleSearchCompleted, this)
		},

		_handleSearchCompleted : function (oEvent) {
			let oData = oEvent.getSource().getData()
			console.log(oData)

			this.byId("page").setBusy(false)

			if (!!oData.Response && oData.Response == "False") {
				return
			}

			this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(oData), "mMovies")			

			sap.ui.core.UIComponent.getRouterFor(this).navTo("moviesList")
		},

	});
});