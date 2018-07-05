let lib = require("./library");
let View = require("./view.js");

module.exports = {
    listen : function(viewRenderer) {

        let notesIcons = document.getElementsByClassName("notes-icon");
        let numNotesIcons = notesIcons.length;


        let sideBarView;

        for (let i = 0; i < numNotesIcons; i++) {
            notesIcons[i].addEventListener("click", function() {
                
                let notesSideBar = document.getElementById("notes-side-bar");
                if (notesSideBar == undefined) {

                    
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
                            sideBarView = new View(viewRenderer,"notes-section-template",notesContainer,numSections,"section headings",json);
                            sideBarView.renderView();

                            let content = json["section contents"];
                            let lists = document.querySelectorAll(".notes-section-container ul")

                            for (let i = 0; i < numSections; i++) {
                                let currentContent = content[i];
                                let numNotes = currentContent["section"].length;
                                let parentList = lists[i];

                                let currentView = new View(viewRenderer,"note-container-template", parentList, numNotes,"section",currentContent);
                                sideBarView.addChildView(currentView);
                                currentView.renderView(currentContent);

                            //     let ds = document.getElementsByClassName("note-content");
                            //     for (let i = 0; i < ds.length; i++) {
                            //         console.log(ds[i]);
                            //         console.log(ds[i].getElementsByTagName("span")[0]);
                            //         ds[i].getElementsByTagName("span")[0].addEventListener("click", function(evnt) {
                            //             evnt.stopPropagation();
                            //             let dropdown = ds[i].parentNode.getElementsByClassName("note-dropdown")[0];
                            //             lib.removeClass(dropdown,"hidden");
                            //         });
                            //         ds[i].getElementsByTagName("i")[0].addEventListener("click", function() {
                            //             console.log("delete");
                            //         });
                            //     }
                            }
                            sectionDragAndDrop(viewRenderer);
                        });
                    }
                } else {
                    notesSideBar.parentNode.removeChild(notesSideBar);
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


function sectionDragAndDrop(viewRenderer) {
    let dropToElement = document.getElementById("notes-side-bar");

    dropToElement.addEventListener("dragover", function(evnt) {
        // allow drag
        evnt.preventDefault();
    });

    dropToElement.addEventListener("drop",function(evnt) {
        let name = evnt.dataTransfer.getData("name").trim();
        let reviews = evnt.dataTransfer.getData("reviews").trim();
        let place = evnt.dataTransfer.getData("place").trim();

        let currentPage = document.getElementsByClassName("current-page")[0].parentNode.href;
        let link = currentPage.substring(currentPage.indexOf("#") + 1);
        let url = "#" + link.substring(0,link.length-1) + "=" + encodeURI(name);
        console.log(url);
        let renderJson = {
            "section" : [
                { 
                    "name" : name,
                    "url" : url,
                    "place" : place,
                    "reviews" : reviews,
                    "note" : ""
                }
            ]
        }
        let index = ["hotels","rentals","flights","restaurants","things-to-do"].indexOf(link);
        let notesSectionContainer = document.getElementsByClassName("notes-section-container")[index];
        let parentToAppend = notesSectionContainer.getElementsByTagName("ul")[0];
        let currentView = new View(viewRenderer,"note-container-template",parentToAppend,1,"section",renderJson);
        currentView.renderView();
    });
}