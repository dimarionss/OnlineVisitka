new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: () => ({
    // swap left menu ============================
    drawer: false,
    group: null,
    selectedItem: 0,
    items: [
      { text: 'My Files', icon: 'mdi-folder' },
      { text: 'Shared with me', icon: 'mdi-account-multiple' },
      { text: 'Starred', icon: 'mdi-star' },
      { text: 'Recent', icon: 'mdi-history' },
      { text: 'Offline', icon: 'mdi-check-circle' },
      { text: 'Uploads', icon: 'mdi-upload' },
      { text: 'Backups', icon: 'mdi-cloud-upload' },
    ],
    watch: {
      group () {
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
    icons_footer: [
      'mdi-facebook',
      'mdi-google',
      'mdi-telegram',
      'mdi-instagram',
    ],
    icons_add_visitka: [
      'mdi-facebook',
      'mdi-google',
      'mdi-telegram',
      'mdi-instagram',
    ],
    readlink : false,
    toggle: false,
    dialogm1: '',
    // link social==============================
    message:'ссылка на соцы сеть',
    // link social end==============================
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
    saveLink(){
      this.readlink = true
    },
    resetLink(){
      this.readlink = false
    }
  },

})