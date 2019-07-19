const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const Routes = express.Router()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

const middleWare = require('./middleware');

const options = {
    origin: true,
    "Access-Control-Allow-Credentials": true,
  
    "Access-Control-Allow-Origin": true,
    "Access-Control-Allow-Headers": true,
    "Access-Control-Expose-Headers": true
  };

admin.initializeApp(functions.config().firebase);
let db = admin.firestore();

// const whiteList = ['http://localhost:3000', 'https://uniq-servishp.firebaseapp.com/']

// const corsOptionsDelegate = (request, callback) => {
//     if (whiteList.indexOf(request) !== -1 || !request) return callback(null, true)
//     else return callback(new Error('Oops not true'))
// }
app.use(cors(options));
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api', Routes)



// mongoose.connect('mongodb+srv://root:Divert22@cluster0-rlvus.mongodb.net/datas', { useNewUrlParser: true})
// const connection = mongoose.connection

// connection.once('open', () => {
//     console.log('MongoDB database connection esthablished successfully')
// })

// Routes.get('/secret', withAuth, async (req, res, next) => {
//     try {
//         res.send('the password is wkwkwkk')
//     } catch(e) {
//         return next(e)
//     }
// })


Routes.get('/secret', middleWare, async (req, res, next) => {
    try {
        res.send('You have access')
    } catch(e) {
        return next(e)
    }
}) 


// token verifier
Routes.get('/access-verify', middleWare, async (req, res, next) => {
    try {
        res.sendStatus(200)
    } catch(e) {
        res.json({
            error: "Don't have"
        })
    }
})

// login
Routes.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body
        const ref = await db.collection('account').where('email', '==', email).get()
        const arr = []
        ref.forEach((item) => {
            arr.push({
                id: item.id,
                data: item.data()
            })
        })

        if ((ref) && (arr[0].data.password !== password)) {
            res.json({
                    error: 'Incorrect email or password'
                })
        } else {
            const payload = { email }
            const token = jwt.sign(payload, 'shhhh', {
                expiresIn: '1d'
            })
            res.json({
                token: token
            })
        }
    } catch(e) {
        res.json({
            error: 'Email not registered'
        })
    }
})

// read all data
Routes.get('/', middleWare, async (req, res, next) => {
    try {
        const hpSnap = await db.collection('data_hp').orderBy('create_date', 'desc').get();
        const hp = []
        hpSnap.forEach((item) => {
            hp.push({
                id: item.id,
                data: item.data(),
            })
        })
        res.json(hp)
    } catch(e) {
        return next(e);
    }
})

// get length data
Routes.get('/getlength', async (req, res, next) => {
    try {
        const hp = await db.collection('data_hp').get();
        res.json('Data length: '+hp.size)
    } catch(e) {
        return next(e);
    }
})

// read one data
Routes.get('/:id', async (req, res, next) => {
    try {
        const hp = await db.collection('data_hp').doc(req.params.id).get();
        res.json({
            id: hp.id,
            data: hp.data()
        })
    } catch(e) {
        return next(e);
    }
})

// search data
Routes.get('/search/:keyword', async (req, res, next) => {
    const keywordCapitalize = req.params.keyword.replace(/\b\w/g, function (match) {
        return match.toUpperCase();
    })
    .split(' ')
    .join(' ');

    try {
        const hpSnap = await db.collection('data_hp').where('name_owner', '>=', keywordCapitalize).orderBy('name_owner', 'asc').get();
        const hp = []
        hpSnap.forEach((item) => {
            hp.push({
                id: item.id,
                data: item.data(),
            })
        })
        res.json(hp)
    } catch(e) {
        return next(e);
    }
})

function toCapitalize(word) {
    return word.replace(/\b\w/g, function (match) {
        return match.toUpperCase();
    })
    .split(' ')
    .join(' ');
}

// add a data
Routes.post('/add', async (req, res, next) => {
    
    try {
        const {
            brand_hp,
            type_hp,
            color_hp,
            phone_number_owner,
            name_owner,
            problems,
            down_payment,
            create_date,
            due_date,
            checkin_signature,
        } = req.body;

        let payload = {
            brand_hp: toCapitalize(brand_hp),
            type_hp: toCapitalize(type_hp),
            color_hp,
            phone_number_owner,
            name_owner: toCapitalize(name_owner),
            problems,
            down_payment,
            must_pay: null,
            final_payment: 0,
            due_date,
            checkin_signature,
            checkout_signature: null,
            total_fee: 0,
            total_profit: 0,
            photo: null,
            status: 'pending',
            create_date,
            update_date: null,
            checkout_date: null
        }

        problems.map((problem) => {
            problem.name = toCapitalize(problem.name)
            payload.total_fee += problem.fee
            payload.total_profit += (problem.fee - problem.sparepart_fee)
        })

        if (down_payment) payload.must_pay = payload.total_fee - down_payment
        else payload.must_pay = payload.total_fee
        

        const ref = await db.collection('data_hp').add(payload);
        res.json({
            id: ref.id,
            payload,
        });
    } catch(e) {
        return next(e);
    }
})

// edit a data
Routes.put('/edit/:id', async (req, res, next) => {
    try {
        const {
            brand_hp,
            type_hp,
            color_hp,
            phone_number_owner,
            name_owner,
            problems,
            down_payment,
            due_date,
            status,
            update_date,
            checkout_date,
        } = req.body


        const payload = {
            brand_hp,
            type_hp,
            color_hp,
            phone_number_owner,
            name_owner,
            problems,
            down_payment,
            must_pay: 0,
            due_date,
            total_fee: 0,
            total_profit: 0,
            status,
            update_date,
            checkout_date
        }

        problems.map((problem) => {
            payload.total_fee += problem.fee
            payload.total_profit += (problem.fee - problem.sparepart_fee)
        })

        if (down_payment) payload.must_pay = payload.total_fee - down_payment
        else payload.must_pay = payload.total_fee

        const ref = await db.collection('data_hp').doc(req.params.id).set(payload, { merge: true })
        res.json({
            id: req.params.id,
            data: req.body
        })
    } catch(e) {
        return next(e)
    }
})






// delete a data
// Routes.delete('/')

// Routes.put('/:id', (req, res, next) => {
//     try {

//     }
// })

// todoRoutes.route('/add').post((req, res) => {
//     let hp = new Hp(req.body)
//     hp.save()
//         .then(hp => {
//             res.status(200).json({hp: 'hp added successfully'})
//             return hp

//         })
//         .catch(err => {
//             res.status(400).send('failed adding hp')
//             throw err
//         })
// })

// app.get('/', (req, res) => {
//     res.send('API sukses bro')
// })

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);
