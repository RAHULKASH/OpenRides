// import {Router} from "express";
// import {verifyJWTOrganizer} from "../Middlewares/auth.middleware.js";
// import {logoutUser} from "../Controllers/registration.controller.js";
// import { showFeedback } from "../Controllers/feedback.controller.js";
// import {organizerView} from "../Controllers/view.controller.js";
// import { addEvent,deleteEvent,updateEvent,organizerEvents } from "../Controllers/events.controller.js";



// const router=Router();

// router.use(verifyJWTOrganizer);

// //route for organizer logout
// router.route("/logoutorganizer").post(logoutUser);

// //route for adding events
// router.route("/addEvent").post(addEvent);

// //route for deleting events
// router.route("/deleteEvent").delete(deleteEvent);

// //route for update events
// router.route("/updateEvent").post(updateEvent);

// // route for show all feedbacks
// router.route("/showFeedback").get(showFeedback);

// //route for organizer view.
// router.route("/organizerView").post(organizerView);

// //route for organizer events.
// router.route("/organizerEvents").get(organizerEvents);

// export default router;