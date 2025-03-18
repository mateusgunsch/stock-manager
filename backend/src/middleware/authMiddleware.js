// middleware/auth.js no backend
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        // Verificar o cabeçalho de autorização
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Não autorizado' });
        }
        
        const token = authHeader.split(' ')[1];
        
        // Verificar o token usando a mesma chave secreta do NextAuth
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Você pode verificar se o token pertence a um admin
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Acesso proibido' });
        }
        
        // Adicionar as informações do usuário ao objeto de requisição
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = authMiddleware;