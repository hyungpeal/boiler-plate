const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');

const config = require('./config/key')

const { User } = require("./models/User");

// application/x-www-form-urlencoded 타입의 데이터를 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}));

// application/json 타입의 데이터를 분석해 가져옴
app.use(bodyParser.json());


// mongodb+srv://hyung:zxcqwe124578%40@bolierplate.1vqsvcn.mongodb.net/?retryWrites=true&w=majority&appName=bolierplate
// mongodb+srv://hyung:zxcqwe124578%40@bolierplate.1vqsvcn.mongodb.net/
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World! 안녕하세요!')
})

app.post('/register', async (request, response) => {

    // 회원 가입 할 때 필요한 정보들을 client 에서 가져오면
    // 그것들을 DB에 넣어준다.

    const user = new User(request.body)

    const result = await user.save().then(()=>{

        response.status(200).json({
            success: true
        })

        // 버전 오류
        // if(err) {
        //     return response.json({ success: false, err})
        // }

        // // status(200) -> 성공했다는 뜻
        // return response.status(200).json({
        //     success: true
        // })
    }).catch((err)=>{
        response.json({
            success: false, err
        })
    })

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})