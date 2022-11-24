import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Property, PropertyRelations, Section, Invoice} from '../models';
import {SectionRepository} from './section.repository';
import {InvoiceRepository} from './invoice.repository';

export class PropertyRepository extends DefaultCrudRepository<
  Property,
  typeof Property.prototype.id,
  PropertyRelations
> {

  public readonly section: BelongsToAccessor<Section, typeof Property.prototype.id>;

  public readonly invoices: HasManyRepositoryFactory<Invoice, typeof Property.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SectionRepository') protected sectionRepositoryGetter: Getter<SectionRepository>, @repository.getter('InvoiceRepository') protected invoiceRepositoryGetter: Getter<InvoiceRepository>,
  ) {
    super(Property, dataSource);
    this.invoices = this.createHasManyRepositoryFactoryFor('invoices', invoiceRepositoryGetter,);
    this.registerInclusionResolver('invoices', this.invoices.inclusionResolver);
    this.section = this.createBelongsToAccessorFor('section', sectionRepositoryGetter,);
    this.registerInclusionResolver('section', this.section.inclusionResolver);
  }
}
