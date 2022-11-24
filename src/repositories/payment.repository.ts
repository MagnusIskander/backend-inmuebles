import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Payment, PaymentRelations, Invoice} from '../models';
import {InvoiceRepository} from './invoice.repository';

export class PaymentRepository extends DefaultCrudRepository<
  Payment,
  typeof Payment.prototype.id,
  PaymentRelations
> {

  public readonly invoice: BelongsToAccessor<Invoice, typeof Payment.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('InvoiceRepository') protected invoiceRepositoryGetter: Getter<InvoiceRepository>,
  ) {
    super(Payment, dataSource);
    this.invoice = this.createBelongsToAccessorFor('invoice', invoiceRepositoryGetter,);
    this.registerInclusionResolver('invoice', this.invoice.inclusionResolver);
  }
}
