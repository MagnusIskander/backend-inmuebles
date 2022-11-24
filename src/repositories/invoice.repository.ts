import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Invoice, InvoiceRelations, Property, Payment} from '../models';
import {PropertyRepository} from './property.repository';
import {PaymentRepository} from './payment.repository';

export class InvoiceRepository extends DefaultCrudRepository<
  Invoice,
  typeof Invoice.prototype.id,
  InvoiceRelations
> {

  public readonly property: BelongsToAccessor<Property, typeof Invoice.prototype.id>;

  public readonly payment: HasOneRepositoryFactory<Payment, typeof Invoice.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PropertyRepository') protected propertyRepositoryGetter: Getter<PropertyRepository>, @repository.getter('PaymentRepository') protected paymentRepositoryGetter: Getter<PaymentRepository>,
  ) {
    super(Invoice, dataSource);
    this.payment = this.createHasOneRepositoryFactoryFor('payment', paymentRepositoryGetter);
    this.registerInclusionResolver('payment', this.payment.inclusionResolver);
    this.property = this.createBelongsToAccessorFor('property', propertyRepositoryGetter,);
    this.registerInclusionResolver('property', this.property.inclusionResolver);
  }
}
