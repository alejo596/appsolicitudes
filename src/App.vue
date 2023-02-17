<template>
  <ion-app>
    <Menus></Menus>
    <ion-router-outlet id="main-content"/>
  </ion-app>
</template>
 
<script>
import { IonApp, IonRouterOutlet,useBackButton, useIonRouter  } from '@ionic/vue';
import { defineComponent } from 'vue';
import Menus from './components/Menu.vue';
import { App } from '@capacitor/app';

 



 
export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    Menus
  },

    mounted(){

          
  

    },
   setup() {
 

    const ionRouter = useIonRouter();
    useBackButton(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });
  }

});
</script>