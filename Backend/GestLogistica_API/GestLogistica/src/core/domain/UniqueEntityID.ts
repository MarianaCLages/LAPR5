
/// import uuid from 'uuid/v4';
/// import {v4 as uuidv4} from 'uuid';
const uuidv4 = require('uuid').v4;   // jart
import { Identifier } from './Identifier'

export class UniqueEntityID extends Identifier<string | number>{
  constructor (id?: string | number) {
//    super(id ? id : uuid()) 
    super(id ? id : uuidv4())   //jart
  }
}