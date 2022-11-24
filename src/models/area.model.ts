import {belongsTo, Entity, model, property} from '@loopback/repository';
import {AreaTypes} from './AreaTypes.enum';
import {Property} from './property.model';

// enum AreaTypes {
//   PARKING_LOT = 'parkingLot',
//   UTILITY_ROOM = 'utilityRoom'
// }


@model()
export class Area extends Entity {
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
  // areaType: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(AreaTypes),
    },
  })
  areaType: AreaTypes;

  // @property({
  //   type: 'string',
  //   required: true,
  // })
  // propertyId: string;

  @belongsTo(() => Property)
  propertyId: string;

  constructor(data?: Partial<Area>) {
    super(data);
  }
}

export interface AreaRelations {
  // describe navigational properties here
}

export type AreaWithRelations = Area & AreaRelations;
