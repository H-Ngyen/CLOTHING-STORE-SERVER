import User from '../models/user.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

async function Login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email và mật khẩu là bắt buộc' });
      }
  
      const existingUser = await User.findOne({ email }); 
      if (!existingUser) {
        return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không chính xác' });
      }
  
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không chính xác' });
      }
  
      const payload = { id: existingUser._id, email: existingUser.email };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
  
      return res.json({
        success: true,
        token: `Bearer ${token}`,
        user: {
          id: existingUser._id,
          email: existingUser.email,
        }
      });
    } catch (err) {
      console.error('Login error:', err);
      return res.status(500).json({ success: false, message: 'Failed login user' });
    }
  }

async function Register(req, res) {
    try {
        const { email, password, confirmPassword } = req.body;
        
        if ( !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Tên, email và mật khẩu là bắt buộc' 
            });
        }
        
        if (password !== confirmPassword) {
            return res.status(400).json({ 
                success: false, 
                message: 'Mật khẩu và xác nhận mật khẩu không khớp' 
            });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email đã được sử dụng. Vui lòng chọn email khác.' 
            });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            email,
            password: hashedPassword,
        });
        
        await newUser.save();
        
        const payload = {
            email: newUser.email,
        };
        
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.status(201).json({
            success: true,
            message: 'Đăng ký thành công!',
            token: `Bearer ${token}`,
            user: {
                email: newUser.email
            }
        });
        
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Lỗi server khi đăng ký' 
        });
    }
}


export {
    Login,
    Register,
}