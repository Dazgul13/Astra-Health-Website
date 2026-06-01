<template>
  <div class="map-module">
    <iframe
      title="AstraHealth Birthing Center Location"
      :src="mapSrc"
      width="100%"
      height="100%"
      style="border:0; display:block;"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    />
  </div>
</template>

<script setup>
const address = 'Purok 1, Mabical Highway, Mabical, Floridablanca, Philippines, 2006'
const encoded = encodeURIComponent(address)
const mapSrc = `https://maps.google.com/maps?q=${encoded}&t=&z=15&ie=UTF8&iwloc=&output=embed`
</script>

<style scoped>
.map-module {
  width: 100%;
  height: 100%;
  background: var(--color-bg-cream);
}
</style>
