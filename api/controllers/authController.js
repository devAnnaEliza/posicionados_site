const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../supabase');

const cadastrar = async (req, res) => {
    const { nome, email, senha, telefone, receber_novidades } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Nome, e-mail e senha são obrigatórios.' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const { data, error } = await supabase
        .from('usuarios')
        .insert([{ nome, email, senha: senhaCriptografada, telefone, receber_novidades }])
        .select();

    if (error) {
        if (error.code === '23505') {
            return res.status(409).json({ erro: 'E-mail já cadastrado.' });
        }
        return res.status(500).json({ erro: 'Erro ao cadastrar usuário.' });
    }

    return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!', usuario: data[0] });
};

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
    }

    const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', email)
        .single();

    if (error || !data) {
        return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
    }

    const senhaValida = await bcrypt.compare(senha, data.senha);

    if (!senhaValida) {
        return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
    }

    const token = jwt.sign(
        { id: data.id, email: data.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    return res.status(200).json({ mensagem: 'Login realizado com sucesso!', token });
};

module.exports = { cadastrar, login };