var database = function (env) {
    var vars = {
        "production": {
            // TODO
            "mongoUrl": ""
        },
        "default": {
            "mongoUrl": "mongodb://localhost:27017/ttraction"
        }
    };
    return 'undefined' !== typeof vars[env] ? vars[env] : vars.default;
};

module.exports = database;
