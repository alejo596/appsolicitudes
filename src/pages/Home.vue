<template>
  <master-layout pageTitle="Solicitudes Centros de Costos">

    <ion-content>


      <ion-grid class="ion-text-center">

        <ion-row class="ion-margin">
          <ion-col>
            <ion-title>
              <ion-text color="default">
                CENTRO DE COSTOS 
              </ion-text>
            </ion-title>
          </ion-col>
        </ion-row>

        <ion-row class="header-row">
          <ion-col>
            <ion-text>Id</ion-text>
          </ion-col>

          <ion-col>
            <ion-text>CC</ion-text>
          </ion-col>

          <ion-col>
            <ion-text>N°</ion-text>
          </ion-col>
          <ion-col>
            <ion-text>Año</ion-text>
          </ion-col>
          <ion-col>
            <ion-text>Categoria</ion-text>
          </ion-col>
        </ion-row>

        <div  v-if="data.length > 0" >
          <ion-row v-for="(li,index) in data" :key="li.id" @click="verot(li.id_doc,li.cc_nombre,li.compra_amio,li.compra_numero,li.fondo,li.cr_nombre,li.tipo,li.id)">
          <ion-col >
            <ion-text>
              {{index+1}}
            </ion-text>
          </ion-col>

          <ion-col>
            <ion-text>
              {{li.cc_nombre}}
            </ion-text>
          </ion-col>

          <ion-col>
            <ion-text>
              {{li.compra_numero}}
            </ion-text>
          </ion-col>
          <ion-col>
            <ion-text>
              {{li.compra_amio}}
            </ion-text>
          </ion-col>
          <ion-col>
            <ion-text>
              {{li.fondo}}
            </ion-text>
          </ion-col>
        </ion-row>
          
        </div>
        
         <ion-row  v-if="data.length == 0" >
          <ion-col >
            <ion-text>
              
            </ion-text>
          </ion-col>

          <ion-col>
            <ion-text>
              
            </ion-text>
          </ion-col>

          <ion-col>
            <ion-text>
              Sin Datos
            </ion-text>
          </ion-col>
          <ion-col>
            <ion-text>
            
            </ion-text>
          </ion-col>
          <ion-col>
            <ion-text>
              
            </ion-text>
          </ion-col>
        </ion-row>

      </ion-grid>
      
    </ion-content>
      <ion-content class="ion-padding">
    <ion-button>Open</ion-button>
    <p>{{ message }}</p>
    <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="cancel()">Cancel</ion-button>
          </ion-buttons>
          <ion-title>Welcome</ion-title>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-label position="stacked">Enter your name</ion-label>
          <ion-input ref="input" type="text" placeholder="Your name"></ion-input>
        </ion-item>
      </ion-content>
    </ion-modal>
  </ion-content>
  </master-layout>
</template>

<script>
   import {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonInput,
    IonLabel,
    modalController,
    IonCol, IonGrid, IonRow
  } from '@ionic/vue';
 import axios from 'axios';
  import Modal from './Modal.vue';

 export default {
  components: {
      IonButtons,
      IonButton,
      IonModal,
      IonHeader,
      IonContent,
      IonToolbar,
      IonTitle,
      IonItem,
      IonInput,
      IonLabel,
      IonCol, IonGrid, IonRow
    },


  data(){

    return {
      na:'',
      data:[],
      message: '',
      run:''

    }


  },
  mounted(){
     var nombre2 = localStorage.getItem("nombre");
   this.na=nombre2; 
  this.run= localStorage.getItem("run");
 

 },
 ionViewWillEnter() {
  
     this.getcentrocosto();

     },
 created:function(){


},
methods:{
  cancel() {
    this.$refs.modal.$el.dismiss(null, 'cancel');
  },
  confirm() {
    const name = this.$refs.input.$el.value;
    this.$refs.modal.$el.dismiss(name, 'confirm');
  },

  async  verot(id,cc,year,numero,fondo,cr_nombre,tipo,id_s){
    console.log(id)
     const modal = await modalController.create({
          component: Modal,
          componentProps: {
            'id':id,
            'cc':cc,
            'year':year,
            'numero':numero,
            'fondo':fondo,
            'cr_nombre':cr_nombre,
            'tipo':tipo,
            'id_s':id_s
          }
        });
        modal.present();

    
  },
  getcentrocosto()
  {
  this.run= localStorage.getItem("run");
   const fecha = new Date();
   let year = fecha.getFullYear()
   var d=new FormData()
   d.append('year',year)
   d.append('run',this.run)

   axios.post('https://www.ssarica.cl/app/solicitudescc.php',d,{headers: { 'Content-Type': 'multipart/form-data'}}).then(response=>{
    if(response.data != null){
      this.data=response.data
    }else{
        this.data=[]
    }
   
    console.log(response)

  }).catch(err=>{
    console.log(err)

  });

},
 autorizarot()
    {
   


 

  },



}

}
</script>
<style >
  .header-row {
    background: #7163AA;
    color: #fff;
    font-size: 18px;
  }

  ion-col {
    border: 1px solid #ECEEEF;
  }
</style>