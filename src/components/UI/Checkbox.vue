<template>
    <div :class="$style.Checkbox">
        <label :class="$style.label">
            <div :class="$style.field">
                <Icon 
                    name="check"
                    :class="[$style.icon, {[$style['_checked']]: value}]"
                />
            </div>
            <input
                type="checkbox"
                :checked="value"
                @change="(e) => $emit('onChange', e.target.checked)"
                :class="$style.input"
            >
            <p :class="$style.labelText">{{ label }}</p>
        </label>
    </div>
</template>

<script>
export default {
    name: 'Checkbox',

    props: {
        value: {
            type: Boolean,
            default: Boolean
        },

        label: {
            type: String,
            default: ''
        }
    },
}
</script>

<style lang="scss" module>
    .Checkbox {
        position: relative;
        user-select: none;
    }

    .input {
        display: none;
    }

    .label {
        display: flex;
        align-items: center;

        &:hover .field {
            border-color: #4C5865;    
        }
    }

   .field {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 24px;
        height: 24px;
        margin-right: 12px;
        border: 2px solid $main-text;
        transition: .2s border-color;
   }

   .icon {
        width: 12px;
        height: 9px;
        fill: transparent;
        stroke: $main-color;
        stroke-width: 2px;
        scale: 0;
        transition: .2s scale;

        &._checked {
            scale: 1;
        }
   }

   .labelText {
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        color: #fff;
   }
</style>