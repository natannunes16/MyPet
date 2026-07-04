require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/Post');
const Story = require('./models/Story');
const Discussion = require('./models/Discussion');
const MarketplaceItem = require('./models/MarketplaceItem');

const mockMarketplaceItems = [
  {
    name: 'Bidu',
    tag: 'ADOÇÃO',
    tagColor: '#1976D2',
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=400&q=80',
    age: '2 meses',
    species: 'Cachorro',
    breed: 'Beagle',
    location: 'São Paulo, SP',
    type: 'Animal',
    ownerId: new mongoose.Types.ObjectId(),
    ownerName: 'Admin'
  },
  {
    name: 'Mingau',
    tag: 'VENDA',
    tagColor: '#FFC107',
    image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=400&q=80',
    age: '4 meses',
    species: 'Gato',
    breed: 'Persa',
    location: 'Curitiba, PR',
    type: 'Animal',
    price: 'R$ 800,00',
    ownerId: new mongoose.Types.ObjectId(),
    ownerName: 'Admin'
  },
  {
    name: 'Thor',
    tag: 'ADOÇÃO',
    tagColor: '#1976D2',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80',
    age: '3 anos',
    species: 'Cachorro',
    breed: 'Golden R.',
    location: 'Rio de Janeiro, RJ',
    type: 'Animal',
    ownerId: new mongoose.Types.ObjectId(),
    ownerName: 'Admin'
  },
  {
    name: 'Bacon',
    tag: 'VENDA',
    tagColor: '#FFC107',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80',
    age: '8 meses',
    species: 'Cachorro',
    breed: 'Bulldog Fr.',
    location: 'Belo Horizonte, MG',
    type: 'Animal',
    price: 'R$ 2.500,00',
    ownerId: new mongoose.Types.ObjectId(),
    ownerName: 'Admin'
  },
  {
    name: 'Coleira Premium',
    tag: 'NOVO',
    tagColor: '#4CAF50',
    image: 'coleira_premium',
    price: 'R$ 79,90',
    species: 'Acessórios',
    breed: 'Cachorros',
    location: 'Loja PetStar, SP',
    type: 'Produto',
    ownerId: new mongoose.Types.ObjectId(),
    ownerName: 'Loja PetStar'
  },
  {
    name: 'Petiscos Naturais',
    tag: 'OFERTA',
    tagColor: '#E91E63',
    image: 'petiscos_naturais',
    price: 'R$ 49,90',
    species: 'Alimentação',
    breed: 'Cães e Gatos',
    location: 'Loja PetStar, SP',
    type: 'Produto',
    ownerId: new mongoose.Types.ObjectId(),
    ownerName: 'Loja PetStar'
  },
  {
    name: 'Cama Confortável',
    tag: 'NOVO',
    tagColor: '#4CAF50',
    image: 'cama_confortavel',
    price: 'R$ 199,90',
    species: 'Conforto',
    breed: 'Cachorros',
    location: 'PetShop Cão&Gato, RJ',
    type: 'Produto',
    ownerId: new mongoose.Types.ObjectId(),
    ownerName: 'PetShop Cão&Gato'
  },
  {
    name: 'Brinquedo Interativo',
    tag: 'USADO',
    tagColor: '#9E9E9E',
    image: 'brinquedo_interativo',
    price: 'R$ 59,90',
    species: 'Brinquedos',
    breed: 'Gatos',
    location: 'Vendedor Local, BH',
    type: 'Produto',
    ownerId: new mongoose.Types.ObjectId(),
    ownerName: 'Vendedor Local'
  },
  {
    name: 'Banho e Tosa',
    tag: 'SERVIÇO',
    tagColor: '#9C27B0',
    image: 'banho_e_tosa',
    price: 'R$ 80,00',
    species: 'Higiene',
    breed: 'Todas as raças',
    location: 'Clínica Pet Feliz, SP',
    type: 'Serviço',
    ownerId: new mongoose.Types.ObjectId(),
    ownerName: 'Clínica Pet Feliz'
  },
  {
    name: 'Consulta Veterinária',
    tag: 'SAÚDE',
    tagColor: '#F44336',
    image: 'consulta_veterinaria',
    price: 'R$ 150,00',
    species: 'Consulta',
    breed: 'Geral',
    location: 'Dr. Augusto Vet, RJ',
    type: 'Serviço',
    ownerId: new mongoose.Types.ObjectId(),
    ownerName: 'Dr. Augusto Vet'
  },
  {
    name: 'Passeador de Cães',
    tag: 'PASSEIO',
    tagColor: '#00BCD4',
    image: 'passeador_de_caes',
    price: 'R$ 40/hora',
    species: 'Dog Walker',
    breed: 'Cachorros',
    location: 'João Passeios, BH',
    type: 'Serviço',
    ownerId: new mongoose.Types.ObjectId(),
    ownerName: 'João Passeios'
  },
  {
    name: 'Hotel para Pets',
    tag: 'HOSPEDAGEM',
    tagColor: '#FF9800',
    image: 'hotel_para_pets',
    price: 'R$ 120/dia',
    species: 'Hospedagem',
    breed: 'Cães e Gatos',
    location: 'Resort Animal, PR',
    type: 'Serviço',
    ownerId: new mongoose.Types.ObjectId(),
    ownerName: 'Resort Animal'
  }
];

const mockDiscussions = [
  {
    title: 'Melhor ração para filhotes de Golden Retriever?',
    content: 'Olá pessoal! Acabei de adotar um filhote de Golden Retriever (o Thor, ele tem 45 dias) e estou em dúvida sobre qual ração super premium oferecer. Meu veterinário sugeriu algumas opções, mas queria saber a experiência de quem já passou por essa fase. Alguma recomendação que ajude no desenvolvimento das articulações sem causar problemas digestivos?',
    author: 'Mariana Silva',
    authorId: new mongoose.Types.ObjectId(),
    avatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    category: 'Saúde',
    likes: 24,
    comments: 2
  },
  {
    title: 'Dicas de alimentação para gatos idosos',
    content: 'Gostaria de saber quais rações são mais indicadas para gatos com mais de 10 anos.',
    author: 'Carlos',
    authorId: new mongoose.Types.ObjectId(),
    avatar: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    category: 'Alimentação',
    likes: 8,
    comments: 0
  },
  {
    title: 'Como treinar seu cachorro a não latir excessivamente',
    content: 'Meu cachorro late muito quando chega visita. Alguém tem dicas de adestramento?',
    author: 'Ana',
    authorId: new mongoose.Types.ObjectId(),
    avatar: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    category: 'Comportamento',
    likes: 45,
    comments: 0
  }
];

const mockStories = [
  {
    user: 'Marta & Thor',
    avatar: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=200&q=80',
    isViewed: false,
    storyImages: [
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=600&q=80',
    ],
  },
  {
    user: 'Julia & Nina',
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=200&q=80',
    isViewed: false,
    storyImages: [
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&q=80',
    ],
  },
  {
    user: 'Pedro & Simba',
    avatar: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=200&q=80',
    isViewed: false,
    storyImages: [
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=600&q=80',
    ],
  },
  {
    user: 'Lucas & Mel',
    avatar: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=200&q=80',
    isViewed: true,
    storyImages: [
      'https://images.unsplash.com/photo-1593134257782-e89567b7718a?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=600&q=80',
    ]
  },
  {
    user: 'Bia & Toddy',
    avatar: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=200&q=80',
    isViewed: false,
    storyImages: [
      'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    user: 'Ana & Rex',
    avatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=200&q=80',
    isViewed: true,
    storyImages: [
      'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=600&q=80',
    ],
  },
  {
    user: 'Camila & Floquinho',
    avatar: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=200&q=80',
    isViewed: false,
    storyImages: [
      'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    user: 'Mariana & Mia',
    avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=80',
    isViewed: false,
    storyImages: [
      'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=600&q=80'
    ]
  }
];

const mockPosts = [
  {
    authorId: new mongoose.Types.ObjectId(),
    authorName: 'Ana & Rex',
    user: 'Ana & Rex',
    authorAvatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=200&q=80',
    time: '2h',
    content: 'Hoje foi dia de passeio no parque da cidade! O Rex adorou correr atrás da bolinha e fez vários amiguinhos novos. 🐶🐾 Nada melhor que um dia de sol ao ar livre.',
    caption: 'Hoje foi dia de passeio no parque da cidade! O Rex adorou correr atrás da bolinha e fez vários amiguinhos novos. 🐶🐾 Nada melhor que um dia de sol ao ar livre.',
    image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=800&q=80',
    likes: 124,
    comments: 12,
  },
  {
    authorId: new mongoose.Types.ObjectId(),
    authorName: 'Julia & Nina',
    user: 'Julia & Nina',
    authorAvatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=200&q=80',
    time: '1d',
    content: 'A Nina achou um raio de sol no tapete e decidiu que essa é a cama dela pelo resto do dia. Como pode ser tão preguiçosa e fofa ao mesmo tempo? 😂🐱',
    caption: 'A Nina achou um raio de sol no tapete e decidiu que essa é a cama dela pelo resto do dia. Como pode ser tão preguiçosa e fofa ao mesmo tempo? 😂🐱',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80',
    likes: 350,
    comments: 29,
  },
  {
    authorId: new mongoose.Types.ObjectId(),
    authorName: 'Marta & Thor',
    user: 'Marta & Thor',
    authorAvatar: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=200&q=80',
    time: '3h',
    content: 'Thor todo charmoso depois do banho e tosa! Prontinho para o final de semana. 😍',
    caption: 'Thor todo charmoso depois do banho e tosa! Prontinho para o final de semana. 😍',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
    likes: 412,
    comments: 45,
  },
  {
    authorId: new mongoose.Types.ObjectId(),
    authorName: 'Pedro & Simba',
    user: 'Pedro & Simba',
    authorAvatar: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=200&q=80',
    time: '2d',
    content: 'Simba adorou a nova caminha que compramos. Parece que foi feita sob medida pra ele! Mas eu duvido que ele abandone minha cama à noite... 🐈💤',
    caption: 'Simba adorou a nova caminha que compramos. Parece que foi feita sob medida pra ele! Mas eu duvido que ele abandone minha cama à noite... 🐈💤',
    image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=800&q=80',
    likes: 189,
    comments: 15,
  },
  {
    authorId: new mongoose.Types.ObjectId(),
    authorName: 'Fernanda & Max',
    user: 'Fernanda & Max',
    authorAvatar: 'https://images.unsplash.com/photo-1554692997-6a1be2e684eb?auto=format&fit=crop&w=200&q=80',
    time: '5h',
    content: 'Primeiro dia do Max na creche canina! Ele fez vários amiguinhos e voltou exausto. Finalmente uma noite de paz! 😂',
    caption: 'Primeiro dia do Max na creche canina! Ele fez vários amiguinhos e voltou exausto. Finalmente uma noite de paz! 😂',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',
    likes: 420,
    comments: 55,
  },
  {
    authorId: new mongoose.Types.ObjectId(),
    authorName: 'Camila & Floquinho',
    user: 'Camila & Floquinho',
    authorAvatar: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=200&q=80',
    time: '4d',
    content: 'Floquinho sendo Floquinho. Não pode ver uma caixa de papelão vazia que já acha que é uma mansão de luxo! 📦 A vida é simples quando você é um gato.',
    caption: 'Floquinho sendo Floquinho. Não pode ver uma caixa de papelão vazia que já acha que é uma mansão de luxo! 📦 A vida é simples quando você é um gato.',
    image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=800&q=80',
    likes: 215,
    comments: 20,
  },
  {
    authorId: new mongoose.Types.ObjectId(),
    authorName: 'João & Bidu',
    user: 'João & Bidu',
    authorAvatar: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=200&q=80',
    time: '6d',
    content: 'Hoje o Bidu aprendeu a dar a pata! Demorou um pacote inteiro de petiscos, mas estou muito orgulhoso desse garotão! 🐕🐾',
    caption: 'Hoje o Bidu aprendeu a dar a pata! Demorou um pacote inteiro de petiscos, mas estou muito orgulhoso desse garotão! 🐕🐾',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
    likes: 310,
    comments: 25,
  },
  {
    authorId: new mongoose.Types.ObjectId(),
    authorName: 'Mariana & Mia',
    user: 'Mariana & Mia',
    authorAvatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=80',
    time: '1 sem',
    content: 'Alguém me explica por que eles conseguem dormir nessas posições impossíveis sem ficar com dor no pescoço? 😹',
    caption: 'Alguém me explica por que eles conseguem dormir nessas posições impossíveis sem ficar com dor no pescoço? 😹',
    image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=800&q=80',
    likes: 489,
    comments: 42,
  },
  {
    authorId: new mongoose.Types.ObjectId(),
    authorName: 'Thiago & Bob',
    user: 'Thiago & Bob',
    authorAvatar: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=200&q=80',
    time: '1d',
    content: 'Dica do dia: Levem seus pets pra trilha. O Bob amou a aventura na montanha, farejou tudo o que podia e agora está desmaiado no banco do carro.',
    caption: 'Dica do dia: Levem seus pets pra trilha. O Bob amou a aventura na montanha, farejou tudo o que podia e agora está desmaiado no banco do carro.',
    image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=800&q=80',
    likes: 540,
    comments: 31,
  },
  {
    authorId: new mongoose.Types.ObjectId(),
    authorName: 'Lara & Oreo',
    user: 'Lara & Oreo',
    authorAvatar: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=200&q=80',
    time: '3h',
    content: 'A cara do Oreo quando percebeu que a gente ia pro veterinário e não pro parque... A traição estampada no olhar! 😭',
    caption: 'A cara do Oreo quando percebeu que a gente ia pro veterinário e não pro parque... A traição estampada no olhar! 😭',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
    likes: 620,
    comments: 88,
  },
  {
    authorId: new mongoose.Types.ObjectId(),
    authorName: 'Clara & Lua',
    user: 'Clara & Lua',
    authorAvatar: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=200&q=80',
    time: '7h',
    content: 'Aquele banho de sol revigorante da tarde. A Lua é movida a energia solar, tenho certeza. 🌞',
    caption: 'Aquele banho de sol revigorante da tarde. A Lua é movida a energia solar, tenho certeza. 🌞',
    image: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=800&q=80',
    likes: 412,
    comments: 11,
  },
  {
    authorId: new mongoose.Types.ObjectId(),
    authorName: 'Rafael & Duke',
    user: 'Rafael & Duke',
    authorAvatar: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=200&q=80',
    time: '2d',
    content: 'Tentando trabalhar, mas o Duke decidiu que a minha mão estava melhor na cabeça dele do que no mouse. ❤️🐶',
    caption: 'Tentando trabalhar, mas o Duke decidiu que a minha mão estava melhor na cabeça dele do que no mouse. ❤️🐶',
    image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=800&q=80',
    likes: 388,
    comments: 24,
  },
  {
    authorId: new mongoose.Types.ObjectId(),
    authorName: 'Sofia & Pantera',
    user: 'Sofia & Pantera',
    authorAvatar: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&w=200&q=80',
    time: '5d',
    content: 'Aquela pose majestosa que só um gato preto sabe fazer! Parece até que sabe que é a rainha da casa inteira.',
    caption: 'Aquela pose majestosa que só um gato preto sabe fazer! Parece até que sabe que é a rainha da casa inteira.',
    image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=800&q=80',
    likes: 710,
    comments: 49,
  },
  {
    authorId: new mongoose.Types.ObjectId(),
    authorName: 'André & Chico',
    user: 'André & Chico',
    authorAvatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=200&q=80',
    time: '1 sem',
    content: 'Chico e seu amor incondicional por bolinhas de tênis. Se deixar, ele brinca 24 horas por dia!',
    caption: 'Chico e seu amor incondicional por bolinhas de tênis. Se deixar, ele brinca 24 horas por dia!',
    image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80',
    likes: 230,
    comments: 18,
  },
  {
    authorId: new mongoose.Types.ObjectId(),
    authorName: 'Luiza & Pipoca',
    user: 'Luiza & Pipoca',
    authorAvatar: 'https://images.unsplash.com/photo-1593134257782-e89567b7718a?auto=format&fit=crop&w=200&q=80',
    time: '1 sem',
    content: 'Sextou com S de soneca profunda no sofá. Quem dera a gente pudesse ser um cachorrinho também! 🐕💤',
    caption: 'Sextou com S de soneca profunda no sofá. Quem dera a gente pudesse ser um cachorrinho também! 🐕💤',
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=800&q=80',
    likes: 541,
    comments: 26,
  },
  {
    authorId: new mongoose.Types.ObjectId(),
    authorName: 'Marcos & Bolt',
    user: 'Marcos & Bolt',
    authorAvatar: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?auto=format&fit=crop&w=200&q=80',
    time: '12h',
    content: 'Alguém sabe como tirar energia de um cachorro de 8 meses? Acabamos de voltar de 1h de corrida e ele ainda quer brincar. 😅🏃',
    caption: 'Alguém sabe como tirar energia de um cachorro de 8 meses? Acabamos de voltar de 1h de corrida e ele ainda quer brincar. 😅🏃',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    likes: 432,
    comments: 57,
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mypet');
    console.log('MongoDB conectado para o Seed...');

    await Post.deleteMany({});
    await Story.deleteMany({});
    await Discussion.deleteMany({});
    await MarketplaceItem.deleteMany({});
    console.log('Posts, Stories, Discussões e Marketplace antigos limpos.');

    await Post.insertMany(mockPosts);
    await Story.insertMany(mockStories);
    await Discussion.insertMany(mockDiscussions);
    await MarketplaceItem.insertMany(mockMarketplaceItems);
    
    console.log('Mock Data inserida com sucesso no MongoDB!');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
    process.exit(1);
  }
};

seedDB();
