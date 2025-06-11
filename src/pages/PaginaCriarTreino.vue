<style>
.centralizar-pagina {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgb(255, 255, 255);
}

.text-h4 {
  color: #875794;
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
</script>