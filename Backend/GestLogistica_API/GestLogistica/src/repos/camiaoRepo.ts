import { Document, FilterQuery, Model } from 'mongoose';
import { Service, Inject } from 'typedi';
import { Result } from '../core/logic/Result';
import { ICamiaoPersistence } from '../dataschema/ICamiaoPersistence';
import { Camiao } from '../domain/camiao/camiao';
import { CaractCamiao } from '../domain/camiao/caractCamiao';
import { CamiaoMap } from '../mappers/CamiaoMap';
import ICamiaoRepo from '../services/IRepos/ICamiaoRepo';


@Service()
export default class camiaoRepo implements ICamiaoRepo {
    private models: any;
    constructor(
        @Inject('camiaoSchema') private camiaoSchema: Model<ICamiaoPersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(camiao: Camiao): Promise<boolean> {
        const idX = camiao.caractCamiao instanceof CaractCamiao ? (<CaractCamiao>camiao.caractCamiao).value : camiao.caractCamiao;
        const query = { domainId: idX };
        const camiaoDocument = await this.camiaoSchema.findOne(query as FilterQuery<ICamiaoPersistence & Document>);

        return !!camiaoDocument === true;
    }

    public async findByDomainId(caractCamiao: CaractCamiao | string): Promise<Camiao> {
        const query = { domainId: caractCamiao };
        const roleRecord = await this.camiaoSchema.findOne(query as FilterQuery<ICamiaoPersistence & Document>);

        if (roleRecord != null) {
            return CamiaoMap.toDomain(roleRecord);
        } else
            return null;
    }

    public async findByMatriculaCamiao(matriculaCamiao: string): Promise<Result<Camiao>> {
        const query = { matriculaCamiao: matriculaCamiao };
        const camiaoRecord = await this.camiaoSchema.findOne(query as FilterQuery<ICamiaoPersistence & Document>);
        if (camiaoRecord != null) {
            return Result.ok<Camiao>(CamiaoMap.toDomain(camiaoRecord));
        } else
            return Result.fail<Camiao>("Camiao não encontrado");
    }


    public async save(camiao: Camiao): Promise<Camiao> {
        const query = { domainId: camiao.id.toString() };
        const camiaoDocument = await this.camiaoSchema.findOne(query);
        try {
            if (camiaoDocument === null) {
                const rawCamiao: any = CamiaoMap.toPersistence(camiao);
                const camiaoCreated = await this.camiaoSchema.create(rawCamiao);
                return CamiaoMap.toDomain(camiaoCreated);
            } else {
                camiaoDocument.id = camiao.id.toString();
            }
        } catch (err) {
            console.debug(err.message + " " + err.stack);
        }
    }

    public async update(camiao: Camiao): Promise<Result<Camiao>> {

        const query = { domainId: CaractCamiao.toString() };

        const camiaoDocument = await this.camiaoSchema.findOne(query);

        try {
            if (camiaoDocument != null) {
                const rawUser = CamiaoMap.toPersistence(camiao);

                const camiaoCreated = await this.camiaoSchema.create(rawUser);

                return Result.ok(CamiaoMap.toDomain(camiaoCreated));
            }
            else {
                camiaoDocument.matriculaCamiao = camiao.matriculaCamiao.value;
                camiaoDocument.capacidadeCarga = camiao.capacidadeCarga.value;
                camiaoDocument.cargaTotal = camiao.cargaTotal.value;
                camiaoDocument.cargaMaxima = camiao.cargaMax.value;
                camiaoDocument.tara = camiao.tara.value;
                camiaoDocument.tempoCarregamento = camiao.tempoCarregamento.value;

                await camiaoDocument.save();

                return Result.ok(camiao);

            }
        } catch (err) {
            throw err;
        }
    }
}