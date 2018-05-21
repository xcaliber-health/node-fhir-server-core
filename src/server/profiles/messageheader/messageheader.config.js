const {route_args, common_args} = require('../common.arguments');
const {CONFIG_KEYS, VERSIONS} = require('../../../constants');
const resource_args = require('./messageheader.arguments');
const controller = require('./messageheader.controller');

const scopes = [
	'user/*.*',
	'user/MessageHeader.*',
	'user/MessageHeader.read',
	'user/*.read',
	'messageheader/*.*',
	'messageheader/MessageHeader.*',
	'messageheader/MessageHeader.read',
	'messageheader/*.read'
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
		path: '/:version/messageheader',
		corsOptions: {methods: ['GET']},
		args: resourceAllArguments,
		scopes: scopes,
		controller: controller.getMessageHeader
	},
	{
		type: 'post',
		path: '/:version/messageheader/_search',
		corsOptions: {methods: ['POST']},
		args: resourceAllArguments,
		scopes: scopes,
		controller: controller.getMessageHeader
	},
	{
		type: 'get',
		path: '/:version/messageheader/:id',
		corsOptions: {methods: ['GET']},
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: scopes,
		controller: controller.getMessageHeaderById
	}
];

/**
 * @name exports
 * @summary MessageHeader config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.MESSAGEHEADER
	},
	routes
};
