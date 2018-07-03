let lib = require("./library.js");
let View = require("./view.js");

module.exports = {
        
     renderAdditionalsSection : function(viewRenderer,parentTemplate) {
        let additionalsContainer = new View(viewRenderer, "additionals-template", "additionals-container");

        let servicesList = new View(viewRenderer, "service-template", "services-container", 4, "services");
        additionalsContainer.addChildView(servicesList);

        parentTemplate.addChildView(additionalsContainer);
        additionalsContainer.renderView();

        let elements = document.getElementsByClassName("service-container");
        lib.addClass(elements[0].children[0],"service-discover-icon");
        lib.addClass(elements[1].children[0],"service-reviews-icon");
        lib.addClass(elements[2].children[0],"service-money-icon");
        lib.addClass(elements[3].children[0],"service-booking-icon");
    },

    renderBrowseSection : function(viewRenderer, parentTemplate, url) {

        lib.getJsonWithFetch(url, function(data) {
            let browse = new View(viewRenderer, "browse-template", "browse", 5, "sections", data);
            parentTemplate.addChildView(browse);
            browse.renderView();
        
            let browseSectionUls = document.querySelectorAll(".browse-section ul");
            let numbrowseSectionUls = browseSectionUls.length;
            for (let i = 0; i < numbrowseSectionUls; i++) {
                for (let j = 0; j < 4; j++) {
                    let sectionInfo = data["sections"][i]["overviews"][j];
                    let section = new View(viewRenderer,"section-element-template",browseSectionUls[i],1,undefined,sectionInfo);
                    browse.addChildView(section);
                    section.renderView();
                }
            }

        });
    }

}