import {injectable, /* inject, */ BindingScope} from '@loopback/core';
// PART 1 - SERVICES INTEGRATION - REG
const generator = require('password-generator');
const cryptoJS = require('crypto-js');


@injectable({scope: BindingScope.TRANSIENT})
export class AuthenticationService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

    // BEGIN PART 1 - SERVICES INTEGRATION - REG
    GenerarClave()
    {
      let clave = generator(16, false);

      return clave;
    }

    CifrarClave(clave: string)
    {
      let claveCifrada = cryptoJS.MD5(clave).toString();

      return claveCifrada;
    }
    // END PART 1 - SERVICES INTEGRATION - REG

}
