getScript("router.js", function() {
    Router.config({mode: "hashc"});
    Router.navigate();	
    Router.listen();

    Router.add("about", function() {
        console.log("change to about page");
    });

});