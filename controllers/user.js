const User = require('../models/user');
const Article = require('../models/article');

module.exports = {createUser, getUser, updateUser, deleteUser,getUserArticles};

function createUser(req, res) {
    let newUser = new User({
      firstName: req.body.firstName,
      lastName:req.body.lastName,
      role: req.body.role,
      nickname: req.body.nickname
    });
    User.create(newUser, function(err,user) {
      if(err) {
        res.status(400).send(err);
      } else {
        console.log("Insert: " + newUser);
        res.status(200).send('User has been added sucesfully');
      }
    });
}

function updateUser(req, res) {
  User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err) {
      if (err) {
        res.status(400).send(err);
    } else {
      res.send('User was successfully updated.');
    }
  });
}

function getUser(req, res) {
    User.findById(req.params.id).lean().exec( function(err, user){
      if(err) console.log(err);
      else {
        if (user.numberOfArticles > 0){
          Article.find({owner: req.params.id}).lean().exec( function(err,articles){
            user.articles = articles;
            res.status(200).send(user);
          })
        }
      }
    });
}

function deleteUser(req, res) {
  User.findByIdAndRemove(req.params.id, function (err,user) {
      if (err) {
        res.status(400).send(err);
      } else {
      Article.deleteMany({owner: user.id},function (err) {
        if (err) {
          res.status(400).send(err);
        }
      }); 
      res.send('User was successfully deleted!');
      }
  })
}

function getUserArticles (req, res) {
  Article.find({owner: req.params.id},function(err, articles){
    if(err){
      res.status(400).send("This user does not have any articles");
    } else {
      res.status(200).send(articles);
    }
});
  }