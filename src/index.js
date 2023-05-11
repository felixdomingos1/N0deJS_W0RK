const http = require('http')
const port = 3424

const userFactory = require('./factories/userFactory')
const userController = userFactory()
const User = require('./entities/User')
const { error } = require('console')

const routes = {
    '/user:get': async (request, response) => {
        const { id } = request.queryString
        const users = await userController.find(id)
        response.write(JSON.stringify(users))
        return response.end()
    },

    '/user:post': async (request, response) => {
        for await (const data of request){
            try {
                const item = JSON.parse(data)
                const user = new User(item)
                const { valid, error } = user.isValid()
    
                if(!valid){
                    response.writeHead(400, DefaultHeader)
                    response.write(JSON.stringify({ error: error.join(',') }))
                    return response.end()
                }
    
                const id = await userController.create(user);
                response.writeHead(201, DefaultHeader)
                response.write(JSON.stringify({ message: "User created sucesfully!", id }))
                return response.end()
            } catch (error) {
                return handlerError(response)(error)
            }
        }

    },
    default: async (request, response) => {
        response.end("Rodando!")
    }
}

const handlerError = response => {
    return error => {
        console.error("Erro: ", error)
        response.writeHead(500, DefaultHeader)
        response.write(JSON.stringify({ error: 'Internal Server Error!' }))
        return response.end()
    }
}

const DefaultHeader = { 'Content-Type': 'application/json' }
const handler = async (request, response) => {
    const { url, method } = request
    let [, route, id] = url.split('/')

    request.queryString = { id: isNaN(id) ? id : Number(id) }
    const key = `/${route}:${method.toLowerCase()}`

    response.writeHead(200, DefaultHeader)
    const chosenRoute = routes[key] || routes.default
    chosenRoute(request, response).catch(handlerError(response))
}

http.createServer(handler) .listen(port, () => console.log("Rodando na porta ", port))