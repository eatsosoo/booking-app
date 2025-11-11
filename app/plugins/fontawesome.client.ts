import { library, config } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

// Solid icons
import { faPhone, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons"

// Brand icons
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
  faYoutube,
  faTiktok
} from "@fortawesome/free-brands-svg-icons"

config.autoAddCss = false

// Add all icons you use here
library.add(faFacebookF, faInstagram, faXTwitter, faYoutube, faTiktok, faPhone, faEnvelope, faLocationDot)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("FontAwesomeIcon", FontAwesomeIcon)
})
