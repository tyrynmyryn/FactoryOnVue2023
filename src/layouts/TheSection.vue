<template>
    <section :class="$style.Section">
        <div :class="$style.side">
            <span :class="$style.number">0{{ sectionNumber }}</span>
            <span
                v-if="showScroll" 
                :class="$style.scroll"
            >
                <Icon 
                    name="left-arrow"
                    :class="$style.arrow"
                />
                <span :class="$style.scrollText">скролл</span>
            </span>
        </div>
        <div :class="$style.content">
            <slot></slot>
        </div>
    </section>
</template>

<script>
export default {
    name: 'TheSection',

    props: {
        sectionNumber: {
            type: [Number, String],
            default: 1,
        },

        showScroll: {
            type: Boolean,
            default: false,
        }
    }
}
</script>

<style lang="scss" module>
    .Section {
        display: flex;
        width: 100%;
        height: 100%;
    }

    .number, .scrollText {
        font-weight: 500;
        font-size: 12px;
        line-height: 24px;
        color: $light-gray;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    .side {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 100%;
        margin-right: 106px;
    }

    .scroll {
        position: absolute;
        left: 50%;
        bottom: 0;
        display: flex;
        align-items: center;
        transform: rotate(270deg) translateY(50%);
        transform-origin: left bottom;
    }

    .arrow {
        width: 24px;
        height: 24px;
        fill: $light-gray;
    }

    .content {
        width: 100%;
    }
</style>