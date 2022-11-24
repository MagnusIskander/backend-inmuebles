import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Payment,
  Invoice,
} from '../models';
import {PaymentRepository} from '../repositories';

export class PaymentInvoiceController {
  constructor(
    @repository(PaymentRepository)
    public paymentRepository: PaymentRepository,
  ) { }

  @get('/payments/{id}/invoice', {
    responses: {
      '200': {
        description: 'Invoice belonging to Payment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Invoice)},
          },
        },
      },
    },
  })
  async getInvoice(
    @param.path.string('id') id: typeof Payment.prototype.id,
  ): Promise<Invoice> {
    return this.paymentRepository.invoice(id);
  }
}
