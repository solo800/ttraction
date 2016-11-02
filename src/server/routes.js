module.exports = function (app, passport) {
    app.use('/getTemplate', function (req, res) {
        if ('undefined' !== typeof req.query.templateName) {
            var templateName = req.query.templateName.replace('#', '');

            res.render('partials/' + templateName, function (err, template) {
                if (!err) {
                    res.send(template);
                } else {
                    res.send('did not find partials/' + templateName);
                }
            });
        } else {
            res.send('did not see templateName in query');
        }
    });

    app.use('/profile', isLoggedIn, function (req, res) {
        console.log(req.user);
        res.send('in profile');
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

    app.use('/', function (req, res) {
        console.log('rendering index');
        console.log(req.user);
        res.render('index');
    });
};

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
}
