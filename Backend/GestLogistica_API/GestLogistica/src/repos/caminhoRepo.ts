import {Inject, Service} from 'typedi';

import {Caminho} from "../domain/caminho/caminho";
import {CaminhoId} from "../domain/caminho/caminhoId";

import {Document, FilterQuery, Model, models} from 'mongoose';
import {ICaminhoPersistence} from '../dataschema/ICaminhoPersistence';
import {CaminhoMap} from '../mappers/CaminhoMap';
import ICaminhoRepo from '../services/IRepos/ICaminhoRepo';
import {Result} from "../core/logic/Result";

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
        const query = {domainId: caminhoId};
        const roleRecord = await this.caminhoSchema.findOne(query as FilterQuery<ICaminhoPersistence & Document>);

        if (roleRecord != null) {
            return CaminhoMap.toDomain(roleRecord);
        } else
            return null;
    }

    public async delete(caminhoId: CaminhoId) {
        const query = {idCaminho: caminhoId};
        await this.caminhoSchema.deleteMany(query as FilterQuery<ICaminhoPersistence & Document>);
    }

    public async update(caminho: Caminho): Promise<Result<Caminho>> {

        const query = {domainId: caminho.id.toString()};

        const caminhoDocument = await this.caminhoSchema.findOne(query);

        try {
            if (caminhoDocument === null) {
                const rawCaminho: any = CaminhoMap.toPersistence(caminho);

                const caminhoCreated = await this.caminhoSchema.create(rawCaminho);

                return Result.ok<Caminho>(CaminhoMap.toDomain(caminhoCreated));
            } else {

                return Result.ok<Caminho>(caminho);
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
