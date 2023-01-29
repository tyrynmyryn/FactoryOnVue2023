<template>
    <div :class="[$style.Modal, {[$style['_show']]: show}]" @click.self="$emit('update:show', !show)">
        <div :class="$style.content">
            <div :class="$style.title">
                <slot name="title"></slot>
            </div>
            <div :class="$style.subtitle">
                <slot name="subtitle"></slot>
            </div>
            <div 
                :class="$style.close" 
                @click="$emit('update:show', !show)"
            >
                <Icon name="close" :class="$style.icon"/>
            </div>
        </div>
    </div>
</template>

<script>
import {lockBody, unlockBody} from '@/assets/js/helpers.js'

export default {
    name: 'Modal',
    
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },

    watch: {
        show(val) {
            if (val) lockBody() 
            else unlockBody()
        }
    }
}
</script>

<style lang="scss" module>
    .Modal {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        inset: 0;
        background: rgba($color: #000000, $alpha: .5);
        z-index: 1000;
        opacity: 0;
        pointer-events: none;
        transition: .2s all;

        &._show {
            opacity: 1;
            pointer-events: all;

            .content {
                scale: 1;
            }
        }
    }

    .content {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        width: 496px;
        height: 240px;
        background: #FFFFFF;
        border-radius: 10px;
        padding: 40px 80px;
        scale: 0;
        transition: .2s all;
    }

    .close {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 32px;
        height: 32px;
        cursor: pointer;
    }

    .icon {
        width: 100%;
        height: 100%;
        fill: $main-color;
    }

    .title {
        font-size: 32px;
        font-weight: 600;
        line-height: 40px;
        color: #212529;
    }

    .subtitle {
        font-size: 20px;
        font-weight: 600;
        line-height: 32px;
        color: #4C5865;
        margin-top: 24px;
    }

</style>