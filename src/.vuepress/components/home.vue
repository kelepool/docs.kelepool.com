<script setup>
import HomeContent from '@theme/HomeContent.vue'
import HomeFooter from '@theme/HomeFooter.vue'
import Navbar from '@theme/Navbar.vue'

</script>

<template>
  <main class="home">
    <Navbar />
    <div>
        <div class="main-items"><img src="/images/logo-large.png" class="main-logo" alt="Kele Pool"> </div>
        <div class="social-items">
          <div><a href="https://t.me/kelepoolcom" target="_blank"><img src="/images/telegram.png" class="social-logo" alt="telegram"> </a></div>
          <div><a href="https://medium.com/@kelepool" target="_blank"><img src="/images/medium.png" class="social-logo" alt="medium"> </a></div>
          <div><a href="https://twitter.com/PoolCola" target="_blank"><img src="/images/twitter.png" class="social-logo" alt="twitter"> </a></div>
          <div><a href="https://www.youtube.com/channel/UC41u9bo8U8UYNO_rJ6pb8GQ" target="_blank"><img src="/images/youtube.png" class="social-logo" alt="youtube"> </a></div>
          <div><a href="https://www.facebook.com/KelePool/" target="_blank"><img src="/images/facebook.png" class="social-logo" alt="facebook"> </a></div>
        </div>
        <div class="line"></div>
        <!-- <div class="feature-items">
          <div style="width:260px;height:314px;border:1px solid #F9F9F9;">
            <div><img src="/images/tutorials.png" class="feature-logo" style="width:100%;height:100%;max-width:260px;max-height:100px;"></div>
            <div style="padding:10px">
              <div>

              </div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div></div>
          <div></div>
          <div></div>
        </div> -->
    </div> 

    <HomeContent />
  </main>
</template>
