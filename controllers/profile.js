const handleProfileGet = (req, res, db) => {

    const { id } = req.params;
    db.select('*').from('users').where({ id }).then(user => {
        if (user.length) {
            res.json(user[0]);
        }
        else {
            res.status(400).json('user not found')
        }
    })
        .catch(err => res.status(400).json('error getting user'))

}

const handleProfileUpdate = (req, res, db) => {
    const { id } = req.params;
    const { first_name, last_name, age } = req.body.formInput;
    db('users')
        .where({ id })
        .update({
            first_name: first_name.charAt(0).toUpperCase() + first_name.slice(1).toLowerCase(),
            last_name: last_name.charAt(0).toUpperCase() + last_name.slice(1).toLowerCase(),
            age: age
          })
          .then(resp =>{
              if(resp){
             res.json("success")}
             else{
                 res.status(400).json('unable to update')
             }
          })
          .catch(err=> res.status(400).json('error updating user'))
}
module.exports = {
    handleProfileGet,
    handleProfileUpdate
}

