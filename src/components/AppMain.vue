<script setup lang="ts">
import { type FileWithHandle } from 'browser-fs-access'
import { saveAs } from 'file-saver'

const name = useLocalStorage('name', '')
const avatar = ref<FileWithHandle>()
const previewAvatar = ref<string>()
const loading = ref(false)
const passId = ref<string>()

const disabled = computed(() => loading.value || !name.value || !avatar.value)

async function mint() {
  if (disabled.value) return

  loading.value = true
  try {
    const compressed = await compressImage(avatar.value!)
    const image = (await fileToDataUrl(compressed)).slice(
      'data:image/jpeg;base64,'.length
    )
    const res = await fetch('https://birdpass.qaq.wiki/sign', {
      method: 'POST',
      body: JSON.stringify({
        username: name.value,
        avatar: image,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then((r) => r.json())
    passId.value = res.passid

    const pass = await fetch(
      `https://birdpass.qaq.wiki/pass?passid=${passId.value}`
    ).then((r) => r.blob())
    saveAs(pass, 'birdpass.pkpass')
  } catch {
    // eslint-disable-next-line no-alert
    alert('Failed to mint ticket')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div v-show="!showPreviewOnly" font-comfortaa>
    <div flex items-center justify-between>
      <a
        rel="noreferrer"
        href="https://birdpass.sxzz.moe"
        target="_blank"
        text-xl
        font-bold
      >
        BirdPass
      </a>
      <div i-carbon-ticket inline-block text-4xl />
    </div>

    <div py-4 />

    <div flex="~ col gap6" mb4 items-center>
      <ImageInput v-model="avatar" v-model:preview="previewAvatar" />
      <TextInput v-model="name" placeholder="What's your username?" />
      <p op75>ℹ️ Support Safari on iOS only</p>
      <button
        flex
        items-center
        gap-1
        text-lg
        btn
        :class="{ 'animate-pulse': loading }"
        :disabled="disabled"
        @click="mint"
      >
        <div v-if="loading" preserve-3d animate-spin>
          <div i-ri:loader-2-line />
        </div>
        {{ loading ? 'Processing...' : 'Claim' }}
      </button>
    </div>
  </div>
  <TicketPreview :name="name" :avatar="previewAvatar" :pass-id="passId" />
</template>
