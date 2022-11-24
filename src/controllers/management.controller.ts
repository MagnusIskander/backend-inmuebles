import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Management} from '../models';
import {ManagementRepository} from '../repositories';

export class ManagementController {
  constructor(
    @repository(ManagementRepository)
    public managementRepository : ManagementRepository,
  ) {}

  @post('/managements')
  @response(200, {
    description: 'Management model instance',
    content: {'application/json': {schema: getModelSchemaRef(Management)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Management, {
            title: 'NewManagement',
            exclude: ['id'],
          }),
        },
      },
    })
    management: Omit<Management, 'id'>,
  ): Promise<Management> {
    return this.managementRepository.create(management);
  }

  @get('/managements/count')
  @response(200, {
    description: 'Management model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Management) where?: Where<Management>,
  ): Promise<Count> {
    return this.managementRepository.count(where);
  }

  @get('/managements')
  @response(200, {
    description: 'Array of Management model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Management, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Management) filter?: Filter<Management>,
  ): Promise<Management[]> {
    return this.managementRepository.find(filter);
  }

  @patch('/managements')
  @response(200, {
    description: 'Management PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Management, {partial: true}),
        },
      },
    })
    management: Management,
    @param.where(Management) where?: Where<Management>,
  ): Promise<Count> {
    return this.managementRepository.updateAll(management, where);
  }

  @get('/managements/{id}')
  @response(200, {
    description: 'Management model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Management, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Management, {exclude: 'where'}) filter?: FilterExcludingWhere<Management>
  ): Promise<Management> {
    return this.managementRepository.findById(id, filter);
  }

  @patch('/managements/{id}')
  @response(204, {
    description: 'Management PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Management, {partial: true}),
        },
      },
    })
    management: Management,
  ): Promise<void> {
    await this.managementRepository.updateById(id, management);
  }

  @put('/managements/{id}')
  @response(204, {
    description: 'Management PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() management: Management,
  ): Promise<void> {
    await this.managementRepository.replaceById(id, management);
  }

  @del('/managements/{id}')
  @response(204, {
    description: 'Management DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.managementRepository.deleteById(id);
  }
}
