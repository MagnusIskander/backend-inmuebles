import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Property,
  Section,
} from '../models';
import {PropertyRepository} from '../repositories';

export class PropertySectionController {
  constructor(
    @repository(PropertyRepository)
    public propertyRepository: PropertyRepository,
  ) { }

  @get('/properties/{id}/section', {
    responses: {
      '200': {
        description: 'Section belonging to Property',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Section)},
          },
        },
      },
    },
  })
  async getSection(
    @param.path.string('id') id: typeof Property.prototype.id,
  ): Promise<Section> {
    return this.propertyRepository.section(id);
  }
}
