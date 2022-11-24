import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Management, ManagementRelations, Section} from '../models';
import {SectionRepository} from './section.repository';

export class ManagementRepository extends DefaultCrudRepository<
  Management,
  typeof Management.prototype.id,
  ManagementRelations
> {

  public readonly sections: HasManyRepositoryFactory<Section, typeof Management.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SectionRepository') protected sectionRepositoryGetter: Getter<SectionRepository>,
  ) {
    super(Management, dataSource);
    this.sections = this.createHasManyRepositoryFactoryFor('sections', sectionRepositoryGetter,);
    this.registerInclusionResolver('sections', this.sections.inclusionResolver);
  }
}
