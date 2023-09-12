<script setup lang="ts">
import { type FileWithHandle } from 'browser-fs-access'

const router = useRouter()

const name = ref('')
const avatar = ref<FileWithHandle>()

const disabled = computed(() => !name.value || !avatar.value)

async function go() {
  if (disabled.value) return

  router.push({
    name: 'birdpass',
    query: {
      name: name.value,
      avatar: await fileToDataUrl(avatar.value!),
    },
  })
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

    <div flex="~ col gap6" items-center>
      <ImageInput v-model="avatar" />
      <TextInput v-model="name" placeholder="What's your username?" />
      <button class="text-lg btn" :disabled="disabled" @click="go">
        Generate
      </button>
    </div>
  </div>
</template>
