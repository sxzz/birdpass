<script setup lang="ts">
import { type FileWithHandle } from 'browser-fs-access'

const name = useLocalStorage('name', '')
const avatar = ref<FileWithHandle>()
const previewAvatar = ref<string>()

const disabled = computed(() => !name.value || !avatar.value)

async function mint() {
  if (disabled.value) return

  const image = (await fileToDataUrl(avatar.value!)).slice(
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

  const link = `https://birdpass.qaq.wiki/pass?passid=${res.passid}`
  location.href = link
}
</script>

<template>
  <div>
    <div i-carbon-ticket inline-block text-4xl />
    <p>
      <a rel="noreferrer" href="https://birdpass.sxzz.moe" target="_blank">
        BirdPass
      </a>
    </p>
    <p>
      <em text-sm op75>Get your BirdPass ticket!</em>
    </p>

    <div py-4 />

    <div flex="~ col gap6" mb4 items-center>
      <ImageInput v-model="avatar" v-model:preview="previewAvatar" />
      <TextInput v-model="name" placeholder="What's your username?" />
      <button class="text-lg btn" :disabled="disabled" @click="mint">
        Mint
      </button>
    </div>

    <TicketPreview :name="name" :avatar="previewAvatar" />
  </div>
</template>
