<script lang="ts" setup>
import { type FileWithHandle, fileOpen } from 'browser-fs-access'

const emit = defineEmits<{
  (event: 'pick', value: FileWithHandle): void
}>()

const file = defineModel<FileWithHandle | null>({
  local: true,
})

const previewImage = ref('')

async function pickImage() {
  const image = await fileOpen({
    description: 'Image',
    mimeTypes: ['image/*'],
  })
  file.value = image
  emit('pick', file.value)
}

watch(file, (image, _, onCleanup) => {
  let expired = false
  onCleanup(() => (expired = true))

  if (!image) {
    previewImage.value = ''
    return
  }
  const reader = new FileReader()
  reader.readAsDataURL(image)
  reader.addEventListener('load', (evt) => {
    if (expired) return
    previewImage.value = evt.target?.result as string
  })
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
    rounded-full
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
      rounded-full
      text-xl
      text-white
      hover="bg-black/40 text-primary"
    >
      <span i-carbon:upload block />
    </span>
  </label>
</template>
