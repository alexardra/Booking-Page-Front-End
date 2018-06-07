var ViewRenderer = function(templates, data, startView) {

    var currentView; // initialize in init 

    function renderHeader(data) {
		var headerTemplate = constructTemplate(templates,"home-header");
        var output = Mustache.render(headerTemplate,data);
        console.log("render header");
		append(document.getElementsByTagName("header")[0],output);
    }
    
    /* Render default view */
    function temp(viewRenderer) {
        var navigationPage = new View("navigation-page", "app", viewRenderer);
        var searchBar = new View("search-bar-template", "cover", viewRenderer);
        navigationPage.addChildView(searchBar);
        var recentlyViewedDropdown = new View("recently-viewed-dropdown","search-container", viewRenderer);
        searchBar.addChildView(recentlyViewedDropdown);

        var recentlyViewedElem = new View("recently-viewed-elem", "search-dropdown", viewRenderer, 2,"recently viewed info");
        recentlyViewedDropdown.addChildView(recentlyViewedElem);

        var otherFilterDropdown = new View("other-filter-dropdown-elem", "other-dropdown", viewRenderer, 3, "dropdown details");
        searchBar.addChildView(otherFilterDropdown);

        var calendarDropdown = new View("calendar-dropdown", "calendar-container", viewRenderer);
        searchBar.addChildView(calendarDropdown);

        navigationPage.renderView();
    }

    return {

        /* Render startView - if startView is undefined render default view */
        init : function() {
            viewRenderer = this;
            getScript("view.js", function() { // imported 
                renderHeader(data);
                temp(viewRenderer);
                console.log("all rendered");
            });
        },

        /* Change current view and render new one */
        changeView : function(currentView, viewToRender) {

        },

        /* if datakey is specified, should search in data for
           specified value, otherwise render from data */
        getViewContent : function(viewId, dataKey, templateIndex) {
            var template = constructTemplate(templates, viewId);
            if (dataKey == undefined) {
                var output = Mustache.render(template, data);
            } else {
                var output = Mustache.render(template, data[dataKey][templateIndex]);
            }
            return output;
        }
    }
}