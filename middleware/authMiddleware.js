const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Truy cập bị từ chối' });

    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.user = decoded;
        next();
        console.log('okkoko');
        opkeeee
        
    } catch (error) {
        res.status(400).json({ message: 'Token không hợp lệ' });
                res.status(400).json({ message: 'Token không hợp lệ' });

    }
};
