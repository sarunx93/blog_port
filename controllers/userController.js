import User from '../model/User.js'
import BadRequestError from '../erros/bad-request.js'
import UnauthenError from '../erros/unauthen.js'
import attachCookies from '../utils/attachCookies.js'

export const register = async (req, res)=>{
    const {name, email, password, lastName} = req.body;
    
    if(!name || !email || !password){
        throw new BadRequestError('Please provide all values') 
    }

    const userAlreadyExists = await User.findOne({email})

    if(userAlreadyExists){
        throw new BadRequestError('User already exists') 
    }

    const user = await User.create({name, email, password, lastName})
    const token = user.createJWT()
    
    attachCookies({res, token})
    
    res.status(201).json({
        user:{
            email: user.email,
            name: user.name,
            lastName: user.lastName
        }
    })

}