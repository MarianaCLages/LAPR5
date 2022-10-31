import { Document, FilterQuery, Model } from 'mongoose';
import { Service, Inject } from 'typedi';
import { ICamiaoPersistence } from '../dataschema/ICamiaoPersistence';
import { Camiao } from '../domain/camiao/camiao';
import { CaractCamiao } from '../domain/camiao/caractCamiao';
import { CamiaoMap } from '../mappers/CamiaoMap';
import ICamiaoRepo from '../services/IRepos/ICamiaoRepo';

@Service()
export default class camiaoRepo implements ICamiaoRepo {
    private models:any;
    constructor(
        @Inject('camiaoSchema') private camiaoSchema: Model<ICamiaoPersistence & Document>,
    ) { } 

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists (camiao:Camiao): Promise<boolean> {
        const idX = camiao.caractCamiao instanceof CaractCamiao ? (<CaractCamiao>camiao.caractCamiao).value : camiao.caractCamiao;
        const query = { domainId: idX };
        const camiaoDocument = await this.camiaoSchema.findOne(query as FilterQuery<ICamiaoPersistence & Document>);
        
        return !!camiaoDocument === true;
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
            throw err;
        }
    }
}