<style>
.descricao-perfil {
  display: flex;
  gap: 2%;
}

.info-treinador {
  display: flex;
  flex-direction: column;
}

.text-h4 {
  color: #8a552a;
  font-family: Impact;
}

.centralizar-paginaTreinador {
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  width: 100%;
  gap: 2%;
  padding: 3%;
  box-sizing: border-box;
}

.grupo-alunos {
  display: flex;
  flex-direction: column;
  gap: 2%;
}

.editar-perfil {
  justify-content: center;
  max-width: 200px;
}


</style>

<template>
  <div class="centralizar-paginaTreinador">
    <div class="descricao-perfil">
      <q-avatar size="170px">
        <img src="https://cdn.quasar.dev/img/avatar.png" />
      </q-avatar>
      <div class="info-treinador">
        <p class="text-h4 q-mt-lg">{{ trainerName }}</p>
        <p class="text-h7"><q-icon name="person" />Tipo de usuário - {{ roleType }}</p>
        <p class="text-h7"><q-icon name="event" />Data de nascimento - {{ dateOfBirth }}</p>
        <p class="text-h7"><q-icon name="assignment_ind" />CPF - {{ cpf }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { jwtDecode } from 'jwt-decode'

export default defineComponent({
  name: 'PaginaPerfilAluno',
  setup() {
    const trainerName = ref('')
    const cpf = ref('')
    const dateOfBirth = ref('')
    const id = ref('')
    const roleType = ref('')
    const trainerID = ref('')

    const carregarPerfil = async () => {
      const token = localStorage.getItem('access_token')
      if (!token) return

      try {
        // Decodifica o token para pegar o ID
        const decoded = jwtDecode(token)
        id.value = decoded.id
        const response = await fetch(`http://localhost:3000/student/${id.value}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) throw new Error('Falha ao carregar perfil')

        const data = await response.json()

        trainerID.value = data.trainer_id
      } catch (error) {
        console.error('Erro ao carregar perfil:', error)
      }

      try {
        const response = await fetch(`http://localhost:3000/trainer/${trainerID.value}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) throw new Error('Falha ao carregar perfil')

        const data = await response.json()
        trainerName.value = data.name
        cpf.value = data.cpf
        dateOfBirth.value = data.date_of_birth
        roleType.value = data.role
      } catch (error) {
        console.error('Erro ao carregar perfil do treinador:', error)
      }
    }

    onMounted(() => {
      carregarPerfil()
    })

    return {
      trainerName,
      cpf,
      dateOfBirth,
      roleType,
    }
  },
})
</script>
