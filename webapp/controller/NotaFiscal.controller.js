sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  (Controller, JSONModel, formatter, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.NotaFiscal", {
      formatter: formatter,

      onInit() {
        let oModel = new JSONModel({
          currency: "BRL",
        });
        this.getView().setModel(oModel, "view");
        //this.getView().setModel(oViewModel, "view");
      },

      onOpenFragment: function (oEvent, obj) {
        this.oMyFirstDialog ??= this.loadFragment({
          name: "ui5.walkthrough.view.NotaFiscalDetail",
        }).then(function (oMyFirstDialog) {
          return oMyFirstDialog;
        });
        this.oMyFirstDialog.then(function (oDialog) {
          const oTextModel = new JSONModel(obj,{currency: "BRL"});
          oDialog.setModel(oTextModel, "notaFiscalModel");
          oDialog.open();
        });
      },

      
      onCloseDialog() {
        // note: We don't need to chain to the pDialog promise, since this event handler
        // is only called from within the loaded dialog itself.
        this.byId("notaFiscalDetail").close();
      },

      onFilterNotaFiscal(oEvent) {
        // build filter array
        const aFilter = [];
        const sQuery = oEvent.getParameter("query");
        console.log('sQuery',sQuery)
        if (sQuery) {
          aFilter.push(
            new Filter("numero", FilterOperator.Contains, sQuery)
          );
        }

        // filter binding
        const oList = this.byId("notaFiscalList");
        const oBinding = oList.getBinding("items");
        oBinding.filter(aFilter);
      },
    });
  }
);
