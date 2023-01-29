<template>
    <button :class="[$style.Button, $style[`_${color}`]]">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        color: {
            type: String,
            default: 'normal'
        }
    }
}
</script>

<style lang='scss' module>
    .Button {
        overflow: hidden;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px 20px;
        border-radius: 60px;
        font-size: 16px;
        line-height: 24px;
        font-weight: 600;
        transition: .2s all;
        outline: none;
        border: none;
        cursor: pointer;

        &._normal {
            background: $main-darken;
            color: #fff;
            filter: drop-shadow(0px 8px 10px rgba(0, 0, 0, 0.16));

            &::after {
                content: '';
                position: absolute;
                display: block;
                width: 100%;
                height: 100%;
                background: linear-gradient(180deg, $main-color 0%, $main-darken 100%);
                transition: .2s all;
                z-index: -1;
            }
            
            &:hover::after {
                opacity: 0;
            }

            &:active {
                background: $main-color;
            }

            &:disabled {
                background: $gray;
                color: #7D90A6 ;
                &::after {
                    opacity: 0;
                }
            }
        }

        &._transparent {
            background: transparent;
            border: 2px solid $main-color;
            color: #fff;
            
            &:hover {
                background: $main-darken;
                border-color: $main-darken;
            }

            &:active {
                background: $main-color;
            }

            &:disabled {
                background: $gray;
                border-color: $gray;
                color: #7D90A6 ;
            }
        }

        &._blue {
            background: transparent;
            border: 2px solid $main-blue;
            color: #7CDAF9;

            &:hover {
                background: $main-blue;
                color: #212529;
            }

            &:active {
                border-color: $secondary-blue;
                color: $main-blue;
                background: transparent;
            }

            &:disabled {
                border-color: $gray;
                background: $gray;
                color: #7D90A6;
            }
        }

        &:disabled {
            cursor: auto;
        }
    }
</style>