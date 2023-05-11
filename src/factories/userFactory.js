const UserController = require("../controllers/UserController")
const UserRepository = require("../repositories/UserRepository")
const path = require('path')
const file = path.join(__dirname, '..', 'database', 'user.json')
const generateInstance = () => {
    const userRepository = new UserRepository({ file })
    const userController = new UserController({
        userRepository
    })
    return userController;
}
module.exports = generateInstance;