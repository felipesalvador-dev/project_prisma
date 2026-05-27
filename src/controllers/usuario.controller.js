const prisma = require("../data/prisma.js");


const listar = async(req,res)=>{

    const lista = await prisma.usuario.findMany();

    res.status(200).json(lista).end();

}

const cadastrar = async(req,res)=>{
    const data = req.body;

    const item = await prisma.usuario.create({
        data
    })

    res.json(item).status(201).end()

}

const buscarPorId = async (req, res) => {
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });

  if (!usuario) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  return res.status(200).json(usuario);
};

const atualizar = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  const { senha } = req.body;
  const { email } = req.body;
  const { idade } = req.body

  const usuario = await prisma.usuario.update({
    where: {
      id: Number(id),
    },
    data: {
      nome,
      senha,
      email,
      idade,
    },
  });

  return res.status(200).json(usuario);
};

const deletar = async (req, res) => {
  const usuario = await prisma.usuario.delete({
    where: {
      id: Number(req.params.id),
    },
  });

  return res.status(200).json(usuario);
};

module.exports = {
    listar,
    cadastrar,
    buscarPorId,
    atualizar,
    deletar
}