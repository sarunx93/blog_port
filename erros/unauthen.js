import CustomAPIError from './custom-error.js'

class UnauthenError extends CustomAPIError {
    constructor(message){
        super(message)
        this.statusCode = 401
    }
} 
export default UnauthenError