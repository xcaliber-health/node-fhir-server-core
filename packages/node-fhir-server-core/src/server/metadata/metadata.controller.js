const { META } = require('../../constants');
const service = require('./metadata.service.js');

/**
 * @name exports
 * @summary Metadata controller
 */
module.exports.getCapabilityStatement = ({ profiles, security, statementGenerator }) => {
  return (req, res, next) => {
    // Use our service to generate the capability statement
    META['rest'] = service.generateCapabilityStatement(profiles);
    return META;
  };
};
