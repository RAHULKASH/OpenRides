import {Router} from "express";
import {registerAsDriver,registerAsRider,loginAsRider,loginAsDriver} from "../Controllers/registration.controller.js";

const router=Router();

//registration routes
router.route("/registerAsrider").post(registerAsRider);
router.route("/registerAsdriver").post(registerAsDriver);

//login routes
router.route("/loginAsRider").post(loginAsRider);
router.route("/loginAsDriver").post(loginAsDriver);

export default router;