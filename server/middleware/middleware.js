    const jwt=require('jsonwebtoken')
    const { user } = require('../models/User')
    const { instruter } = require('../models/Instructor')

    async function verify(req,res,next){
        try{
            const header = req.headers['authorization'];
            const token= header.startsWith('Bearer ') ? header.substring(7):null;
            if (!token) {
                return res.status(403).send('Invalid token format');
            }    
            const id=jwt.verify(token,'shh')
            const loguser=await user.findById(id)
            if(loguser){
                req.user=loguser
                req.user.role='user'
                return next()
            }
            
            const instrutr = await instruter.findById(id);
            if (instrutr) {
                req.user = instrutr;
                req.user.role = 'inst';
                return next();
            }
            return res.status(401).send('Unauthorized');
            
        }
        catch(err){
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
    }
    module.exports={verify}