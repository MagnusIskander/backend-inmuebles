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
  Invoice,
  Payment,
} from '../models';
import {InvoiceRepository} from '../repositories';

export class InvoicePaymentController {
  constructor(
    @repository(InvoiceRepository) protected invoiceRepository: InvoiceRepository,
  ) { }

  @get('/invoices/{id}/payment', {
    responses: {
      '200': {
        description: 'Invoice has one Payment',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Payment),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Payment>,
  ): Promise<Payment> {
    return this.invoiceRepository.payment(id).get(filter);
  }

  @post('/invoices/{id}/payment', {
    responses: {
      '200': {
        description: 'Invoice model instance',
        content: {'application/json': {schema: getModelSchemaRef(Payment)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Invoice.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {
            title: 'NewPaymentInInvoice',
            exclude: ['id'],
            optional: ['invoiceId']
          }),
        },
      },
    }) payment: Omit<Payment, 'id'>,
  ): Promise<Payment> {
    return this.invoiceRepository.payment(id).create(payment);
  }

  @patch('/invoices/{id}/payment', {
    responses: {
      '200': {
        description: 'Invoice.Payment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {partial: true}),
        },
      },
    })
    payment: Partial<Payment>,
    @param.query.object('where', getWhereSchemaFor(Payment)) where?: Where<Payment>,
  ): Promise<Count> {
    return this.invoiceRepository.payment(id).patch(payment, where);
  }

  @del('/invoices/{id}/payment', {
    responses: {
      '200': {
        description: 'Invoice.Payment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Payment)) where?: Where<Payment>,
  ): Promise<Count> {
    return this.invoiceRepository.payment(id).delete(where);
  }
}
