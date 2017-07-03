
let roleController = {};


roleController.create = function(req, res) {
    req.app.models.user.find({id: req.body.userId}, function(err, users) {
        console.log('Users');
        console.log(users);
        let user = users[0];

        user.roles.add({name: req.body.role, siteId: req.body.siteId});

        user.save(function(err) {
            console.log('Saved');
            res.status(201).send('OK');            
        });
    });
};


module.exports = roleController;