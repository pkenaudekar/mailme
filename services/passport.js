const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true        
    }, 
    /*(accessToken, refreshToken, profile, done) => {
        //console.log('access token ',accessToken);
        //console.log('refresh token ',refreshToken);
        //console.log('profile: ',profile);
        
        // Check if the current google user record already exists in database
        User.findOne({googleId: profile.id}).then((existingUser) => {
                if(existingUser){
                    // we already have a record with the given profile id
                    done(null, existingUser);

                }else{
                    // else make a new record
                    new User({googleId: profile.id})
                    .save()
                    .then(user => done(null, user));
                }
            }
        );        
    })*/
    async (accessToken, refreshToken, profile, done) => {
        //console.log('access token ',accessToken);
        //console.log('refresh token ',refreshToken);
        //console.log('profile: ',profile);
        
        // Check if the current google user record already exists in database
        const existingUser = await User.findOne({googleId: profile.id});
        
        if(existingUser){
            // we already have a record with the given profile id
            return done(null, existingUser);
        }
        
        // else make a new record
        const user = await new User({googleId: profile.id}).save();
        done();                 
    })
);