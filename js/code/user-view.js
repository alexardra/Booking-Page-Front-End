let View = require("./view.js");
let lib = require("./library.js");
let Visuals = require("./visual.js");

class UserView extends View {

    constructor(id) {
        super();
        let signup = document.getElementById("signup-container");
        let signupParent = signup.parentNode;
        signupParent.removeChild(signup);
        this._info = this.getInfo(id);
    }


    getInfo(id) {
        console.log(id);
    }

    constructView(viewRenderer) {

    }

}

module.exports = UserView;
