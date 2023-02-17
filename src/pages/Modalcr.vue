<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Rechazar</ion-button>
      </ion-buttons>
      <ion-title>{{fondo}}</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirmar">Confirmar</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-item>
      <ion-label position="stacked">CC</ion-label>
      <ion-input v-model="name" >{{cc}}</ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">CR</ion-label>
      <ion-input v-model="name" >{{cr_nombre}}</ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Numero</ion-label>
      <ion-input v-model="name">{{numero}}</ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Precio Total</ion-label>
      <ion-input v-model="name">{{montototal}}</ion-input>
    </ion-item>
  </ion-content>
  <ion-content>

{{id_s}} {{tipo}}
    <ion-grid class="ion-text-center">

      <ion-row class="ion-margin">
        <ion-col>
          <ion-title>
            <ion-text color="default">
              Productos
            </ion-text>
          </ion-title>
        </ion-col>
      </ion-row>
 
      <ion-row class="header-row">
        <ion-col>
          <ion-text>Id</ion-text>
        </ion-col>
          <ion-col>
          <ion-text>Nombre</ion-text>
        </ion-col>

        <ion-col>
          <ion-text>Precio</ion-text>
        </ion-col>

        <ion-col>
          <ion-text>Cant.</ion-text>
        </ion-col>
        <ion-col>
          <ion-text>Justif.</ion-text>
        </ion-col>

      </ion-row>


      <ion-row v-for="(p,index) in productos" :key="p.pro_id">
        <ion-col >
          <ion-text>
             {{index+1}}
          </ion-text>
        </ion-col>
         <ion-col>
          <ion-text>
          {{p.pro_nombre}}
          </ion-text>
        </ion-col>

        <ion-col>
          <ion-text>
          {{formatodecimal(p.pro_precio)}}
          </ion-text>
        </ion-col>

        <ion-col>
          <ion-text>
            {{p.pro_cantidad}}
          </ion-text>
        </ion-col>
        <ion-col>
          <ion-text>
             {{p.pro_justificacion}}
          </ion-text>
        </ion-col>

      </ion-row>

    </ion-grid>

  </ion-content>
</template>
<style >
   ion-alert.custom-alert {
    --backdrop-opacity: 0.7;
  }

  .custom-alert .alert-button-group {
    padding: 8px;
  }

  button.alert-button.alert-button-confirm {
    background-color: var(--ion-color-success);
    color: var(--ion-color-success-contrast);
  }

  .md button.alert-button.alert-button-confirm {
    border-radius: 4px;
  }

  .ios .custom-alert button.alert-button {
    border: 0.55px solid rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.2);
  }

  .ios button.alert-button.alert-button-cancel {
    border-right: 0;
    border-bottom-left-radius: 13px;
    border-top-left-radius: 13px;
  }

  .ios button.alert-button.alert-button-confirm {
    border-bottom-right-radius: 13px;
    border-top-right-radius: 13px;
  }
</style>

<script>
  import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    modalController,
    alertController 

  } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import axios from 'axios';
  export default defineComponent({
    name: 'Modal',
    components: { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonItem, IonLabel, IonInput },
    props: {
      id: String,
      cc:String,
      year:String,
      numero:String,
      fondo:String,
      cr_nombre:String,
      tipo:String,
      id_s:String
    },
    data()
    {
      return{
        idhistorial:0,
        montototal:0,
        productos:[],
        roleMessage:'',        
        run:'',
        handlerMessage:{
          value:''
        }

      }
    },

    mounted(){

      this.run= localStorage.getItem("run");

    },
    created:function(){

      this.getproductos();
      this.getcompra();

    },

    methods: {
      formatodecimal(numero){
         return   Math.trunc(numero);
      },
      getcompra(){
       var d=new FormData()
       d.append('ot',this.id)
        axios.post('https://www.ssarica.cl/app/listacompras.php',d,{headers: { 'Content-Type': 'multipart/form-data'}}).then(response=>{
          for (var i = 0; i < response.data.length; i++) {
           this.idhistorial= response.data[i].id_historial
           
          }
           console.log(response)
        }).catch(err=>{
           console.log(err)
        });

      },

      getproductos(){
       var d=new FormData()
       d.append('ot',this.id)


       axios.post('https://www.ssarica.cl/app/productosot.php',d,{headers: { 'Content-Type': 'multipart/form-data'}}).then(response=>{
        this.productos=response.data
        
        for (var i = 0; i < response.data.length; i++) {
          console.log(response.data[i].pro_precio)
          this.montototal=this.montototal+(response.data[i].pro_precio*response.data[i].pro_cantidad)
             console.log(this.montototal)
        }

        console.log(response)
      }).catch(err=>{
        console.log(err)
      });

    },

    async cancel() {

        const alert = await alertController.create({
          header: 'Desea Rechazar Solicitud',
          cssClass: 'custom-alert',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'alert-button-cancel',
              handler: () => {
                  console.log('Cancel clicked');
              },
            },
            {
              text: 'Aceptar',
              role: 'confirm',
             cssClass: 'alert-button-confirm',
              handler: data => {
             
               console.log('aprobar clicked',data.area);
                    alert.onDidDismiss()
                 this.rechazar(data.area)


              },
            },
          ],
          inputs: [           
            {
              name:'area',
              type: 'textarea',
              placeholder: 'Motivo',
            },
          ],
        });
         await alert.present();

        const { role } = await alert.onDidDismiss();
        this.roleMessage= `Dismissed with role: ${role}`;

      //return modalController.dismiss(null, 'cancel');
    },
    rechazar(obs){
     var d=new FormData();
      d.append('observacion',obs)
      d.append('estado',7)
      d.append('id',this.id_s)
      d.append('numero',this.numero)
      d.append('usuario',this.run)
      d.append('ot',this.id)
     
     axios.post('https://www.ssarica.cl/app/rechazarcr.php',d,{headers: { 'Content-Type': 'multipart/form-data'}}).then(response=>{
      console.log(response)
          window.location.reload(true);
           return modalController.dismiss(null, 'cancel');
   
     }).catch(err=>{
      console.log(err)
     });
    },
   aprobarcr(){
    alert(this.id_s)
       
       var fecha = new Date();
        const dia = fecha.getDate();
          const mes = fecha.getMonth(); // Be careful! January is 0, not 1
          const year = fecha.getFullYear();
          const hora=fecha.getHours();
          const minuto=fecha.getMinutes();
          const segundo=fecha.getSeconds();

          const dateString = year + "-" + (mes + 1) + "-" + dia+" "+hora+":"+minuto+":"+segundo ;

      var d=new FormData();
      d.append('id_h',this.idhistorial)
      d.append('ot',this.id)
      d.append('year',this.year)
      d.append('usuario',this.run)
      d.append('tipo',this.tipo)
      d.append('fecha',dateString)
      d.append('estado',4)
      d.append('numero',this.numero)
      d.append('actividad',1)
      d.append('estadohistoria',3)
      d.append('solicitud',this.id_s)

      axios.post('https://www.ssarica.cl/app/aprobarcr.php',d,{headers: { 'Content-Type': 'multipart/form-data'}}).then(response=>{
        console.log(response)
           
        alert("Exito solicitud Autorizada")
        window.location.reload(true);
           return modalController.dismiss(null, 'cancel');
      }).catch(err=>{
        console.log(err)
      })

     
    },
    async confirmar() {
       this.handlerMessage = ''
     
       
        const alert = await alertController.create({
          header: 'Desea Aprobar Solicitud',
          cssClass: 'custom-alert',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'alert-button-cancel',
              handler: () => {
                  console.log('Cancel clicked');
              },
            },
            {
              text: 'Aceptar',
              role: 'confirm',
                  cssClass: 'alert-button-confirm',
              handler: () => {
             
               this.aprobarcr()
                alert.onDidDismiss()

              },
            },
          ],
        });
         await alert.present();

        const { role } = await alert.onDidDismiss();
        this.roleMessage= `Dismissed with role: ${role}`;
      
      //return modalController.dismiss(this.name, 'confirm');
    },
  },
});
</script>