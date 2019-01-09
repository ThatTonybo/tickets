import { Router } from 'express';

const router = Router();

router.route('/login')
.get(async (req: any, res: any) => {
    if (req.session.user) return res.redirect('/tickets');
    return res.render('login', {});
})
.post(async (req: any, res: any) => {
    if (req.session.user) return res.redirect('/tickets');
    
});

router.route('/register')
.get(async (req: any, res: any) => {
    if (req.session.user) return res.redirect('/tickets');
    return res.render('register', {});
})
.post(async (req: any, res: any) => {
    if (req.session.user) return res.redirect('/tickets');
    
});

export default router;