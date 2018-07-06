let View = require("./view.js");
let lib = require("./library.js");
let Visuals = require("./visual.js");

class DestinationsView extends View {

    constructor(info,section){
		super();
		this._info = info; // json to render 
		this._section = section;
    }

    constructView(viewRenderer) {
		this._viewRenderer = viewRenderer;

		let navigationPage = new View(viewRenderer, "destinations-navigation-page", "app");
		navigationPage.renderView();

        Visuals.renderBrowseSectionWithInfo(viewRenderer,navigationPage,this._info, this._section);
		Visuals.renderAdditionalsSection(viewRenderer,navigationPage);
	}

}

module.exports = DestinationsView;
