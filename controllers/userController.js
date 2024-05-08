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

export const login = async(req,res)=>{
   const {email, password} = req.body
   
   if(!email || !password){
        throw new BadRequestError('Please provide all credentials')
   }

   const user = await User.findOne({email}).select('+password')

   if(!user){
        throw new UnauthenError('User does not exist')
   }

   const isPasswordCorrect = await user.comparePassword(password)
   
   if(!isPasswordCorrect){
        throw new UnauthenError('Password incorrect.')
   }

   const token = user.createJWT()
   attachCookies({res, token})

   user.password = undefined
   
   res.status(200).json({user, isLoggedIn: true, token})
}

export const logout = async(req,res)=>{
    
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000)
    })
    res.status(200).json({msg: 'user logged out'})
}