import crypto from 'crypto';

function sessionSecure(req, res, next) {
    if(req.session.completedRegistration){
        return res.redirect('/')
    }

    if(!req.session.startedRegistration){
        return res.redirect('/user/register/credentials');
    }
    next();
}

function credentialSecure(req, res, next){
    const token = crypto.randomBytes(32).toString('hex');
    if(req.session.completedRegistration){
        return res.redirect('/')
    }
    next();
}
export {
    sessionSecure,
    credentialSecure
};