var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    configDB = require('./src/server/config/database.js')(process.env.NODE_ENV);

mongoose.connect(configDB.mongoUrl);

app.use(cookieParser());
app.use(bodyParser());

app.use(session({ secret: 'thisissomesecret' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('dist'));

app.set('views', 'dist/views');
app.set('view engine', 'ejs');

var port = process.env.PORT || 8081;

require('./src/server/routes')(app, passport);
require('./src/server/config/passport')(passport);

app.listen(port, function (err) {
    if ("production" !== process.env.NODE_ENV) {
        console.log('Running server on port ' + port);
    }

    if (err) {
        console.log('error running server on port ' + port);
    }
});

// app.use('/getTemplate', function (req, res) {
//     if ('undefined' !== typeof req.query.templateName) {
//         var templateName = req.query.templateName.replace('#', '');
//
//         res.render('partials/' + templateName, function (err, template) {
//             if (!err) {
//                 res.send(template);
//             } else {
//                 res.send('did not find partials/' + templateName);
//             }
//         });
//     } else {
//         res.send('did not see templateName in query');
//     }
// });
//
// app.use('/', function (req, res) {
//     console.log('rendering index');
//     res.render('index');
// });
