<script setup lang="ts">
defineProps<{
  name?: string
  avatar?: string
}>()
</script>

<template>
  <div>
    <h3 mb2 text-lg font-bold>Preview</h3>
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
      p3
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
      <div i-ri:apple-fill mb5 text-3xl text-white />
      <div flex justify-between>
        <div flex="~ col">
          <span text-xs font-bold text="left gray/70">BIRLAND EVENT</span>
          <span mb4 text-lg>Apple Fall Event 2023</span>

          <div mb4 flex justify-between>
            <div flex="~ col">
              <span text-xs font-bold text="gray/70">NAME</span>
              <span text-sm>{{ name }}</span>
            </div>

            <div flex="~ col">
              <span text-xs font-bold text="right gray/70">Doors open</span>
              <span text-sm>Today, 23:00</span>
            </div>
          </div>

          <span text-xs font-bold text="left gray/70">PASS ID</span>
          <span mb2 text-sm>EK2023091200010000</span>
        </div>
        <div h-20 w-20>
          <img v-if="avatar" :src="avatar" alt="Avatar" w-20 rounded />
        </div>
      </div>
    </div>
  </div>
</template>
