<style>
.centralizar-pagina {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ce9c38b9;
}
.fundo-form {
  max-width: 400px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}
.text-h4 {
  color: #8a552a;
  font-family: Impact;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}
.text-h3 {
  color: #8a552a;
  font-family: Impact;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}
</style>

<template>
  <div class="centralizar-pagina">
    <div class="fundo-form">
      <p class="text-h3 text-center">MyCoach</p>
      <p class="text-h4 text-center">Login</p>

      <q-form @submit="onSubmit" @reset="onReset">
        <q-input
          class="q-mb-md"
          rounded
          outlined
          v-model="email"
          color="secondary"
          type="email"
          label="E-mail"
        />
        <q-input
          class="q-mb-md"
          rounded
          outlined
          v-model="senha"
          color="secondary"
          label="Senha"
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-toggle v-model="termos" label="Aceitar termos e condições" />
        <div class="q-mt-md">
          <div class="text-center">
          <q-btn label="Entrar" type="submit" color="secondary"></q-btn>
          </div>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance } from 'vue'
import { jwtDecode } from 'jwt-decode'


export default defineComponent({
  name: 'PaginaLogin',
  setup() {
    const email = ref('')
    const senha = ref('')
    const isPwd = ref(true)
    const termos = ref(false)

    const { proxy } = getCurrentInstance()

    const onSubmit = async () => {
      if (!email.value || !senha.value || !termos.value) {
        proxy.$q.notify({
          message: 'Preencha todos os campos',
          color: 'red',
          position: 'bottom',
        })
        return
      }

      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: email.value,
            password: senha.value,
          }),
        })

        if (!response.ok) {
          throw new Error('Falha no login')
        }

        const data = await response.json()

        if (data.access_token) {
          localStorage.setItem('access_token', data.access_token)

          proxy.$q.notify({
            message: 'Login realizado com sucesso!',
            color: 'positive',
            position: 'bottom',
          })

          const decoded = jwtDecode(data.access_token)
          const role = decoded.role

          if (role === 'Aluno') {
            proxy.$router.push('/')
          } else if (role === 'Treinador') {
            proxy.$router.push('/treinador')
          } else {
            throw new Error('Tipo de usuário desconhecido')
          }
        } else {
          throw new Error('Token não retornado')
        }
      } catch (error) {
        proxy.$q.notify({
          message: error.message || 'Erro no login',
          color: 'negative',
          position: 'bottom',
        })
      }
    }

    const onReset = () => {
      email.value = ''
      senha.value = ''
      termos.value = false
    }

    return {
      email,
      senha,
      isPwd,
      termos,
      onSubmit,
      onReset,
    }
  },
})
</script>
