<template>
  <VCard title="">
    <VCardText>
      <div class="page-wrapper advance_campaign_wrapper">
        <!-- ── Top Header Stepper ── -->
        <div class="stepper-bar">
          <div class="step active">
            <span class="step-icon">
              <img :src="checkList" class="search-icon" />
            </span>
            <span class="step-label">Define Target Audience</span>
          </div>
          <span class="step-arrow">
            <img :src="rightArrow" class="" />
          </span>
          <div class="step inactive">
            <span class="step-icon bg_light">
              <img :src="contactSm" class="" />
            </span>
            <span class="step-label">Sender Profiles</span>
          </div>
        </div>
        <!-- ── Page Body ── -->
        <div class="page-body">
          <!-- TIMELINE WRAPPER -->
          <div class="timeline-wrapper">
            <!-- The single continuous vertical line -->
            <div class="timeline-line"></div>
            <!-- ── Timeline Step 1 ── -->
            <div class="timeline-row">
              <div class="timeline-node">
                <!-- Green tick when method selected, else plain grey circle -->
                <div :class="selectedMethod ? 'tl-circle completed' : 'tl-circle default'">
                  <svg v-if="selectedMethod" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>
              <div class="timeline-content">
                <div class="section-card">
                  <!-- Header -->
                  <div class="section-header" @click="toggleSection">
                    <span class="section-title">Choose Import Method</span>
                    <button class="collapse-btn" :class="{ rotated: !sectionOpen }">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="18 15 12 9 6 15" />
                      </svg>
                    </button>
                  </div>
                  <!-- Method Cards -->
                  <transition name="slide-down">
                    <div v-if="sectionOpen" class="cards-grid">
                      <div v-for="method in importMethods" :key="method.id" class="method-card" :class="{ selected: selectedMethod === method.id }" @click="selectMethod(method.id)">
                        <!-- Blue checkbox tick on top-right when selected -->
                        <div v-if="selectedMethod === method.id" class="card-check-badge">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <div class="card-icon">
                          <component :is="method.icon" />
                        </div>
                        <div class="card-title">{{ method.title }}</div>
                        <div class="card-desc">
                          {{ method.desc }}
                          <a v-if="method.link" href="#" class="card-link" @click.stop>{{ method.link }}</a>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
            <!-- end timeline row 1 -->
            <!-- ── Timeline Step 2 — LinkedIn URL Section ── -->
            <transition name="slide-down">
              <div v-if="selectedMethod === 'linkedin'" class="timeline-row">
                <div class="timeline-node">
                  <div class="tl-circle pending"></div>
                </div>
                <div class="timeline-content">
                  <div class="section-card linkedin-url-card">
                    <!-- Section Title — Clickable Header -->
                    <div class="section-header" @click="isLinkedinExpanded = !isLinkedinExpanded" style="cursor: pointer;">
                      <span class="section-title">Paste LinkedIn Search URL</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :style="{ transform: isLinkedinExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                    <!-- Collapsible Body -->
                    <transition name="collapse">
                      <div class="linkedin-url-body" v-if="isLinkedinExpanded">
                        <!-- Top description line -->
                        <div class="linkedin-desc-row">
                          <span class="linkedin-icon-sm">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" stroke-width="2">
                              <rect x="2" y="2" width="20" height="20" rx="3" />
                              <path d="M7 10v7" />
                              <path d="M7 7v.01" />
                              <path d="M11 17v-4a2 2 0 0 1 4 0v4" />
                              <path d="M11 10v7" />
                            </svg>
                          </span>
                          <span class="linkedin-find-text"> Find your target audience with <a href="#" class="li-link" @click.prevent>LinkedIn Search</a> or <a href="#" class="li-link" @click.prevent>Sales Navigator</a> or <a href="#" class="li-link" @click.prevent>Post URL</a> or <a href="#" class="li-link" @click.prevent>Group URL</a>
                          </span>
                          <a href="#" class="search-guide-link" @click.prevent>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <circle cx="11" cy="11" r="8" />
                              <path d="M21 21l-4.35-4.35" />
                            </svg> Search Guide </a>
                        </div>
                        <!-- Input + Button Row -->
                        <div class="url-input-row">
                          <input v-model="linkedinUrl" type="text" class="url-input" placeholder="https://www.linkedin.com/search/results/people/?keywords=" />
                          <button class="validate-btn" @click="validateUrl">Validate</button>
                        </div>
                        <!-- Helper text -->
                        <div class="url-helper-text">
                          <span class="dot-blue">•</span> Paste the search URL directly from LinkedIn
                        </div>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>
            </transition>
            <!-- ── Timeline Step 3 — CSV Upload Section ── -->
            <transition name="slide-down">
              <div v-if="selectedMethod === 'csv'" class="timeline-row">
                <div class="timeline-node">
                  <div class="tl-circle pending"></div>
                </div>
                <div class="timeline-content">
                  <div class="csv_main_section">
                    <div class="section-card csv-upload-card ">
                      <!-- Section Header -->
                      <div class="section-header" @click="isCsvExpanded = !isCsvExpanded" style="cursor: pointer;">
                        <div class="csv-header-left">
                          <span class="section-title">Upload CSV File</span>
                          <span class="csv-step-badge">Step 1 of 2</span>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :style="{ transform: isCsvExpanded ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s ease' }">
                          <path d="M18 15l-6-6-6 6" />
                        </svg>
                      </div>
                      <!-- Collapsible Body -->
                      <transition name="collapse">
                        <div class="csv-upload-body" v-if="isCsvExpanded">
                          <!-- Drag & Drop Zone -->
                          <div class="csv-dropzone" :class="{ 'dragging': isDragging }" @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false" @drop.prevent="handleDrop" @click="triggerFileInput">
                            <input ref="fileInputRef" type="file" accept=".csv" style="display: none" @change="handleFileChange" />
                            <div class="dropzone-inner">
                              <div class="upload-icon-wrap">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4C6FFF" stroke-width="1.8">
                                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                  <polyline points="17 8 12 3 7 8" />
                                  <line x1="12" y1="3" x2="12" y2="15" />
                                </svg>
                              </div>
                              <p class="dropzone-main-text"> Drag a File or click a browse </p>
                              <p class="dropzone-sub-text">File with up to 100 rows works best</p>
                            </div>
                          </div>
                          <!-- Download sample -->
                          <div class="csv-download-row">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4C6FFF" stroke-width="2">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            <a href="#" class="csv-sample-link" @click.prevent>Download a sample file</a>
                          </div>
                          <div class="map_properties_outer_wrap">
                            <div class="map-container">
                              <div class="card">
                                <!-- Header -->
                                <div class="card-header">
                                  <div>
                                    <h3>Map Properties</h3>
                                    <p>✔ Make sure file includes contact name and phone number</p>
                                  </div>
                                  <button class="delete-btn">
                                    <img :src="deleteIcon" class="" />
                                  </button>
                                </div>
                                <div class="card-body">
                                  <!-- Left Section -->
                                  <div class="left">
                                    <div class="table-header">
                                      <span>Contact Field</span>
                                      <span>CSV Column</span>
                                    </div>
                                    <div class="fullname_list_wrap">
                                      <div class="row" v-for="(item, index) in fields" :key="index">
                                        <div class="field">
                                          <span class="icon">
                                            <img :src="profileIcon" class="search-icon" />
                                          </span>
                                          {{ item.label }}
                                        </div>
                                        <div class="field right-field">
                                          <span class="icon">
                                            <img :src="user" class="search-icon" />
                                          </span>
                                          {{ item.value }}
                                          <span class="count">({{ item.count }})</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <!-- Right Section -->
                                  <!-- <div class="right"><div class="unmapped-header"><span>Unmapped Works</span></div><input type="text" placeholder="Search" class="search" /><div class="unmapped-list"><div
                        class="unmapped-item"
                        v-for="(item, index) in unmapped"
                        :key="index"
                      ><span class="icon">☰</span>
                        {{ item.name }}
                        <span class="count">({{ item.count }})</span></div></div><p class="clear">Clear All Matched</p></div> -->
                                  <div class="left right">
                                    <div class="table-header">
                                      <span>Unmapped Works</span>
                                    </div>
                                    <div class="fullname_list_wrap">
                                      <div class="search-box">
                                        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2">
                                          <circle cx="11" cy="11" r="8" />
                                          <path d="M21 21l-4.3-4.3" />
                                        </svg>
                                        <input type="text" placeholder="Search" class="search-input" v-model="search" />
                                      </div>
                                      <div class="row" v-for="(item, index) in fieldsUnmaped" :key="index">
                                        <div class="field right-field">
                                          <span class="icon">
                                            <img :src="userOne" class="search-icon" />
                                          </span>
                                          {{ item.value }}
                                          <span class="count">({{ item.count }})</span>
                                        </div>
                                      </div>
                                      <a href="#" class="site_link"> Clear All Matched </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </transition>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
            <!-- end timeline row 2 -->
            <!-- ── Timeline Step 4 — CSV Upload Section ── -->
            <transition name="slide-down">
              <div v-if="selectedMethod === 'leads'" class="timeline-row">
                <div class="timeline-node">
                  <div class="tl-circle pending"></div>
                </div>
                <div class="lookalikes-wrapper lookalikes_wrapper">
                  <!-- Header -->
                  <div class="header">
                    <div>
                      <h2 class="title">Lookalikes</h2>
                      <p class="subtitle"> Select a lookalike list for this campaign </p>
                    </div>
                    <button class="close-btn">
                      <img :src="cancelCircle" class="search-icon" />
                    </button>
                  </div>
                  <!-- Empty State -->
                  <div class="empty-state">
                    <h3 class="empty-title">You don’t have any leads</h3>
                    <p class="empty-subtitle"> Create a lead list to start running campaigns </p>
                    <div class="common_btn_wrap">
                      <VBtn color="primary" @click="dialog = true">Create a List</VBtn>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <!-- Footer Button -->
      <div class="common_btn_wrap">
        <VBtn color="primary" to="/campaign-table">Next</VBtn>
      </div>
    </VCardText>
  </VCard>
  <VDialog v-model="dialog" max-width="560" :scrim-opacity="0.3" class="lookalikes_modal_outer_wrap">
    <VCard class="lookalikes-card" elevation="4">
      <button class="close-btn" @click="dialog = false">
        <img :src="cancelCircle" class="search-icon" />
      </button>
      <!-- Header -->
      <div class="modal-header">
        <h2 class="modal-title">Lookalikes</h2>
        <p class="modal-subtitle">Select a lookalike list for this campaign</p>
      </div>
      <!-- List Items -->
      <div class="modal-body">
        <!-- Founder Row (checked / selected solid border) -->
        <div class="list-row list-row--checked" @click="selectedId = 1">
          <div class="row-left">
            <span class="row-icon">
              <img :src="userOne" class="search-icon" />
            </span>
            <span class="row-name">Founder</span>
            <span class="row-count">(1000+ Users in the List)</span>
          </div>
          <div class="row-right">
            <span class="checkbox checked">
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5L4.5 8.5L11 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </div>
        </div>
        <!-- Tech Profiles Row (dashed teal border, no checkbox) -->
        <div class="list-row list-row--dashed" @click="selectedId = 2">
          <div class="row-left">
            <span class="row-icon">
              <img :src="userOne" class="search-icon" />
            </span>
            <span class="row-name">Tech Profiles</span>
            <span class="row-count">(1000+ Users in the List)</span>
          </div>
        </div>
        <!-- Add New -->
        <div class="add-new-row">
          <span class="add-new-link">Add New</span>
        </div>
        <!-- Empty whitespace matching screenshot -->
        <div class="empty-space"></div>
      </div>
      <!-- Footer -->
      <div class="modal-footer">
        <button class="btn-cancel primary_outline" @click="dialog = false">Cancel</button>
        <div class="common_btn_wrap">
          <VBtn color="primary" to="/advance-campaign">Select List</VBtn>
        </div>
      </div>
    </VCard>
  </VDialog>
</template>
<script>
  import cancelCircle from '@images/thumbnails/cancel-circle.png';
import checkList from '@images/thumbnails/check-list.png';
import contactSm from '@images/thumbnails/contact_sm_icon.png';
import deleteIcon from '@images/thumbnails/delete_icon.png';
import userOne from '@images/thumbnails/left-to-right-list-bullet.png';
import profileIcon from '@images/thumbnails/profile.png';
import rightArrow from '@images/thumbnails/right_icon.png';
import user from '@images/thumbnails/user-circle.png';
import {
  defineComponent,
  h,
  ref
} from 'vue';
  /* ---------------- ICONS ---------------- */
  const LinkedInIcon = defineComponent({
    render() {
      return h('svg', {
        width: 22,
        height: 22,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2'
      }, [
        h('rect', {
          x: 2,
          y: 2,
          width: 20,
          height: 20,
          rx: 3
        }),
        h('path', {
          d: 'M7 10v7'
        }),
        h('path', {
          d: 'M7 7v.01'
        }),
        h('path', {
          d: 'M11 17v-4a2 2 0 0 1 4 0v4'
        }),
        h('path', {
          d: 'M11 10v7'
        }),
      ])
    },
  })
  const UploadCSVIcon = defineComponent({
    render() {
      return h('svg', {
        width: 22,
        height: 22,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2'
      }, [
        h('rect', {
          x: 3,
          y: 4,
          width: 18,
          height: 18,
          rx: 2
        }),
        h('line', {
          x1: 16,
          y1: 2,
          x2: 16,
          y2: 6
        }),
        h('line', {
          x1: 8,
          y1: 2,
          x2: 8,
          y2: 6
        }),
        h('line', {
          x1: 3,
          y1: 10,
          x2: 21,
          y2: 10
        }),
      ])
    },
  })
  const LeadListsIcon = defineComponent({
    render() {
      return h('svg', {
        width: 22,
        height: 22,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2'
      }, [
        h('path', {
          d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'
        }),
        h('circle', {
          cx: 9,
          cy: 7,
          r: 4
        }),
        h('line', {
          x1: 19,
          y1: 8,
          x2: 23,
          y2: 8
        }),
        h('line', {
          x1: 21,
          y1: 6,
          x2: 21,
          y2: 10
        }),
      ])
    },
  })
  const WebhookIcon = defineComponent({
    render() {
      return h('svg', {
        width: 22,
        height: 22,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2'
      }, [
        h('path', {
          d: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z'
        }),
        h('circle', {
          cx: 12,
          cy: 12,
          r: 3
        }),
      ])
    },
  })
  /* ---------------- MAIN COMPONENT ---------------- */
  export default defineComponent({
    name: 'DefineTargetAudience',
    setup() {
      /* ---------- STATE ---------- */
      const sectionOpen = ref(true)
      const selectedMethod = ref(null)
      const linkedinUrl = ref('')
      const isLinkedinExpanded = ref(false)
      const dialog = ref(false)
      // CSV
      const isCsvExpanded = ref(true)
      //Lookalikes
      const isLookalikes = ref(true)
      const isDragging = ref(false)
      const fileInputRef = ref(null)
      const uploadedFile = ref(null)
      /* ---------- DATA ---------- */
      const importMethods = [{
        id: 'linkedin',
        title: 'LinkedIn Search',
        desc: '(Basic, Sales Nav, Post, Group or Event URL)',
        icon: LinkedInIcon,
      }, {
        id: 'csv',
        title: 'Upload CSV File',
        desc: 'Upload LinkedIn profiles via CSV.',
        link: 'Download Sample',
        icon: UploadCSVIcon,
      }, {
        id: 'leads',
        title: 'Lead Lists',
        desc: 'Use Lead Finder to find audience.',
        icon: LeadListsIcon,
      }, {
        id: 'webhook',
        title: 'Inbound Webhook',
        desc: 'Sync leads from zapier, n8n make in real time',
        icon: WebhookIcon,
      }, ]
      const fields = ref([{
        label: "Full name",
        value: "Full name",
        count: 35
      }, {
        label: "First name",
        value: "First name",
        count: 3
      }, {
        label: "Last name",
        value: "Last name",
        count: 12
      }, {
        label: "Company Name",
        value: "Company Name",
        count: 36
      }, {
        label: "Position",
        value: "Position",
        count: 25
      }, {
        label: "Headline",
        value: "Headline",
        count: 25
      }])
      const fieldsUnmaped = ref([{
        label: "Location",
        value: "Location (9)",
        count: 35
      }, {
        label: "Industry",
        value: "Industry (3)",
        count: 3
      }, {
        label: "Notes",
        value: "Notes (9)",
        count: 12
      }, ])
      const unmapped = ref([{
        name: "Location",
        count: 3
      }, {
        name: "Industry",
        count: 3
      }, {
        name: "Notes",
        count: 9
      }])
      /* ---------- METHODS ---------- */
      const toggleSection = () => {
        sectionOpen.value = !sectionOpen.value
      }
      const selectMethod = (id) => {
        selectedMethod.value = selectedMethod.value === id ? null : id
        isLinkedinExpanded.value = false
      }
      const toggleLinkedinExpand = () => {
        isLinkedinExpanded.value = !isLinkedinExpanded.value
      }
      const triggerFileInput = () => {
        fileInputRef.value?.click()
      }
      const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
          uploadedFile.value = file
        }
      }
      const handleDrop = (e) => {
        isDragging.value = false
        const file = e.dataTransfer.files[0]
        if (file) {
          uploadedFile.value = file
        }
      }
      const validateUrl = () => {
        if (!linkedinUrl.value.trim()) {
          alert('Please paste a LinkedIn URL first.')
          return
        }
        alert(`Validating: ${linkedinUrl.value}`)
      }
      const goNext = () => {
        alert('Next step: Sender Profiles')
      }
      /* ---------- RETURN ---------- */
      return {
        sectionOpen,
        selectedMethod,
        linkedinUrl,
        isLinkedinExpanded,
        isCsvExpanded,
        isLookalikes,
        isDragging,
        fileInputRef,
        uploadedFile,
        importMethods,
        fields,
        fieldsUnmaped,
        unmapped,
        toggleSection,
        selectMethod,
        toggleLinkedinExpand,
        triggerFileInput,
        handleFileChange,
        handleDrop,
        validateUrl,
        goNext,
        checkList,
        rightArrow,
        deleteIcon,
        contactSm,
        profileIcon,
        user,
        userOne,
        cancelCircle,
        dialog,
      }
    },
  })
  const selectedId = ref(1) // Default: Founder selected
  const lookalikeLists = ref([{
    id: 1,
    name: 'Founder',
    count: '1000+'
  }, {
    id: 2,
    name: 'Tech Profiles',
    count: '1000+'
  }, ])

  function selectItem(id) {
    selectedId.value = id
  }

  function addNew() {
    // Handle Add New logic
    console.log('Add New clicked')
  }

  function selectList() {
    const selected = lookalikeLists.value.find(i => i.id === selectedId.value)
    console.log('Selected:', selected)
    dialog.value = false
  }
</script>
