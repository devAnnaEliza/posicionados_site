const bcrypt = require('bcryptjs');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ erro: 'Método não permitido.' });
    }

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