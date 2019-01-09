import { Router } from 'express';

const router = Router();

router.get('/', async (req: any, res: any) => {
    if (req.session.user) {
        return res.redirect('/tickets');
    } else {
        return res.render('index', {});
    }
});

export default router;