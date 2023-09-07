const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer')
const fs = require('fs');

const User = require('./models/User');
const Place = require('./models/Place');
const Booking = require('./models/Booking');

const bcryptjs = require('bcryptjs');
const bcryptSalt = bcryptjs.genSaltSync(6);
const jwtSecret = 'asdeubagdkdj3y86123yuebaksdh';
const jwt = require('jsonwebtoken');

dotenv.config();

const express = require('express');
const { default: mongoose } = require('mongoose');
mongoose.set('strictQuery', true)
const app = express();

app.use(express.json())
app.use(cookieParser())

app.use('/uploads', express.static(__dirname+'/uploads'));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

mongoose.connect(`${process.env.MONGODB_DATABASE_CONNECTION_URL}`);

function getUserDataFromReq(req){
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if(err) throw err;
            resolve(userData);
        });
    });
}


app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcryptjs.hashSync(password, bcryptSalt)
        })

        res.json(userDoc);

    } catch (error) {
        res.status(422).json(error);
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
        const passwordMatch = bcryptjs.compareSync(password, userDoc.password)
        if (passwordMatch) {
            jwt.sign(
                { email: userDoc.email, id: userDoc._id },
                jwtSecret,
                {},
                (error, token) => {
                    if (error) throw error;
                    res.cookie('token', token).json(userDoc);
                });

        } else {
            res.status(422).json('Invalid password!')
        }

    } else {
        res.json('User not found.')
    }
});

app.post('/logout', async (req,res) => {
    res.cookie('token', '').json(true);
});

app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const {name,email,_id} = await User.findById(userData.id);
        res.json({name,email,_id});
      });
    } else {
      res.json(null);
    }
  });

app.post('/upload-by-link', async (req, res) => {
    const {link} = req.body;
    const newName = Date.now() + '.jpg'
    await imageDownloader.image({
        url:link,
        dest: __dirname + '/uploads/' + newName
    });
    res.json(newName);
})

const photosMiddleware = multer({dest:'uploads/'})
app.post('/upload', photosMiddleware.array('photos', 10) ,(req, res) => {
    const uploadedFiles = [];
    for(let i = 0; i < req.files.length; i++) {
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const extension = parts[parts.length - 1];
        const newPath = path + '.' + extension;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads\\', ''));
    }
    res.json(uploadedFiles);
});

app.post('/places', async (req, res) => {
    const {token} = req.cookies;
    const {title, address, addedPhotos, 
        description, perks, extraInfo, 
        checkIn, checkOut, maxGuests, price} = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;

        const placeDoc = await Place.create({
        owner: userData.id,
        title, address, photos:addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price
        });
        res.json(placeDoc); 
    });
});

app.get('/user-places', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        res.json(await Place.find({owner:userData?.id}));
    });

})

app.get('/places/:id', async (req,res) => {
    const {id} = req.params;
    res.json(await Place.findById(id));
});

app.put('/places', async (req,res) => {
    const {token} = req.cookies;
    const {id, title, address, addedPhotos,description, 
        perks, extraInfo, checkIn, checkOut, maxGuests, price} = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if(err)throw err;
        const placeDoc = await Place.findById(id);
        if(userData.id  === placeDoc.owner.toString()){
            placeDoc.set({
                title, address, photos:addedPhotos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price
                });

            await placeDoc.save();
            res.json('Ok')  
        }
    });

        
});

app.get("/places", async (req, res) => {
    res.json(await Place.find());
});

app.post('/bookings', async (req,res) => {
    const {id} = await getUserDataFromReq(req);

    const {place , checkIn, checkOut, 
        guests, name, phone, price} = req.body;
        
    Booking.create({place, user:id, checkIn, checkOut, 
        guests, name, phone, price})
        .then((doc) => {
            res.json(doc);
        }).catch((err) => {
            throw err
        });
        
        
});


app.get('/bookings', async (req,res) => {
    const {id} = await getUserDataFromReq(req);
    res.json( await Booking.find({user:id}).populate('place'));; 
});

  

app.listen(process.env.SERVER_PORT);