import {belongsTo, Entity, model, property} from '@loopback/repository';
import {RolesList} from './RolesList.enum';
import {User} from './user.model';


// enum RolesList {
//   ADMIN = 'administrator',
//   OWNER = 'owner',
//   RESIDENT = 'resident'
// }


@model()
export class Role extends Entity {
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
  // role: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(RolesList),
    },
  })
  role: RolesList;

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {
  // describe navigational properties here
}

export type RoleWithRelations = Role & RoleRelations;
