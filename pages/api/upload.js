import nextConnect from "next-connect";
import multer from 'multer';
import path from 'path';
import {uploadSalesItem, deleteSalesItem} from '../../middleware/db';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: error.message });
  }
});

apiRoute.use(upload.single('productImage'));

apiRoute.post( (req, res) => {
  let requestAllowed = jwt.decode(req.body.cookie.split('=')[1], 'asdf');
  if(!requestAllowed){res.redirect('/'); return}
  if(requestAllowed.authenticated){
    uploadSalesItem({
      type: req.body.type,
      name: req.body.name,
      imgUrl: `uploads/${req.file.filename}`,
      price: req.body.price,
      description: req.body.description
    })
  }
  res.redirect('/')
});

apiRoute.delete(bodyParser.json(), (req, res) => {
  let requestAllowed = jwt.decode(req.body.token.split('=')[1], 'asdf');
  if(requestAllowed){
    deleteSalesItem(req.body.itemImgUrl.split('/').slice(3,5).join('/')).then( (err) => {
      if(err){console.log(err)}
    }).then(()=>{
      res.send('success')
    });
  }
})

export default apiRoute;

export const config = {
  api: {
    bodyParser: false
  }
}