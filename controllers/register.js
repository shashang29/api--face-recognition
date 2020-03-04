
const saltRounds = 10;

const handleRegister = (req, res, db, bcrypt) => {
    const { email, first_name, last_name, password } = req.body;
    if(!email || !first_name || !last_name || !password){
        return res.status(400).json('incorrect form submission')
    }
    const hash = bcrypt.hashSync(password, saltRounds);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        first_name: first_name.charAt(0).toUpperCase() + first_name.slice(1).toLowerCase(),
                        last_name: last_name.charAt(0).toUpperCase() + last_name.slice(1).toLowerCase(),
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0])
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('Unable to register, try again'))

}


module.exports ={
handleRegister: handleRegister
};