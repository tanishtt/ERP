const connection= require('../../connection/connection')
const bcrypt= require('bcrypt');
const {setUser} = require('../jwt_auth')


async function handleSignIn(req, res){

    const { username, password } = req.body;
    const user=req.body;
    console.log(user);
    await connection.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err);
            return res.status(401).json({ error: 'Internal server error' });
        }


        if (results.length === 0 ){
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const passwordMatch= await bcrypt.compare(password, results[0].password);

        if(!passwordMatch){
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token=setUser(user);
        console.log(token);
        res.json({ token });
    });

}

module.exports={
    handleSignIn
}