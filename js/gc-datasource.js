/*
 Vue.js Geocledian datasource component
 created: 2021-09-19, jsommer
 updated: 2021-09-19, jsommer
 version: 0.1
*/
"use strict";

//language strings
const gcDatasourceLocales = {
  "en": {
    "options": { "title": "Data source" },
    "datasource": { 
      "sentinel2": "Sentinel 2",
      "landsat8": "Landsat 8",
      "all": "All",
    },
  },
  "de": {
    "options": { "title": "Datenquelle" },
    "datasource": { 
      "sentinel2": "Sentinel 2",
      "landsat8": "Landsat 8",
      "all": "Alle",
    },
  },
}

Vue.component('gc-datasource', {
  props: {
    gcWidgetId: {
      type: String,
      default: 'datasource1',
      required: true
    },
    gcLayout: {
      type: String,
      default: 'vertical' // or horizontal
    },
    gcAvailableOptions: {
      type: String,
      default: 'widgetTitle'
    },
    gcWidgetCollapsed: {
      type: Boolean,
      default: false // or false
    },
    gcLanguage: {
      type: String,
      default: 'en' // 'en' | 'de'
    }
  },
  template: `<div :id="this.gcWidgetId" class="">

                <!-- img src="img/icons8-satellite-filled-100.png" width="22px" height="22px" -->
                <p :class="['gc-options-title', 'is-size-6', gcWidgetCollapsed ? 'is-grey' : 'is-orange']" 
                  style="cursor: pointer; margin-bottom: 0.5em;"    
                  v-on:click="toggleDatasource" 
                  v-show="availableOptions.includes('widgetTitle')">
                    <!--i class="fas fa-th fa-sm"></i --> {{ $t('options.title')}}
                  <i :class="[!gcWidgetCollapsed ? '': 'is-active', 'fas', 'fa-angle-down', 'fa-sm']"></i>
                </p>

                <!-- data source container -->
                <div :class="[!gcWidgetCollapsed ? '': 'is-hidden', layoutCSSMap['alignment'][gcLayout]]" style="width: 100%; margin-bottom: 1em;">
                  <div style="margin-top: 10px;">
                    <input id="rdLandsat" type="radio" class="is-small is-checkradio is-orange" name="source" value="landsat8" 
                            v-model="datasource">
                    <label for="rdLandsat" class="is-orange is-small" style="white-space: nowrap;">{{ $t('datasource.landsat8')}}</label>
                    <input id="rdSentinel" type="radio" class="is-small is-checkradio is-orange" name="source" value="sentinel2" 
                            v-model="datasource">
                    <label for="rdSentinel" class="is-orange is-small" style="white-space: nowrap;">{{ $t('datasource.sentinel2')}}</label>
                    <input id="rdAll" type="radio" class="is-small is-checkradio is-orange" name="source" value="" 
                            v-model="datasource">
                    <label for="rdAll" class="is-orange is-small" style="white-space: nowrap;">{{ $t('datasource.all')}}</label>
                  </div>
                </div>

            </div><!-- gcWidgetId -->`,
  data: function () {
    console.debug("parceldata! - data()");
    return {
        datasource: "",
        layoutCSSMap: { "alignment": {"vertical": "is-inline-block", "horizontal": "is-flex" }}
    }
  },
  i18n: { 
    locale: this.currentLanguage,
    messages: gcDatasourceLocales
  },
  created: function () {
    console.debug("datasource! - created()");
    this.changeLanguage();
  },
  /* when vue component is mounted (ready) on DOM node */
  mounted: function () {
    console.debug("datasource! - mounted()");
    
    try {
      this.changeLanguage();
    } catch (ex) {}

  },
  computed: {
    availableOptions: {
      get: function() {
        return (this.gcAvailableOptions.split(","));
      }
    },
    currentLanguage: {
      get: function() {
        // will always reflect prop's value 
        return this.gcLanguage;
      },
    },
  },
  watch: {
    currentLanguage(newValue, oldValue) {
      this.changeLanguage();
    },
    datasource(newValue, oldValue) { 
      this.$root.$emit('dataSourceChange', newValue);
    }
  },
  methods: {  
    toggleDatasource() {
      this.gcWidgetCollapsed = !this.gcWidgetCollapsed;
    },
    changeLanguage() {
      this.$i18n.locale = this.currentLanguage;
    },
  }
});
