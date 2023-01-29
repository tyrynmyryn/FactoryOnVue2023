<template>
    <svg>
        <use :xlink:href="`/src/assets/icons/sprites.svg#${name}`"></use>
    </svg>
</template>

<script>
export default {
    name: 'Icon',

    props: {
        name: {
            type: String,
            default: '',
        }
    }
}
</script>

<style>

</style>