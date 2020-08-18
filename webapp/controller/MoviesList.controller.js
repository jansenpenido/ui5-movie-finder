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

		onPressNavBack: function (oEvent) {
			window.history.go(-1)
		}
	});
});