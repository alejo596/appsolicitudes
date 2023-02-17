<template>
  <master-layout pageTitle="">

    
    <ion-content>
       <ion-card color="primary">
    <ion-card-header>
      <ion-card-title class="flex">Bienvenidos</ion-card-title>
      <ion-card-subtitle class="flex">App de Solicitudes </ion-card-subtitle>
    </ion-card-header>

    <ion-card-content class="flex">
      {{na}}
    </ion-card-content>
  </ion-card>
 
</ion-content>
  </master-layout>
</template>
<style type="text/css">
  .header-row {
  background: #7163AA;
  color: #fff;
  font-size: 18px;
}

ion-col {
  border: 1px solid #ECEEEF;
}
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
<script>
   import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
export default {
   components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle },
  
  
  data(){

    return {
      na:''
 
    }


  },
  mounted(){
 
   var nombre2 = localStorage.getItem("nombre");
    this.na=nombre2; 

  },
  methods:{

  }


};
</script>