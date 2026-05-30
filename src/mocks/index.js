export const mockFeed = [
  {
    id: '1',
    user: 'Ana Silva',
    pet: 'Bolinha',
    content: 'Hoje o Bolinha tomou banho e ficou todo cheiroso! 🐶💛',
    likes: 12,
    comments: 3,
    time: '2h',
    image: 'https://picsum.photos/seed/dog1/400/300'
  },
  {
    id: '2',
    user: 'Carlos Souza',
    pet: 'Mia',
    content: 'Mia não sai dessa caixa de papelão por nada hahaha 🐱',
    likes: 45,
    comments: 8,
    time: '5h',
    image: 'https://picsum.photos/seed/cat1/400/300'
  }
];

export const mockDiscussions = [
  { id: '1', title: 'Melhor ração para filhotes de Golden?', replies: 15, author: 'João', tags: ['Dúvida', 'Alimentação'] },
  { id: '2', title: 'Como ensinar o gato a usar a caixa de areia', replies: 8, author: 'Mariana', tags: ['Dica', 'Comportamento'] }
];

export const mockMarketplaceProducts = [
  { id: '1', title: 'Coleira Ajustável', price: 'R$ 45,00', image: 'https://picsum.photos/seed/col/200/200' },
  { id: '2', title: 'Ração Premium 15kg', price: 'R$ 180,00', image: 'https://picsum.photos/seed/rac/200/200' },
];

export const mockMarketplaceAnimals = [
  { id: '1', name: 'Rex', breed: 'SRD', age: '2 meses', type: 'Adoção', image: 'https://picsum.photos/seed/dog2/200/200' },
  { id: '2', name: 'Luna', breed: 'Siamês', age: '1 ano', type: 'Adoção', image: 'https://picsum.photos/seed/cat2/200/200' },
];

export const mockLostPets = [
  { id: '1', name: 'Thor', type: 'Cachorro', description: 'Visto perto do parque central', distance: '1.2 km', image: 'https://picsum.photos/seed/dog3/200/200', lost: true }
];
