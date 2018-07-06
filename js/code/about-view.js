let View = require("./view.js");
let lib = require("./library.js");
let Visuals = require("./visual.js");

class DestinationsView extends View {

    constructor(info) {
		super();
		this._info = info; // json to render 
    }

    constructView(viewRenderer) {
		this._viewRenderer = viewRenderer;

        let navigationMenu = new View(viewRenderer, "about-nav-bar-template", "app", 1, undefined, this._info);
        let aboutSection = new View(viewRenderer, "contact-us-template", "contact-container", 1, undefined, this._info);
        navigationMenu.addChildView(aboutSection);

        navigationMenu.renderView();

        Visuals.renderAdditionalsSection(viewRenderer,navigationMenu);

        this.listen();
    }
    
    listen() {
        let container =  document.getElementById("contact-container");
        let submitButton = container.getElementsByTagName("button")[0];

        submitButton.addEventListener("click", function(evnt) {
            evnt.preventDefault();
            
            let inputs = container.getElementsByTagName("input");

            let name = inputs[0].value;
            let email = inputs[1].value;

            let textarea = document.getElementsByTagName("textarea")[0];
            let text = textarea.value;

            let jsonToSend = {
                "name" : name,
                "email" : email,
                "text" : text
            }
            lib.sendJson(jsonToSend,"/contact.json", function(json) {
            });

        });

    }

}

module.exports = DestinationsView;
