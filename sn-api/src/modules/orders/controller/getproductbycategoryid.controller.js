const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const orderServices = require('../services');
const { sendResponse } = require('../../../utils/responseHandler');

const getProductbycategoryid = catchAsync(async (req, res) => {
    const { id } = await pick(req.params, ['id']);
    const { page, limit, filter, sort } = await pick(req.query, ['page', 'limit', 'filter', 'sort'])
    let filter_Json_data = filter ? JSON.parse(filter) : null;
    console.log("filter:-",filter, id, filter_Json_data);
    const series = await orderServices.getProductbycategoryid(
        id,
        page,
        limit,
        filter_Json_data,
        sort
    );
    if (series.status) {
        sendResponse(res, httpStatus.OK, series.data, null);
    } else {
        if (series.code == 400) {
            sendResponse(res, httpStatus.BAD_REQUEST, null, series.data);
        }
        else if (series.code == 500) {
            sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, series.data);
        }
        else {
            sendResponse(res, httpStatus.BAD_REQUEST, null, series.data);
        }
    }

});

module.exports = getProductbycategoryid
