<template>
    <MainLayout>
        <Promo :class="$style.section"/>
        <Wallet :class="$style.section"/>
        <Market :class="$style.section"/>
        <Store :class="$style.section"/>
        <Production :class="$style.section"/>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout';
import Promo from '@/components/Promo';
import Wallet from '@/components/Wallet';
import Market from '@/components/Market';
import Store from '@/components/Store';
import Production from '@/components/Production';

export default {
    name: 'App',

    components: {
        MainLayout,
        Promo,
        Wallet,
        Market,
        Store,
        Production,
    },

    data: () => ({
        show: true,
    })
}
</script>

<style lang="scss" module>
    .section {
        margin-top: 100px;
    }
</style>