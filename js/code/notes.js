let lib = require("./library");
let View = require("./view.js");

module.exports = {
    listen : function(viewRenderer) {
        console.log(viewRenderer);
        let notesIcons = document.getElementsByClassName("notes-icon");
        let numNotesIcons = notesIcons.length;

        console.log("---");

        for (let i = 0; i < numNotesIcons; i++) {
            notesIcons[i].addEventListener("click", function() {
                
                let notesSideBar = document.getElementById("notes-side-bar");
                if (notesSideBar == undefined) {
                    console.log("-");

                    let usernamePlaceholder = document.querySelector("#user-pages ul li a");
                    if (usernamePlaceholder == undefined) {
                        console.log("not logged in");
                    } else {
                        
                        let jsonToSend = {
                            "search type" : "notes",
                            "username" : usernamePlaceholder.innerHTML
                        }
                        lib.sendJson(jsonToSend,"/searchnotes.json", function(json) {
                            let numSections = json["section headings"].length;

                            // create div id=notes-side-bar
                            let notesContainer = createNotesContainer(json["heading"]);

                            // create sections in notes-side-bar
                            let sections = new View(viewRenderer,"notes-section-template",notesContainer,numSections,"section headings",json);
                            sections.renderView();

                            let content = json["section contents"];
                            // console.log(content);
                            let lists = document.querySelectorAll(".notes-section-container ul")

                            for (let i = 0; i < numSections; i++) {
                                let currentContent = content[i];
                                console.log(currentContent);
                                let numNotes = currentContent["section"].length;
                                console.log(numNotes);
                                let parentList = lists[i];

                                let currentView = new View(viewRenderer,"note-container-template", parentList, numNotes,"section",currentContent);
                                // console.log(currentView);
                                sections.addChildView(currentView);
                                currentView.renderView(currentContent);

                                let ds = document.getElementsByClassName("note-content");
                                for (let i = 0; i < ds.length; i++) {
                                    ds[i].addEventListener("click", function() {
                                        let dropdown = ds[i].parentNode.getElementsByClassName("note-dropdown")[0];
                                        lib.removeClass(dropdown,"hidden");
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
    }
}

function createNotesContainer(heading) {
    // create div id=notes-side-bar
    let notesContainer = document.createElement("div");
    notesContainer.setAttribute("id","notes-side-bar");
    
    let pageContainer = document.getElementById("app");
    pageContainer.parentNode.insertBefore(notesContainer,pageContainer);
    
    let notesHeading = document.createElement("h2");
    notesHeading.innerHTML = heading;
    notesContainer.appendChild(notesHeading);  
    
    return notesContainer;
}