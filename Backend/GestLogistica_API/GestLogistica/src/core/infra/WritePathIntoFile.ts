import { readFileSync, writeFileSync, promises as fsPromises } from 'fs';
import { join } from 'path';


async function createFile() {

    const http = require('http');
    var data;
    http.get('http://localhost:3000/api/pathing', res => {
        let data = [];
        const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
        console.log('Status Code:', res.statusCode);
        console.log('Date in Response header:', headerDate);

        res.on('data', chunk => {
            data.push(chunk);
        });

        fsPromises.writeFile(join(__dirname, 'base.txt'), '', {
            flag: 'w',
        })

        res.on('end', () => {
            console.log('Response ended: ');
            data = JSON.parse(Buffer.concat(data).toString());
            data.forEach(element => {
                fsPromises.writeFile(join(__dirname, 'base.txt'), JSON.stringify(element), {
                    flag: 'a+',
                })
            });
        });

        const contents = fsPromises.readFile(
            join(__dirname, 'base.txt'),
            'utf-8',
        );
        console.log(contents); // 👉️ "One Two Three Four"

        return contents;
    }).on('error', err => {
        console.log('Error: ', err.message);
    });
    }