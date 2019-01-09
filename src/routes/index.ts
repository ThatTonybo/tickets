import { Router } from 'express';

const router = Router();

router.route('/')
.get(async (req: any, res: any) => {
    if (req.session.user) {
        return res.redirect('/tickets');
    } else {
        return res.render('login', {});
    }
})
.post(async (req: any, res: any) => {
    
});

export default router;