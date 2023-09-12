<template>
  <main p="x-4 y-10" text="center gray-700 dark:gray-200" flex-1 font-sans>
    <AppMain />
  </main>
  <TheFooter v-show="!showPreviewOnly" />
</template>
