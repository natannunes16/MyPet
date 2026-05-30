export const mockDiscussions = [
  {
    id: 'd1',
    title: 'Melhor ração para filhotes de Golden Retriever?',
    content: 'Olá pessoal! Acabei de adotar um filhote de Golden Retriever (o Thor, ele tem 45 dias) e estou em dúvida sobre qual ração super premium oferecer. Meu veterinário sugeriu algumas opções, mas queria saber a experiência de quem já passou por essa fase. Alguma recomendação que ajude no desenvolvimento das articulações sem causar problemas digestivos?',
    author: 'Mariana Silva',
    avatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    time: '2 horas atrás',
    category: 'Saúde',
    likes: 24,
    comments: [
      {
        id: 'c1',
        author: 'Carlos Eduardo',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        content: 'Eu uso a Premier Específica para Golden Retriever Filhotes com o meu. Tem dado super certo! O pelo dele está lindo e as fezes bem firmes. Ela já vem com condroitina e glicosamina para as articulações.',
        time: '1 hora atrás',
        likes: 12,
        replies: []
      },
      {
        id: 'c2',
        author: 'Dra. Ana Paula (Vet)',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        content: 'Olá Mariana! Como veterinária, sempre recomendo focar em rações específicas para raças grandes. Royal Canin Maxi Puppy ou a linha N&D Ancestral Grain Puppy são excelentes escolhas. Lembre-se de fazer a transição da ração antiga para a nova gradualmente em 7 dias!',
        time: '30 minutos atrás',
        likes: 5,
        replies: []
      }
    ]
  },
  {
    id: 'd2',
    title: 'Dicas de alimentação para gatos idosos',
    content: 'Gostaria de saber quais rações são mais indicadas para gatos com mais de 10 anos.',
    author: 'Carlos',
    avatar: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    time: '5 horas atrás',
    category: 'Alimentação',
    likes: 8,
    comments: []
  },
  {
    id: 'd3',
    title: 'Como treinar seu cachorro a não latir excessivamente',
    content: 'Meu cachorro late muito quando chega visita. Alguém tem dicas de adestramento?',
    author: 'Ana',
    avatar: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    time: '1 dia atrás',
    category: 'Comportamento',
    likes: 45,
    comments: []
  },
];
