const {route_args, common_args} = require('../common.arguments');
const {CONFIG_KEYS, VERSIONS} = require('../../../constants');
const resource_args = require('./guidanceresponse.arguments');
const controller = require('./guidanceresponse.controller');

const scopes = [
	'user/*.*',
	'user/GuidanceResponse.*',
	'user/GuidanceResponse.read',
	'user/*.read',
	'guidanceresponse/*.*',
	'guidanceresponse/GuidanceResponse.*',
	'guidanceresponse/GuidanceResponse.read',
	'guidanceresponse/*.read'
];

let commonArgsArray = Object.getOwnPropertyNames(common_args)
	.map((arg_name) => common_args[arg_name]);

let resourceArgsArray = Object.getOwnPropertyNames(resource_args)
	.map((arg_name) => Object.assign({ versions: VERSIONS.STU3 }, resource_args[arg_name]));

const resourceAllArguments = [
	route_args.VERSION,	...commonArgsArray, ...resourceArgsArray,
];

let routes = [
	{
		type: 'get',
		path: '/:version/guidanceresponse',
		corsOptions: {methods: ['GET']},
		args: resourceAllArguments,
		scopes: scopes,
		controller: controller.getGuidanceResponse
	},
	{
		type: 'post',
		path: '/:version/guidanceresponse/_search',
		corsOptions: {methods: ['POST']},
		args: resourceAllArguments,
		scopes: scopes,
		controller: controller.getGuidanceResponse
	},
	{
		type: 'get',
		path: '/:version/guidanceresponse/:id',
		corsOptions: {methods: ['GET']},
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: scopes,
		controller: controller.getGuidanceResponseById
	}
];

/**
 * @name exports
 * @summary GuidanceResponse config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.GUIDANCERESPONSE
	},
	routes
};
