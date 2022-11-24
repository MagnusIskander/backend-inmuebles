import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Section,
  Management,
} from '../models';
import {SectionRepository} from '../repositories';

export class SectionManagementController {
  constructor(
    @repository(SectionRepository)
    public sectionRepository: SectionRepository,
  ) { }

  @get('/sections/{id}/management', {
    responses: {
      '200': {
        description: 'Management belonging to Section',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Management)},
          },
        },
      },
    },
  })
  async getManagement(
    @param.path.string('id') id: typeof Section.prototype.id,
  ): Promise<Management> {
    return this.sectionRepository.management(id);
  }
}
