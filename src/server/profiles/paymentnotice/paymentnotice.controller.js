/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "app" }] */
const { resolveFromVersion } = require('../../utils/resolve.utils');
const errors = require('../../utils/error.utils');

module.exports.getPaymentNotice = ({ profile, logger, config, app }) => {
	let { serviceModule: service } = profile;

	return (req, res, next) => {
		let version = req.params.version;
		// Create a context I can pass some data through
		let context = { version };
		// Get a version specific paymentnotice & bundle
		let Bundle = require(resolveFromVersion(version, 'uscore/Bundle'));
		let PaymentNotice = require(resolveFromVersion(version, 'base/PaymentNotice'));

		/**
		* return service.getPaymentNotice(req, logger)
		*		.then(sanitizeResponse) // Only show the user what they are allowed to see
		*		.then(validateResponse); // Make sure the response data conforms to the spec
		*/
		return service.getPaymentNotice(req, logger, context)
			.then((paymentnotices) => {
				let results = new Bundle({ type: 'searchset' });
				let entries = [];

				if (paymentnotices) {
					for (let resource of paymentnotices) {
						if (!req.paymentnotice || req.paymentnotice === resource.paymentnoticeId) {
							// Modes:
							// match - This resource matched the search specification.
							// include - This resource is returned because it is referred to from another resource in the search set.
							// outcome - An OperationOutcome that provides additional information about the processing of a search.
							entries.push({
								search: { mode: 'match' },
								resource: new PaymentNotice(resource),
								fullUrl: `${config.auth.resourceServer}/${version}/PaymentNotice/${resource.id}`
							});
						}
					}
				}

				results.entry = entries;
				results.total = entries.length;

				res.status(200).json(results);
			})
			.catch((err) => {
				next(errors.internal(err.message, version));
			});
	};

};


module.exports.getPaymentNoticeById = ({ profile, logger, app }) => {
	let { serviceModule: service } = profile;

	return (req, res, next) => {
		let version = req.params.version;
		// Create a context I can pass some data through
		let context = { version };
		// Get a version specific paymentnotice
		let PaymentNotice = require(resolveFromVersion(version, 'base/PaymentNotice'));

		return service.getPaymentNoticeById(req, logger, context)
			.then((paymentnotice) => {
				if (paymentnotice) {
					res.status(200).json(new PaymentNotice(paymentnotice));
				} else {
					next(errors.notFound('PaymentNotice not found', version));
				}
			})
			.catch((err) => {
				next(errors.internal(err.message, version));
			});
	};
};
