import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Section, SectionRelations, Management, Property} from '../models';
import {ManagementRepository} from './management.repository';
import {PropertyRepository} from './property.repository';

export class SectionRepository extends DefaultCrudRepository<
  Section,
  typeof Section.prototype.id,
  SectionRelations
> {

  public readonly management: BelongsToAccessor<Management, typeof Section.prototype.id>;

  public readonly properties: HasManyRepositoryFactory<Property, typeof Section.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ManagementRepository') protected managementRepositoryGetter: Getter<ManagementRepository>, @repository.getter('PropertyRepository') protected propertyRepositoryGetter: Getter<PropertyRepository>,
  ) {
    super(Section, dataSource);
    this.properties = this.createHasManyRepositoryFactoryFor('properties', propertyRepositoryGetter,);
    this.registerInclusionResolver('properties', this.properties.inclusionResolver);
    this.management = this.createBelongsToAccessorFor('management', managementRepositoryGetter,);
    this.registerInclusionResolver('management', this.management.inclusionResolver);
  }
}
