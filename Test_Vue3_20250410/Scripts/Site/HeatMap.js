/*

常見套件＆技術選擇

heatmap.js

最經典的 JS 熱力圖庫。 
CSDN博客
+1

它是基於 canvas 來渲染熱力圖。這代表你可以在你的 SVG 之上（或之下）放一個 canvas 熱力圖層來覆蓋。

在 Vue3 中有人使用的例子。 
daosea.com

visual-heatmap

高效能熱力圖，用 WebGL / shaders 來呈現大量點。 
GitHub

它支援 UMD 模式 / ES6，可靈活整合到 Vue 組件中。

D3.js＋手動 gradient / path

如果你想要非常自訂的「根據點密度產生不規則形狀（像 blob、輪廓）」的熱力圖，可以用 D3 做。利用 D3 的 密度估算 (density estimation)，你可以生成等高線 (contour) 或類似 heatmap 的圖形。 D3 非常靈活。 
維基百科

-或者你也可以用 D3+canvas混合，先在 canvas 計算熱圖，再用 SVG 載入或 overlay。

*/


<template>
    <div ref="container" style="position: relative;">
        <!-- 你的 SVG 元素 -->
        <svg
            ref="svg"
      :width="width"
        :height="height"
        style="position: absolute; top:0; left:0; pointer-events: none;"
    >
        <!-- 這邊是你的 svg 圖形，例如點、地圖、shape 等 -->
        <circle v-for="pt in points" :cx="pt.x" :cy="pt.y" :r="3" :fill="'black'" />
    </svg>

    <!-- heatmap.js 的熱力圖畫在 canvas -->
    <div ref="heatmapContainer" style="position: absolute; top:0; left:0; width:100%; height:100%;"></div>
</div>
</template >

<script setup>
import { ref, onMounted } from 'vue'
import h337 from 'heatmap.js'   // 假設你是用 npm 安裝

const width = 500
const height = 500

const container = ref(null)
const heatmapContainer = ref(null)
const svg = ref(null)

// 範例點 (x,y,強度)
const points = [
  { x: 100, y: 100, value: 10 },
  { x: 200, y: 150, value: 30 },
  { x: 300, y: 300, value: 20 },
  // …更多點
]

onMounted(() => {
  // 建 heatmap 實例
  const heatmap = h337.create({
    container: heatmapContainer.value,
    radius: 40,
    maxOpacity: 0.6,
    minOpacity: 0.1,
    blur: 0.75,
    // 你可以設定 gradient
    gradient: {
      0.4: 'blue',
      0.6: 'lime',
      0.8: 'red'
    }
  })

  // 設定資料
  heatmap.setData({
    max: 50,  // 視你的資料強度設定最大值
    data: points.map(p => ({
      x: p.x,
      y: p.y,
      value: p.value
    }))
  })
})
</script>

<style scoped>
/* container 相對定位，讓 svg 和 heatmap layer 疊在一起 */
</style>
