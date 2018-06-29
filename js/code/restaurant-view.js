let View = require("./view.js");
let lib = require("./library.js");

class RestaurantView extends View {

    constructor(info) {
        super();
        this._info = info;
    }


    constructView(viewRenderer) {
        viewRenderer.addData(this._info);
        let cover = new View(viewRenderer,"restaurant-header","app");

        let overview = new View(viewRenderer,"restaurant-overview","app");
        cover.addChildView(overview);

        let reviews = new View(viewRenderer,"restaurant-reviews","app");
        cover.addChildView(reviews);

        let reviewProgressBarList = new View(viewRenderer,"review-bar","review-bars",5,"review types");
        reviews.addChildView(reviewProgressBarList);

        let ratingProgressBarList = new View(viewRenderer,"review-bar","rating-bars",4,"review ratings");
        reviews.addChildView(ratingProgressBarList);

        let comments = new View(viewRenderer,"comment-section","comments-container",4,"comments");
        reviews.addChildView(comments);

        let details = new View(viewRenderer,"restaurant-details","app");
        cover.addChildView(details);

        let contactInfo = new View(viewRenderer,"details-contact-info","details-info",4,"contact information");
        // console.log(contactInfo);
        details.addChildView(contactInfo);

        let additionalInfo = new View(viewRenderer,"details-contact-info","details-info",3,"details additional information");
        details.addChildView(additionalInfo);

        let openHours = new View(viewRenderer,"details-contact-info","details-open-hours",7,"details open hours");
        details.addChildView(openHours);

        let nearby = new View(viewRenderer,"restaurant-nearby","app");
        cover.addChildView(nearby);

        let nearbyRestaurants = new View(viewRenderer,"restaurants-nearby","nearby");
        nearby.addChildView(nearbyRestaurants);

        let nearbyRestaurantsList = new View(viewRenderer,"nearby-section","nearby-restaurants-container",4,"nearby restaurants");
        nearbyRestaurants.addChildView(nearbyRestaurantsList);

        let nearbyHotels = new View(viewRenderer,"hotels-nearby","nearby");
        nearby.addChildView(nearbyHotels);
        let nearbyHotelsList = new View(viewRenderer,"nearby-section","nearby-hotels-container",4,"nearby hotels");
        nearbyHotels.addChildView(nearbyHotelsList);

        let nearbyAttractions = new View(viewRenderer,"attractions-nearby","nearby");
        nearby.addChildView(nearbyAttractions);
        let nearbyAttractionsList = new View(viewRenderer,"nearby-section","nearby-attractions-container",4,"nearby attractions");
        nearbyAttractions.addChildView(nearbyAttractionsList);

        let qna = new View(viewRenderer,"restaurant-qna","app");
        nearby.addChildView(qna);

        cover.renderView();

        this.assignPercentsToProgressBars();
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
}

module.exports = RestaurantView;