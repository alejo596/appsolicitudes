<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons @click="openMenu()" slot="start">
          <ion-icon :icon="menu" slot="start"></ion-icon>
        </ion-buttons>
        <ion-title>{{ pageTitle }}</ion-title>
        <ion-buttons slot="end">
          <ion-button id="click-trigger">
            <ion-icon slot="icon-only" :icon="personCircle"></ion-icon>
          </ion-button>
          <ion-popover trigger="click-trigger" trigger-action="click">
            <ion-content class="ion-padding">Ajustes</ion-content>
             <ion-content button class="ion-padding"  @click="salir">Logout</ion-content>
          </ion-popover>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot></slot>
    </ion-content>
  </ion-page>
</template>


<script>
  import {
    IonPage,IonHeader,IonContent,IonTitle,IonToolbar,IonButtons,IonIcon,
    menuController,IonPopover 
  } from "@ionic/vue";
  import { menu,personCircle } from "ionicons/icons";
  export default {
    components: {
      IonPage,IonHeader,IonContent,IonTitle,IonToolbar,IonButtons,IonIcon,IonPopover 
    },
    props: ["pageTitle"],
    data() {
      return {
        menu,
        na:'',
        nombre:'',
        personCircle,
      };
    },
    mounted(){
      var nombre2 = localStorage.getItem("nombre");
      this.na=nombre2; 

    },
    methods: {
      salir(){
        window.location.href="/salir"
        this.eliminarstorge();


      },
      eliminarstorge(){
        localStorage.removeItem('nombre');
         localStorage.removeItem('run');
          localStorage.removeItem('id');
      },
      openMenu() {
        menuController.open("app-menu");
      },
    },
  };
</script>