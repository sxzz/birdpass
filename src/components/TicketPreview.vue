<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'
defineProps<{
  name?: string
  avatar?: string
}>()

const passId = 'EK20230912XXXX'
const qrcode =
  '94d8ea7fc96cc1b54dba3d28fed42248ce357d8198c685a30a2f835b43c6882b'
</script>

<template>
  <div>
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
        <h3 mb2 text="xs gray" font-bold>Preview</h3>
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
          <span mb2 text-sm>{{ passId }}</span>
        </div>
        <div h-20 w-20>
          <img v-if="avatar" :src="avatar" alt="Avatar" w-20 rounded />
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
  </div>
</template>
