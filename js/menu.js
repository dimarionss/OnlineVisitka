async function open_file_in_cropper(callback, url) {
  let response = await fetch(url);
  let data = await response.blob();
  let metadata = {
    type: 'image/jpeg'
  };
  let file = new File([data], "test.jpg", metadata);
  callback(file)
}

menu = new Vue({
  el: '#menu',
  vuetify: new Vuetify(),
  data: () => ({
    protocol: document.location.protocol == "https:" ? "https" : "http",
    domain: window.location.host,
    user: {},
    registration_from_data: {},
    business_card: {},
    profile_form: {
      set_avatar: function (avatar) {
        // open_file_in_cropper(menu.setupCropperava, '/views/_avatars/' + avatar)
      },
      set_background: function (background) {
        // open_file_in_cropper(menu.setupCropper, '/views/_backgrounds/' + background)
      },

    },
    email: '',
    password: '',

    // swap left menu ============================
    name: null,
    drawer: false,
    group: null,
    selectedItem: 0,
    items: [{
        text: 'Редактировать профиль',
        icon: 'mdi-pen',
        link: '',
        type: 'link'
      },
      {
        text: 'QR Код',
        icon: 'mdi-qrcode',
        link: '',
        type: 'btn'
      },
      {
        text: 'Выход',
        icon: 'mdi-exit-run',
        link: '/exit',
        type: 'link'
      },
    ],
    // swap left menu ============================
    valid: true,
    emailRules: [
      v => !!v || 'введите E-mail',
      v => /.+@.+\..+/.test(v) || 'E-mail введен не верно',
    ],
    loginRules: [
      v => !!v || 'введите Логин',
    ],
    checkNoEmpty: [
      v => !!v || 'это поле не может быть пустым',
    ],
    select: null,

    checkbox: false,
    dialog: false,
    confirm: false,

    readlink: false,
    toggle: false,
    toggle_qr: false,
    toggleqrside: false,
    dialogm1: '',
    // link social==============================
    message: 'ссылка на соц сеть',
    // link social end==============================

    account_active: false,

    // =======================cropp========================

    croppermenu: null,

    objectUrlmenu: null,

    previewCroppedmenu: null,

    selectedFilemenu: null,
    // =======================cropp========================

    loader: null,
    loading: false,




    // menu add==================================================
    add_menu: false,
    edit_menu: false,
    menu_categorys: [{}],
    menu_add_item: [{
        name_cook: 'Биг тейсти',
        img_cook: '../img/burger.jpg',
        category_cook: 'основное блюдо',
        cost_cook: '400$',
        weight_cook: '250гр / 220 гр',
        description_cook: 'Домашний бургер никогда не сравнится с покупным из ближайшей фастфудной забегаловки! Что является гарантией успеха в приготовлении домашнего бургера? Во-первых, булочки, выпеченные самостоятельно (не покупные!), сочная котлета, соусы, овощи и....непременно веселая компания! Приготовить такой бургер я очень советую на природе - на решетке зажарить котлету и собрать сам бургер прямо на месте! На свежем воздухе в компании любимых друзей такой бургер станет еще вкуснее! Ну а как испечь настоящие булочки для бургера, как сделать фарш для сочнейшей котлеты и как собрать сам бургер я сейчас вас научу.',
        file_cook: '',
      },
      {
        name_cook: 'Биг тейсти 3',
        img_cook: '../img/sendwitch.jpg',
        category_cook: 'основное блюдо',
        cost_cook: '400$',
        weight_cook: '150гр / 160гр / 250гр',
        description_cook: 'Домашний бургер никогда не сравнится с покупным из ближайшей фастфудной забегаловки! Что является гарантией успеха в приготовлении домашнего бургера? Во-первых, булочки, выпеченные самостоятельно (не покупные!), сочная котлета, соусы, овощи и....непременно веселая компания! Приготовить такой бургер я очень советую на природе - на решетке зажарить котлету и собрать сам бургер прямо на месте! На свежем воздухе в компании любимых друзей такой бургер станет еще вкуснее! Ну а как испечь настоящие булочки для бургера, как сделать фарш для сочнейшей котлеты и как собрать сам бургер я сейчас вас научу.',
        file_cook: '',
      },
      {
        name_cook: 'Сендвич',
        img_cook: '../img/sendwitch.jpg',
        category_cook: 'закуски',
        cost_cook: '400$',
        weight_cook: '250гр',
        description_cook: 'Домашний бургер никогда не сравнится с покупным из ближайшей фастфудной забегаловки! Что является гарантией успеха в приготовлении домашнего бургера? Во-первых, булочки, выпеченные самостоятельно (не покупные!), сочная котлета, соусы, овощи и....непременно веселая компания! Приготовить такой бургер я очень советую на природе - на решетке зажарить котлету и собрать сам бургер прямо на месте! На свежем воздухе в компании любимых друзей такой бургер станет еще вкуснее! Ну а как испечь настоящие булочки для бургера, как сделать фарш для сочнейшей котлеты и как собрать сам бургер я сейчас вас научу.',
        file_cook: '',
      }
    ],
    description_check: false,
    category_check: false,
    weight_check: false,
    file_check: false,
    button_check: false,


    // menu add==================================================
  }),
  beforeMount() {
    this.try_load_user();
  },
  methods: {
    try_load_user() {
      if (document.location.pathname === '/') {
        $.ajax({
          type: "POST",
          url: '/api/profile',
          dataType: "JSON",
          data: {},
          success: function (result) {
            if (result.errors === false) {
              menu.user = Object.assign({}, result.user);
              menu.set_user_data()
            }

          },
          error: function (result) {
            console.log('ошибка отправки ajax запроса')
            console.log(result.responseText)
            console.log(result)
          },
        });
      }
    },
    set_user_data() {
      this.profile_form.name = this.user.name
      this.profile_form.surname = this.user.surname
      this.profile_form.phone = this.user.phone
      this.profile_form.email = this.user.email
      this.profile_form.address = this.user.address
      this.profile_form.company = this.user.company
      this.profile_form.about = this.user.about
      if (this.user.avatar !== '') {
        menu.profile_form.set_avatar(this.user.avatar)
      }
      if (this.user.background !== '') {
        menu.profile_form.set_background(this.user.background)
      }

      this.account_active = this.user.active === '0'
      if (menu.user.meta) {
        if (typeof menu.user.meta.social_links !== 'undefined') {
          for (const [social, links] of Object.entries(menu.user.meta.social_links)) {
            for (const [key1, value1] of Object.entries(menu.icon_dialog)) {
              if (value1.name_icon === social) {
                for (const [key1, link] of Object.entries(links)) {
                  menu.add_form_icon(value1.type, value1.text_icon, value1.color_icon, value1.name_icon, value1.link_social, value1.link_description, value1.icon_img_link, link, '')
                }
              }
            }
          }
        }
      }
      this.readlink = this.user.block_link_change == 1
    },

    login() {
      if (this.$refs.form.validate()) {
        $.ajax({
          type: "POST",
          url: '/api/login',
          dataType: "JSON",
          data: {
            login: this.email,
            password: this.password
          },
          success: function (result) {
            if (result.logged == 'true') {
              window.location.href = '/';
            }
          },
          error: function (result) {
            console.log(result.responseText)
            console.log('ошибка отправки ajax запроса')
          }
        });
      }
    },
    registration() {
      if (this.registration_from_data.email != '' && this.registration_from_data.password !== '') {
        data = {
          name: this.registration_from_data.name,
          surname: this.registration_from_data.surname,
          company: this.registration_from_data.company,
          email: this.registration_from_data.email,
          password: this.registration_from_data.password,
          phone: this.registration_from_data.phone,
        }
        if (typeof this.registration_from_data.avatar !== 'undefined') {
          data.avatar = this.registration_from_data.avatar
        }
        if (typeof this.registration_from_data.social_network !== 'undefined') {
          data.social_network = this.registration_from_data.social_network.join()
        }

        $.ajax({
          type: "POST",
          url: '/api/registration',
          dataType: "JSON",
          data: data,
          success: function (result) {
            if (result.errors === false) {
              menu.confirm = true
            } else {
              alert(result.errors[0])
            }
          },
          error: function (result) {
            console.log('ошибка отправки ajax запроса')
            console.log(result.responseText)
            console.log(result)
          }
        });
      }
    },
    confirm_email() {
      $.ajax({
        type: "POST",
        url: '/api/registration/confirm_email',
        dataType: "JSON",
        data: {
          email: this.registration_from_data.email,
          code: this.registration_from_data.confirm_code,
        },
        success: function (result) {
          if (result.errors === false) {
            window.location.href = '/';
          }
        },
        error: function (result) {
          console.log('ошибка отправки ajax запроса')
          console.log(result.responseText)
          console.log(result)
        }
      });
    },
    save_profile() {
      this.loading = true
      data = {
        name: this.profile_form.name,
        surname: this.profile_form.surname,
        company: this.profile_form.company,
        email: this.profile_form.email,
        password: this.profile_form.password,
        phone: this.profile_form.phone,
        address: this.profile_form.address,
        about: this.profile_form.about,

      }
      if (typeof this.profile_form.avatar !== 'undefined') {
        data.avatar = this.profile_form.avatar
      }
      if (typeof this.profile_form.background !== 'undefined') {
        data.background = this.profile_form.background
      }
      $.ajax({
        type: "POST",
        url: '/api/profile/edit',
        dataType: "JSON",
        data: data,
        success: function (result) {
          if (result.errors === false) {
            menu.user = Object.assign({}, result.user);
            menu.set_user_data()
            menu.dialog_edit = false
            menu.dialog_edit_img = false
            menu.loading = false
          }

        },
        error: function (result) {
          console.log('ошибка отправки ajax запроса')
          console.log(result.responseText)
          console.log(result)
        }
      });
    },
    save_social_links(social_links) {
      $.ajax({
        type: "POST",
        url: '/api/profile/edit',
        dataType: "JSON",
        data: {
          social_links: social_links,
        },
        success: function (result) {
          if (result.errors === false) {

          }
        },
        error: function (result) {
          console.log('ошибка отправки ajax запроса123')
          console.log(result.responseText)
          console.log(result)
        }
      });
    },
    block_link_change(value) {
      $.ajax({
        type: "POST",
        url: '/api/profile/edit',
        dataType: "JSON",
        data: {
          block_link_change: value,
        },
        success: function (result) {
          if (result.errors === false) {

          }
        },
        error: function (result) {
          console.log('ошибка отправки ajax запроса')
          console.log(result.responseText)
          console.log(result)
        }
      });
    },
    try_load_business_card() {
      if (typeof menu.business_card === 'undefined') {
        $.ajax({
          type: "POST",
          url: window.location.href,
          dataType: "JSON",
          data: {
            load_business_card: 1,
          },
          success: function (result) {
            if (result.errors === false) {
              menu.business_card = Object.assign({}, result.business_card)
              if (menu.business_card.meta) {
                if (typeof menu.business_card.meta.social_links !== 'undefined') {

                  for (const [key1, value1] of Object.entries(menu.icon_dialog)) {
                    for (const [social, links] of Object.entries(menu.business_card.meta.social_links)) {
                      if (value1.name_icon === social) {
                        for (const [key2, link] of Object.entries(links)) {
                          menu.add_form_icon(value1.type, value1.text_icon, value1.color_icon, value1.name_icon, value1.link_social, value1.link_description, value1.icon_img_link, link, '')
                          if (menu.business_card.active === '0') {
                            break;
                          }

                        }
                        if (menu.business_card.active === '0') {
                          break;
                        }
                      }
                      if (menu.business_card.active === '0') {
                        break;
                      }
                    }
                  }


                }
              }
            }


          },
          error: function (result) {
            console.log('ошибка отправки ajax запроса')
            console.log(result.responseText)
            console.log(result)
          }
        });

      }

    },

    account_active_toggle() {
      this.account_active = !this.account_active
      $.ajax({
        type: "POST",
        url: '/api/profile/edit',
        dataType: "JSON",
        data: {
          account_active: !this.account_active
        },
        success: function (result) {
          if (result.errors === false) {

          }

        },
        error: function (result) {
          console.log('ошибка отправки ajax запроса')
        }
      });
    },

    resetValidation() {
      this.$refs.form.resetValidation()
    },
    reLocate(link) {
      window.open(link);
    },
    removeMenu(index) {
      this.menu_add_item.splice(index, 1)
      this.update_social()
    },
    copyBtn() {
      var copyText = document.getElementById("copytext");
      var copyText_2 = document.getElementById("copytext_2");
      copyText.select();
      copyText_2.select();
      document.execCommand("copy");
    },
    makeCode() {
      let qrcode = new QRCode("qrcode", {
        width: 177,
        height: 177,
        colorDark: "#000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
      var elText = document.getElementById("copytext_2");

      if (!elText.value) {
        console.log("Input a text");
        elText.focus();
        return;
      }

      qrcode.makeCode(elText.value);
    },
    makeCodeSide() {
      let qrcode = new QRCode("qrcode_side", {
        width: 177,
        height: 177,
        colorDark: "#000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
      var elText = document.getElementById("copytext_2");

      if (!elText.value) {
        console.log("Input a text");
        elText.focus();
        return;
      }

      qrcode.makeCode(elText.value);
    },

    // menu add array=================================================
    add_menu_array(id = '') {
      this.menu_add_item.push({
        name_cook: this.name_cook,
        img_cook: this.objectUrlmenu,
        category_cook: this.category_cook,
        weight_cook: this.weight_cook,
        cost_cook: this.cost_cook,
        description_cook: this.description_cook,
        file_cook: this.file_cook,
        id: id,

      })
      this.menu_categorys.push({
        category_cook: this.category_cook,
      })
    }, 
    // add_menu_categorys_array(){
    //   if (this.category_cook === this.menu_categorys[0].category_cook){
    //     console.log(this.menu_categorys)
        
        
        
    //   } else {
    //     this.menu_categorys.push({
    //       category_cook: this.category_cook,
    //     })
    //   }
      
    //   console.log(this.menu_categorys[1].category_cook)
    // },
    // menu add array=================================================
    // =======================cropp========================

    changes({
      coordinates,
      canvas
    }) {
      // this.registration_from_data.avatar = canvas.toDataURL();
      this.coordinates = coordinates;
      console.log(coordinates, canvas)
    },


    setupCropperMenu(selectedFilemenu) {
      if (this.croppermenu) {
        this.croppermenu.destroy()
      }
      if (this.objectUrlmenu) {
        window.URL.revokeObjectURL(this.objectUrlmenu)
      }
      if (!selectedFilemenu) {
        this.croppermenu = null
        this.objectUrlmenu = null
        this.previewCroppedmenu = null
        return
      }
      this.objectUrlmenu = window.URL.createObjectURL(selectedFilemenu)
      this.$nextTick(this.setupCropperInstancemenu)
    },
    // =======================cropp========================
  },

  watch: {
    group() {
      this.drawer = false
    },
    loading(value) {
      console.log("loading", value);
    }
  },

})