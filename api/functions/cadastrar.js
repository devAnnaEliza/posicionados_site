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

    // Cria o usuário no Supabase Auth
    const { error: authError } = await supabase.auth.signUp({ email, password: senha });

    if (authError) {
        if (authError.message.includes('already registered')) {
            return res.status(409).json({ erro: 'E-mail já cadastrado.' });
        }
        return res.status(500).json({ erro: 'Erro ao cadastrar usuário.' });
    }

    // Faz login imediatamente para criar sessão
    const { data: sessionData, error: sessionError } = await supabase.auth.signInWithPassword({
        email,
        password: senha
    });

    if (sessionError) {
        return res.status(500).json({ erro: 'Erro ao iniciar sessão após cadastro.' });
    }

    // Cria cliente autenticado com o token da sessão
    const supabaseAutenticado = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY,
        { global: { headers: { Authorization: `Bearer ${sessionData.session.access_token}` } } }
    );

    // Salva os dados complementares
    const { error: dbError } = await supabaseAutenticado
        .from('usuarios')
        .insert([{
            id: sessionData.user.id,
            nome,
            telefone,
            receber_novidades
        }]);

    if (dbError) {
        return res.status(500).json({ erro: 'Erro ao salvar dados do usuário.' });
    }

    return res.status(201).json({
        mensagem: 'Usuário cadastrado com sucesso!',
        token: sessionData.session.access_token
    });
};