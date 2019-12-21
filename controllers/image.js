const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'a15793ebf0d9498487bcf36e59457c69'
});
const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data=>{
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with api'))
    }



const handleImage = (req, res, db) => {

    const { id } = req.body;
    db.from('users')
        .where({ id })
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            if (entries.length) {
                res.json(entries[0])
            }
            else {
                res.status(400).json('cannot find user information')
            }
        })
        .catch(err => res.status(400).json('unable to get entries'))
}


module.exports = {
    handleImage,
    handleApiCall
}