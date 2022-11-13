import {openSync, readFileSync, writeFileSync, promises as fsPromises} from 'fs';
import {join} from 'path';


export default class WritePathIntoFile {

    public files(){
        fsPromises.open(join(__dirname, 'path_info.txt'),'w');

    }

    public createFile() {

        try {
            const http = require('http');

            http.get('http://localhost:3000/api/paths/allPaths', async res => {
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

                        fsPromises.writeFile(join(__dirname, 'path_info.txt'), JSON.stringify(data), {
                            flag: 'a+',

                    });
                });

                const contents = fsPromises.readFile(
                    join(__dirname, 'path_info.txt'),
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
    }

