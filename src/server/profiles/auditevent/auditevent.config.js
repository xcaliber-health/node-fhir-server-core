const {route_args, common_args} = require('../common.arguments');
const {CONFIG_KEYS, VERSIONS} = require('../../../constants');
const resource_args = require('./auditevent.arguments');
const controller = require('./auditevent.controller');

const scopes = [
	'user/*.*',
	'user/AuditEvent.*',
	'user/AuditEvent.read',
	'user/*.read',
	'auditevent/*.*',
	'auditevent/AuditEvent.*',
	'auditevent/AuditEvent.read',
	'auditevent/*.read'
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
		path: '/:version/auditevent',
		corsOptions: {methods: ['GET']},
		args: resourceAllArguments,
		scopes: scopes,
		controller: controller.getAuditEvent
	},
	{
		type: 'post',
		path: '/:version/auditevent/_search',
		corsOptions: {methods: ['POST']},
		args: resourceAllArguments,
		scopes: scopes,
		controller: controller.getAuditEvent
	},
	{
		type: 'get',
		path: '/:version/auditevent/:id',
		corsOptions: {methods: ['GET']},
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: scopes,
		controller: controller.getAuditEventById
	}
];

/**
 * @name exports
 * @summary AuditEvent config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.AUDITEVENT
	},
	routes
};
