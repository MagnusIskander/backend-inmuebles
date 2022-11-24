import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Property,
  Invoice,
} from '../models';
import {PropertyRepository} from '../repositories';

export class PropertyInvoiceController {
  constructor(
    @repository(PropertyRepository) protected propertyRepository: PropertyRepository,
  ) { }

  @get('/properties/{id}/invoices', {
    responses: {
      '200': {
        description: 'Array of Property has many Invoice',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Invoice)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Invoice>,
  ): Promise<Invoice[]> {
    return this.propertyRepository.invoices(id).find(filter);
  }

  @post('/properties/{id}/invoices', {
    responses: {
      '200': {
        description: 'Property model instance',
        content: {'application/json': {schema: getModelSchemaRef(Invoice)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Property.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Invoice, {
            title: 'NewInvoiceInProperty',
            exclude: ['id'],
            optional: ['propertyId']
          }),
        },
      },
    }) invoice: Omit<Invoice, 'id'>,
  ): Promise<Invoice> {
    return this.propertyRepository.invoices(id).create(invoice);
  }

  @patch('/properties/{id}/invoices', {
    responses: {
      '200': {
        description: 'Property.Invoice PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Invoice, {partial: true}),
        },
      },
    })
    invoice: Partial<Invoice>,
    @param.query.object('where', getWhereSchemaFor(Invoice)) where?: Where<Invoice>,
  ): Promise<Count> {
    return this.propertyRepository.invoices(id).patch(invoice, where);
  }

  @del('/properties/{id}/invoices', {
    responses: {
      '200': {
        description: 'Property.Invoice DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Invoice)) where?: Where<Invoice>,
  ): Promise<Count> {
    return this.propertyRepository.invoices(id).delete(where);
  }
}
