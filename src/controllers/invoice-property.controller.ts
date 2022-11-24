import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Invoice,
  Property,
} from '../models';
import {InvoiceRepository} from '../repositories';

export class InvoicePropertyController {
  constructor(
    @repository(InvoiceRepository)
    public invoiceRepository: InvoiceRepository,
  ) { }

  @get('/invoices/{id}/property', {
    responses: {
      '200': {
        description: 'Property belonging to Invoice',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Property)},
          },
        },
      },
    },
  })
  async getProperty(
    @param.path.string('id') id: typeof Invoice.prototype.id,
  ): Promise<Property> {
    return this.invoiceRepository.property(id);
  }
}
