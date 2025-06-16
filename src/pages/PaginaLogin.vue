<style>
.centralizar-pagina {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #cfa34a;
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
  font-family: Impact
}
.text-h3 {
  color: #8a552a;
  font-family: Impact
}
</style>

<template>
  <div class="centralizar-pagina">
    <div class="fundo-form">
      <p class="text-h3 text-center">MyCoach</p>
      <p class="text-h4 text-center">Login</p>

      <q-form @submit="onSubmit" @reset="onReset">
        <q-input class="q-mb-md" rounded outlined v-model="email" color="secondary" type="email" label="E-mail" />
        <q-input class="q-mb-md" rounded outlined v-model="senha" color="secondary" label="Senha" :type="isPwd ? 'password' : 'text'">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
        <q-toggle v-model="termos" label="Aceitar termos e condições" />
        <div class="q-mt-md">
          <q-btn label="Entrar" type="submit" color="secondary" to="/"></q-btn>
          <q-btn label="Esquecí minha senha" type="reset" color="secondary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance } from 'vue';

export default defineComponent({
  name: 'PaginaLogin',
  setup() {
    const email = ref('');
    const senha = ref('');
    const isPwd = ref(true);
    const termos = ref(false);

    const { proxy } = getCurrentInstance();

    const onSubmit = () => {
      if (!email.value || !senha.value || !termos.value) {
        proxy.$q.notify({
          message: 'Preencha todos os campos',
          color: 'red',
          position: 'bottom'
        });
      } else {
        proxy.$q.notify({
          message: 'Login realizado com sucesso!',
          color: 'positive',
          position: 'bottom'

        });
      }
    };


    return {
      email,
      senha,
      isPwd,
      termos,
      onSubmit,

    };
  },
});
</script>
