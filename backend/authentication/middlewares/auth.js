
const { getUser}= require('../jwt_auth');




function extractToken(bearerToken) {
    //split the bearer token string by space
    const tokenParts = bearerToken.split(' ');

    if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
        return tokenParts[1];
    } else {
        return null;
    }
}




//middleware to authenticate JWT token

function authenticateUser(req, res,next){
    const bearerToken = req.headers['authorization'];
    const token= extractToken(bearerToken);

    console.log();
    if (!token) {
        return res.sendStatus(401);;
    }
    
    const user= getUser(token);
    if(!user){
        return res.sendStatus(403);
    }
    req.userData = user;
    console.log(user);
    next();

}

module.exports={
    authenticateUser
}