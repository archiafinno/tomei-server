const errorHandler = (err, req, res, next) => {
    if (['SequelizeValidationError', 'SequelizeUniqueConstraintError'].includes(err.name)) {
        const errors = err.errors.map((error) => ({ message: error.message }));
        return res.status(400).json({ errors });
    } else if (err.name == 'SequelizeDatabaseError' || err.name == 'BadRequest') {
        return res.status(400).json({ errors: err.errors })
    } else if (err.name == 'NotFound') {
        return res.status(404).json({ errors: err.errors })
    } else { 
        return res.status(500).json({ errors: err.errors }) 
    }
}

module.exports = errorHandler