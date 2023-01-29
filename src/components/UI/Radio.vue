<template>
    <div :class="$style.Radio">
        <label :class="$style.label">
            <div :class="[$style.field, {[$style['_checked']]: modelValue === value}]"></div>
            <input
                type="radio" 
                :class="$style.input"
                :name="name"
                :value="value"
                :checked="modelValue === value"
                @change="(e) => onChange(e)"
            />
            {{ label }}
        </label>
    </div>
</template>

<script>
export default {
    name: 'Radio',

    props: {
        label: {
            type: String,
            default: '',
        },

        value: {
            type: String,
            default: ''
        },

        modelValue: {
            type: String,
            default: ''
        },

        name: {
            type: String,
            default: ''
        }
    },

    methods: {
        onChange(e) {
            this.$emit('update:modelValue', e.target.value)
            this.$emit('onChange')
        }
    }
}
</script>

<style lang="scss" module>
    .Radio {

    }

    .input {
        display: none;
    }

    .label {
        display: flex;
        align-items: center;
        font-size: 12px;
        line-height: 16px;
        color: #fff;
    }

    .field {
        position: relative;
        width: 24px;
        height: 24px;
        padding: 4px;
        margin-right: 8px;
        border: 2px solid $main-text;
        border-radius: 100%;

        &::before {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            background: $main-color;
            border-radius: 100%;
            scale: 0;
            transition: .2s scale;
        }

        &._checked::before {
            scale: 1;
        }
    }
</style>