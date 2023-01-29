<template>
    <TheSection :sectionNumber="2">
        <h2>Кошелёк криптовалют</h2>
        <div :class="$style.wallet">
            <transition-group name="coins">
                <img 
                    v-for="(coin, i) in total"
                    :key="coin"
                    src="@/assets/images/coin.png" 
                    alt="coin"
                    :class="$style.coin"
                    :style="{transform: `translateX(${-50 * i}%)`}"
                >
            </transition-group>
        </div>

        <div :class="$style.score">
            <span>{{ total }}</span> biorobo монет
        </div>
        <div :class="$style.bottom">
            <button @click="earnMoney" :class="$style.btn">Заработать</button>
            <Checkbox
                :value="additionCoins.checked"
                :label="`Заработать ${additionCoins.value} монет`"
                @onChange="(value) => toggleAddition(value)"
            />
        </div>

        <Modal
            v-model:show="show"
        >
            <template #title>
                Количество монет ограничено
            </template>
            <template #subtitle>
                Вы не можете иметь более {{ limit }} монет biorobo
            </template>
        </Modal>
    </TheSection>
</template>

<script>
import TheSection from '@/layouts/TheSection';
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('earn')

export default {
    name: 'Wallet',

    components: {
        TheSection,
    },

    data() {
        return {
            show: false
        }
    },

    computed: {
        ...mapState({
            total: state => state.total,
            limit: state => state.limit,
            additionCoins: state => state.additionCoins,
        }),
    },

    methods: {
        ...mapMutations({
            toggleAddition: 'toggleAdditionCoins',
        }),

        ...mapActions({
            earn: 'earnMoney',
        }),

        earnMoney() {
            let {value, checked} = this.additionCoins;
            if (!checked) {value = 1}
            if (this.total + value > this.limit) this.show = true;
            this.earn()
        }
    }
}
</script>
<style lang="scss" module>
    .wallet {
        display: flex;
        margin-top: 60px;
        min-height: 20px;
    }

    .coin {
        position: relative;
        height: 20px;
        transition: all .5s ease;
    }

    .score {
        margin-top: 24px;
        font-weight: 500;
        font-size: 24px;
        line-height: 24px;
        color: $main-text;

        span {
            font-weight: 700;
        }
    }

    .bottom {
        display: flex;
        align-items: center;
        margin-top: 44px;
    }

    .btn {
        margin-right: 20px;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        color: $main-color;
        background: transparent;
        border: none;
        cursor: pointer;

        &::after {
            content: '';
            display: block;
            width: 0;
            height: 1px;
            background: $main-color;
            transition: .2s width;
        }

        &:hover::after {
            width: 100%;
        }
    }   
</style>

<style>
    .coins-enter-active,
    .coins-leave-active {
        top: 0;
    }
    .coins-enter-from,
    .coins-leave-to {
        top: -20px;
        opacity: 0;
    }
</style>