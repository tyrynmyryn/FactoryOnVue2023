<template>
    <header :class="$style.TheHeader">
        <Icon 
            name="logo"
            :class="$style.logo"
        />
        <Button 
            color="transparent"
            @click="scrollToProduction"
        >
            Произвести биоробота
        </Button>
    </header>
</template>

<script>
export default {
    name: 'TheHeader',

    methods: {
        scrollToProduction() {
            const production = document.querySelector('#production');
            const {top} = production.getBoundingClientRect();
            window.scrollTo({
                top,
                behavior: 'smooth'
            })
        }
    }   
}
</script>

<style lang="scss" module>
    .TheHeader {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logo {
        width: 78px;
        height: 48px;
        fill: $main-color;
    }
</style>