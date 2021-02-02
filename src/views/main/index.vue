<template>
  <div>
      <div ref="searchFriends" class="list-all-user ps-2">
      <div class="allUser">
        <div class="header row p-3 d-flex align-items-center" style="color: #7E98DF;">
          <div class="col-4">
            <i style="cursor:pointer;" @click="back" class="fas fa-chevron-left fa-lg"></i>
          </div>
          <div class="col login-name ps-4">
           <h5>List All User</h5>
         </div>
       </div>
        <div class="row p-4">
          <div style="position:relative;" class="col-10 d-flex justify-content-end">
            <i class="fas fa-search"></i>
            <input class="search" type="text" placeholder="search name...">
          </div>
          <div class="col-2 d-flex justify-content-center align-items-center">
            <i class="fas fa-plus fs-3"></i>
          </div>
        </div>
        <div class="" style="overflow-y: scroll; overflow-x: hidden; height:77vh;">
          <div @click="messageById(data)" v-for="data in dataAll" :key="data.id" class="content-contact row d-flex align-items-center ms-1 mb-3 shadow p-2 bg-white rounded-pill " style="width:98%">
            <div class="col-3" style="position:relative;">
              <div style="position:relative; width:50px; height:50px;">
                <label class="d-flex justify-content-center align-items-center" style="border-radius:100%; overflow:hidden; cursor:pointer;">
                  <img :src="data.images" alt="" height="50px">
                </label>
                <i v-if="cek.includes(data.id) === true" style="position:absolute; bottom: 0; right: 0; color:#2fed25;" class="fas fa-circle"></i>
              </div>
            </div>
            <div class="col">
              <div class=" text-dark name">
                {{data.name}}
              </div>
            </div>
          </div>
        </div>
    </div>
      </div>
    <!-- this Profile or personal info user login -->
    <div ref="profile" class="login-personal ps-2">
      <div class="sub-profile">
        <div class="header row p-3 d-flex align-items-center" style="color: #7E98DF;">
          <div class="col-4">
            <i style="cursor:pointer;" @click="backChatting" class="fas fa-chevron-left fa-lg"></i>
          </div>
          <div class="col login-name ps-4">
           <h5>@{{dataPersonal.username}}</h5>
         </div>
       </div>
       <div class="row mt-2">
         <div class="col d-flex justify-content-center align-items-center">
           <label class="d-flex justify-content-center align-items-center" for="uploadImage" style="border-radius:100%; width:80px; height:80px; overflow:hidden; cursor:pointer;">
             <img :src="editData.avatar || dataPersonal.images" alt="" height="80px">
           </label>
           <input class="d-none" id="uploadImage" type="file" @change="getImage"/>
         </div>
       </div>
       <div class="row mt-2">
         <div class="col text-center">
           <h6 style=" font-size: 18px">{{dataPersonal.name}}</h6>
           <span style="font-size: 16px; color: #adadad;">@{{dataPersonal.username}}</span>
         </div>
       </div>
       <div style="overflow-y: scroll; overflow-x: hidden; height:68vh;">
        <div class="row p-3 mt-3">
          <div>
            <h6 style="font-size: 18px">Account</h6>
            <h6 style="font-size: 16px; font-weight: 400;">{{dataPersonal.phone}}</h6>
            <span data-bs-toggle="modal" data-bs-target="#exampleModal" style="cursor:pointer; font-size: 14px; color: #7E98DF; font-weight: 300;">Tap to change phone number</span>
          </div>
        </div>
        <hr>
        <div class="row p-2 ps-3">
          <div>
            <h6 style="font-size: 16px">@{{dataPersonal.username}}</h6>
            <span data-bs-toggle="modal" data-bs-target="#exampleModal" style="cursor:pointer; font-size: 14px; color: #adadad; font-weight: 300;">Username</span>
          </div>
        </div>
        <hr>
        <div class="row p-3">
          <div>
            <h6 style="font-size: 18px">{{dataPersonal.bio}}</h6>
            <span data-bs-toggle="modal" data-bs-target="#exampleModal" style="cursor:pointer; font-size: 14px; color: #adadad; font-weight: 300;">Bio</span>
          </div>
        </div>
        <div class="row p-3">
          <div>
            <h6 style="font-size: 18px">My Location</h6>
            <l-map :zoom="zoom" :center="center" style="height: 200px; width: 100%">
              <l-tile-layer :url="url" :attribution="attribution" />
              <l-marker :lat-lng="markerLatLng"></l-marker>
            </l-map>
          </div>
        </div>
      </div>
    </div>
    </div>
  <!-- end Profile or personal info user login -->

  <!-- this friends detail -->
  <div ref="friendsDetail" class="info-friends ps-2">
    <div class="sub-friends-detail">
      <div class="header row p-3" style="color: #7E98DF;">
        <div class="col login-name d-flex align-items-center justify-content-center" style="position:relative;">
          <i style="cursor:pointer; position:absolute; left: 100px; top: 6px;" @click="closeNav" class="fas fa-chevron-left fa-lg"></i>
          <h5>@{{friendsInfo.username}}</h5>
        </div>
      </div>
      <div class="row mt-2">
       <div class="col d-flex justify-content-center align-items-center">
         <label class="d-flex justify-content-center align-items-center" for="uploadImage" style="border-radius:100%; width:80px; height:80px; overflow:hidden; cursor:pointer;">
           <img :src="editData.avatar || friendsInfo.images" alt="" height="80px">
         </label>
         <input class="d-none" id="uploadImage" type="file" @change="getImage"/>
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
    <div class="row p-3">
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

<div class="row body">
 <!-- Modal edit profile-->
 <div @click="reset" class="modal fade" id="exampleModal" tabindex="2" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Your Data</h5>
        <button  @click="reset" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <label for="">Phone Number</label>
        <input v-model="editData.phone" class="input-message mb-3" type="number" min="0" placeholder="">
        <label for="">Username</label>
        <input v-model="editData.username" class="input-message mb-3" type="text" placeholder="">
        <label for="">Bio</label>
        <textarea v-model="editData.bio" class="input-message" type="text">
        </textarea>
      </div>
      <div class="modal-footer">
        <button @click="reset" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button @click="updateUser" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
</div>
<!-- end modal edit profile -->

<!-- this Chat -->
<div class="left col-lg-3">
  <div class="header row p-4">
    <div class="col">
      <h1 class="title">Chaters</h1>
    </div>
    <div class="dropdown col d-flex justify-content-end align-items-center">
      <i class="fas fa-align-left fa-lg" id="drop-menu" data-bs-toggle="dropdown"></i>

      <ul class="dropdown-menu animate slideIn" aria-labelledby="drop-menu">
        <li>
          <button @click="settingProfile()" class="dropdown-item"><i class="fas fa-cog"></i> Setting</button>
        </li>
        <li>
          <button @click="contact()" class="dropdown-item"><i class="far fa-user"></i> Contacts</button>
        </li>
        <li>
          <button @click="searchFriends()" class="dropdown-item"><i class="fas fa-user-plus"></i> Invite Friends</button>
        </li>
        <li>
          <button class="dropdown-item"><i class="far fa-question-circle"></i> Chaters FAQ</button>
        </li>
         <li>
          <button @click="handleLogout()" class="dropdown-item"><i class="fas fa-sign-out-alt"></i> Logout</button>
        </li>
      </ul>
    </div>
  </div>
  <div class="row p-4">
    <div style="position:relative;" class="col-10 d-flex justify-content-end">
      <i class="fas fa-search"></i>
      <input class="search" type="text" placeholder="Type your message...">
    </div>
    <div class="col-2 d-flex justify-content-center align-items-center">
      <i class="fas fa-plus fs-3"></i>
    </div>
  </div>
  <div class="row list-user-chat" style="margin-left:0px">
    <ul class="nav nav-pills mb-3 d-flex justify-content-around" id="pills-tab" role="tablist" >
      <li class="nav-item" role="presentation">
        <a class="nav-link active" id="pills-all-tab" data-bs-toggle="pill" href="#pills-all" role="tab" aria-controls="pills-all" aria-selected="true">All</a>
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link" id="pills-important-tab" data-bs-toggle="pill" href="#pills-important" role="tab" aria-controls="pills-important" aria-selected="false">Important</a>
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link" id="pills-unread-tab" data-bs-toggle="pill" href="#pills-unread" role="tab" aria-controls="pills-unread" aria-selected="false">Unread</a>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div class="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab"  style="overflow-y: scroll; overflow-x: hidden; height:63vh;">
        <div @click="messageById(data)" v-for="data in friendsChats" :key="data.id" class="content-contact row d-flex align-items-center mb-3">
          <div class="col-3" style="position:relative;">
            <div style="position:relative; width:60px; height:60px;">
              <label class="d-flex justify-content-center align-items-center" style="border-radius:100%; overflow:hidden; cursor:pointer;">
                <img :src="data.user.images" alt="" height="60px">
              </label>
              <i v-if="cek.includes(data.idFriend) === true" style="position:absolute; bottom: 0; right: 0; color:#2fed25;" class="fas fa-circle"></i>
            </div>
          </div>
          <div class="col-6">
            <div class=" text-dark name">
              {{data.user.name}}
            </div>
            <div class=" message">
              {{data.message}}
            </div>
          </div>
          <div class="col-3 text-center ">
            <div class="row">
              <div class="col-12 text-secondary">
                <!-- 23:00 -->
              </div>
              <div class="col-12">
                <!-- <span class="notif">999+</span> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="pills-important" role="tabpanel" aria-labelledby="pills-important-tab"></div>
      <div class="tab-pane fade" id="pills-unread" role="tabpanel" aria-labelledby="pills-unread-tab"></div>
    </div>
  </div>
</div>
<div class="right col-lg-9">
  <div :class="nothing" class="nothing d-flex justify-content-center align-items-center">
    Please select a chat to start messaging
  </div>
  <div :class="chat">
    <div class="row" style="padding: 20px;">
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
   <div class="row" style="background:#EDEDED;">
     <div ref="messageBody" class="" style=" height:66.5vh; overflow-y: scroll; position:relative; padding:18px;">
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
          <div class="chat-images col-1 d-flex align-items-end">
            <label class="d-flex justify-content-center align-items-center" style="border-radius:100%; width:50px; height:50px; overflow:hidden; cursor:pointer;">
              <img :src="dataPersonal.images" alt="" height="50px">
            </label>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div class="row">
   <div class="col position-relative" style="padding: 30px;">
     <input style="padding-right:150px" v-model="inputMessage" @keypress.enter="sendMessage" class="input-message" type="text" placeholder="Type your message...">
     <div class="fa-lg position-absolute fitur-input-message">
       <i class="fas fa-plus"></i>
       <i class="fas fa-surprise ms-3"></i>
       <i class="fas fa-camera ms-3"></i>
     </div>
   </div>
 </div>
</div>
</div>
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
      editData: { phone: '', username: '', bio: '', avatar: '' },
      nothing: '',
      chat: 'd-none',
      idLogin: localStorage.getItem('id'),
      socket: io(`${process.env.VUE_APP_BASE_URL}`),
      friendsChats: [],
      friendsInfo: {},
      id_receiver: '',
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
    this.socket.on('userStatus', (data) => {
      this.cek = data.cekStatus
    })
    this.socket.on('userDisconnect', () => {
      axios.get(`${process.env.VUE_APP_BASE_URL}/api/chat/personal/${this.id_receiver}`)
        .then((res) => {
          this.friendsInfo = res.data.result[0]
        })
    })
    // this.getUsers()
    this.friendsChat()
    this.userByLogin()
      .then((res) => {
        this.editData.phone = res.phone
        this.editData.username = res.username
        this.editData.bio = res.bio
      })
    this.socket.emit('clientLogin', { idLogin: this.idLogin })
    this.socket.on('cektoast', (data) => {
      setTimeout(() => {
        this.friendsChat()
      }, 100)
      if (this.id_receiver !== data.idpengirim) {
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
        axios.get(`${process.env.VUE_APP_BASE_URL}/api/chat/history?idOne=${this.idLogin}&idTwo=${this.id_receiver}`).then((result) => {
          this.messages = result.data.result
        })
      }, 200)
    })
    this.$getLocation().then(coordinates => {
      const payload = {
        lat: coordinates.lat,
        lng: coordinates.lng
      }
      this.updateUserLogin(payload).then((res) => {
        this.userByLogin()
        const coordinate = res.data.result
        this.center = latLng(coordinate.lat, coordinate.lng)
        this.markerLatLng = [coordinate.lat, coordinate.lng]
      })
    })
  },
  computed: {
    ...mapGetters(['dataAll', 'dataPersonal'])
  },
  watch: {
    messages: function (val) {
      setTimeout(() => {
        this.friendsChat()
        var container = this.$refs.messageBody
        container.scroll({
          top: container.scrollHeight,
          behavior: 'smooth'
        })
      }, 50)
    }
  },
  methods: {
    ...mapActions(['getUsers', 'userByLogin', 'updateUserLogin', 'updateImages', 'Logout']),
    friendsChat () {
      axios.get(`${process.env.VUE_APP_BASE_URL}/api/friends/my-friends`)
        .then((result) => {
          console.log(result.data.result)
          this.friendsChats = result.data.result
        })
    },
    handleLogout () {
      this.Logout().then((res) => {
        this.socket.emit('clientLogout', this.idLogin)
      })
    },
    messageById (val) {
      console.log('cek data', val)
      this.nothing = 'd-none'
      this.chat = ''
      this.id_receiver = val.id || val.idFriend
      this.socket.emit('initialUser', { idpengirim: this.idLogin, idpenerima: this.id_receiver })
      // get message
      axios.get(`${process.env.VUE_APP_BASE_URL}/api/chat/history?idOne=${this.idLogin}&idTwo=${this.id_receiver}`).then((result) => {
        console.log('ini message dari database', result.data.result)
        this.messages = result.data.result
      })
      // get user by id
      axios.get(`${process.env.VUE_APP_BASE_URL}/api/chat/personal/${this.id_receiver}`)
        .then((res) => {
          this.friendsInfo = res.data.result[0]
          this.friendCenter = latLng(res.data.result[0].lat, res.data.result[0].lng)
          this.friendMarkerLatLng = [res.data.result[0].lat, res.data.result[0].lng]
        })
    },
    sendMessage () {
      this.socket.emit('reciverMessage', { nameSender: this.dataPersonal.name, idpengirim: this.idLogin, idpenerima: this.id_receiver, messages: this.inputMessage })
      this.inputMessage = ''
    },
    updateUser () {
      const payload = {
        phone: this.editData.phone,
        username: this.editData.username,
        bio: this.editData.bio
      }
      this.updateUserLogin(payload).then((res) => {
        this.userByLogin()
      })
    },
    getImage (e) {
      var image = e.target.files[0]
      var reader = new FileReader()
      if (image.type !== 'image/png' && image.type !== 'image/jpg' && image.type !== 'image/jpeg') {
        this.$swal.fire({
          title: 'Warning!',
          text: 'Only .png, .jpg and .jpeg format allowed!',
          icon: 'warning',
          confirmButtonText: 'Ok'
        })
      } else if (image.size >= 4388608) {
        this.$swal.fire({
          title: 'Warning!',
          text: 'Image size is too large, it must be under 4MB',
          icon: 'warning',
          confirmButtonText: 'Ok'
        })
      } else {
        reader.readAsDataURL(image)
        reader.onload = e => {
          // this.editData.avatar = e.target.result
          // Tambahkan data ke Form Data
          var data = new FormData()
          data.append('images', image)

          // Kirim,
          this.updateImages(data)
            .then((res) => {
              this.editData.avatar = res.data.result.images
            })
        }
      }
    },
    reset () {
      this.userByLogin()
    },
    settingProfile () {
      this.$refs.profile.style.width = '358px'
    },
    backChatting () {
      this.$refs.profile.style.width = '0'
    },
    openNav () {
      this.$refs.friendsDetail.style.width = '358px'
    },
    closeNav () {
      this.$refs.friendsDetail.style.width = '0'
    },
    searchFriends () {
      this.getUsers()
      this.$refs.searchFriends.style = 'width:358px; border-right: 2px solid black;'
    },
    back () {
      this.$refs.searchFriends.style = 'width:0; border-right: 0px;'
    }
  }
}
</script>

<style scoped>
/* * {
    border:1px solid blue !important;
    } */
    .login-personal{
      background: white;
      width: 0;
      position: fixed;
      z-index: 1;
      overflow: hidden;
      transition: 0.3s;
    }
    .sub-profile {
      width: 336px;
    }

    .info-friends{
      background: white;
      width: 0;
      position: fixed;
      z-index: 1;
      right: 0;
      overflow: hidden;
      transition: 0.3s;
    }
    .sub-friends-detail{
      width: 336px;
    }

.list-all-user{
      background: #f4f4f4;
      width: 0;
      position: fixed;
      z-index: 1;
      left: 0;
      overflow: hidden;
      transition: 0.3s;
}
.allUser {
  width: 336px;
}

    .login-name{
      font-size: 20px;
    }

    .nothing{
      font-size: 24px;
      color: #848484;
      background:#FAFAFA;
      height:100vh;
    }
    .body {
      margin:0;
    }
    .left {
     color: #7E98DF;
     background: white;
   }
   .title{
     font-size:30px;
   }
   #drop-menu{
    cursor:pointer;
  }
  h1, .nav-link, .name, .login-personal{
    font-family: 'Rubik', sans-serif;
  }
  ::placeholder{
    color: #848484;
    font-size: 14px;
  }
  .fa-search{
    color:#848484;
    position: absolute;
    top: 10px;
    left: 28px;
    font-size: 24px;
  }
  .search{
    border: 0;
    width: 100%;
    padding:12px;
    font-size: 14px;
    padding-left: 52px;
    background:#FAFAFA;
    border-radius: 12px;
  }
  .search:focus{
    outline: 0;
  }

  .dropdown-menu{
    left: -80px !important;
    top: 50px !important;
    background:#7E98DF;
    padding:0;
    border-top-left-radius: 18px;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
    overflow: hidden;
  }
  .dropdown-menu .dropdown-item{
    color:white !important;
    padding: 18px;
    cursor: pointer;
    width: 200px;
  }
  .dropdown-menu .dropdown-item:active{
    color:white !important;
    background:#7E98DF !important;
  }
  .dropdown-item:hover{
    color: black !important;
  }
  .animate {
    animation-duration: 0.3s;
    -webkit-animation-duration: 0.3s;
    animation-fill-mode: both;
    -webkit-animation-fill-mode: both;
  }
  @keyframes slideIn {
    0% {
      transform: translateY(2rem);
      opacity: 0;
    }
    100% {
      transform:translateY(0rem);
      opacity: 1;
    }
    0% {
      transform: translateY(2rem);
      opacity: 0;
    }
  }

  @-webkit-keyframes slideIn {
    0% {
      -webkit-transform: transform;
      -webkit-opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0);
      -webkit-opacity: 1;
    }
    0% {
      -webkit-transform: translateY(1rem);
      -webkit-opacity: 0;
    }
  }

  .slideIn {
    -webkit-animation-name: slideIn;
    animation-name: slideIn;
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
.notif{
  padding: 1px 8px 1px 8px;
  border-radius: 12px;
  background: #7E98DF;
  color:white;
  font-size: 14px;
}
.message{
  font-size: 14px;
  color: #7E98DF;
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
@media only screen and (max-width: 960px) {
  .chat-images {
    width:15%;
  }
  .list-message{
    max-width: 42% !important;
  }
  .dropdown-menu{
    left: 80px !important;
    top: 50px !important;
  }
  .list-user-chat{
    margin-left: 20% !important;
    margin-right: 20%;
  }
}
  .textDateSender{
    text-align: right;
  }
@media only screen and (max-width: 530px) {
  .list-user-chat{
    margin-left: 14% !important;
    margin-right: 14%;
  }
}

@media only screen and (max-width: 458px) {
  .chat-images{
    display: none !important;
  }
  .list-message{
    max-width: 80% !important;
  }
  .status, .chat-receiver, .chat-sender {
    font-size: 12px;
  }
  .textDateReceiver, .textDateSender {
    font-size: 10px;
  }
}
</style>
