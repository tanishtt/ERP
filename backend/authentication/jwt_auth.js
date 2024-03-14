const jwt=require('jsonwebtoken');
const secretKey='TanishMohanta';

function setUser(user){
    const payload={
        username: user.username
    }
    console.log(payload);
    const token=  jwt.sign(payload, secretKey);
    console.log(token);
    return token;
}

function getUser(token){
    try {
        //verify the JWT using the secret key
        const decoded =  jwt.verify(token, secretKey);
        return decoded;

    } catch (err) {
        //if the token is invalid or expired, an error will be thrown
        console.error('JWT verification failed:', err.message);
        return null;
    }
}

module.exports={
    setUser,
    getUser
}