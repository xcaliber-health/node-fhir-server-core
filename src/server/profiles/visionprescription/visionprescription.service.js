/* eslint-disable no-unused-vars */
module.exports.getCount = (req, logger, context) => new Promise((resolve, reject) => {
	let message = 'Calling mock service. Did you forget to implement \'getCount\'';
	logger.info(message);
	reject(new Error(message));
});

module.exports.getVisionPrescription = (req, logger, context) => new Promise((resolve, reject) => {
	let message = 'Calling mock service. Did you forget to implement \'getVisionPrescription\'';
	logger.info(message);
	reject(new Error(message));
});

module.exports.getVisionPrescriptionById = (req, logger, context) => new Promise((resolve, reject) => {
	let message = 'Calling mock service. Did you forget to implement \'getVisionPrescriptionById\'';
	logger.info(message);
	reject(new Error(message));
});
