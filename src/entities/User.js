class User {
    constructor({ name, age, ocupation }){
        this.id = Math.floor(Math.random() * 100) + Date.now()
        this.name = name
        this.age = age
        this.ocupation = ocupation 
    }
isValid(){
        const propertyNames = Object.getOwnPropertyNames(this)
        const amoungInvalid = propertyNames
            .map(property => (!!this[property]) ? null : `${property} is missing!`)
            .filter(item => !!item)
        return {
            valid: amoungInvalid.length === 0,
            error: amoungInvalid
        }
    }
}

module.exports = User;