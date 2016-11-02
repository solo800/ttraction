var localStrategy = require('passport-local').Strategy,
    User = require('../models/user');

module.exports = function (passport) {
    passport.serializeUser(function (user, cb) {
        cb(null, user.id);
    });
    passport.deserializeUser(function (id, cb) {
        User.findById(id, function (err, user) {
            cb(err, user);
        });
    });

    passport.use('local-signup', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, cb) {
        process.nextTick(function () {
            User.findOne({ 'local.email': email}, function (err, user) {
                if (err) {
                    console.warn('Uh oh! Error getting one user in local strategy');
                } else if (null !== user) {
                    res.send('User already exists');
                } else {
                    var newUser = new User();

                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function (err) {
                        if (err) {
                            console.warn('Error saving new user');
                        }
                        return cb(err, newUser);
                    });
                }
            });
        });
    }));
};
