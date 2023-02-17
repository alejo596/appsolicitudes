<template>
 <ion-row class="logo-row">
  <ion-col class="sinborder"></ion-col>
  <ion-col class="sinborder" width-67>
    <img src="assets/ssa.jpg"/>
  </ion-col>
  <ion-col class="sinborder"></ion-col>
</ion-row>

<ion-card>

  <ion-card-header>
    <ion-card-title class="flex">Login</ion-card-title>    
  </ion-card-header>


  <ion-grid >
    <ion-row >
      <ion-col class="sinborder"> <ion-label>Usuario</ion-label>
        <ion-input placeholder="Usuario" v-model="usuario"></ion-input></ion-col>
      </ion-row >
      <ion-row >
        <ion-col class="sinborder"> <ion-label>Password</ion-label>
          <ion-input type="password" v-model="password" placeholder="password"></ion-input></ion-col>
        </ion-row >
        <ion-row >
          <ion-col class=" sinborder"> <ion-button @click="acceder"  expand="block">Acceder</ion-button></ion-col>
        </ion-row>
      </ion-grid>

    </ion-card>
  </template>


  <style >
    .sinborder{
      border:0;
    }
    .logo-row {
      padding-top: 50px;
      padding-bottom: 20px;
    }
    .centrado{
      text-align: center;
    }
    .flex {
      display: flex;
      justify-content: center;
      align-items: center;
    }

  </style>
  <script >
   import axios from 'axios';
   import {
    IonInput, IonLabel,IonButton,IonCard,IonCardHeader, IonCardTitle,IonCol, IonGrid, IonRow,loadingController 
  } from "@ionic/vue";

  export default {
    components: { IonInput, IonLabel,IonButton,IonCard, IonCardHeader, IonCardTitle,IonCol, IonGrid, IonRow},
    data(){ 
      return {
       usuario:'',
       password:'',

     }; 


   },
   ionViewDidLeave() {
    
   },
   mounted() {

   this.verificar();
   

   },

   methods: {
     async verificar(){
      alert(localStorage.getItem("run"))
       if(localStorage.getItem("run") != null){
         var loading = await loadingController.create({
          message: 'Cargando...',
          duration: 3000,
          spinner: 'circles'
        });

         loading.present();
         window.location.href='/dashboard'
         loading.dismissAll();

       }

     },
     async   acceder(){
      var d=new FormData()
      if(this.usuario == ''){
        return alert("Debe ingresar usuario")
      }
      if(this.password == ''){
        return alert("Debe ingresar password")
      }
      d.append('usuario',this.usuario)
      d.append('password',this.password)
      var loading = await loadingController.create({
        message: 'Cargando...',
        duration: 3000,
        spinner: 'circles'
      });

      loading.present();

      axios.post('https://www.ssarica.cl/app/ejemplo.php',d,{headers: { 'Content-Type': 'multipart/form-data'}}).then(response=>{

        if(response.data != null){       

         localStorage.setItem("nombre",response.data[0].per_nombre);
         localStorage.setItem("run",response.data[0].per_rut);
         localStorage.setItem("id",response.data[0].id);
         window.location.href='/dashboard'
         loading.dismissAll();


       }else{
        loading.dismissAll();
        alert("Contraseña y/o Password Erroneos")
      }

    }).catch(error=>{
      console.log(error)

    });

  },

},

};


</script>
