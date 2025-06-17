<template>
  <div class="q-pa-lg column items-center full-width" style="max-width: 100%; margin: auto">
    <!-- Wrapper to prevent page overflow -->
    <div style="width: 100%; overflow-x: hidden">
      <div
        ref="carousel"
        class="row no-wrap justify-start items-end q-mb-xl"
        style="
          overflow-x: -2;
          scroll-behavior: smooth;
          scrollbar-width: 100%;
          max-width: 110vw;
          box-sizing: border-box;
        "
      >
        <div
          v-for="(item, index) in daysOfWeek"
          :key="index"
          class="q-mx-sm column items-center cursor-pointer transition-all"
          :style="getDayStyle(index)"
          @click="selectDay(index)"
        >
          <!-- Header -->
          <div
            class="text-white text-center q-pa-md"
            :class="selectedDay === index ? 'bg-primary' : 'bg-grey-5'"
            style="border-radius: 16px 16px 0 0; width: 80vw; max-width: 400px"
          >
            <div class="text-h6">{{ item.day }}</div>
          </div>

          <!-- Workout Card -->
          <q-card
            class="full-width"
            style="width: 80vw; max-width: 400px; height: 150px; border-radius: 0 0 16px 16px"
          >
            <q-card-section class="text-center">
              <div class="text-h5">{{ item.exercises }}</div>
              <hr />
              <div class="text-h5">{{ item.observations }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Action Widgets -->
    <div class="row q-gutter-md justify-center" style="max-width: 900px; width: 100%">
      <!-- Criar Treino -->
      <q-card class="bg-blue-1 text-primary" style="width: 45%" flat bordered clickable>
        <q-card-section class="column items-center justify-center text-secondary">
          <q-icon name="fitness_center" size="40px" class="q-mb-sm" />
          <div class="text-subtitle1">MEUS TREINOS</div>
        </q-card-section>
      </q-card>

      <!-- Alunos -->
      <q-card class="bg-green-1 text-green-10" style="width: 45%" flat bordered clickable>
        <q-card-section class="column items-center justify-center text-secondary">
          <q-icon name="person" size="40px" class="q-mb-sm" />
          <div class="text-subtitle1">MEU TREINADOR</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, nextTick, onMounted } from 'vue'
import { jwtDecode } from 'jwt-decode'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const selectedDay = ref(new Date().getDay())
    const carousel = ref(null)
    const daysOfWeek = ref([]) // Use ref to make it reactive

    const token = localStorage.getItem('access_token')
    if (!token) return

    onMounted(async () => {
      try {
        const decoded = jwtDecode(token)
        const alunoId = decoded.id

        const response = await fetch(`http://localhost:3000/trainings/${alunoId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include auth token if required
          },
        })

        if (response.ok) {
          console.log('Fetching training data for alunoId:', alunoId)
          const data = await response.json()
          console.log('Data: ', data)
          daysOfWeek.value = data.trainings.map((training) => ({
            day: training.day, // Assuming there's a "weekday" field
            exercises: training.exercises.join(', '), // Join exercises if it's an array
            observations: training.observations || 'No observations', // Default if no observations
          }))
        } else {
          console.error('Failed to fetch training data', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching training data', error)
      }
    })

    const getDayStyle = (index) => {
      const distance = Math.abs(selectedDay.value - index)
      const scale = Math.max(1 - distance * 0.1, 0.4)
      const opacity = Math.max(1 - distance * 0.2, 0.5)

      // Define base margin and min margin (in px)
      const baseMargin = 12 // for scale = 1
      const minMargin = 4 // for scale = 0.4

      // Calculate margin proportional to scale
      // Interpolate margin linearly between minMargin and baseMargin
      const margin = minMargin + (scale - 0.4) * ((baseMargin - minMargin) / (1 - 0.4))

      return {
        transform: `scale(${scale})`,
        opacity: opacity,
        transition: 'all 0.3s ease',
        marginLeft: `${margin}px`,
        marginRight: `${margin}px`,
      }
    }

    const selectDay = async (index) => {
      selectedDay.value = index
      await nextTick()

      const el = carousel.value.children[index]
      const container = carousel.value

      if (el && container) {
        const elRect = el.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()

        const offset = elRect.left - containerRect.left
        const scrollOffset = offset - container.offsetWidth / 2 + el.offsetWidth / 2 + 40

        container.scrollTo({
          left: container.scrollLeft + scrollOffset,
          behavior: 'smooth',
        })
      }
    }

    return {
      selectedDay,
      daysOfWeek,
      getDayStyle,
      selectDay,
      carousel,
    }
  },
})
</script>

<style scoped>
.row.no-wrap::-webkit-scrollbar {
  display: none;
}
</style>
