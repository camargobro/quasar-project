const routes = [
  {
    path: '/',
    component: () => import('src/layouts/LayoutTreinador.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
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
  }
]

export default routes
