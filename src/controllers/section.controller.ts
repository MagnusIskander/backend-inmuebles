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
import {Section} from '../models';
import {SectionRepository} from '../repositories';

export class SectionController {
  constructor(
    @repository(SectionRepository)
    public sectionRepository : SectionRepository,
  ) {}

  @post('/sections')
  @response(200, {
    description: 'Section model instance',
    content: {'application/json': {schema: getModelSchemaRef(Section)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Section, {
            title: 'NewSection',
            exclude: ['id'],
          }),
        },
      },
    })
    section: Omit<Section, 'id'>,
  ): Promise<Section> {
    return this.sectionRepository.create(section);
  }

  @get('/sections/count')
  @response(200, {
    description: 'Section model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Section) where?: Where<Section>,
  ): Promise<Count> {
    return this.sectionRepository.count(where);
  }

  @get('/sections')
  @response(200, {
    description: 'Array of Section model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Section, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Section) filter?: Filter<Section>,
  ): Promise<Section[]> {
    return this.sectionRepository.find(filter);
  }

  @patch('/sections')
  @response(200, {
    description: 'Section PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Section, {partial: true}),
        },
      },
    })
    section: Section,
    @param.where(Section) where?: Where<Section>,
  ): Promise<Count> {
    return this.sectionRepository.updateAll(section, where);
  }

  @get('/sections/{id}')
  @response(200, {
    description: 'Section model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Section, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Section, {exclude: 'where'}) filter?: FilterExcludingWhere<Section>
  ): Promise<Section> {
    return this.sectionRepository.findById(id, filter);
  }

  @patch('/sections/{id}')
  @response(204, {
    description: 'Section PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Section, {partial: true}),
        },
      },
    })
    section: Section,
  ): Promise<void> {
    await this.sectionRepository.updateById(id, section);
  }

  @put('/sections/{id}')
  @response(204, {
    description: 'Section PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() section: Section,
  ): Promise<void> {
    await this.sectionRepository.replaceById(id, section);
  }

  @del('/sections/{id}')
  @response(204, {
    description: 'Section DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.sectionRepository.deleteById(id);
  }
}
