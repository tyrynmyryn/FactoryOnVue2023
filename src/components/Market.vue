<template>
    <TheSection :sectionNumber="3">
        <h2>Рынок комплектующих</h2>
        <div :class="$style.cards">
            <PartCard
                v-for="part in parts"
                :key="part.id"
                :name="part.name"
                :icon="part.id"
                :cost="part.cost"
                :button="{ text: 'Установить', disabled: total < part.cost }"
                @onClick="() => buyDetail(part)"
            />
        </div>
    </TheSection>
</template>

<script>
import TheSection from '@/layouts/TheSection';
import PartCard from '@/components/PartCard';

import { mapState, mapActions, mapMutations } from 'vuex';

export default {
    name: 'Market',

    components: {
        TheSection,
        PartCard
    },

    computed: {
        ...mapState({
            parts: state => state.parts.parts,
            total: state => state.earn.total
        })
    },

    methods: {
        ...mapActions({
            toggleDetail: 'parts/toggleDetail'
        }),

        ...mapMutations({
           setTotal: 'earn/setTotal' 
        }),

        buyDetail(part) {
            if (this.total >= part.cost) {
                this.toggleDetail({action: 'buy', part})
                this.setTotal(this.total - part.cost)
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