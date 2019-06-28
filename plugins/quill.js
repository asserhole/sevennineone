// import Vue from 'vue'
// //import VueQuillEditor from 'vue-quill-editor'
// //Vue.use(VueQuillEditor)
//
// if (process.browser) {
//     const VueQuillEditor = require('vue-quill-editor/ssr')
//     Vue.use(VueQuillEditor)
// }
import Vue from 'vue'

import VueQuillEditor from 'vue-quill-editor/dist/ssr'
import {ImageExtend, QuillWatch} from 'quill-image-extend-module'
import Quill from 'quill'

Quill.register('modules/ImageExtend', ImageExtend);
window.QuillWatch = QuillWatch
Vue.use(VueQuillEditor)