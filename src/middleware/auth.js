import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: 'Không tìm thấy token xác thực' });
    }
};

export default authenticateJWT;