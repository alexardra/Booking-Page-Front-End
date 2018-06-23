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
    }

    renderHeader() {
		var headerTemplate = lib.constructTemplate(this._templates,"home-header");
        var output = Mustache.render(headerTemplate,this._data);
		lib.append(document.getElementsByTagName("header")[0],output);
    }

    /* Remove current view and render new one */
    changeView(viewToRender) {
        this._currentView.removeView();
        viewToRender.constructView(this);
        this._currentView = viewToRender;
    }

    /* if datakey is specified, should search in data for
        specified value, otherwise render from data */
    getViewContent(viewId, dataKey, templateIndex) {
        var template = lib.constructTemplate(this._templates, viewId);
        if (dataKey == undefined) {
            var output = Mustache.render(template, this._data);
        } else {
        if (this._numTemplates == undefined) this._numTemplates = 1;
            var output = Mustache.render(template, this._data[dataKey][templateIndex]);
        }
        return output;
    }

}



module.exports = ViewRenderer;