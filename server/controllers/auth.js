import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
//Register User
export const register = async (req,res)=>{
    try{
        const {username,password} = req.body
        
        const isUsed = await User.findOne({username}) 
        if(isUsed){
            return res.json({
                message: 'this username is exist.'
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hash
        })

        const token = jwt.sign({
            id: newUser._id,
        },
        process.env.JWT_SECRET,
        {expiresIn: '30d'}
        )

        await newUser.save()

        res.json({token,newUser, message: 'registration successful'})

    }catch(error){
        res.json({
            message: 'faild on registration new user'
        })
    }
}

//Login User
export const login = async (req,res)=>{
    try{
        const {username,password} = req.body
        const user = await User.findOne({username})
        if(!user){
            return res.json({
                message: 'this user is not exists on login'
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect){
            res.json({
                message: 'password wrong in login'
            })
        }

        const token = jwt.sign({
            id: user._id,
        },
        process.env.JWT_SECRET,
        {expiresIn: '30d'}
        )

        res.json({token,user, message: 'user login to site'})


    }catch(error){
        res.json({
            message: 'faild on login'
        })
    }
}


//Get ME User
export const getme = async (req,res)=>{
    try{
        const user = await User.findById(req.userId)

        if(!user){
            return res.json({
                message: 'this user is not exists on login'
            })
        }

        const token = jwt.sign({
            id: user._id,
        },
        process.env.JWT_SECRET,
        {expiresIn: '30d'}
        )

        res.json({
            user,token
        })

    }catch(error){
          res.json({
            message: 'not promise get here'
        })
    }
}