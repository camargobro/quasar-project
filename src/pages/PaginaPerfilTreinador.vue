<style>
.descricao-perfil {
  display: flex;
  gap: 2%
}

.info-treinador {
  display: flex;
  flex-direction: column;
}

.text-h4 {
  color: #875794;
  font-family: Impact
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
  <div class="centralizar-paginaTreinador ">
    <div class="descricao-perfil ">

      <q-avatar size="170px">
        <img src="https://cdn.quasar.dev/img/avatar.png">
      </q-avatar>
      <div class="info-treinador">
        <p class="text-h4 q-mt-lg">NomeTreinador</p>
        <p class="text-h7">
          <q-icon name="person" />Tipo de usuário - Treinador
        </p>
        <p class="text-h7">
          <q-icon name="event" />Data de nascimento - 10/12/2002
        </p>
        <p class="text-h7">
          <q-icon name="assignment_ind" />CPF - 012.345.678-90
        </p>
        <q-btn class="editar-perfil" label="Editar perfil" type="button" color="primary"></q-btn>
      </div>
    </div>

   
    <div class="grupo-alunos">
      
      <p class="text-h4">Alunos</p>
      <div class="avatar">
      <q-avatar v-for="n in 5" :key="n" size="40px" class="overlapping" :style="`left: ${n * 25}px`">
        <img :src="`https://cdn.quasar.dev/img/avatar${n + 1}.jpg`">
     
      </q-avatar>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PaginaPerfilTreinador',
});
</script>
