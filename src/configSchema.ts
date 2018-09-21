import * as Joi from 'joi';

const dataSchema = Joi.object().keys({
  json: Joi.object().optional(), // data as JSON Body
  params: Joi.alternatives().try(Joi.string(), Joi.object()).optional(), // data as url-params
  raw: Joi.string().optional(),
  form: Joi.object().optional()
}).min(1).max(2)
  .without('json', 'formUrlEncoded')
  .without('formUrlEncoded', 'json')
  .without('json',['raw','form'])
  .without('raw', ['json','form'])
  .without('form',['json','row'])
  .without('formUrlEncoded', 'raw')
  .without('raw', 'formUrlEncoded')

const validateSchema = Joi.object().keys({
  json: Joi.object().optional(),
  raw: Joi.string().optional(),
  form: Joi.object().optional(),
})
  .without('json', ['raw','form'])
  .without('raw', ['json','form'])
  .without('form', ['raw','json']);

const requestsSchema = Joi.object().keys({
  url: Joi.string().required(),
  method: Joi.string().required(),
  data: dataSchema.optional(),
  headers: Joi.object().optional(),
  validate: validateSchema.optional(),
  log: Joi.boolean().optional()
})


export const Schema = Joi.object({
  version: Joi.number().min(1).max(1),
  requests: Joi.object({}).pattern(/([^\s]+)/, requestsSchema)
});


// Typescript Schemas

interface requestObjectDataSchema {
  json: object,
  params: object | string ,
  raw: string,
  form: object
}

export interface requestObjectSchema {
  method: string,
  url: string,
  data: requestObjectDataSchema,
  headers: object,
  validate: any,
  log: boolean
}


