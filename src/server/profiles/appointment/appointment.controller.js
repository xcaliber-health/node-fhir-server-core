/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "app" }] */
const { resolveFromVersion } = require('../../utils/resolve.utils');
const errors = require('../../utils/error.utils');

module.exports.getAppointment = ({ profile, logger, config, app }) => {
	let { serviceModule: service } = profile;

	return (req, res, next) => {
		let version = req.params.version;
		// Create a context I can pass some data through
		let context = { version };
		// Get a version specific appointment & bundle
		let Bundle = require(resolveFromVersion(version, 'uscore/Bundle'));
		let Appointment = require(resolveFromVersion(version, 'base/Appointment'));

		/**
		* return service.getAppointment(req, logger)
		*		.then(sanitizeResponse) // Only show the user what they are allowed to see
		*		.then(validateResponse); // Make sure the response data conforms to the spec
		*/
		return service.getAppointment(req, logger, context)
			.then((appointments) => {
				let results = new Bundle({ type: 'searchset' });
				let entries = [];

				if (appointments) {
					for (let resource of appointments) {
						if (!req.appointment || req.appointment === resource.appointmentId) {
							// Modes:
							// match - This resource matched the search specification.
							// include - This resource is returned because it is referred to from another resource in the search set.
							// outcome - An OperationOutcome that provides additional information about the processing of a search.
							entries.push({
								search: { mode: 'match' },
								resource: new Appointment(resource),
								fullUrl: `${config.auth.resourceServer}/${version}/Appointment/${resource.id}`
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


module.exports.getAppointmentById = ({ profile, logger, app }) => {
	let { serviceModule: service } = profile;

	return (req, res, next) => {
		let version = req.params.version;
		// Create a context I can pass some data through
		let context = { version };
		// Get a version specific appointment
		let Appointment = require(resolveFromVersion(version, 'base/Appointment'));

		return service.getAppointmentById(req, logger, context)
			.then((appointment) => {
				if (appointment) {
					res.status(200).json(new Appointment(appointment));
				} else {
					next(errors.notFound('Appointment not found', version));
				}
			})
			.catch((err) => {
				next(errors.internal(err.message, version));
			});
	};
};
