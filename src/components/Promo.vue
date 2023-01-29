<template>
    <TheSection
        :sectionNumber="1"
        showScroll
    >
        <div :class="$style.main">
            <div :class="$style.left">
                <h1 :class="$style.title">Фабрика по производству биороботов</h1>
                <p :class="$style.subtitle">класса «монитор-кресло»</p>
            </div>
            <div :class="$style.right">
                <img 
                    src="@/assets/images/design-male-2.png" 
                    alt="designer" 
                    :class="$style.designer"
                >
                <img 
                    src="@/assets/images/frontend-male-2.png" 
                    alt="front" 
                    :class="$style.front"
                >
                <div :class="$style.circle"></div>
            </div>
        </div>
    </TheSection>
</template>

<script>
import TheSection from '@/layouts/TheSection';

export default {
    name: 'Promo',

    components: {
        TheSection
    }
}
</script>

<style lang="scss" module>
    .main {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .title {
        width: 470px;
    }

    .subtitle {
        margin-top: 24px;
        font-size: 24px;
        font-weight: 600;
        line-height: 32px;
        color: $main-text;
    }

    .left {
        margin-right: 50px;
    }

    .right {
        position: relative;
        width: 100%;
        min-height: 320px;
    }

    .front {
        position: absolute;
        top: 0;
        left: 0;
        transform: scale(1.3) translateY(-36px) translateX(-16px);
        z-index: 2;
    }

    .designer {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        transform: translateX(59%) translateY(-5px) scaleX(-1) scale(0.8);
    }

    .circle {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-57%) translateY(-8%);
        width: 275px;
        height: 275px;
        background-color: #1E2936;
        border-radius: 100%;
        z-index: 1;
    }
</style>