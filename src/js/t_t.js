// jshint esversion: 6
var t_t = {
    elemTrans: function (oldElemSelector, replacementHtml, speed = 300) {
        var oldElem = $(oldElemSelector),
            repElem = $(replacementHtml).fadeOut(0),
            anim = $({}),
            qName = 'anim';

        anim.queue(qName, function (next) {
            oldElem.fadeOut(speed);
            next();
        });
        anim.delay(speed, qName);
        anim.queue(qName, function (next) {
            oldElem.replaceWith(repElem);
            next();
        });
        anim.queue(qName, function (next) {
            repElem.fadeIn(speed * 1.5);
            next();
        });
        anim.dequeue(qName);
    }
};

module.exports = t_t;
