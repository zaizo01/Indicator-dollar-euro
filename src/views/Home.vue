<template>
  <div class="home">
     <v-container class="">
        <v-row>
          <v-col>
            <v-card color="primary" class="text-center text-xs-h4">
               <v-card-text class="font-weight-medium text-md-h5">{{picker}}</v-card-text>
            </v-card>
             <v-row class="mt-2">
                <v-col cols="6">
                  <v-card color="primary" class="text-center text-xs-h4">
                    <v-card-text class="font-weight-medium text-md-h5">Dollar $US {{value}}</v-card-text>
                  </v-card>
                </v-col>

                <v-col cols="6">
                  <v-card color="primary" class="text-center text-xs-h4">
                    <v-card-text class="font-weight-medium text-md-h5">Euro Є {{valueEuro}}</v-card-text>
                  </v-card>
                </v-col>
             </v-row>
            
          </v-col>
          <v-col cols="6">
             <v-card>
               <v-date-picker 
               v-model="picker"
               min="1984"
               color="primary lighten-1" 
               header-color="primary"
               full-width
               @change="getDollar(picker)"
               ></v-date-picker>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex';
export default {
  name: 'Home',
  data() {
    return {
      picker: '',
      value: null,
      valueEuro: null,
    }
  },
  methods: {
    ...mapMutations(['showLoad','hideLoad']),
    async getDollar(day){
      let arrDate = day.split(['-']);
      let ddmmyy = arrDate[2] + '-' +arrDate[1] + '-' +arrDate[0];
      try {

        this.showLoad();
        let datos = await axios.get( `https://mindicador.cl/api/dolar/${ddmmyy}`);
        let dateEuro = await axios.get( `https://mindicador.cl/api/euro/${ddmmyy}`);
        if (datos.data.serie.length > 0) {
          this.value = await datos.data.serie[0].valor;
          this.valueEuro = await dateEuro.data.serie[0].valor;
        } else {
          this.value = 'without results';
          this.valueEuro = 'without results';
        }

      } catch (error) {
        console.log(error);
      }
      finally{
        this.hideLoad();
      }
      
    }
  },
  created() {
    this.getDollar(this.picker);
  },
}
</script>
