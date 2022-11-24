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
  Section,
  Property,
} from '../models';
import {SectionRepository} from '../repositories';

export class SectionPropertyController {
  constructor(
    @repository(SectionRepository) protected sectionRepository: SectionRepository,
  ) { }

  @get('/sections/{id}/properties', {
    responses: {
      '200': {
        description: 'Array of Section has many Property',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Property)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Property>,
  ): Promise<Property[]> {
    return this.sectionRepository.properties(id).find(filter);
  }

  @post('/sections/{id}/properties', {
    responses: {
      '200': {
        description: 'Section model instance',
        content: {'application/json': {schema: getModelSchemaRef(Property)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Section.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Property, {
            title: 'NewPropertyInSection',
            exclude: ['id'],
            optional: ['sectionId']
          }),
        },
      },
    }) property: Omit<Property, 'id'>,
  ): Promise<Property> {
    return this.sectionRepository.properties(id).create(property);
  }

  @patch('/sections/{id}/properties', {
    responses: {
      '200': {
        description: 'Section.Property PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Property, {partial: true}),
        },
      },
    })
    property: Partial<Property>,
    @param.query.object('where', getWhereSchemaFor(Property)) where?: Where<Property>,
  ): Promise<Count> {
    return this.sectionRepository.properties(id).patch(property, where);
  }

  @del('/sections/{id}/properties', {
    responses: {
      '200': {
        description: 'Section.Property DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Property)) where?: Where<Property>,
  ): Promise<Count> {
    return this.sectionRepository.properties(id).delete(where);
  }
}
