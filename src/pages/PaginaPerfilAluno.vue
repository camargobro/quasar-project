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
  color: #8a552a;
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
        <img src="https://imagenes.elpais.com/resizer/v2/GOQ56ZN5CPVKYLLURD2LJ6ROT4.jpg?auth=fcb1c61c84ed42caf85a58186e8e2ef4095577ca88f2bdca32007fb2c79b942f&width=1960&height=1470&smart=true">
      </q-avatar>
      <div class="info-treinador">
        <p class="text-h4 q-mt-lg">NomeAluno</p>
        <p class="text-h7">
          <q-icon name="person" />Tipo de usuário - Aluno
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
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PaginaPerfilAluno',
});
</script>
