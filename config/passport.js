//const pool = require('./db.js');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./db.js');
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            google_id: profile.id,
            display_name: profile.displayName,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            google_image: profile.photos[0].value
        }

        try {
            let user = await User.findOne({ where: { google_id: profile.id } });

            if (user) {
                done(null, user);
            } else {
                user = await User.create(newUser);
                done(null, user);    
            }
        } catch (error) {
            console.error(error.message);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        user = await User.findByPk(id);

        if (user) {
            done(null, user);
        }
    });
}