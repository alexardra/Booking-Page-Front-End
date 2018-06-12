var lib = require("./library.js");

var View = function (viewId, parentNode, viewRenderer, numTemplates, dataKey) {

    var childViews = [];
    var content = null;

    return {
        getId : function() {
            return viewId;
        },
        
        getParentNode : function() {
            return parentNode;
        },

        getChildViews : function() {
            return childViews;
        },

        addChildView : function(view) {
            childViews.push(view);
        },

        isConstructed : function() {
            return isConstructed;
        },

        setParentNode : function(node) {
            parentNode = node;
        },
        
        removeView : function() {
            console.log("remove view " + viewId);
            if (typeof(parentNode) == "string") {
                parentNode = document.getElementById(parentNode);
            }

            parentNode.innerHTML = "";
        },

        renderView : function() {

            if (typeof(parentNode) == "string") {
                parentNode = document.getElementById(parentNode);
            }

            if (numTemplates == undefined) numTemplates = 1;

            if (content == null) {
                for (var i = 0; i < numTemplates; i++) {
                    content = viewRenderer.getViewContent(viewId, dataKey,i);
                    lib.append(parentNode, content);
                }
            }

            for (var i=0; i < childViews.length; i++) {
                childViews[i].renderView();
            }
        }

    }

}

module.exports = View;