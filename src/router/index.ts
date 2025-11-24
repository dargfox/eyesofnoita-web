import AuthorsPage from '@/pages/AuthorsPage.vue'
import ContactsPage from '@/pages/ContactsPage.vue'
import TimelinePage from '@/pages/TimelinePage.vue'
import ToolsPage from '@/pages/ToolsPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: TimelinePage },
    { path: '/authors', component: AuthorsPage },
    { path: '/contacts', component: ContactsPage },
    { path: '/tools', component: ToolsPage },
  ],
})

export default router
