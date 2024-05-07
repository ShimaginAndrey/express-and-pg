import { Router } from 'express';
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from '../controllers/tasksControllers';
import passport from 'passport';
import session from 'express-session';
const GithubStrategy = require('passport-github2').Strategy;

const router = Router();

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done: (arg0: null, arg1: any) => void) {
    done(null, obj);
});

passport.use(
    new GithubStrategy(
        {
            clientID: 'clientID',
            clientSecret: 'clientSecret',
            callbackURL: '/auth/github/callback',
        },
        function (accessToken: any, refreshToken: any, profile: any, done: any) {
            done(null, profile);
        },
    ),
);

router.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
router.use(passport.initialize());
router.use(passport.session());

router.get('/login', function (req, res) {
    res.send(`authorization failed`);
});

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email', 'user_location'] }));

router.get(
    '/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    },
);

export default router;
