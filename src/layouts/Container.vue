<template>
    <div :class="$style.Container">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Container'
}
</script>

<style lang="scss" module>
    .Container {
        width: 100%;
        max-width: 1016px;
        margin: 0 auto;
        padding: 48px 0 212px 0;
    }
</style>