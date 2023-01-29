<template>
    <TheSection :sectionNumber="4">
        <h2>Склад</h2>
        <div :class="$style.cards">
            <PartCard
                v-for="part in parts"
                :key="part.id"
                :name="part.name"
                :cost="part.sellCost"
                :button="{
                    text: 'Продать',
                    color: 'blue',
                    disabled: !part.available
                }"
                :quantity="{
                    show: true,
                    value: parts.filter(item => item.id === part.id)[0].available
                }"
                @onClick="() => sellDetail(part)"
            />
        </div>
    </TheSection>
</template>

<script>
import TheSection from '@/layouts/TheSection';
import PartCard from '@/components/PartCard';

import { mapState, mapActions,mapMutations } from 'vuex';

export default {
    name: 'Store',

    components: {
        TheSection,
        PartCard
    },

    computed: {
        ...mapState({
            parts: state => state.parts.parts,
            total: state => state.earn.total,
            limit: state => state.earn.limit
        })
    },

    methods: {
        ...mapActions({
            toggleDetail: 'parts/toggleDetail',
        }),

        ...mapMutations({
            setTotal: 'earn/setTotal'
        }),

        sellDetail(part) {
            this.toggleDetail({action: 'sell', part});
            if (this.total + part.sellCost > this.limit) {
                this.setTotal(this.limit)
            } else {
                this.setTotal(this.total + part.sellCost)
            }
        }
    }
}
</script>

<style lang="scss" module>
    .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, 236px);
        justify-content: space-between;
        align-items: start;
        gap: 42px;
        margin-top: 100px;
    }
</style>