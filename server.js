require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

const users = [{
    id: 1,
    username: 'user1',
    password: 'anhvantruong123'
}];

app.post('/login',async (req,res) =>{
    const fixedSalt = bcrypt.genSaltSync(10)
    let {username,password} = req.body;
    let user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }
    const hashedPassword = await bcrypt.hash(password, fixedSalt);
   const hashedPassword1 = await bcrypt.hash(user.password, fixedSalt);
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(hashedPassword, hashedPassword1);
    console.log(hashedPassword);
    console.log(hashedPassword1);
    const istrue = (hashedPassword === hashedPassword1)
    if (!istrue) {
        return res.status(400).json({ message: 'Sai mật khẩu' });
    }
        const token = jwt.sign({id: user.id,username:user.username},process.env.JWT_SECRET,{expiresIn:'2h'})
        res.json({token});
    
});

app.listen(PORT,() =>{
    console.log(`Server running on http://localhost:${PORT}`);
});