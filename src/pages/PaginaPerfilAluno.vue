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
        <img
          src="https://imagenes.elpais.com/resizer/v2/GOQ56ZN5CPVKYLLURD2LJ6ROT4.jpg?auth=fcb1c61c84ed42caf85a58186e8e2ef4095577ca88f2bdca32007fb2c79b942f&width=1960&height=1470&smart=true"
        />
      </q-avatar>
      <div class="info-treinador">
        <p class="text-h4 q-mt-lg">{{ nome }}</p>
        <p class="text-h7"><q-icon name="person" />Tipo de usuário - {{ roleType }}</p>
        <p class="text-h7"><q-icon name="event" />Data de nascimento - {{ nascimento }}</p>
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
    const nome = ref('')
    const cpf = ref('')
    const nascimento = ref('')
    const id = ref('')
    const roleType = ref('')

    const carregarPerfil = async () => {
      const token = localStorage.getItem('access_token')
      if (!token) return

      try {
        // Decodifica o token para pegar o ID
        const decoded = jwtDecode(token)
        id.value = decoded.sub || decoded.id || decoded.student_id // ajusta conforme seu backend
        const response = await fetch(`http://localhost:3000/student/${id.value}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) throw new Error('Falha ao carregar perfil')

        const data = await response.json()

        nome.value = data.name
        cpf.value = data.cpf
        nascimento.value = data.date_of_birth
        roleType.value = data.role
      } catch (error) {
        console.error('Erro ao carregar perfil:', error)
      }
    }

    onMounted(() => {
      carregarPerfil()
    })

    return {
      nome,
      cpf,
      nascimento,
      roleType,
    }
  },
})
</script>
