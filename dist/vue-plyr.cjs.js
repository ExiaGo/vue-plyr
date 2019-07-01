'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Plyr = _interopDefault(require('plyr'));

//
var script = {
  name: 'vue-plyr',
  props: {
    /** Options object for plyr config. **/
    options: {
      type: Object,
      required: false,

      default() {
        return {};
      }

    },

    /** Array of events to emit from the plyr object **/
    emit: {
      type: Array,
      required: false,

      default() {
        return [];
      }

    }
  },

  data() {
    return {
      player: {}
    };
  },

  mounted() {
    this.player = new Plyr(this.$el.firstChild, this.opts);
    this.$emit('player', this.player);
    this.emit.forEach(element => {
      this.player.on(element, this.emitPlayerEvent);
    });
  },

  beforeDestroy() {
    try {
      this.player.destroy();
    } catch (e) {
      if (!(this.opts.hideYouTubeDOMError && e.message === 'The YouTube player is not attached to the DOM.')) {
        console.error(e);
      }
    }
  },

  methods: {
    emitPlayerEvent(event) {
      this.$emit(event.type, event);
    }

  },
  computed: {
    opts() {
      const options = this.options;

      if (!this.options.hasOwnProperty('hideYouTubeDOMError')) {
        options.hideYouTubeDOMError = true;
      }

      return options;
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
const __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("default")],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var VuePlyr = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

const Components = {
  VuePlyr
};
const VuePlyrPlugin = {
  install(Vue, options) {
    Object.keys(Components).forEach(component => {
      Vue.component(Components[component].name, Components[component]);
    });
  }

}; // Credit to https://github.com/irazasyed for this auto Vue.use() when
// installing from unpkg or similar.

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VuePlyrPlugin);
}

exports.VuePlyr = VuePlyr;
exports.VuePlyrPlugin = VuePlyrPlugin;
exports.default = VuePlyrPlugin;
