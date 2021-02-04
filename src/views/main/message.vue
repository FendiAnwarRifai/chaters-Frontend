<template>
  <div>
    <!-- this friends detail -->
    <div ref="friendsDetail" class="info-friends">
      <div class="sub-friends-detail">
        <div class="header row p-3" style="color: #7E98DF;">
          <div class="col login-name d-flex align-items-center justify-content-center" style="position:relative;">
            <i style="cursor:pointer; position:absolute; left: 100px; top: 6px;" @click="closeNav" class="fas fa-chevron-left fa-lg"></i>
            <h5>@{{friendsInfo.username}}</h5>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col d-flex justify-content-center align-items-center">
            <label class="d-flex justify-content-center align-items-center" style="border-radius:100%; width:60px; height:60px; overflow:hidden; cursor:pointer;">
              <img :src="friendsInfo.images" alt="" height="60px">
            </label>
          </div>
        </div>
        <div class="row p-3 mt-3">
          <div class="col">
            <h6 style="font-size: 18px">{{friendsInfo.name}}</h6>
            <h6 style="font-size: 12px; font-weight: 400; color: #7E98DF;" v-if="cek.includes(friendsInfo.id) === true" >Online</h6>
            <h6 style="font-size: 12px; font-weight: 400; color: #7E98DF;" v-else>Terlihat {{ $dayjs(friendsInfo.updatedAt).fromNow() }}</h6>
          </div>
          <div class="col d-flex justify-content-end align-items-center">
            <i class="fas fa-comment-alt fa-lg"></i>
          </div>
        </div>
        <div class="row p-2 ps-3">
          <div>
            <h6 style="font-size: 18px">Phone number</h6>
            <h6 style="font-size: 16px; font-weight: 400;">{{friendsInfo.phone || '-'}}</h6>
          </div>
        </div>
        <hr>
        <div class="row p-3 pb-5">
          <ul class="nav nav-pills mb-3 d-flex justify-content-around" id="pills-tab" role="tablist" >
            <li class="nav-item" role="presentation">
              <a class="nav-link active" id="pills-location-tab" data-bs-toggle="pill" href="#pills-location" role="tab" aria-controls="pills-location" aria-selected="true">Location</a>
            </li>
            <li class="nav-item" role="presentation">
              <a class="nav-link" id="pills-images-tab" data-bs-toggle="pill" href="#pills-images" role="tab" aria-controls="pills-images" aria-selected="false">Images</a>
            </li>
            <li class="nav-item" role="presentation">
              <a class="nav-link" id="pills-ducuments-tab" data-bs-toggle="pill" href="#pills-ducuments" role="tab" aria-controls="pills-ducuments" aria-selected="false">Ducuments</a>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent" style="overflow-y: scroll; overflow-x: hidden; height:36vh;">
            <div class="tab-pane fade show active" id="pills-location" role="tabpanel" aria-labelledby="pills-location-tab">
              <l-map :zoom="zoom" :center="friendCenter" style="height: 200px; width: 100%">
                <l-tile-layer :url="url" :attribution="attribution" />
                <l-marker :lat-lng="friendMarkerLatLng"></l-marker>
              </l-map>
            </div>
            <div class="tab-pane fade" id="pills-images" role="tabpanel" aria-labelledby="pills-images-tab">
              images
            </div>
            <div class="tab-pane fade" id="pills-ducuments" role="tabpanel" aria-labelledby="pills-ducuments-tab">
              this document
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end  friends detail -->
    <div class="row headers" style="padding: 20px; width:102%; position:fixed; top:0; background:white; z-index:1;">
      <div class=" col-1 d-flex align-items-start chat-images">
        <label class="d-flex justify-content-center align-items-center" style="border-radius:100%; width:70px; height:70px; overflow:hidden; cursor:pointer;">
          <img :src="friendsInfo.images" alt="" height="60px">
        </label>
      </div>
      <div class="col d-flex align-items-center">
        <div class="row">
          <div class="col-12 text-dark name">
            {{friendsInfo.name}}
          </div>
          <div class="col-12 status">
            <span v-if="cek.includes(friendsInfo.id) === true" >Online</span>
            <span v-else>Terlihat {{ $dayjs(friendsInfo.updatedAt).fromNow() }}</span>
          </div>
        </div>
      </div>
      <div class="col d-flex justify-content-end align-items-center">
        <i @click="openNav" class="fas fa-th-large fa-lg" style=" color: #7E98DF; cursor:pointer;"></i>
      </div>
    </div>
    <div class="row chaters">
      <div class="messages-content" ref="messageBody" style="height:70vh;">
        <div v-for="(message, index ) in messages" :key="index">
          <!-- ini untuk penerima -->
          <div class="row mb-3" v-if="message.status === 'dikirim' || message.receiverId == idLogin">
            <div class="chat-images col-1 d-flex align-items-end">
              <label class="d-flex justify-content-center align-items-center" style="border-radius:100%; width:50px; height:50px; overflow:hidden; cursor:pointer;">
                <img :src="friendsInfo.images" alt="" height="50px">
              </label>
            </div>
            <div class="list-message col-auto d-flex justify-content-end align-items-end" style="max-width: 35%;">
              <div class="chat-receiver">
                {{message.messages}}
              </div>
            </div>
            <div class="col d-flex align-items-center textDateReceiver">
              {{ $dayjs(message.date).calendar(null, { sameDay: '[Hari ini] HH:mm', lastDay: '[Kemarin ] HH:mm', lastWeek: ' ddd DD HH:mm', sameElse: 'DD/MM/YYYY' }) }}
            </div>
          </div>
          <!-- ini untuk pengirim -->
          <div v-else class="row mb-3">
            <div class="col d-flex align-items-center justify-content-end textDateSender">
              {{ $dayjs(message.date).calendar(null, { sameDay: '[Hari ini] HH:mm', lastDay: '[Kemarin ] HH:mm', lastWeek: ' ddd DD HH:mm', sameElse: 'DD/MM/YYYY' }) }}
            </div>
            <div class="list-message col-auto d-flex justify-content-end align-items-end" style="max-width: 35%;">
              <div class="chat-sender">
                {{message.messages}}
              </div>
            </div>
            <div class="chat-images col-1 d-flex align-items-end" style="text-align:right;">
              <label class="d-flex justify-content-center align-items-center" style="border-radius:100%; width:50px; height:50px; overflow:hidden; cursor:pointer;">
                <img :src="dataPersonal.images" alt="" height="50px">
              </label>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div style="padding: 20px; width:100%; position:fixed; bottom:0; background:white;">
      <input style="padding-right:150px" v-model="inputMessage" @keypress.enter="sendMessage" class="input-message" type="text" placeholder="Type your message...">
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
export default {
  name: 'Index',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      cek: [],
      idLogin: localStorage.getItem('id'),
      socket: io(`${process.env.VUE_APP_BASE_URL}`),
      friendsInfo: {},
      inputMessage: '',
      messages: [],
      zoom: 13,
      center: latLng(0, 0),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markerLatLng: [0, 0],
      friendCenter: latLng(0, 0),
      friendMarkerLatLng: [0, 0]
    }
  },
  mounted: function () {
    var container = this.$refs.messageBody
    container.scroll({
      top: container.scrollHeight,
      behavior: 'smooth'
    })
    this.messageById()
    this.userByLogin()
    this.socket.on('userStatus', (data) => {
      this.cek = data.cekStatus
    })
    this.socket.on('userDisconnect', () => {
      axios.get(`${process.env.VUE_APP_BASE_URL}/api/chat/personal/${this.$route.params.id}`)
        .then((res) => {
          this.friendsInfo = res.data.result[0]
        })
    })
    this.socket.emit('clientLogin', { idLogin: this.idLogin })
    this.socket.on('cektoast', (data) => {
      if (this.$route.params.id !== data.idpengirim) {
        this.$toast.open({
          message: data.nameSender + ' send message: ' + data.messages,
          type: 'success',
          duration: 3000,
          position: 'top-right'
        })
      }
    })
    this.socket.on('kirimKembali', (data) => {
      setTimeout(() => {
        axios.get(`${process.env.VUE_APP_BASE_URL}/api/chat/history?idOne=${this.idLogin}&idTwo=${this.$route.params.id}`).then((result) => {
          this.messages = result.data.result
        })
      }, 200)
    })
  },
  computed: {
    ...mapGetters(['dataPersonal'])
  },
  watch: {
    messages: function (val) {
      setTimeout(() => {
        var container = this.$refs.messageBody
        container.scroll({
          top: container.scrollHeight,
          behavior: 'smooth'
        })
      }, 50)
    }
  },
  methods: {
    ...mapActions(['userByLogin']),
    messageById () {
      this.socket.emit('initialUser', { idpengirim: this.idLogin, idpenerima: this.$route.params.id })
      // get message
      axios.get(`${process.env.VUE_APP_BASE_URL}/api/chat/history?idOne=${this.idLogin}&idTwo=${this.$route.params.id}`).then((result) => {
        console.log('ini message dari database', result.data.result)
        this.messages = result.data.result
      })
      // get user by id
      axios.get(`${process.env.VUE_APP_BASE_URL}/api/chat/personal/${this.$route.params.id}`)
        .then((res) => {
          this.friendsInfo = res.data.result[0]
          this.friendCenter = latLng(res.data.result[0].lat, res.data.result[0].lng)
          this.friendMarkerLatLng = [res.data.result[0].lat, res.data.result[0].lng]
        })
    },
    sendMessage () {
      this.socket.emit('reciverMessage', { nameSender: this.dataPersonal.name, idpengirim: this.idLogin, idpenerima: this.$route.params.id, messages: this.inputMessage })
      this.inputMessage = ''
    },
    openNav () {
      this.$refs.friendsDetail.style.width = '358px'
    },
    closeNav () {
      this.$refs.friendsDetail.style.width = '0'
    }
  }
}
</script>

<style scoped>
/* * {
    border:1px solid blue !important;
    } */
    .chaters{
        background:#EDEDED;
        padding-right: 0 !important;
        padding-top:110px;
        margin:0 0 80px 0;
    }
    .mobile{
      display: none !important;
    }

    .info-friends{
      background: white;
      width: 0;
      position: fixed;
      z-index: 2;
      right: 0;
      overflow: hidden;
      transition: 0.3s;
    }
    .sub-friends-detail{
      width: 358px;
    }

    .login-name{
      font-size: 20px;
    }
    .body {
      margin:0;
    }

  h1, .nav-link, .name{
    font-family: 'Rubik', sans-serif;
  }
  ::placeholder{
    color: #848484;
    font-size: 14px;
  }

  .nav-link{
    color:black;
  }
  .nav-pills .nav-link.active {
   background: #7E98DF;
   border-radius: 18px;
 }
 .content-contact{
  cursor: pointer;
}

.message{
  font-size: 14px;
  color: #7E98DF;
}
.messages-content{
    width:100%;
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
    padding: 18px 0px 18px 8px;
}

.status{
  font-size: 14px;
  color: #7E98DF;
}
.chat-receiver{
  padding:14px;
  font-size: 14px;
  height: max-content;
  border-radius: 35px 35px 35px 10px;
  background: #7E98DF;
  color:white;
}
.chat-sender {
  padding:14px;
  font-size: 14px;
  height: max-content;
  border-radius: 35px 10px 35px 35px;
  background: #FFFFFF;
  color:#232323;
}
.input-message:focus{
  outline: 0;
}
.input-message{
  width: 100%;
  font-size: 14px;
  padding: 12px;
  padding-left: 28px;
  border-radius: 15px;
  border:none;
  background: #f3f3f3;
}

.fitur-input-message{
  right: 52px;
  top: 42px;
  color: #7E98DF;
}
@media only screen and (max-width: 991px) {
      .mobile{
      display: flex !important;
    }
    .desktop{
      display: none !important;
    }
  .right{
    display: none;
  }
}
@media only screen and (max-width: 960px) {
    /* .chaters{
        padding: 10px;
    } */
  .chat-images {
    width:15%;
  }
  .list-message{
    max-width: 42% !important;
  }
}
  .textDateSender{
    text-align: right;
  }

@media only screen and (max-width: 458px) {
  .chaters{
        padding-top:90px;
    }
  .chat-images{
    display: none !important;
  }
  .list-message{
    max-width: 80% !important;
  }
  .messages-content{
      padding: 18px 8px 18px 8px;
  }
  .status, .chat-receiver, .chat-sender {
    font-size: 12px;
  }
  .textDateReceiver, .textDateSender {
    font-size: 10px;
  }
}
</style>
