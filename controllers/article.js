const Article = require('../models/article');
const User = require('../models/user');
module.exports = { createArticle, updateArticle, getArticle, deleteArticle };

function createArticle(req, res) {
    User.findById(req.body.owner, function (err, user) {
        if (err) {
            res.status(400).send('User does not exist');
        }

        if (user) {
            let newArticle = new Article({
                title: req.body.title,
                subtitle: req.body.subtitle,
                description: req.body.description,
                owner: req.body.owner,
                category: req.body.category,
            });

            Article.create(newArticle, function (err, article) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    user.numberOfArticles++;
                    user.save();
                    res.status(200).send('Article has been added sucesfully');
                }
            });
        }
    });
}

function updateArticle(req, res) {
    User.findById(req.body.owner, function (err, user) {
        if (err) {
            res.status(400).send('User does not exist');
        } else {
            Article.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.send('Article was successfully updated.');
                }
            });
        }
    });
}

function getArticle(req, res) {
    Article.findById(req.params.id, function (err, article) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(article);
        }
    })
}

function deleteArticle(req, res) {
    Article.findByIdAndRemove(req.params.id, function (err, article) {
        if (err) {
            res.status(400).send(err);
        } else {
            User.findById(article.owner, function (err, user) {
                user.numberOfArticles--;
                user.save();
                res.send('Article was successfully deleted!');
            })
        }
    })
}