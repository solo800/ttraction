var loginForm = function () {
    var selector = '#loginForm';

    var setListeners = function () {
        $('body').on('click', '#loginForm .nav div:not(.active)', function () {
            getForm($(this).find('a').attr('href'));
        });
        $('body').on('click', '#loginForm #signUp', function () {
            signUpUser($(this).closest('#loginForm'));
        });
    };

    function getForm (formName) {
        $.get('getTemplate', {templateName: formName})
            .done(function (template, message, jqXHR) {
                if (200 === jqXHR.status) {
                    t_t.elemTrans(selector, template);
                }
            });
    }
    function signUpUser (form) {
        var email = form.find('[name=userEmail]').val(),
            pass = form.find('[name=userPassword]').val(),
            confPass = form.find('[name=confirmUserPassword]').val();

        if (pass !== confPass) {
            passwordsDontMatch();
        } else {
            $.post('signup', {
                email: email,
                password: pass
            })
            .done(function (template, message, jqXHR) {
                console.log(template);
                console.log(message);
                console.log(jqXHR);
            });
        }
    }
    function passwordsDontMatch () {
        var passElem = $('#loginForm [name=userPassword]'),
            confPassElem = $('#loginForm [name=confirmUserPassword]');

        passElem.before("<span class='errorMessage'>Passwords do not match</span>");
        passElem.addClass('error');
        confPassElem.addClass('error');
    }

    return {
        setListeners: setListeners
    };
};

module.exports = loginForm;
