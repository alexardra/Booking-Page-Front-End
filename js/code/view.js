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

        setParentNode : function(node) {
            parentNode = node;
        },
        
        removeView : function() {
            console.log("remove view " + viewId);

        },

        renderView : function() {

            if (typeof(parentNode) == "string") {
                parentNode = document.getElementById(parentNode);
            }

            if (numTemplates == undefined) numTemplates = 1;

            if (content == null) {
                for (var i = 0; i < numTemplates; i++) {
                    content = viewRenderer.getViewContent(viewId, dataKey,i);
                    append(parentNode, content);
                }
            }

            for (var i=0; i < childViews.length; i++) {
                childViews[i].renderView();
            }
        }

    }

}