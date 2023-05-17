import passport from 'passport';
passport.serializeUser((username, done) => {
    console.log('serializeUser');
    console.log(username);
    done(null, username);
});
passport.deserializeUser((username, done) => {
    console.log('deserializeUser');
    return done(null, username);
});
