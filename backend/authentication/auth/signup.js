const bcrypt = require('bcrypt');
const connection = require('../../connection/connection');

async function handleSignUp(req, res) {
    const { username, password, role, full_name, email, phone } = req.body;

    // Check if the username or email already exists
    const checkQuery = 'SELECT COUNT(*) AS count FROM Users WHERE username = ? OR email = ?';
    await connection.query(checkQuery, [username, email],async (err, result)=>{
        if(err){
            console.log('error',err);
            return;
        }
        console.log('checkResult:',result[0].count);
        console.log('user details',username,password,role,full_name,email,phone);
        if(result[0].count>0){
            return res.status(400).json({ error: 'Username or email already exists' });

        }
        const saltRounds=10;
        const salt = await bcrypt.genSalt(saltRounds);

        const hashedPassword = await bcrypt.hash(password, salt);



        //insert the user into the database
        const insertQuery = 'INSERT INTO Users (username, password, role, full_name, email, phone) VALUES (?, ?, ?, ?, ?, ?)';
        try {
            await connection.query(insertQuery, [username, hashedPassword, role, full_name, email, phone],(err, result)=>{
                if(err){
                    console.log('error in inserting user', err);
                    return;
                }
                console.log('User created', result);
            });

            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {

            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }

    });
   
    
}

module.exports = {
    handleSignUp
};
