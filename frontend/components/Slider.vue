<template>
  <div
    class="carousel relative container mx-auto pt-1"
    style="max-width: 1600px"
  >
    <div class="carousel-inner relative overflow-hidden w-full">
      <transition-group name="fade" tag="div">
        <template v-for="(slide, key) in sliders">
          <div v-show="key === sliderActive" :key="slide.id">
            <input
              :id="`carousel-${key}`"
              v-model="sliderActive"
              class="carousel-open"
              type="radio"
              name="carousel"
              hidden=""
              aria-hidden="true"
              :value="key"
            />
            <div class="carousel-item absolute opacity-0">
              <div
                class="block h-56 md:h-screen/2 w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right max-w-full shadow-lg"
                :style="{
                  'background-image': `url(${get(
                    slide,
                    'slider_image.url',
                    ''
                  )})`,
                }"
              >
                <div class="container mx-auto">
                  <div
                    class="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide"
                  >
                    <!-- div class="flex-initial bg-gray-700 bg-opacity-50 rounded sm:invisible">
                      <div class="p-3">
                        <p class="text-white text-4xl my-4">{{ slide.slider_title }}</p>
                        <a class="text-white text-xl inline-block no-underline border-b border-gray-600 leading-relaxed" href="#">Hemen Gör</a>
                      </div>
                    </div-->
                  </div>
                </div>
              </div>
            </div>
            <label
              :for="
                key === 0
                  ? `carousel-${sliders.length - 1}`
                  : `carousel-${parseInt(key - 1)}`
              "
              :class="{ hidden: sliderActive !== key }"
              class="prev control-1 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 left-0 my-auto"
              >‹</label
            >
            <label
              :for="
                key === sliders.length - 1
                  ? `carousel-0`
                  : `carousel-${parseInt(key + 1)}`
              "
              :class="{ hidden: sliderActive !== key }"
              class="next control-1 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 right-0 my-auto"
              >›</label
            >
          </div>
        </template>
      </transition-group>
    </div>
  </div>
</template>
<style>
.carousel-open:checked + .carousel-item {
  position: static;
  opacity: 100;
}

#carousel-1:checked ~ .control-1,
#carousel-2:checked ~ .control-2,
#carousel-3:checked ~ .control-3 {
  display: block;
}

.carousel-indicators {
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 2%;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 10;
}

#carousel-1:checked
  ~ .control-1
  ~ .carousel-indicators
  li:nth-child(1)
  .carousel-bullet,
#carousel-2:checked
  ~ .control-2
  ~ .carousel-indicators
  li:nth-child(2)
  .carousel-bullet,
#carousel-3:checked
  ~ .control-3
  ~ .carousel-indicators
  li:nth-child(3)
  .carousel-bullet {
  color: #000;
  /*Set to match the Tailwind colour you want the active one to be */
}
</style>

<script>
import { get } from "~/utils/get";

export default {
  data() {
    return {
      sliders: [],
      sliderActive: 0,
      error: null,
    };
  },
  async mounted() {
    try {
      this.sliders = await this.$strapi.find("sliders");
    } catch (error) {
      this.error = error;
    }
  },
  methods: {
    get,
  },
};
</script>
