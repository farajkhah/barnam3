const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

const User = require('../models/User');

module.exports = function(){
    passport.use(
        new LocalStrategy({ usernameField: 'username' , passwordField: 'password'}, function(username, password, done){
            User.findOne({username: username}, function(err, user){
                if(!user){
                    return done(null,false, {message: 'نام کاربری یافت نشد'});
                }
                if(user.password == password){
                    return done(null, user);
                }
                else {
                    return done(null, false, {message: 'رمز عبور اشتباه میباشد'});
                }
            })
        })
    );
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done){
        User.findById(id,function(err, user){
            done(err, user);
        });
    });
}
