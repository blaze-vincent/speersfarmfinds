import nextConnect from 'next-connect';
import { passwordsMatch, createAdminLogin } from '../../middleware/db';
import jwt from 'jsonwebtoken';

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: error.message });
    }
});

apiRoute.post((req, res) => {
    passwordsMatch(req.body.password).then(match => {
        if(match){
            res.json({token: jwt.sign({
                authenticated: true
            }, "asdf", { expiresIn: '1h' })})
            return;
        }
        res.status(401).send('incorrect password');
    }).catch(err => {
        console.log(err)
    })
})

export default apiRoute;