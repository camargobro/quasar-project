<template>
  <div class="q-pa-lg column items-center full-width" style="max-width: 100%; margin: auto;">
    <!-- Search Bar -->
    <q-input
      v-model="searchQuery"
      outlined
      dense
      debounce="300"
      placeholder="Buscar aluno..."
      class="full-width q-mb-md"
      style="max-width: 500px"
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>

    <!-- List of Students -->
    <q-list bordered class="full-width" style="max-width: 500px;">
      <q-item
        v-for="(student, index) in filteredStudents"
        :key="index"
        clickable
        class="q-mb-sm"
      >
        <q-item-section avatar>
          <q-avatar :color="student.color" text-color="white">
            {{ student.initials }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ student.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'SearchAlunosPage',
  setup() {
    const searchQuery = ref('');

    const students = [
      { name: 'Lucas Silva', initials: 'LS', color: 'blue-7' },
      { name: 'Marina Costa', initials: 'MC', color: 'purple-6' },
      { name: 'Pedro Lima', initials: 'PL', color: 'green-6' },
      { name: 'Ana Beatriz', initials: 'AB', color: 'deep-orange-5' },
      { name: 'João Pedro', initials: 'JP', color: 'indigo-5' },
      { name: 'Carla Mendes', initials: 'CM', color: 'pink-5' },
      { name: 'Rafael Souza', initials: 'RS', color: 'cyan-7' },
      { name: 'Fernanda Rocha', initials: 'FR', color: 'amber-7' },
      { name: 'Bruno Alves', initials: 'BA', color: 'teal-6' },
      { name: 'Gabriela Dias', initials: 'GD', color: 'deep-purple-4' },
      { name: 'Thiago Castro', initials: 'TC', color: 'lime-6' },
      { name: 'Isabela Torres', initials: 'IT', color: 'red-5' }
    ];

    const filteredStudents = computed(() => {
      if (!searchQuery.value) return students;
      return students.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    return {
      searchQuery,
      students,
      filteredStudents
    };
  }
};
</script>
