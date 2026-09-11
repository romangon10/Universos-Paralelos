import { cpSync, mkdirSync, existsSync } from 'node:fs';
mkdirSync('dist',{recursive:true});
for(const file of ['index.html','style.css','script.js','simulation.js']) if(existsSync(file))cpSync(file,'dist/'+file);
console.log('Static site built in dist/');
