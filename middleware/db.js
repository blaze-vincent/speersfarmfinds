import mongoose from 'mongoose';
import SalesItem from '../models/salesItem';
import AdminLogin from '../models/adminlogin';
import crypto from 'crypto';
import fs from 'fs';

export async function dbconnect(){
    if(mongoose.connection.readyState >= 1) return;

    return mongoose.connect(process.env.DB_CONN_STR, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    });
}

export function jsonify(obj){
    return JSON.parse(JSON.stringify(obj));
}

export function genSalt(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

export function hash(password, salt) {
    let hmacPass = crypto.createHmac('sha512', salt);
    hmacPass.update(password);
    let value = hmacPass.digest('hex');
    return {
        salt: salt,
        hashedpassword: value
    };
}

export async function passwordsMatch(password){
    await dbconnect();
    let passHash = await AdminLogin.findOne({}).exec();

    passHash = jsonify(passHash)
    let passwordData = hash(password, passHash.password.salt);
    if (passwordData.hashedpassword === passHash.password.hashedpassword) {
        return true;
    }
    return false;
}

export async function uploadSalesItem({type, name, imgUrl, price, description}){
    await dbconnect();
    await SalesItem.create({
        type,
        name,
        imgUrl,
        price,
        description
    }, err => {
        if(err){return err}
    });
}

export async function deleteSalesItem(imgUrl){
    await dbconnect();
    
    await SalesItem.findOneAndDelete({imgUrl}, (err => {
        if(err){return err}
    }));
    fs.unlink(`./public/${imgUrl}`,  err => {
        if (err) { console.log(err) }
      })
}

export async function createAdminLogin(password){
    await dbconnect();
    if(await AdminLogin.find({}).exec()){
        await AdminLogin.deleteMany({});
    }
    let pass = await hash(password, genSalt(20))
    await AdminLogin.create({
        name: 'admin',
        password: pass
    }, err => {
        if(err){console.log(err)}
    })
}
