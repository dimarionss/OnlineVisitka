new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: () => ({
    links: [
      'Контактные данные',
      'Редактор визитки',
      'Галерея',
      'Страница на доработке',
    ],
    selectedItem: 0,
    items: [{
        text: 'Настройки',
        icon: 'mdi-settings'
      },
      {
        text: 'Поделиться',
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
        text: 'Загрузить',
        icon: 'mdi-upload'
      },
    ],
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
  }),
  methods: {
    validate() {
      window.location.href = 'index.html'
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
  
})