new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: () => ({
    // swap left menu ============================
    drawer: false,
    group: null,
    selectedItem: 0,
    items: [{
        text: 'My Files',
        icon: 'mdi-folder'
      },
      {
        text: 'Shared with me',
        icon: 'mdi-account-multiple'
      },
      {
        text: 'Starred',
        icon: 'mdi-star'
      },
      {
        text: 'Recent',
        icon: 'mdi-history'
      },
      {
        text: 'Offline',
        icon: 'mdi-check-circle'
      },
      {
        text: 'Uploads',
        icon: 'mdi-upload'
      },
      {
        text: 'Backups',
        icon: 'mdi-cloud-upload'
      },
    ],
    watch: {
      group() {
        this.drawer = false
      },
    },
    // swap left menu ============================
    selectedItem: 0,
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'введите E-mail',
      v => /.+@.+\..+/.test(v) || 'E-mail введен не верно',
    ],
    select: null,
    loginbox: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
    ],
    checkbox: false,
    dialog: false,
    dialog_edit: false,
    icons_footer: [
      'mdi-facebook',
      'mdi-google',
      'mdi-telegram',
      'mdi-instagram',
    ],
    linkIconForm:{},
    icons_add_visitka: [{
      text_icon: 'mdi-telegram',
      color_icon: 'background: #249bd7;',
      name_icon: 'Telegram',
      link_social: 'https://t.me/'
    },
    {
      text_icon: 'mdi-facebook',
      color_icon: 'background: #3b5998;',
      name_icon: 'Facebook',
      link_social: 'https://www.facebook.com/'
    },
    {
      text_icon: 'mdi-instagram',
      color_icon: 'background: #3f729b;',
      name_icon: 'Instagram',
      link_social: 'https://instagram.com/'
    },],
    icon_dialog: [{
        text_icon: 'mdi-telegram',
        color_icon: 'background: #249bd7;',
        name_icon: 'Telegram',
        link_social: 'https://t.me/'
      },
      {
        text_icon: 'mdi-facebook',
        color_icon: 'background: #3b5998;',
        name_icon: 'Facebook',
        link_social: 'https://www.facebook.com/'
      },
      {
        text_icon: 'mdi-instagram',
        color_icon: 'background: #3f729b;',
        name_icon: 'Instagram',
        link_social: 'www.instagram.com/'
      },
      {
        text_icon: 'mdi-twitter',
        color_icon: 'background: #00acee;',
        name_icon: 'Twitter',
        link_social: 'https://twitter.com/'
      },
      {
        text_icon: 'mdi-google',
        color_icon: 'background: #DD4B39;',
        name_icon: 'Google',
        link_social: 'https://plus.google.com/'
      },
      {
        text_icon: 'mdi-twitch',
        color_icon: 'background: #591381;',
        name_icon: 'Twitch',
        link_social: 'https://www.twitch.tv/'
      },
      {
        text_icon: 'mdi-pinterest',
        color_icon: 'background: #c8232c;',
        name_icon: 'Pinterest',
        link_social: 'https://www.pinterest.ru/'
      },
      {
        text_icon: 'mdi-whatsapp',
        color_icon: 'background: #50b154;',
        name_icon: 'WhatsApp',
        link_social: 'https://wa.me/'
      },
      {
        text_icon: 'mdi-skype',
        color_icon: 'background: #00aff0;',
        name_icon: 'Skype',
        link_social: 'skype:'
      },
      {
        text_icon: 'mdi-youtube',
        color_icon: 'background: #c4302b;',
        name_icon: 'YouTube',
        link_social: ''
      },
      {
        text_icon: 'mdi-vk',
        color_icon: 'background: #5d84ae;',
        name_icon: 'Vkontakte',
        link_social: 'https://vk.com/'
      },
      {
        text_icon: 'mdi-odnoklassniki',
        color_icon: 'background: #f93;',
        name_icon: 'Odnoklassniki',
        link_social: 'https://ok.ru/profile/'
      },
      {
        text_icon: 'mdi-linkedin',
        color_icon: 'background: #0e76a8;',
        name_icon: 'LinkedIn',
        link_social: 'https://www.linkedin.com/in/'
      },
      {
        text_icon: 'fab fa-viber',
        color_icon: 'background: #665CAC;',
        name_icon: 'Viber',
        link_social: 'https://www.viber.com/'
      },
    ],

    readlink: false,
    toggle: false,
    dialogm1: '',
    // link social==============================
    message: 'ссылка на соцы сеть',
    // link social end==============================

    show: false,
    
      // =======================cropp======================== 
      cropper: null,
      cropperava: null,
      objectUrl: null,
      objectUrlava: null,
      previewCropped: null,
      previewCroppedava: null,
      selectedFile: null,
      selectedFileava: null,
      // =======================cropp======================== 
  }),
  
  methods: {
    validate() {
      window.location.href = 'login.html'
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    
    resetLink() {
      this.readlink = false
      this.linkIcon = 'mdi-lock-open-variant'
    },
    deleteIcon(index){
      this.icons_add_visitka.splice(index, 1)
    },
    addLinkIcon(){
      this.icons_add_visitka.forEach((item, index) => {
        this.$set(item, 'link_icon', this.linkIconForm[index])
        console.log(this.icons_add_visitka)
      })
      // this.linkIconForm = {}
    },
    linkLocation(iconLink, linkSocial){
      window.location = linkSocial+iconLink;
    },
    add_form_icon(text_icon, color_icon, name_icon) {
      this.icons_add_visitka.push({
        text_icon: text_icon,
        color_icon: color_icon,
        name_icon: name_icon
      })
      this.dialog = false
    },





    // =======================cropp======================== 
    change({coordinates, canvas}) {
      console.log(coordinates, canvas)
   },


   setupCropper (selectedFile) {
    if (this.cropper) {
      this.cropper.destroy()
    }

    if (this.objectUrl) {
      window.URL.revokeObjectURL(this.objectUrl)
    }

    if (!selectedFile) {
      this.cropper = null
      this.objectUrl = null
      this.previewCropped = null
      return
    }

    this.objectUrl = window.URL.createObjectURL(selectedFile)
    this.$nextTick(this.setupCropperInstance)
  },
  setupCropperava (selectedFileava) {
    if (this.cropperava) {
      this.cropperava.destroy()
    }

    if (this.objectUrlava) {
      window.URL.revokeObjectURL(this.objectUrlava)
    }

    if (!selectedFileava) {
      this.cropperava = null
      this.objectUrlava = null
      this.previewCroppedava = null
      return
    }

    this.objectUrlava = window.URL.createObjectURL(selectedFileava)
    this.$nextTick(this.setupCropperInstanceava)
  },
    // =======================cropp======================== 
  },
  computed: {
    btnText: function () {
      if (this.show) {
        return 'Аккаунт откл.'
      }

      return 'Аккаунт вкл.'
    },
    linkIcon: function() {
      if (this.readlink) {
        return 'mdi-lock'
      } 
      return 'mdi-lock-open-variant'    
    },
  }
  
})