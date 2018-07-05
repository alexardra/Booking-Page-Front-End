let View = require("./view.js");
let lib = require("./library.js");
let Visuals = require("./visual.js");

class DestinationsView extends View {

    constructor(info,section){
		super();
		this._info = info; // json to render 
		this._section = section;
		this.fillInfo();
    }

    constructView(viewRenderer) {
		this._viewRenderer = viewRenderer;

		let navigationPage = new View(viewRenderer, "destinations-navigation-page", "app");
		navigationPage.renderView();

        Visuals.renderBrowseSectionWithInfo(viewRenderer,navigationPage,this._info);
		Visuals.renderAdditionalsSection(viewRenderer,navigationPage);
	}
	
	fillInfo() {
		console.log(this._info);
		console.log(this._section);

		let browseSections = this._info["sections"];
		let numBrowseSections = browseSections.length;

		for (let i = 0; i < numBrowseSections; i++) {
			let overviews = browseSections[i]["overviews"];
			let numOverviews = overviews.length;

			for (let j = 0; j < numOverviews; j++) {
				overviews[j]["section"] = this._section;
			}
		}

		console.log(this._info);
	}
}

module.exports = DestinationsView;
