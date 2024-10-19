const express = require("express");
const validate = require("../../middlewares/validate")
const orderValidation = require("../../modules/orders/validation")
const OrderControllers = require("../../modules/orders/controller");
// const adminOrderControllers = require("../../modules/adminOrder/controller");

const auth = require("../../middlewares/auth");

const router = express.Router();

router.route('/import-orders').post(OrderControllers.importOrders);

router.route('/pay-orders').post(OrderControllers.payOrders);

router.route('/add-order').post(auth('manageUsers'), validate(orderValidation.addOrder), OrderControllers.addOrder);
router.route('/admin-add-order').post(auth('adminAccess'), OrderControllers.AdminAddOrder);
router.route('/get-myorder').get(auth('manageUsers'), OrderControllers.getMyOrders);
router.route('/admin-all-orders').get(auth('adminAccess'), OrderControllers.admingetAllOrders);
router.route('/get-all-orders-export').get(auth('adminAccess'), OrderControllers.adminGetAllOrdersToExport);
router.route('/resendShipping-Confirmation-email/:id').post(auth('adminAccess'), OrderControllers.sendShippingConfirmationMail);

router.route('/getOrderbyId/:id').get(auth('adminAccess'), OrderControllers.getOrdersById);
router.route('/get-sales-by-brand').get(auth('adminAccess'), OrderControllers.SalesByBrand);
router.route('/get-products-by-category/:id').get(auth('adminAccess'), OrderControllers.getProductbycategoryid);

router.route('/update-order/:id').put(auth('adminAccess'), OrderControllers.updateOrder);
router.route('/update-order-byid/:id').put(auth('adminAccess'), OrderControllers.updateOrderById);
router.route('/updateorderbyid/:id').put( OrderControllers.updateOrderById);
router.route('/getOrderbyIdUser/:id').get(OrderControllers.getOrdersByIdUser);
router.route('/add-trackingNo/:id').put(auth('adminAccess'), validate(orderValidation.addTrackingNumber), OrderControllers.addTrackingNumber);
router.route('/get-trackingNobyId/:id').put(auth('adminAccess'), OrderControllers.getTrackingNumberbyId);
router.route('/update-tracking/:id').put(auth('adminAccess'), OrderControllers.updateTracking);
router.route('/get-statistics').get(OrderControllers.getStatistics);
router.route('/get-statistics-country').get(OrderControllers.getStatisticsCountry);
router.route('/get-top-orders').get(OrderControllers.getTopOrders);
router.route('/topFiveProduct').get(OrderControllers.topFIveProduct)
router.route('/country-wise-sales').get(OrderControllers.getTopCountryTotalAmount)
router.route('/get-sales-item/:productId').get(OrderControllers.getSalesByItem)

router.route('/confirm-order-email/:id').post(OrderControllers.conformOrderEmail)
router.route('/get-orders').get(auth('adminAccess'),OrderControllers.getOrders)
router.route('/change-archive-status').post(auth('adminAccess'),OrderControllers.changeArchiveStatus)
router.route('/getOrdersFor-DHL').get(auth('adminAccess'),OrderControllers.getOrdersForDHL)

router.route('/sales-by-coupon').get(auth('adminAccess'),OrderControllers.salesByCoupon)
router.route('/get-orders-bycountry').get(auth('adminAccess'),OrderControllers.getAllCountryOrders)

module.exports = router;
