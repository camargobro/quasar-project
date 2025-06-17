<template>
  <div class="q-pa-lg column items-center full-width" style="max-width: 100%; margin: auto">
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
    <q-list bordered class="full-width" style="max-width: 500px">
      <q-item v-for="(student, index) in filteredStudents" :key="index" clickable class="q-mb-sm">
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
import { defineComponent, ref, onMounted, computed } from 'vue'
import { jwtDecode } from 'jwt-decode'

function getRandomColor() {
  const colors = [
    { name: 'Lucas', initials: 'L', color: 'blue-7' },
    { name: 'Marina', initials: 'M', color: 'purple-6' },
    { name: 'Pedro', initials: 'P', color: 'green-6' },
    { name: 'Ana', initials: 'A', color: 'deep-orange-5' },
    { name: 'João', initials: 'J', color: 'indigo-5' },
    { image: null, name: 'Ver Todos', color: 'grey-4' },
  ]

  // Generate a random index within the array length
  const randomIndex = Math.floor(Math.random() * colors.length)

  // Return the color of the randomly selected item
  return colors[randomIndex].color
}

export default defineComponent({
  name: 'StudentsPage',
  setup() {
    const students = ref([])
    const searchQuery = ref('')

    const token = localStorage.getItem('access_token')
    if (!token) return

    onMounted(async () => {
      try {
        const decoded = jwtDecode(token)
        const trainerID = decoded.id

        const response = await fetch(`http://localhost:3000/trainer/${trainerID}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include auth token if required
          },
        })

        if (response.ok) {
          console.log('Fetching data for trainer:', trainerID)
          const data = await response.json()
          console.log('Data: ', data)
          students.value = data.students.map((student) => ({
            initials: student.name[0], // Use first letter of name as initials
            name: student.name,
            color: getRandomColor(), // Generate a random color for each student
          }))

          console.log('Students:', students.value)
        } else {
          console.error('Failed to fetch training data', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching training data', error)
      }
    })

    const filteredStudents = computed(() => {
      if (!searchQuery.value) return students.value
      return students.value.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
      )
    })

    return {
      searchQuery,
      students,
      filteredStudents,
    }
  },
})
</script>

<!-- <script>
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
</script> -->
