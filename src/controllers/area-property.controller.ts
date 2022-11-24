import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Area,
  Property,
} from '../models';
import {AreaRepository} from '../repositories';

export class AreaPropertyController {
  constructor(
    @repository(AreaRepository)
    public areaRepository: AreaRepository,
  ) { }

  @get('/areas/{id}/property', {
    responses: {
      '200': {
        description: 'Property belonging to Area',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Property)},
          },
        },
      },
    },
  })
  async getProperty(
    @param.path.string('id') id: typeof Area.prototype.id,
  ): Promise<Property> {
    return this.areaRepository.property(id);
  }
}
