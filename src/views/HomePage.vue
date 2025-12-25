<template>
    <div class="container">
        <div class="hero__text">
            <div class="ty-hero-title-1 primary-text">МООР</div>
            <div class="ty-hero-subtitle-1 text-center px-[8px]">
                Город, в котором оживают истории
            </div>
        </div>
        <!-- <span class="ty-hero-title-1"> ty-hero-title-1 </span>
        <span class="ty-body-1"> ty-body-1 </span>
        <span class="ty-heading-1"> ty-heading-1 </span>
        <span class="ty-heading-2"> ty-heading-2 </span>
        <span class="ty-heading-3"> ty-heading-3 </span>
        <span class="ty-heading-4"> ty-heading-4 </span>
        <span class="ty-book-title-1"> ty-book-title </span> -->
    </div>
</template>
<style scoped lang="scss">
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    @include mobile {
        padding-top: 16px;
        align-items: start;
    }

    .hero__text {
        display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: center;
    }
}
</style>
