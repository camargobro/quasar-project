<template>
  <q-layout view="hhh lpR fff">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn-icons-png.flaticon.com/512/639/639284.png">
          </q-avatar>
          MyCoach
        </q-toolbar-title>
      </q-toolbar>


    </q-header>


    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>

      <q-scroll-area class="fit">
        <q-list padding class="menu-list">



          <q-item to="/" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>
              Início
            </q-item-section>
          </q-item>

          <q-item to="/meuTreinador" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="directions_run" />
            </q-item-section>
            <q-item-section>
              Treinador/Treinadores
            </q-item-section>
          </q-item>

          <q-item to="/perfilAluno" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section>
              Perfil
            </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn-icons-png.flaticon.com/512/639/639284.png">
          </q-avatar>
          <div>MyCoach</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>