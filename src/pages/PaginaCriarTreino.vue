<!-- <style>
.centralizar-pagina {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgb(255, 255, 255);
}

.text-h4 {
  color: #8a552a;
  font-family: Impact
}
</style>

<template>
  <div class="centralizar-pagina">
    <div class="fundo-form">
      <p class="text-h4 text-center">Criar treino personalizado</p>
      <q-form @submit="onSubmit" @reset="onReset">
        <q-select rounded outlined v-model="listaAlunos" :options="alunos" label="Aluno" class="q-mb-md" />

        <q-select filled v-model="listaDias" multiple :options="dias" use-chips stack-label label="Dia da semana"
          class="q-mb-md" />

        <q-input v-model="text" filled type="textarea" label="Observação" class="q-mb-md" />

        <q-select filled v-model="listaExercicios" multiple :options="exercicios" use-chips stack-label
          label="Exercícios" class="q-mb-md" />

        <q-btn label="Enviar Treino" type="submit" color="primary"></q-btn>
        <q-btn label="Limpar" type="reset" color="primary" flat class="q-ml-sm" />
      </q-form>

    </div>
  </div>

</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PaginaCriarTreino',
  setup() {
    const listaExercicios = ref([])

    const listaAlunos = ref([])

    const listaDias = ref([])

    const alunos = [
      { label: 'João', value: 'aluno_1' },
      { label: 'Pedro', value: 'aluno_2' },
      { label: 'Joana', value: 'aluno_3' },
    ]
    const exercicios = [
      { label: 'Agachamento', value: 'agachamento' },
      { label: 'Supino', value: 'supino' },
      { label: 'Puxada Frontal', value: 'puxada_frontal' },
      { label: 'Leg Press', value: 'leg_press' },
      { label: 'Rosca Direta', value: 'rosca_direta' }
    ];

    const dias = [
      { label: 'Segunda-Feira', value: 'segunda_feira' },
      { label: 'Terça-Feira', value: 'terça_feira' },
      { label: 'Quarta-Feira', value: 'quarta_feira' },
      { label: 'Quinta-Feira', value: 'quinta_feira' },
      { label: 'Sexta-Feira', value: 'sexta_feira' },
      { label: 'Sábado', value: 'sabado' },
      { label: 'Domingo', value: 'domingo' }
    ];


    return {
      exercicios,
      listaExercicios,
      listaAlunos,
      alunos,
      dias,
      listaDias
    };
  }
});
</script> -->

<style>
.centralizar-pagina {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgb(255, 255, 255);
}

.text-h4 {
  color: #8a552a;
  font-family: Impact;
}
</style>

<template>
  <div class="centralizar-pagina">
    <div class="fundo-form">
      <p class="text-h4 text-center">Criar treino personalizado</p>
      <q-form @submit="onSubmit" @reset="onReset">
        <q-select rounded outlined v-model="listaAlunos" :options="alunos" label="Aluno" class="q-mb-md" />
        <q-select filled v-model="listaDias" multiple :options="dias" use-chips stack-label label="Dia da semana"
          class="q-mb-md" />
        <q-input v-model="observacao" filled type="textarea" label="Observação" class="q-mb-md" />
        <q-select filled v-model="listaExercicios" multiple :options="exercicios" use-chips stack-label
          label="Exercícios" class="q-mb-md" />
        <q-btn label="Enviar Treino" type="submit" color="primary"></q-btn>
        <q-btn label="Limpar" type="reset" color="primary" flat class="q-ml-sm" />
      </q-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { jwtDecode } from 'jwt-decode'
import { Notify } from 'quasar'

export default defineComponent({
  name: 'PaginaCriarTreino',
  setup() {

    const listaExercicios = ref([])
    const listaAlunos = ref('')
    const listaDias = ref([])
    const observacao = ref('')


    const token = localStorage.getItem('access_token')
    if (!token) return

    const alunos = ref([])

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
          alunos.value = data.students.map((student) => ({
            value: student.id,
            label: student.name,
          }))

          console.log('Students:', alunos)
        } else {
          console.error('Failed to fetch training data', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching training data', error)
      }
    })

    const exercicios = [
      { label: 'Agachamento', value: 'agachamento' },
      { label: 'Supino', value: 'supino' },
      { label: 'Puxada Frontal', value: 'puxada_frontal' },
      { label: 'Leg Press', value: 'leg_press' },
      { label: 'Rosca Direta', value: 'rosca_direta' },
    ]

    const dias = [
      { label: 'Segunda-Feira', value: 'segunda_feira' },
      { label: 'Terça-Feira', value: 'terça_feira' },
      { label: 'Quarta-Feira', value: 'quarta_feira' },
      { label: 'Quinta-Feira', value: 'quinta_feira' },
      { label: 'Sexta-Feira', value: 'sexta_feira' },
      { label: 'Sábado', value: 'sabado' },
      { label: 'Domingo', value: 'domingo' },
    ]

    const onSubmit = async () => {
      const alunoId = listaAlunos.value
      const payload = {
        day: listaDias.value[0].label, // Assuming backend expects array or proper format
        observations: observacao.value,
        exercises: listaExercicios.value,

      }

      try {
        const response = await fetch(`http://localhost:3000/${alunoId.value}/training`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            // Add access token for authentication
          },
          body: JSON.stringify(payload),
        })


        if (response.ok) {
          const result = await response.json()
          Notify.create({
            type: 'positive',
            message: 'Treino criado com sucesso!',
            position: 'bottom'
          })
          console.log('Training submitted successfully:', result)
          // Optionally reset the form or provide feedback to the user
        } else {
        
          console.error('Error submitting training', response.statusText)
        }
      } catch (error) {
        console.error('Error during API call', error)
      }
    }

    const onReset = () => {
      listaAlunos.value = ''
      listaDias.value = []
      observacao.value = ''
      listaExercicios.value = []
    }

    return {
      listaExercicios,
      listaAlunos,
      listaDias,
      observacao,
      alunos,
      exercicios,
      dias,
      onSubmit,
      onReset,
    }
  },
})
</script>
