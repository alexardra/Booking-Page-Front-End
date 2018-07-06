let View = require("./view.js");
let lib = require("./library.js");

class RestaurantView extends View {

    constructor(info) {
        super();
        this._info = info;
    }


    constructView(viewRenderer) {
        this._viewRenderer = viewRenderer;
        let cover = new View(viewRenderer,"restaurant-header","app",undefined,undefined,this._info);

        let overview = new View(viewRenderer,"restaurant-overview","app", undefined,undefined,this._info);
        cover.addChildView(overview);

        let reviewProgressBarList = new View(viewRenderer,"review-bar","review-bars",5,"review types", this._info);
        overview.addChildView(reviewProgressBarList);

        let ratingProgressBarList = new View(viewRenderer,"review-bar","rating-bars",4,"review ratings", this._info);
        overview.addChildView(ratingProgressBarList);

        let comments = new View(viewRenderer,"comment-section","comments-container",4,"comments", this._info);
        overview.addChildView(comments);

        let details = new View(viewRenderer,"restaurant-details","app",undefined,undefined, this._info);
        cover.addChildView(details);

        let contactInfo = new View(viewRenderer,"details-contact-info","details-info",4,"contact information", this._info);
        details.addChildView(contactInfo);

        let additionalInfo = new View(viewRenderer,"details-contact-info","details-info",3,"details additional information", this._info);
        details.addChildView(additionalInfo);

        let openHours = new View(viewRenderer,"details-contact-info","details-open-hours",7,"details open hours", this._info);
        details.addChildView(openHours);

        let nearby = new View(viewRenderer,"restaurant-nearby","app", undefined,undefined, this._info);
        cover.addChildView(nearby);

        let nearbyRestaurants = new View(viewRenderer,"restaurants-nearby","nearby",undefined,undefined,this._info);
        nearby.addChildView(nearbyRestaurants);

        let nearbyRestaurantsList = new View(viewRenderer,"nearby-section","nearby-restaurants-container",4,"nearby restaurants", this._info);
        nearbyRestaurants.addChildView(nearbyRestaurantsList);

        let nearbyHotels = new View(viewRenderer,"hotels-nearby","nearby",undefined,undefined,  this._info);
        nearby.addChildView(nearbyHotels);
        let nearbyHotelsList = new View(viewRenderer,"nearby-section","nearby-hotels-container",4,"nearby hotels", this._info);
        nearbyHotels.addChildView(nearbyHotelsList);

        let nearbyAttractions = new View(viewRenderer,"attractions-nearby","nearby",undefined,undefined,  this._info);
        nearby.addChildView(nearbyAttractions);
        let nearbyAttractionsList = new View(viewRenderer,"nearby-section","nearby-attractions-container",4,"nearby attractions", this._info);
        nearbyAttractions.addChildView(nearbyAttractionsList);

        let qna = new View(viewRenderer,"restaurant-qna","app", undefined,undefined, this._info);
        cover.addChildView(qna);

        let questions = new View(viewRenderer,"restaurant-qna-comment","qna-questions",3,"q&n", this._info);
        qna.addChildView(questions);

        cover.renderView();

        this.assignPercentsToProgressBars();
        this.listen();
    }

    assignPercentsToProgressBars() {
        let reviewsInfo = this._info["review types"];
        let ratingInfo = this._info["review ratings"];
        let progressBars = document.getElementsByTagName("progress");
        let numProgressBars = progressBars.length;

        for (let i = 0; i < 5; i++) {
            let currentPercentValue = reviewsInfo[i]["value"];
            progressBars[i].value = currentPercentValue.substring(0,currentPercentValue.indexOf("%"));
        }

        for (let i = 0; i < 4; i++) {
            let currentPercentValue = (parseInt(ratingInfo[i]["value"]) / 5) * 100;
            progressBars[i + 5].value = currentPercentValue;
        }
    }

    listen() {
        this.addQuestion();
    }

    addQuestion() {
        let restaurantView = this;
        let buttonParent = document.getElementById("qna-header");
        let qnaQuestions = document.getElementById("qna-questions");

        let addQuestionButton = buttonParent.getElementsByTagName("button")[0];

        addQuestionButton.addEventListener("click", function() {
    
            if (qnaQuestions.childNodes[0].tagName == undefined) {
                let textarea = document.createElement("textarea");
                let submitButton = document.createElement("button");
                textarea.placeholder = restaurantView._info["q&n data"][1];
                
                submitButton.innerHTML = restaurantView._info["q&n data"][2];
                qnaQuestions.insertBefore(submitButton,qnaQuestions.childNodes[0]);
                qnaQuestions.insertBefore(textarea,qnaQuestions.childNodes[0]);

                submitButton.addEventListener("click", function() {
                    let text = textarea.value;
                    if (text != "") {
                        let usernameContainer = document.getElementById("user-pages");
                        if (usernameContainer != undefined) {
                            let name = usernameContainer.getElementsByTagName("a")[0].innerHTML.trim();
                            let avatarUrl = document.getElementById("user-icon").src;

                            let currentUrl = window.location.href;
                            let section = currentUrl.substring(currentUrl.indexOf("#") + 1, currentUrl.indexOf("="));

                            let jsonToSend = {
                                // "section" : section,
                                "question" : text,
                                "author" : name,
                                "author avatar" : avatarUrl,
                            }
                            lib.sendJson(jsonToSend,"/addquestion.json", function(json) {
                                let question = new View(restaurantView._viewRenderer,"restaurant-qna-comment",qnaQuestions,1,undefined, jsonToSend);
                                question.renderView();
                                console.log(question);
                            });
                            
                        } else {
                            console.log('need authentication');
                        }

                    }
                });
            } 
        }); 
    }
}

module.exports = RestaurantView;