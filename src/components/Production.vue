<template>
    <TheSection id="production" :sectionNumber="5">
        <h2 @click="test">Производство</h2>
        <div :class="$style.content">
            <div :class="$style.left">
                <div :class="$style.options">
                    <div :class="$style.settingsWrapper">
                        <div
                            v-for="setting in settings"
                            :key="setting.value"
                            :class="$style.row"
                        >
                            <div :class="$style.title">{{ setting.name }}:</div>
                            <div :class="$style.buttons">
                                <Radio
                                    v-for="option in setting.options"
                                    :class="$style.option"
                                    :key="option.value"
                                    :label="option.name"
                                    :name="setting.value"
                                    v-model="selected[setting.value]"
                                    @onChange="onChangeType"
                                    :value="option.value"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div
                            v-for="part in parts"
                            :key="'part' + part.id"
                            :class="$style.partRow"
                        >
                            <div
                                v-for="(row, i) in part.row"
                                :key="row.id"
                                :class="[
                                    $style.part,
                                    {[$style['_available']]: row === 1},
                                    {[$style['_mounted']]: row === 2}
                                ]"
                                @click="() => onToggleParts({part, index: i})"
                            >
                                <Icon
                                    :class="$style.icon"
                                    :name="part.id"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div :class="$style.bottom">
                    <Button 
                        color="transparent"
                        :class="$style.createBtn"
                        :disabled="isButtonDisabled"
                        @click="create"
                    >
                        Произвести за {{ createCost }} монет
                    </Button>
                    <div 
                        v-if="isButtonDisabled" 
                        :class="$style.info"
                    >
                        {{ info }}
                    </div>
                </div>
            </div>
            <div 
                v-if="showRobot"
                :class="$style.right"
            >
                <img :src="`src/assets/images/${robot.url}-${robot.status}.png`" alt="">
            </div>
        </div>

        <Modal v-model:show="show">
            <template #title>Биоробот произведён</template>
            <template #subtitle>Поздравляем! Вы произвели биоробота</template>
        </Modal>
    </TheSection>
</template>

<script>
import TheSection from '@/layouts/TheSection';
import { plural } from '@/assets/js/helpers'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

export default {
    name: 'Production',

    data() {
        return {
            show: false
        }
    },

    components: {
        TheSection,
    },

    computed: {
        ...mapState({
            settings: state => state.production.settings,
            selected: state => state.production.selected,
            parts: state => state.parts.parts,
            total: state => state.earn.total,
            createCost: state => state.production.createCost
        }),

        ...mapGetters({
            robot: 'production/robot',
        }),

        isButtonDisabled() {
            let disabled = false;

            this.parts.forEach(part => {
                part.row.forEach(item => {
                    if (item !== 2) {
                        disabled = true
                    }
                })
            })

            for (let key in this.selected) {
                if (!this.selected[key]) disabled = true
            }

            if (this.total < this.createCost) disabled = true

            return disabled;
        },

        info() {
            const missingParts = this.parts.reduce((initial, part) => {
                return [...initial, {
                    name: part.plural,
                    num: part.row.reduce((acc, val) => {
                        if (val !== 2) return acc + 1
                        return acc
                    }, 0)
                }]
            }, [])
            const filtered = missingParts.filter(item => item.num !== 0).map(item => ({...item, name: plural(item.num, item.name)}))

            let getText = filtered.reduce((acc, val, i) => {
                return [...acc, `${val.num === 1 ? '' : `${val.num} `}${val.name.toLowerCase()}`]
            }, [])

            const difference = Math.abs(this.total - this.createCost);

            if (this.total < this.createCost) {
                getText.push(
                    `${difference} ${plural(difference, ['монеты', 'монеты', 'монет'])}`
                )
            }

            getText.length > 1 && getText.splice(-1, 0, 'и');

            if (!this.showRobot) {
                return 'Для производства необходимо выбрать характеристики биоробота'
            } else {
                return 'Для производства биоробота не хватает ' + getText.join(', ').replace(/,\s+и\s*,/g, ' и ')
            }
        },

        currentRobotStatus() {
            let status = 0;
            const options = this.parts.reduce((acc, val) => {
                return [...acc, ...val.row]
            }, [])
            const sum = options.reduce((acc, val) => acc + val, 0)

            if (sum === (options.length * 2)) status = 1

            return status;
        },

        showRobot() {
            let show = true;
            for (let key in this.selected) {
                if (!this.selected[key]) show = false
            }
            return show;
        }
    },
    
    methods: {
        ...mapActions({
            updateRobot: 'production/updateRobot',
            toggleParts: 'parts/toggleParts',
            resetParts: 'parts/resetParts',
        }),

        ...mapMutations({
            setTotal: 'earn/setTotal'
        }),

        onChangeType() {
            if (this.robot.status == 2) {
                this.updateRobot(this.currentRobotStatus)
            } else {
                this.updateRobot()
            }
        },

        onToggleParts({part, index}) {
            this.toggleParts({part, index})
            
            this.updateRobot(this.currentRobotStatus)
        },

        create() {
            this.updateRobot(2)
            this.resetParts()
            this.show = true;
            this.$nextTick(() => {
                this.setTotal(this.total - this.createCost)
            })
        }
    },
}
</script>

<style lang="scss" module>
    .content {
        display: flex;
        justify-content: space-between;
        gap: 36px;
        width: 100%;
    }
    .left {
        margin-top: 65px;
    }

    .options {
        display: flex;
        align-items: flex-start;
    }

    .settingsWrapper {
        margin-right: 28px;
    }

    .title {
        font-size: 14px;
        line-height: 20px;
        color: #FFFFFF;
    }

    .row {
        display: flex;
        flex-direction: column;

        &:not(:first-child) {
            margin-top: 28px;
        }
    }

    .partRow {
        display: flex;
        gap: 12px;
        &:not(:first-child) {
            margin-top: 16px;
        }
    }

    .part {
        width: 48px;
        height: 48px;
        padding: 12px 4px;
        background: #333940;
        fill: $gray;
        color: $gray;
        border-radius: 4px;
        transition: .2s all;

        &._available {
            fill: #fff;
            color: #fff;
        }

        &._mounted {
            border: 2px solid $main-color;
            background: transparent;
            fill: $main-color;
            color: $main-color;
        }
    }

    .icon {
        width: 100%;
        height: 100%;
    }

    .buttons {
        display: flex;
        margin-top: 16px;
        align-items: center;
    }

    .info {
        width: 195px;
        font-size: 12px;
        font-weight: 500;
        line-height: 16px;
        color: $main-text;
    }

    .option {
        margin-right: 24px;
    }

    .bottom {
        display: flex;
        gap: 24px;
        margin-top: 60px;
    }

    .createBtn {
        white-space: nowrap;
    }

    .right {
        display: flex;
        justify-content: flex-start;
        align-self: flex-end;
        width: 100%;
        height: 100%;
    }

</style>