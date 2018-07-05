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

    browseSectionDragListen : function() {
        let dragFromElements = document.getElementsByClassName("section-element");
        let numDragFromElements = dragFromElements.length;
        
        for (let i = 0; i < numDragFromElements; i++) {
            dragFromElements[i].addEventListener("dragstart", function(evnt) {
                let infoContainers = this.getElementsByTagName("span");
                let numInfo = infoContainers.length;
                let keys = ["name","reviews","place"];
                for (let j = 0; j < numInfo; j++) {
                    evnt.dataTransfer.setData(keys[j], infoContainers[j].innerHTML);
                }
            });
        }
    },

    renderBrowseSectionWithInfo(viewRenderer, parentTemplate, data) {
        let visuals = this;
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
                visuals.browseSectionDragListen();
            }
        }        
    },

    renderBrowseSection : function(viewRenderer, parentTemplate, url) {
        let visuals = this;

        lib.getJsonWithFetch(url, function(data) {
            visuals.renderBrowseSectionWithInfo(viewRenderer, parentTemplate, data)
        });
    }
}