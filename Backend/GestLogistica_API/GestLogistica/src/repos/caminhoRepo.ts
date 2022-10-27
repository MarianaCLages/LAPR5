import { Service, Inject } from 'typedi';

import IRoleRepo from "../services/IRepos/IRoleRepo";

import { Caminho } from "../domain/caminho/caminho";
import { CaminhoId } from "../domain/caminho/caminhoId";

import { Document, FilterQuery, Model } from 'mongoose';
import { ICaminhoPersistence } from '../dataschema/ICaminhoPersistence';
import { CaminhoMap } from '../mappers/CaminhoMap';
import ICaminhoRepo from '../services/IRepos/ICaminhoRepo';
import { CaminhoArmazemChegadaId } from '../domain/caminho/caminhoArmazemChegadaId';

@Service()
export default class CaminhoRepo implements ICaminhoRepo {
  private models: any;

  constructor(
    @Inject('caminhoSchema') private caminhoSchema : Model<ICaminhoPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(caminho: Caminho): Promise<boolean> {
    
    const idX = caminho.id instanceof CaminhoId ? (<CaminhoId>caminho.id).toValue() : caminho.id;

    const query = { domainId: idX}; 
    const roleDocument = await this.caminhoSchema.findOne( query as FilterQuery<ICaminhoPersistence & Document>);

    return !!roleDocument === true;
  }

  public async save (caminho: Caminho): Promise<Caminho> {
    const query = { domainId: caminho.id.toString()}; 

    const caminhoDocument = await this.caminhoSchema.findOne( query );

    try {
      if (caminhoDocument === null ) {
        const rawRole: any = CaminhoMap.toPersistence(caminho);

        const caminhoCreated = await this.caminhoSchema.create(rawRole);

        return CaminhoMap.toDomain(caminhoCreated);
      } else {
        
        caminhoDocument.id = caminho.id.toString();

        await caminhoDocument.save();

        return caminho;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (caminhoId: CaminhoId | string): Promise<Caminho> {
    const query = { domainId: caminhoId};
    const roleRecord = await this.caminhoSchema.findOne( query as FilterQuery<ICaminhoPersistence & Document> );

    if( roleRecord != null) {
      return CaminhoMap.toDomain(roleRecord);
    }
    else
      return null;
  }
}