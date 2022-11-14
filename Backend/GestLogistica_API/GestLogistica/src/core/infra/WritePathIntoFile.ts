import {openSync, readFileSync, writeFileSync, promises as fsPromises} from 'fs';
import {join} from 'path';


export default class WritePathIntoFile {

    public files(){
        fsPromises.open(join(__dirname, 'path_info.txt'),'w');

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
        console.log("CONTENTS:" + contentsArr);    

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

