const bcrypt = require('bcryptjs')

module.exports = {
    register: async(req, res) => {

        const db = req.app.get('db'),
         {email, password} = req.body;

console.log(email, 'req.body')
console.log(password,'pass re.body')

         const foundUser = await db.check_user(email)
       if(foundUser[0]){
           return res.status(400).send('Email already registered')
       }
        let salt = bcrypt.genSaltSync(),
        hash = bcrypt.hashSync(password, salt);

        const newUser = await db.register([email, hash])

        req.session.user = newUser[0]

        res.status(201).send(req.session.user)

    },
    getUsers: async(req, res)=>{
        const db = req.app.get('db');

        const users = await db.getUsers()
        
        res.status(200).send(users)


    },
    login: async(req, res) =>{
        const {email, password} = req.body,
        db = req.app.get('db'),

        foundUser = await db.check_user(email);

        if(!foundUser[0]){
            res.status(400).send('user not found')
        }

        const authenticated = bcrypt.compareSync(password, foundUser[0].password)
        if(!authenticated){
            return res.status(403).send('Username or password do not match')
        }
        delete foundUser[0].password
        req.session.user = foundUser[0]

        res.status(202).send(req.session.user)
        
    },

    logMeIn: async(req,res)=>{
        const db = req.app.get('db');

        if(req.session.user){
        //  const me = await db.get_user_id(req.session.account_id)
          //console.log(me, "log me in")
          res.status(200).send(req.session.user) 
        }else{
          res.sendStatus(200) 
        }

    }

}