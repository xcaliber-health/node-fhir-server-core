/**
 * @name exports
 * @description All the possible arguments defined in one place
 */

module.exports = {
	ATTESTER: {
		name: 'attester',
		type: 'reference',
		definition: 'https://www.hl7.org/fhir/searchparameter-registry.html#composition',
		documentation: 'Who attested the composition',
	},
	AUTHOR: {
		name: 'author',
		type: 'reference',
		definition: 'https://www.hl7.org/fhir/searchparameter-registry.html#composition',
		documentation: 'Who and/or what authored the composition',
	},
	CLASS: {
		name: 'class',
		type: 'token',
		definition: 'https://www.hl7.org/fhir/searchparameter-registry.html#composition',
		documentation: 'Categorization of Composition',
	},
	CONFIDENTIALITY: {
		name: 'confidentiality',
		type: 'token',
		definition: 'https://www.hl7.org/fhir/searchparameter-registry.html#composition',
		documentation: 'As defined by affinity domain',
	},
	CONTEXT: {
		name: 'context',
		type: 'token',
		definition: 'https://www.hl7.org/fhir/searchparameter-registry.html#composition',
		documentation: 'Code(s) that apply to the event being documented',
	},
	DATE: {
		name: 'date',
		type: 'date',
		definition: 'https://www.hl7.org/fhir/searchparameter-registry.html#composition',
		documentation: 'Composition editing time',
	},
	ENCOUNTER: {
		name: 'encounter',
		type: 'reference',
		definition: 'https://www.hl7.org/fhir/searchparameter-registry.html#composition',
		documentation: 'Context of the Composition',
	},
	ENTRY: {
		name: 'entry',
		type: 'reference',
		definition: 'https://www.hl7.org/fhir/searchparameter-registry.html#composition',
		documentation: 'A reference to data that supports this section',
	},
	IDENTIFIER: {
		name: 'identifier',
		type: 'token',
		definition: 'https://www.hl7.org/fhir/searchparameter-registry.html#composition',
		documentation: 'Logical identifier of composition (version-independent)',
	},
	PATIENT: {
		name: 'patient',
		type: 'reference',
		definition: 'https://www.hl7.org/fhir/searchparameter-registry.html#composition',
		documentation: 'Who and/or what the composition is about',
	},
	PERIOD: {
		name: 'period',
		type: 'date',
		definition: 'https://www.hl7.org/fhir/searchparameter-registry.html#composition',
		documentation: 'The period covered by the documentation',
	},
	RELATED_ID: {
		name: 'related-id',
		type: 'token',
		definition: 'https://www.hl7.org/fhir/searchparameter-registry.html#composition',
		documentation: 'Target of the relationship',
	},
	RELATED_REF: {
		name: 'related-ref',
		type: 'reference',
		definition: 'https://www.hl7.org/fhir/searchparameter-registry.html#composition',
		documentation: 'Target of the relationship',
	},
	SECTION: {
		name: 'section',
		type: 'token',
		definition: 'https://www.hl7.org/fhir/searchparameter-registry.html#composition',
		documentation: 'Classification of section (recommended)',
	},
	STATUS: {
		name: 'status',
		type: 'token',
		definition: 'https://www.hl7.org/fhir/searchparameter-registry.html#composition',
		documentation: 'preliminary | final | amended | entered-in-error',
	},
	SUBJECT: {
		name: 'subject',
		type: 'reference',
		definition: 'https://www.hl7.org/fhir/searchparameter-registry.html#composition',
		documentation: 'Who and/or what the composition is about',
	},
	TITLE: {
		name: 'title',
		type: 'string',
		definition: 'https://www.hl7.org/fhir/searchparameter-registry.html#composition',
		documentation: 'Human Readable name/title',
	},
	TYPE: {
		name: 'type',
		type: 'token',
		definition: 'https://www.hl7.org/fhir/searchparameter-registry.html#composition',
		documentation: 'Kind of composition (LOINC if possible)',
	},
};
