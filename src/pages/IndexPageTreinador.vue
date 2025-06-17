
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
      <q-card class="bg-brown-1 text-primary" style="width: 45%" flat bordered clickable>
        <q-card-section class="column items-center justify-center">
          <q-icon name="add_task" size="40px" class="q-mb-sm" />
          <q-btn label="Criar Treinos" type="submit" color="secondary" to="/criarTreino"></q-btn>
        </q-card-section>
      </q-card>

    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
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
    
    return {
      students,
    }
  },
})
</script>
