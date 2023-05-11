const { readFile, writeFile } = require('fs/promises')
class UserRepository{
    constructor({ file }){
        this.file = file
    }
    async getContent(){
        const content = JSON.parse(await readFile(this.file))
        return content;
    }
    async find(itemId){
        const data = await this.getContent()
        if(!itemId) return data;
         
        return data.find(({ id }) => itemId === id)
    }
    async create(data){
        const currentFile = await this.getContent();
        currentFile.push(data);
        await writeFile(this.file, JSON.stringify(currentFile));
        return data.id
    }
}

module.exports = UserRepository;