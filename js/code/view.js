var lib = require("./library.js");

class View {
    
    // numTemplates, dataKey - optional parameters for flexible rendering options 
    // numTemplates - render same template several times
    // datakey - for searching in data.json for specific key 
    
    constructor(viewRenderer, viewId, parentNode="app", numTemplates, dataKey, data) {
        this._viewId = viewId;
        this._parentNode = parentNode;

        this._viewRenderer = viewRenderer;
        this._numTemplates = numTemplates;
        this._dataKey = dataKey;
        
        this._childViews = [];
        this._content = null;

        this._data = data;
        console.log(this._data);
    }

    get Id() {
        return this.viewId;
    }

    get parentNode() {
        return this.parentNode;
    }
    
    get childViews() {
        return this._childViews;
    }

    set parentNode(node) {
        this._parentNode = node;
    } 

    addChildView(view) {
        this._childViews.push(view);
    }

    removeView() {
        if (typeof(this._parentNode) == "string") {
            this._parentNode = document.getElementById(this._parentNode);
        }

        this._parentNode.innerHTML = "";
    }

    renderView() {
        if (typeof(this._parentNode) == "string") {
            this._parentNode = document.getElementById(this._parentNode);
        }

        if (this._numTemplates == undefined) this._numTemplates = 1;

        if (this._content == null) {
            for (var i = 0; i < this._numTemplates; i++) {
                this._content = this._viewRenderer.getViewContent(this._viewId, this._dataKey,i,this._data);
                lib.append(this._parentNode, this._content);
            }
        }

        if (this.childViews != undefined) {
            for (var i=0; i < this._childViews.length; i++) {
                this._childViews[i].renderView();
            }
        }
    } 
}

module.exports = View;