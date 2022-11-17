import {openSync, readFileSync, writeFileSync, promises as fsPromises} from 'fs';
import {join} from 'path';
import http from "http";
import fetch from 'node-fetch';
import https from "https";


export default class WritePathIntoFile {

    prologApiPath = '../../Prolog_API';

    httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });

    httpAgent = new http.Agent({

    });

    public files(){


        var c = '\\';
        fsPromises.open(join(__dirname,'orderspath.txt'),'w');
        fsPromises.writeFile(join(__dirname,'orderspath.txt'), __dirname+c+"orders.pl");
    }

    public generateFiles(){
        var c = '\\';
        fsPromises.open(join(this.prologApiPath,'paths.pl'),'w');
        fsPromises.open(join(this.prologApiPath,'warehouse.pl'),'w');
        fsPromises.open(join(__dirname,'orders.pl'),'w');
        fsPromises.open(join(__dirname,'orderspath.txt'),'w');
        fsPromises.writeFile(join(__dirname,'orderspath.txt'), __dirname+c+"orders.pl");
    }

    public async createWarehousesFile(){

        const url = 'https://localhost:5001/api/Warehouse';

        const response = await fetch(url, {
            method: 'GET',
            agent: this.httpsAgent,
            headers: {
                Accept: 'application/json',
            }
        })

        const result = (await response.json());
        var pathArray = [];
        var stringFormat: string;

        for(var i = 0; i < result.length; i++){

            var warehouseId = result[i].alphaNumId
            warehouseId = warehouseId.substring(1);

            var warehouseIdNumber = +warehouseId;

            stringFormat = 'warehouses(' + result[i].street + ',' + warehouseIdNumber + ').';

            pathArray.push(stringFormat);
        }

        for(var i = 0; i < result.length; i++){
            await fsPromises.appendFile(join(this.prologApiPath, "warehouse.pl"), pathArray[i] + "\r\n", {
                flag: 'a+',
            });
        }
    }

    public async createPathFile() {

        const url = 'http://localhost:3000/api/paths/allPaths';

        const response = await fetch(url, {
            method: 'GET',
            agent: this.httpAgent,
            headers: {
                Accept: 'application/json',
            }
        })

        const result = (await response.json());
        var pathArray = [];
        var stringFormat: string;

        for (var i = 0; i < result.length; i++) {

            var warehouseBegginingString = result[i].beginningWarehouseId.toString();
            var warehouseEndingString = result[i].endingWarehouseId.toString();

            warehouseBegginingString = warehouseBegginingString.substring(1);
            warehouseEndingString = warehouseEndingString.substring(1);

            var warehouseBegginingNumber = +warehouseBegginingString;
            var warehouseEndingNumber = +warehouseEndingString;

            stringFormat = 'paths(' + warehouseBegginingNumber + ',' + warehouseEndingNumber + ',' + result[i].distance.toString() + ',' + result[i].energy.toString() + ',' + result[i].chargingTime.toString() + ',' + result[i].time.toString() + ').';
            pathArray.push(stringFormat);
        }

        for (var i = 0; i < result.length; i++) {
            await fsPromises.appendFile(join(this.prologApiPath, "paths.pl"), pathArray[i] + "\r\n", {
                flag: 'a+',
            });

        }
    }

    public createFile(filename : string, requestArgument : string) {

        try {
            const http = require('http');

            http.get('http://localhost:3000/api/' + requestArgument, async res => {
                let data = [];
                const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
                console.log('Status Code:', res.statusCode);
                console.log('Date in Response header:', headerDate);

                res.on('data', chunk => {
                    data.push(chunk);
                });

                res.on('end', () => {
                    console.log('Response ended: ');
                    data = JSON.parse(Buffer.concat(data).toString());

                    fsPromises.writeFile(join(__dirname, filename), JSON.stringify(data), {
                        flag: 'a+',

                    });
                });

                this.createPredicate(filename);

                const contents = fsPromises.readFile(
                    join(__dirname, filename),
                    'utf-8',
                );
                console.log(contents); // 👉️ "One Two Three Four"


                return contents;
            });



        }catch (e){

            if( e instanceof TypeError){
                console.log("Não existe Paths");
            }
        }



    }

    //Acrescentar este método e chamá-lo no método que escreve no file
    //Transforma o conteúdo original dos ficheiros em formato predicado
    private async createPredicate(filename: string){


        var contents = await fsPromises.readFile(
            join(__dirname, filename),
            'utf-8',
        );

        var contentsArr = contents.split('}');
        var value;
        var rep = /,/gi;
        var finalContent = '';

        for (let l = 0; l < contentsArr.length-1; l++) {
            value = contentsArr[l].split(',');
            finalContent += filename.split('_')[0] + "(";
            for (let i = 1; i < value.length; i++) {
                finalContent += value[i].split(':')[1].split('"').toString().replace(rep,'') + ',';
            }
            finalContent = finalContent.slice(0,finalContent.length - 1) + finalContent.slice(finalContent.length,finalContent.length);
            finalContent += ').\n';
        }



        fsPromises.writeFile(join(__dirname, filename),finalContent);

        return await finalContent;
    }
}