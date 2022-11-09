const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

router.get('/', async (req, res) => {
  try {
    const postData = await SomeModel.someSequelizeMethod({
      include: [SomeOtherModel],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('hmmmm what view should we render?', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await SomeModel.findByPk( {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });
      res.render('hmmmm what view should we render?', { post });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;