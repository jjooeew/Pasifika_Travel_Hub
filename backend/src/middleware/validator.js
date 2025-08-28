const { body, validationResult } = require('express-validator');


const schemas = {
  register: [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Min 6 chars'),
  ],
  login: [
    body('email').isEmail(),
    body('password').exists(),
  ],
  countryCreate: [
    body('name').notEmpty(), 
    body('slug').isSlug(),
    body('intro').isString().isLength({ max: 500 }),
  ],

};


const validate = (schemaName) => [
  ...schemas[schemaName],                    
  (req, res, next) => {                     
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();                                  
  },
];

module.exports = {validate};