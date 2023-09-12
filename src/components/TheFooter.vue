<script setup lang="ts">
const isAppearanceTransition =
  typeof document !== 'undefined' &&
  // @ts-expect-error: Transition API
  document.startViewTransition &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Credit to [@hooray](https://github.com/hooray)
 * @see https://github.com/vuejs/vitepress/pull/2347
 */
function toggleDark(event?: MouseEvent) {
  if (!isAppearanceTransition || !event) {
    isDark.value = !isDark.value
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )
  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 400,
        easing: 'ease-in',
        pseudoElement: isDark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      }
    )
  })
}
</script>

<template>
  <div flex="~ col gap-2" w-full items-center p6>
    <nav flex gap-2 text-xl>
      <button icon-btn @click="toggleDark">
        <div i-ri:sun-line dark:i-ri:moon-line />
      </button>

      <a
        i-ri:github-line
        icon-btn
        rel="noreferrer"
        href="https://github.com/sxzz/birdpass"
        target="_blank"
        title="GitHub"
      />
    </nav>

    <div op-50>
      Made with
      <div i-ri:heart-3-fill inline-block vertical-middle text-pink />
      by
      <a href="https://github.com/sxzz" target="_blank">三咲智子</a> &
      <a href="https://github.com/Lakr233" target="_blank">Lakr</a>
    </div>
  </div>
</template>
