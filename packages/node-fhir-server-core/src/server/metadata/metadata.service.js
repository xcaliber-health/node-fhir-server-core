const generateInteractions = require('./metadata.interactions.js');
const conformanceTemplate = require('./capability.template.js');
const deprecate = require('../utils/deprecation.notice.js');
const errors = require('../utils/error.utils.js');
const { container } = require('../winston.js');

let logger = container.get('default');

/**
 * Load the correct statement generators for the right version
 */
let getStatementGenerators = (base_version) => {
  if (base_version) {
    return require(`./capability.${base_version}`);
  } else {
    return require('./capability.4_0_0');
  }
};

/**
 * @function generateCapabilityStatement
 * @description Assemble the capability statement based on the current profiles
 * @param {Object} args - Arguments for the endpoint
 * @param {Object} profiles - List of profile services we are using
 * @param {Winston} logger - Instance of Winston's logger
 * @return {Promise<Object>} - Return the capability statement
 */
let generateCapabilityStatement = ({profiles}) => {
  
    logger.info('Metadata.generateCapabilityStatement');

    // create profile list
    let keys = Object.keys(profiles);
    let active_profiles = keys
      .map((profile_name) => {
        return {
          key: profile_name,
          makeResource: conformanceTemplate.resource,
          versions: profiles[profile_name] && profiles[profile_name].versions,
          service: profiles[profile_name] && profiles[profile_name].serviceModule,
          metadata: profiles[profile_name] && profiles[profile_name].metadata,
        };
      })

    

    // Add the server statement to the main statement
    return getRestEndpoints(keys,active_profiles)
}

/**
 * @name exports
 * @summary Metadata service
 */

function getOperations(operations) {
  let op = []
  if(operations)
       op=  operations?.map(operation => {
      return {
          "code": operation.name
      }
   })
  return op
}

function getSearchParams(profile) {
//read a file resourceType+ searchParams
let searchParams = require(profile.metadata).makeResource().searchParam

//for each key in searchparams , iterate and add name,description
if(searchParams)
  return Object.keys(searchParams).map(param => {
      const searchParam = searchParams[param];
      return {
          name: param,
          description: searchParam.description,
          type: searchParam.type,
          definition: searchParam.definition
      }
  })
  return {}
}

function buildResources(resourceTypes, profiles) {
  return Object.keys(resourceTypes).map(resourceType => {
      const resourceProfile = resourceTypes[resourceType];
      return {
          type : resourceType,
          profile: {
              reference: `https://www.hl7.org/fhir/${resourceType.toLowerCase()}.html`
          },
          interaction: [
              {
                  "code": "search-type"
              },
              {
                  "code": "read"
              },
              {
                  "code": "create"
              },
              {
                  "code": "update"
              },
              {
                  "code": "delete"
              },
              ...getOperations(resourceProfile.operation)
          ],
          searchParam : profiles.map((profile) => {
            getSearchParams(profile)
            return resource;
          })
      }
  })
}

function getRestEndpoints(resourceTypes,profiles) {
let rest = {
  "mode": "server",
  "security": {
      "extension": [
          {
              "extension": [
                  {
                      "url": "authorize",
                      "valueUri": "http://localhost:3000/authorize"
                  },
                  {
                      "url": "token",
                      "valueUri": "http://localhost:3000/token"
                  }
              ],
              "url": "http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris"
          }
      ],
      "cors": true,
      "service": [
          {
              "coding": [
                  {
                      "system": "http://hl7.org/fhir/restful-security-service",
                      "code": "SMART-on-FHIR"
                  }
              ],
              "text": "Custom OAuth2 using SMART-on-FHIR profile (see http://docs.smarthealthit.org)"
          }
      ]
  }
}
rest.resource = buildResources(resourceTypes,profiles);
return rest;
}

module.exports = {
  generateCapabilityStatement
};
