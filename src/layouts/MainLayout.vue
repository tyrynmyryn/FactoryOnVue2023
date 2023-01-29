<template>
    <Container>
        <TheHeader />
        <slot></slot>
    </Container>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import Container from '@/layouts/Container'

export default {
    name: 'MainLayout',

    components: {
        Container, TheHeader
    }
}
</script>

<style>

</style>