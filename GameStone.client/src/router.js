import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard, authSettled } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/account/:accountId',
    name: 'Profile',
    component: loadPage('ProfilePage'),
  },
  {
    path: '/games',
    name: 'Games',
    component: loadPage('GameSearchPage')
  },
  {
    path: '/games/:gameId',
    name: 'GameDetails',
    component: loadPage('GameDetailsPage'),
    beforeEnter: authSettled
  },
  {
    path: '/groups',
    name: 'Groups',
    component: loadPage('GroupSearchPage')
  },
  {
    path: '/groups/:groupId',
    name: 'GroupDetails',
    component: loadPage('GroupDetailsPage')
  },
  {
    path: '/gatherings',
    name: 'Gatherings',
    component: loadPage('GatheringSearchPage')
  },
  {
    path: '/gatherings/:gatheringId',
    name: 'GatheringDetails',
    component: loadPage('GatheringDetailsPage')
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
