import {Inject, Service} from 'typedi';

import {Caminho} from "../domain/caminho/caminho";
import {CaminhoId} from "../domain/caminho/caminhoId";

import {Document, FilterQuery, Model, models} from 'mongoose';
import {ICaminhoPersistence} from '../dataschema/ICaminhoPersistence';
import {CaminhoMap} from '../mappers/CaminhoMap';
import ICaminhoRepo from '../services/IRepos/ICaminhoRepo';
import {Result} from "../core/logic/Result";
import { Mapper } from '../core/infra/Mapper';
import { CaminhoArmazemPartidaId } from '../domain/caminho/caminhoArmazemPartidaId';
import { CaminhoArmazemChegadaId } from '../domain/caminho/caminhoArmazemChegadaId';

@Service()
export default class CaminhoRepo implements ICaminhoRepo {
    async;
    private models: any;

    constructor(
        @Inject('caminhoSchema') private caminhoSchema: Model<ICaminhoPersistence & Document>,
    ) {
    }

    public async exists(caminho: Caminho): Promise<boolean> {

        const idX = caminho.id instanceof CaminhoId ? (caminho.id).toValue() : caminho.id;

        const query = {domainId: idX};
        const roleDocument = await this.caminhoSchema.findOne(query as FilterQuery<ICaminhoPersistence & Document>);

        return !!roleDocument === true;
    }

    public async save(caminho: Caminho): Promise<Caminho> {

        await models.Caminho.create(CaminhoMap.toPersistence(caminho));

        return caminho;

    }

    public async findByDomainId(caminhoId: CaminhoId | string): Promise<Caminho> {
        const query = {id: caminhoId};
        const roleRecord = await this.caminhoSchema.findOne(query as FilterQuery<ICaminhoPersistence & Document>);

        if (roleRecord != null) {
            return CaminhoMap.toDomain(roleRecord);
        } else {
            return null;
        }
    }


    public async getAllCaminhos(): Promise<Result<Array<Caminho>>> {
        var lista = new Array<Caminho>; 
        (await this.caminhoSchema.find({})).forEach(
            caminho =>
            lista.push(CaminhoMap.toDomain(caminho))
        )

        if(lista !=null){
        return Result.ok(lista);
        } else {
        return null;
        }
    }

    public async getByArmazemPartidaId(armazemPartidaId: CaminhoArmazemPartidaId | string): Promise<Result<Array<Caminho>>> {
        const query = {armazemPartidaId: armazemPartidaId};
        
        var lista = new Array<Caminho>;
        (await this.caminhoSchema.find(query)).forEach(
            caminho =>
            lista.push(CaminhoMap.toDomain(caminho))
        )

        if(lista !=null){
            return Result.ok(lista);
        } else {
            return null;
        }
    }

    public async getByArmazemChegadaId(armazemChegadaId: CaminhoArmazemChegadaId | string): Promise<Result<Array<Caminho>>> {
        const query = {armazemChegadaId: armazemChegadaId};

        var lista = new Array<Caminho>;
        (await this.caminhoSchema.find(query)).forEach(
            caminho =>
            lista.push(CaminhoMap.toDomain(caminho))
        )

        if(lista !=null){
            return Result.ok(lista);
        } else {
            return null;
        }
    }
    


    public async delete(caminhoId: CaminhoId) {
        const query = {idCaminho: caminhoId};
        this.caminhoSchema.deleteMany(query as FilterQuery<ICaminhoPersistence & Document>);
        return true;
    }

    public async update(caminho: Caminho): Promise<Result<Caminho>> {

        const query = {id: caminho.id.toString()};

        const caminhoDocument = await this.caminhoSchema.findOne(query);

        try {
            if (caminhoDocument === null) {
                const rawUser: any = CaminhoMap.toPersistence(caminho);

                const caminhoCreated = await this.caminhoSchema.create(rawUser);

                return Result.ok(CaminhoMap.toDomain(caminhoCreated));
            } else {
                caminhoDocument.tmpCarregamento = caminho.caminhoTmpCarregamento.value;
                caminhoDocument.energia = caminho.caminhoEnergia.value;
                caminhoDocument.distancia = caminho.caminhoDistancia.value;
                caminhoDocument.armazemPartidaId = caminho.caminhoArmazemPartidaId.value;
                caminhoDocument.armazemChegadaId = caminho.caminhoChegadaId.value;
                caminhoDocument.tempo = caminho.caminhoTempo.value;

                await caminhoDocument.save();

                return Result.ok(caminho);

            }
        } catch (err) {
            throw err;
        }
    }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

}
