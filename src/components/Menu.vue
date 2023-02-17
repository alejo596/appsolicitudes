<template>
  <ion-menu menu-id="app-menu" content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title> SSC</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-accordion-group>
       <ion-item button @click="menuNavigation('/dashboard')">
        <ion-label><ion-icon :icon="homeOutline"></ion-icon> Home</ion-label>
      </ion-item>
      <ion-item button @click="menuNavigation('/home')">
        <ion-label> <ion-icon :icon="documentTextOutline"></ion-icon>Centros de Costos</ion-label>
      </ion-item>
      
      <ion-item>
   
         <ion-accordion value="first">
       
          <ion-item slot="header" color="light">
           
            <ion-label>   <ion-icon :icon="documentsOutline"></ion-icon>  Centros de Resp.</ion-label>

          </ion-item>
          <div class="ion-padding" slot="content" @click="menuNavigation2('/about',1)">
           SDRFYF
          </div>
           <div class="ion-padding" slot="content" @click="menuNavigation2('/about',2)">
           DIRECCION
          </div>
           <div class="ion-padding" slot="content" @click="menuNavigation2('/about',3)">
           SDGA
          </div>
           <div class="ion-padding" slot="content" @click="menuNavigation2('/about',4)">
           SDRRHH
          </div>
        </ion-accordion>
      
    </ion-item>
    <ion-item button href="/salir">
      <ion-label><ion-icon :icon="powerOutline"></ion-icon> Cerrar Session</ion-label>
    </ion-item>
    </ion-accordion-group>
  </ion-list>
</ion-content>
</ion-menu>
</template>


<script>
  
  import {
    IonMenu,IonHeader,IonContent,IonToolbar,IonTitle,IonItem,IonList,IonLabel,
    menuController, IonAccordion, 
    IonAccordionGroup,useBackButton, useIonRouter, toastController,onIonViewWillLeave
  } from "@ionic/vue";
  import { App } from '@capacitor/app';
  import { powerOutline,homeOutline,documentTextOutline,documentsOutline  } from "ionicons/icons";
  export default {
    components: {
      IonMenu,IonHeader,IonContent,IonToolbar,IonTitle,IonItem,IonList,IonLabel, IonAccordion, 
      IonAccordionGroup
    },
    data()
    {
      return{
       powerOutline,
       homeOutline,
       documentTextOutline,
       documentsOutline,
       nombre:''
     }
   },
      setup() {
    const ionRouter = useIonRouter();
    useBackButton(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });
     onIonViewWillLeave(() => {
     alert('Home page will leave');
    });
  },

   mounted(){
     var nombre2 = localStorage.getItem("nombre");
     localStorage.getItem("run");
     this.na=nombre2; 
     //this.presentToast()
  
   },
   methods:{
    menuNavigation(url){
      menuController.close("app-menu");
      this.$router.push(url);
    },
    menuNavigation2(url,numero){
      menuController.close("app-menu");
      this.$router.push({name:url,params:{'id': numero}});
    },
    logout(url){
      menuController.close("app-menu")
      this.$router.push(url);
    },
   async notificacion(){
       const toast = await toastController.create({
          message: 'Hello World!',
          duration: 1500,
          position: 'top'
        });

        await toast.present();
     
  }
    }
};
</script>