var ViewRenderer = function(templates, data, startView) {

    var currentView; // initialize in init 

    return {

        /* Render startView - if startView is undefined render default view */
        init : function() {
            getScript("view.js", function() {
                console.log("view renderer init");
                var v = new View("navigation-page");
                v.renderView();
            });
        },

        /* Change current view and render new one */
        changeView : function(currentView, viewToRender) {

        }
    }
}