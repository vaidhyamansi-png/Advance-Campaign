<template>
  <div>
    <VCard title="">
      <VCardText>
        <div class="campaign-page">
          <!-- Top Filter Section -->
          <div class="top-bar">
            <VSelect label="All" :items="['All','Active','Paused']" variant="outlined" class="filter" density="compact" />
            <div class="search-wrapper">
              <VTextField v-model="search" placeholder="Search" variant="solo" density="compact" hide-details class="search-field">
                <!-- Custom Image Icon -->
                <template #prepend-inner>
                  <img :src="searchIcon" class="search-icon" />
                </template>
              </VTextField>
            </div>
          </div>
          <!-- Empty State -->
          <div class="empty-state">
            <img max-width="613" :src="imgFound" class="mb-6" />
            <VBtn
        color="primary"
        class="mt-4 theme_btn theme_primary"
        @click="openDialog"
      >
        New Campaign
      </VBtn>

          </div>
        </div>
      </VCardText>
    </VCard>
  </div>
   <!-- Modal -->
    <VDialog v-model="dialog" max-width="700">
      <VCard class="workflow-modal  new_campaign_modal_wrap ">

        <!-- Header -->
        <div class="modal-header">
          <div>
            <h3>Select Workflow Mode</h3>
            <p>Choose how you want your campaign to behave</p>
          </div>
          <VBtn icon variant="text" @click="dialog=false">
             <img :src="crossIcon" class="" />
          </VBtn>
        </div>

        <!-- Options -->
        <div class="workflow-options">

          <!-- Advanced -->
          <div
            class="workflow-card"
            :class="{active:selected==='advanced'}"
            @click="selected='advanced'"
          >
            <div class="radio"></div>

            <div class="content">
              <div class="title-row">
                <h4>Advanced Workflow</h4>
                <span class="badge">Recommended</span>
              </div>

              <p>Best for high-volume outreach</p>

              <div class="points">
                <span><span class="bg_gray_circle"></span> Conditional logic</span>
                <span><span class="bg_gray_circle"></span> Multiple paths</span>
                <span><span class="bg_gray_circle"></span> More control</span>
              </div>
            </div>

            <!-- <img src="@/assets/workflow1.png" class="icon"/> -->
             <img :src="radioImgone"  />
       
          </div>


          <!-- Standard -->
          <div
            class="workflow-card"
            :class="{active:selected==='standard'}"
            @click="selected='standard'"
          >
            <div class="radio"></div>

            <div class="content">
              <h4>Standard Workflow</h4>
              <p>Best for beginners</p>

              <div class="points">
                <span><span class="bg_gray_circle"></span>  Linear steps</span>
                <span><span class="bg_gray_circle"></span>  No conditions</span>
                <span><span class="bg_gray_circle"></span>  Easy Setup</span>
              </div>
            </div>

            <!-- <img src="@/assets/workflow2.png" class="icon"/> -->
              <img :src="radioImgtwo"  />
          </div>

        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <VBtn variant="outlined" @click="dialog=false">Close</VBtn>
          <VBtn color="primary" to="/advance-campaign">Next</VBtn>
        </div>

      </VCard>
    </VDialog>

</template>
<script setup>
  import crossIcon from '@images/thumbnails/cross_icon.png';
import imgFound from '@images/thumbnails/no_found_img.png';
import radioImgone from '@images/thumbnails/radio_big_img.png';
import radioImgtwo from '@images/thumbnails/ragio_big_img_2.png';
import searchIcon from '@images/thumbnails/search_icon.png';
import {
  ref
} from 'vue';
  const search = ref('')

  
const dialog = ref(false)
const selected = ref("advanced")

// const imgFound = "/images/empty-state.png"

const openDialog = () => {
  dialog.value = true
}
</script>
