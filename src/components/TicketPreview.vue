<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'
import { OnClickOutside } from '@vueuse/components'

const props = defineProps<{
  name?: string
  avatar?: string
  passId?: string
}>()
const defaultPassId = 'EK20230912XXXX'
const qrcode = ref('')

watch(
  () => props.passId,
  async () => {
    qrcode.value = await digestMessage(props.passId || defaultPassId)
  },
  { immediate: true }
)

async function digestMessage(message: string) {
  const msgUint8 = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

function togglePreview(v: boolean) {
  showPreviewOnly.value = v
}
</script>

<template>
  <OnClickOutside @trigger="togglePreview(false)">
    <div
      bg="#1b2029"
      flex="~ col"
      text="left white"
      relative
      ma
      h-100
      w-78
      overflow-hidden
      rounded
      p4
    >
      <div
        dark:bg="#121212"
        absolute
        left-0
        right-0
        top--5
        m-auto
        h-10
        w-15
        rounded-b-full
        bg-white
      />
      <div flex justify-between>
        <div i-ri:apple-fill mb5 text-3xl text-white />
        <h3 v-show="!passId" mb2 text="xs gray" font-bold>Preview</h3>
      </div>

      <div flex justify-between>
        <div flex="~ col">
          <span text-xs font-bold text="left gray/70">BIRLAND EVENT</span>
          <span mb4 text-lg>Apple Fall Event 2023</span>

          <div mb4 flex justify-between>
            <div flex="~ col">
              <span text-xs font-bold text="gray/70">NAME</span>
              <span text-sm>{{ name || 'Tim Cook' }}</span>
            </div>

            <div flex="~ col">
              <span text-xs font-bold text="right gray/70">Doors open</span>
              <span text-sm>Today, 23:00</span>
            </div>
          </div>

          <span text-xs font-bold text="left gray/70">PASS ID</span>
          <span mb2 text-sm>{{ passId || defaultPassId }}</span>
        </div>
        <div h-20 w-20>
          <img v-if="avatar" :src="avatar" alt="Avatar" w-20 rounded-2 />
        </div>
      </div>
      <QrcodeVue
        :value="qrcode"
        :size="150"
        :margin="3"
        render-as="svg"
        level="L"
        ma
        rounded
      />
    </div>
    <button v-show="!showPreviewOnly" mt4 btn @click="togglePreview(true)">
      Show preview only
    </button>
  </OnClickOutside>
</template>
