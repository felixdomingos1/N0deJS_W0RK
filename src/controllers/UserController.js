class UserController {
    constructor({ userRepository }){
        this.userRepository = userRepository
    }

    async find(id){
        const user = await this.userRepository.find(id);
        return user;
    }

    async create(data){
        const id = await this.userRepository.create(data)

        return id;
    }
}

module.exports = UserController;