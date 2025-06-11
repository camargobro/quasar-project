const routes = [
  {
    path: '/treinador',
    component: () => import('src/layouts/LayoutTreinador.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPageTreinador.vue') }
    ]
  },
   {
    path: '/',
    component: () => import('src/layouts/LayoutAluno.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
    {
    path: '/login',
    component: () => import('layouts/LayoutLogin.vue'),
    children: [
      { path: '', component: () => import('pages/PaginaLogin.vue') }
    ]
  },
    {
    path: '/criarTreino',
    component: () => import('src/layouts/LayoutTreinador.vue'),
    children: [
      { path: '', component: () => import('pages/PaginaCriarTreino.vue') }
    ]
  },
      {
    path: '/perfilTreinador',
    component: () => import('src/layouts/LayoutTreinador.vue'),
    children: [
      { path: '', component: () => import('pages/PaginaPerfilTreinador.vue') }
    ]
  },
        {
    path: '/perfilAluno',
    component: () => import('src/layouts/LayoutAluno.vue'),
    children: [
      { path: '', component: () => import('pages/PaginaPerfilAluno.vue') }
    ]
  },
    {
    path: '/meuTreinador',
    component: () => import('src/layouts/LayoutAluno.vue'),
    children: [
      { path: '', component: () => import('pages/PaginaMeuTreinador.vue') }
    ]
  },
    {
    path: '/alunos',
    component: () => import('src/layouts/LayoutTreinador.vue'),
    children: [
      { path: '', component: () => import('pages/PaginaAlunos.vue') }
    ]
  }
]

export default routes
