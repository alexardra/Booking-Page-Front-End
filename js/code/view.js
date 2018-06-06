var View = function (viewId) {

    var id = viewId;
    var parentNode = null; // could change (?)
    var childViews = [];

    return {
        getId : function() {
            return id;
        },
        
        getParentNode : function() {
            return parentNode;
        },

        getChildViews : function() {
            return childViews;
        },

        addChildView : function() {

        },

        removeView : function() {
            console.log("remove view " + id);
        },

        renderView : function() {
            console.log("render view " + id);
        }

    }

}