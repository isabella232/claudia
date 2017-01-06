/*global module, __dirname, require */
const path = require('path'),
	fs = require('../util/fs-promise'),
	aws = require('aws-sdk');
module.exports = function addPolicy(policyName, roleName, fileName) {
	'use strict';
	const iam = new aws.IAM();
	fileName = fileName || path.join(__dirname, '..', '..', 'json-templates', policyName + '.json');
	return fs.readFileAsync(fileName, 'utf8')
		.then(policyContents => iam.putRolePolicy({
			RoleName: roleName,
			PolicyName: policyName,
			PolicyDocument: policyContents
		}).promise());
};
