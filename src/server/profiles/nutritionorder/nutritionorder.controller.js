/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "app" }] */
const { resolveFromVersion } = require('../../utils/resolve.utils');
const errors = require('../../utils/error.utils');

module.exports.getNutritionOrder = ({ profile, logger, config, app }) => {
	let { serviceModule: service } = profile;

	return (req, res, next) => {
		let version = req.params.version;
		// Create a context I can pass some data through
		let context = { version };
		// Get a version specific nutritionorder & bundle
		let Bundle = require(resolveFromVersion(version, 'uscore/Bundle'));
		let NutritionOrder = require(resolveFromVersion(version, 'base/NutritionOrder'));

		/**
		* return service.getNutritionOrder(req, logger)
		*		.then(sanitizeResponse) // Only show the user what they are allowed to see
		*		.then(validateResponse); // Make sure the response data conforms to the spec
		*/
		return service.getNutritionOrder(req, logger, context)
			.then((nutritionorders) => {
				let results = new Bundle({ type: 'searchset' });
				let entries = [];

				if (nutritionorders) {
					for (let resource of nutritionorders) {
						if (!req.nutritionorder || req.nutritionorder === resource.nutritionorderId) {
							// Modes:
							// match - This resource matched the search specification.
							// include - This resource is returned because it is referred to from another resource in the search set.
							// outcome - An OperationOutcome that provides additional information about the processing of a search.
							entries.push({
								search: { mode: 'match' },
								resource: new NutritionOrder(resource),
								fullUrl: `${config.auth.resourceServer}/${version}/NutritionOrder/${resource.id}`
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


module.exports.getNutritionOrderById = ({ profile, logger, app }) => {
	let { serviceModule: service } = profile;

	return (req, res, next) => {
		let version = req.params.version;
		// Create a context I can pass some data through
		let context = { version };
		// Get a version specific nutritionorder
		let NutritionOrder = require(resolveFromVersion(version, 'base/NutritionOrder'));

		return service.getNutritionOrderById(req, logger, context)
			.then((nutritionorder) => {
				if (nutritionorder) {
					res.status(200).json(new NutritionOrder(nutritionorder));
				} else {
					next(errors.notFound('NutritionOrder not found', version));
				}
			})
			.catch((err) => {
				next(errors.internal(err.message, version));
			});
	};
};
