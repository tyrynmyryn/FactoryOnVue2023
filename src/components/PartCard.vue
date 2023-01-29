<template>
    <div :class="$style.PartCard">
        <div
            v-if="icon"
            :class="$style.iconWrapper"
        >
            <Icon
                :class="$style.icon" 
                :name="icon"
            />
        </div>
        <div :class="$style.name">{{ name }}</div>
        <div :class="$style.cost">Стоимость: <span>{{ cost }} монет</span></div>
        <div 
            v-if="quantity.show" 
            :class="$style.quantity"
        >
            {{ quantity.value }} шт
        </div>
        <Button 
            :class="$style.btn"
            :color="button.color"
            :disabled="button.disabled"
            @click="$emit('onClick')"
        >
            {{ button.text }}
        </Button>
    </div>
</template>

<script>
const buttonOptions = {
    color: 'orange',
    disabled: false,
    text: '',
}

const quantityOptions = {
    show: false,
    value: 0,
}

export default {
    name: 'PartCard',

    props: {
        name: {
            type: String,
            default: ''
        },

        icon: {
            type: String,
            default: ''
        },

        cost: {
            type: Number,
            default: 0
        },


        quantity: {
            type: Object,
            default: quantityOptions,
        },

        button: {
            type: Object,
            default: buttonOptions
        }
    }
}
</script>

<style lang="scss" module>
    .PartCard {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
    }

    .iconWrapper {
        filter: drop-shadow(0px 8px 90px $main-color);
    }

    .icon {
        width: 100%;
        height: 128px;
        fill: $main-color;
        color: $main-color;
    }

    .name {
        margin-top: 24px;
        font-size: 20px;
        font-weight: 600;
        line-height: 32px;
        color: #fff;
        text-align: center;
    }
    .cost {
        margin-top: 4px;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: $main-text;
        text-align: center;

        span {
            font-weight: 600;
        }
    }

    .quantity {
        margin-top: 16px;
        font-size: 20px;
        font-weight: 600;
        line-height: 24px;
        color: #fff;
        text-align: center;
    }

    .btn {
        width: 100%;
        margin-top: 24px;
    }
</style>