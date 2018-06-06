getScript("router.js", function() {
    Router.config({mode: "hash"});
    Router.navigate();	
    Router.listen();

    Router.add("about", function() {
        console.log("change to about page");    
    });

    Router.add("flights", function() {
        console.log("---");
    });


});