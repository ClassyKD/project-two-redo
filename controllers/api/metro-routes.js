const router = require('express').Router();
const { Metro, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // Get all projects and JOIN with user data
        const metroData = await Metro.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },

            ],
        });

        // Serialize data so the template can read it
        const metros = metroData.map((metro) => metro.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            metros,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

