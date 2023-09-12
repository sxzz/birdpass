<script lang="ts" setup>
import { type FileWithHandle, fileOpen } from 'browser-fs-access'

const file = defineModel<FileWithHandle | null>({
  local: true,
})
const previewImage = defineModel<string>('preview', {
  local: true,
})

async function pickImage() {
  file.value = await fileOpen({
    description: 'Image',
    mimeTypes: ['image/*'],
  })
}

watch(file, async (image, _, onCleanup) => {
  let expired = false
  onCleanup(() => (expired = true))

  if (!image) {
    previewImage.value = ''
    return
  }

  const result = await fileToDataUrl(image)
  if (expired) return
  previewImage.value = result
})
</script>

<template>
  <label
    class="bg-slate-500/10"
    relative
    flex
    cursor-pointer
    items-center
    justify-center
    of-hidden
    rounded-2
    border="gray/20 2"
    w="sm:30 24"
    h="sm:30 24"
    min-w="sm:30 24"
    @click="pickImage"
  >
    <img v-if="previewImage" :src="previewImage" h-full w-full object-cover />
    <span
      bg="black/50"
      absolute
      h12
      w12
      flex
      items-center
      justify-center
      rounded-2
      text-xl
      text-white
      hover="bg-black/40 text-primary"
    >
      <span i-ri:upload-2-line block />
    </span>
  </label>
</template>
