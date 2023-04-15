const express=require('express')
const NGO_NOTIFICATION_CONTROLLER=require('../Controllers/ngoNotificationController');
const { HandleErrors } = require('../middlewares/handleError');
const ngoNotificationRoutes=express.Router();
ngoNotificationRoutes.get("/getNotifications",HandleErrors(NGO_NOTIFICATION_CONTROLLER.getNotification));
module.exports={ngoNotificationRoutes};
