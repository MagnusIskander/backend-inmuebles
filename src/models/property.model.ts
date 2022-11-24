import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Invoice} from './invoice.model';
import {PropertyTypes} from './PropertyTypes.enum';
import {Section} from './section.model';


// enum PropertyTypes {
//   apartment,
//   studioApartment,
//   Local
// }


@model()
export class Property extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  // @property({
  //   type: 'string',
  //   required: true,
  // })
  // type: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(PropertyTypes),
    },
  })
  type: PropertyTypes;

  @property({
    type: 'number',
    required: true,
  })
  coefficient: number;

  @property({
    type: 'number',
    required: true,
  })
  spaceArea: number;

  // @property({
  //   type: 'string',
  //   required: true,
  // })
  // managementId: string;

  @property({
    type: 'string',
    required: true,
  })
  ownerId: string;

  // @property({
  //   type: 'string',
  //   required: true,
  // })
  // sectionId: string;

  @belongsTo(() => Section)
  sectionId: string;

  @hasMany(() => Invoice)
  invoices: Invoice[];

  constructor(data?: Partial<Property>) {
    super(data);
  }
}

export interface PropertyRelations {
  // describe navigational properties here
}

export type PropertyWithRelations = Property & PropertyRelations;
