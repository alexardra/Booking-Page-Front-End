var lib = require("./library.js");
var View = require("./view.js");
var HotelsView = require("./hotels-view.js");

class ViewRenderer {

    constructor(templates, data, startView) {
        this._templates = templates;
        this._data = data;
        this._startView = startView;

        this.renderHeader();

        // render start view
        startView.constructView(this);
        this._currentView = startView;
        
        this.renderFooter();
    }

    renderHeader() {
        let headerTemplate = lib.constructTemplate(this._templates,"home-header");
        let header = document.getElementsByTagName("header")[0];
        let authentication = new View(this,"header-authentication",header);
        let authentificationDropdown = new View(this, "authentification-dropdown-element",
            "authentication-dropdown");
        authentication.addChildView(authentificationDropdown);

        authentication.renderView();
        let output = Mustache.render(headerTemplate,this._data);
		lib.append(header,output);
    }

    renderFooter() {
        let footerTemplate = lib.constructTemplate(this._templates,"home-footer");
        let output = Mustache.render(footerTemplate,this._data);
        lib.append(document.getElementsByTagName("footer")[0],output);
    }

    /* Remove current view and render new one */
    changeView(viewToRender) {
        this._currentView.removeView();
        viewToRender.constructView(this);
        this._currentView = viewToRender;
    }

    changeChildView(viewToChangeId, viewToRender){
        document.getElementById(viewToChangeId).innerHTML = "";
        viewToRender.renderView();   
    }

    /* if datakey is specified, should search in data for
        specified value, otherwise render from data 
        
        if data is specified, should render from that data.
        if not - render from existing data in this view-renderer
    */
    getViewContent(viewId, dataKey, templateIndex, data) {
        if (data == undefined) {
            data = this._data;
        } 
        var template = lib.constructTemplate(this._templates, viewId);
        if (dataKey == undefined) {
            var output = Mustache.render(template, data);
        } else {
        if (this._numTemplates == undefined) this._numTemplates = 1;
            var output = Mustache.render(template, data[dataKey][templateIndex]);
        }
        return output;
    }

    // addData(newData) {
    //     Object.assign(this._data,newData);
    // }
}



module.exports = ViewRenderer;