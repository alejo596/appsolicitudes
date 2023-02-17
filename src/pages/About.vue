

<template>
  <master-layout pageTitle="Solicitudes Centros de Resp.">

    <ion-content>


      <ion-grid class="ion-text-center">

        <ion-row class="ion-margin">
          <ion-col>
            <ion-title>
              <ion-text color="default">
                CENTRO DE RESP.
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

      <div v-if="data.length >0">
        <ion-row v-for="(li,index) in data" :key="li.id" @click="verot(li.id_doc,li.cc_nombre,li.compra_amio,li.compra_numero,li.fondo,li.cr_nombre,li.tipo,li.id)"  >
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
       <ion-row    v-if="data.length == 0"  >
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
 
  </master-layout>
</template>

<script>
 import {

  IonContent,

  modalController,
  IonCol, IonGrid, IonRow
} from '@ionic/vue';
import axios from 'axios';
import Modalcr from './Modalcr.vue';

export default {
  components: {
   
    IonContent,

    IonCol, IonGrid, IonRow
  },


  data(){

    return {
      na:'',
      data:[],
      message: '',
      run:'',
      cr:''

    }


  },
   ionViewWillEnter() {
   
    this.getcr();

     },
  mounted(){
    var nombre2 = localStorage.getItem("nombre");
   this.na=nombre2; 
   this.run= localStorage.getItem("run");


   this.cr=this.$route.params.id

 },
 created:function(){

 

},
methods:{
  getcr(){
    this.run= localStorage.getItem("run");
   const fecha = new Date();
   let year = fecha.getFullYear()
    var d=new FormData()
      d.append('run',this.run)
        d.append('year',year);
        d.append('estado',4);
        d.append('tipo',1);

        axios.post('https://www.ssarica.cl/app/solicitudescr.php',d,{headers: { 'Content-Type': 'multipart/form-data'}}).then(response=>{
            if(response.data != null){
      this.data=response.data
    }else{
        this.data=[]
    }
        }).catch(err=>{
          console.log(err)
        });

  },
  

  async  verot(id,cc,year,numero,fondo,cr_nombre,tipo,id_s){
    console.log(id)
    const modalcr = await modalController.create({
      component: Modalcr,
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
    modalcr.present();

    
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