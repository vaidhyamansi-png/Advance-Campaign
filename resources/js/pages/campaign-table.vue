<template>
  <VCard title="">
    <VCardText>
      <div class="page-wrapper advance_campaign_wrapper campaign_table_wrap">
        <!-- ── Top Header Stepper ── -->
        <div class="stepper-bar">
          <div class="step active">
            <span class="step-icon">
              <img :src="checkListDark" class="search-icon" />
            </span>
            <span class="step-label">Define Target Audience</span>
          </div>
          <span class="step-arrow">
            <img :src="rightArrow" class="" />
          </span>
          <div class="step inactive">
            <span class="step-icon bg_blue">
              <img :src="smPerson" class="" />
            </span>
            <span class="step-label">Sender Profiles</span>
          </div>
        </div>
        <!-- ── Page Body ── -->
        <div class="advance-campaign-container">
          <!-- Tabs -->
          <div class="advance-campaign-tabs">
            <button class="advance-campaign-tab" :class="{ active: activeTab === 'linkedin' }" @click="activeTab = 'linkedin'"> LinkedIn Profile </button>
            <button class="advance-campaign-tab" :class="{ active: activeTab === 'email' }" @click="activeTab = 'email'"> Email Accounts </button>
          </div>
          <!-- LinkedIn Tab -->
          <div v-if="activeTab === 'linkedin'" class="advance-campaign-card">
            <!-- Header -->
            <div class="advance-campaign-header">
              <div class="advance-campaign-header-left">
                <h3>
                  <img :src="linkedinIcon" class="linked-icon" /> LinkedIn Profile
                </h3>
                <p>Pick which LinkedIn profiles you want to use for this campaign.</p>
              </div>
              <button class="advance-campaign-btn">+ Add Account</button>
            </div>
            <!-- Controls -->
            <div class="advance-campaign-controls">
              <div class="advance-campaign-show">
                <h5>Show</h5>
                <select class="advance-campaign-select">
                  <option>10</option>
                  <option>20</option>
                </select>
              </div>
              <div class="input_search_icon_wrap">
                <input type="text" placeholder="Search" class="advance-campaign-search" />
                <span class="search_icon_outer">
                  <img :src="searchIcon" class="search-icon" />
                </span>
              </div>
            </div>
            <!-- Table -->
            <div class="advance-campaign-table table-responsive">
              <table>
                <thead>
                  <tr>
                    <th class="max-width-20">
                      <label class="custom-checkbox">
                        <input type="checkbox" />
                        <span class="checkmark"></span>
                      </label>
                    </th>
                    <th> Name </th>
                    <th>Health</th>
                    <th>Daily Limits</th>
                    <th>Account Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <label class="custom-checkbox">
                        <input type="checkbox" />
                        <span class="checkmark"></span>
                      </label>
                    </td>
                    <td>
                      <div class="advance-campaign-user">
                        <img :src="womanImg" class="search-icon" />
                        <div>
                          <h4>Edgar Jones</h4>
                          <p>1,250 connections</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="score-widget">
                        <!-- SVG Ring -->
                        <svg class="score-ring" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stop-color="#FF9F43" />
                              <stop offset="100%" stop-color="#FF9F43" />
                            </linearGradient>
                          </defs>
                          <!-- Background ring -->
                          <circle class="ring-bg" cx="40" cy="40" r="33" />
                          <!-- Progress ring -->
                          <circle class="ring-progress" cx="40" cy="40" r="33" />
                        </svg>
                        <!-- Number -->
                        <span class="score-number">72</span>
                      </div>
                    </td>
                    <td>
                      <span class="advance-campaign-badge"> Invites: 40 / day </span>
                    </td>
                    <td>
                      <div class="advance-campaign-account-type">
                        <img :src="linkedinIconYellow" class="" /> Premium
                      </div>
                    </td>
                    <td>
                      <span class="advance-campaign-status">Connected</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Email Tab -->
          <div v-if="activeTab === 'email'" class="advance-campaign-empty">
            <p>Email Accounts</p>
          </div>
        </div>
      </div>
      <!-- Footer Button -->
      <div class="common_btn_wrap pre_btn_wrap">
        <router-link to="/advance-campaign" class="previous_btn">
          <img :src="arrowTurn" class="search-icon" /> Previous
        </router-link>
        <VBtn color="primary" to="/campaign-table">Submit</VBtn>
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
  import arrowTurn from '@images/thumbnails/arrow-turn-backward.png';
import cancelCircle from '@images/thumbnails/cancel-circle.png';
import checkListDark from '@images/thumbnails/check-list-dark.png';
import checkList from '@images/thumbnails/check-list.png';
import contactSm from '@images/thumbnails/contact_sm_icon.png';
import deleteIcon from '@images/thumbnails/delete_icon.png';
import userOne from '@images/thumbnails/left-to-right-list-bullet.png';
import linkedinIconYellow from '@images/thumbnails/linkdin_yellow.png';
import linkedinIcon from '@images/thumbnails/linkedin-icon.png';
import profileIcon from '@images/thumbnails/profile.png';
import rightArrow from '@images/thumbnails/right_icon.png';
import searchIcon from '@images/thumbnails/search_icon.png';
import smPerson from '@images/thumbnails/small_person.png';
import user from '@images/thumbnails/user-circle.png';
import womanImg from '@images/thumbnails/woman_img.png';
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
      const activeTab = ref('linkedin')
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
        checkListDark,
        smPerson,
        linkedinIcon,
        searchIcon,
        womanImg,
        arrowTurn,
        linkedinIconYellow,
        activeTab
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
