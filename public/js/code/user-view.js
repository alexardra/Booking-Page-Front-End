let View = require("./view.js");
let lib = require("./library.js");
let Visuals = require("./visual.js");

class UserView extends View {

    constructor(id) {
        super();
        let signup = document.getElementById("signup-container");
        if (signup != undefined) {
            let signupParent = signup.parentNode;
            signupParent.removeChild(signup);
        }
        this._id = id;
    }

    constructView(viewRenderer) {
        this._viewRenderer = viewRenderer;
        let userView = this;

        let jsonToSend = {"id" : this._id};
        lib.sendJson(jsonToSend, "/userinfo.json", function(json) {
            let personalInfo = new View(viewRenderer, "user-template", "app", 1, undefined, json);
            personalInfo.renderView();
            userView.renderAboutMe();
            userView.listen();
        });
        
    }

    listen() {
        let userView = this;
        let infoContainer = document.getElementById("personal-info-container");
        let submitButton = infoContainer.getElementsByTagName("button")[0];

        submitButton.addEventListener("click", function() {
            let textarea = infoContainer.getElementsByTagName("textarea")[0];
            let text = textarea.value;

            let jsonToSend = {
                "text" : text, 
                "id" : userView._id
            };

            lib.sendJson(jsonToSend,"/aboutUser.json", function(json) {
                if (json["status"] == "success") {
                    userView.renderAboutMeContainer(text);
                }
            });
        });
    }

    renderAboutMe(aboutMe) {
        let userView = this;
        let infoContainer = document.getElementById("personal-info-container");
        if (aboutMe == undefined) {
            userView.renderTextArea(infoContainer);
        } else {
            userView.renderAboutMeContainer(aboutMe);
        }
    }

    renderTextArea(parent) {
        let textareaView = new View(this._viewRenderer,"personal-info-textarea-template", parent);
        textareaView.renderView();
        this._textareaView = textareaView;
    }

    renderAboutMeContainer(text) {
        let infoContainer = document.getElementById("personal-info-container");
        let submitButton = infoContainer.getElementsByTagName("button")[0];
        let textarea = infoContainer.getElementsByTagName("textarea")[0];
        infoContainer.removeChild(submitButton);
        infoContainer.removeChild(textarea);

        let jsonToRender = {
            "about me" : "About Me : ", 
            "text" : text
        }
        let aboutMeView = new View(this._viewRenderer, "personal-info-template", infoContainer, 1, undefined, jsonToRender);
        aboutMeView.renderView();
    }
}

module.exports = UserView;
