<template>
  <div class="q-pa-lg column items-center full-width" style="max-width: 100%; margin: auto">
    <!-- Avatar List -->
    <div class="row q-gutter-md justify-center q-mb-xl" style="flex-wrap: wrap; max-width: 900px">
      <div
        v-for="(student, index) in students"
        :key="index"
        class="column items-center cursor-pointer"
        style="width: 130px"
      >
        <q-avatar size="120px" :color="student.color" text-color="white">
          <template v-if="student.image">
            <img :src="student.image" alt="Avatar" />
          </template>
          <template v-else-if="student.initials">
            {{ student.initials }}
          </template>
          <template v-else>
            <q-icon name="add" size="52px" />
          </template>
        </q-avatar>
        <div class="text-center q-mt-sm text-subtitle2" style="white-space: nowrap">
          {{ student.name }}
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="row q-gutter-md justify-center" style="max-width: 900px; width: 100%">
      <!-- Criar Treinos -->
      <q-card class="bg-blue-1 text-primary" style="width: 45%" flat bordered clickable>
        <q-card-section class="column items-center justify-center">
          <q-icon name="add_task" size="40px" class="q-mb-sm" />
          <div class="text-subtitle1">CRIAR TREINOS</div>
        </q-card-section>
      </q-card>

      <!-- Pedidos de treinos -->
      <q-card class="bg-orange-1 text-orange-10" style="width: 45%" flat bordered clickable>
        <q-card-section class="column items-center justify-center">
          <q-icon name="assignment" size="40px" class="q-mb-sm" />
          <div class="text-subtitle1">PEDIDOS DE TREINOS</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StudentsPage',
  setup() {
    const students = [
      { name: 'Lucas', initials: 'L', color: 'blue-7' },
      { name: 'Marina', initials: 'M', color: 'purple-6' },
      { name: 'Pedro', initials: 'P', color: 'green-6' },
      { name: 'Ana', initials: 'A', color: 'deep-orange-5' },
      { name: 'João', initials: 'J', color: 'indigo-5' },
      { image: null, name: 'Ver Todos', color: 'grey-4' }, // Corrigido
    ]

    return {
      students,
    }
  },
})
</script>
