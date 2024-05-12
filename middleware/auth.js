import jwt from 'jsonwebtoken'
import UnauthenError from '/Users/sarunp/Desktop/blog_port/erros/unauthen.js'

const auth = async(req, res, next)=>{
    console.log(req.cookies)
    const token = req.cookies.token
    if(!token){
        throw new UnauthenError('Authentication Invalid')
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: payload.userId}
        next()
    } catch (error) {
        throw new UnauthenError('Authentication Invalid')
    }
}

export default auth