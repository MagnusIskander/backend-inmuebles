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
  Management,
  Section,
} from '../models';
import {ManagementRepository} from '../repositories';

export class ManagementSectionController {
  constructor(
    @repository(ManagementRepository) protected managementRepository: ManagementRepository,
  ) { }

  @get('/managements/{id}/sections', {
    responses: {
      '200': {
        description: 'Array of Management has many Section',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Section)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Section>,
  ): Promise<Section[]> {
    return this.managementRepository.sections(id).find(filter);
  }

  @post('/managements/{id}/sections', {
    responses: {
      '200': {
        description: 'Management model instance',
        content: {'application/json': {schema: getModelSchemaRef(Section)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Management.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Section, {
            title: 'NewSectionInManagement',
            exclude: ['id'],
            optional: ['managementId']
          }),
        },
      },
    }) section: Omit<Section, 'id'>,
  ): Promise<Section> {
    return this.managementRepository.sections(id).create(section);
  }

  @patch('/managements/{id}/sections', {
    responses: {
      '200': {
        description: 'Management.Section PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Section, {partial: true}),
        },
      },
    })
    section: Partial<Section>,
    @param.query.object('where', getWhereSchemaFor(Section)) where?: Where<Section>,
  ): Promise<Count> {
    return this.managementRepository.sections(id).patch(section, where);
  }

  @del('/managements/{id}/sections', {
    responses: {
      '200': {
        description: 'Management.Section DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Section)) where?: Where<Section>,
  ): Promise<Count> {
    return this.managementRepository.sections(id).delete(where);
  }
}
