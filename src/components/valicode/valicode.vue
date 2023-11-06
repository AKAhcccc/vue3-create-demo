<template>
  <div class="captcha" style="display: flex;">
    <canvas ref="canvas" width="100" height="40"></canvas>
  </div>
  <div class="valicode-btn">
    <el-button type="text" @click="refresh">看不清，换一张</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const emits = defineEmits(['getCode'])
const canvasRef = ref<HTMLCanvasElement | any>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const code = ref('')
const chars = 'abcdefghijklmnopqrstuvwxyz0123456789' // 修改为小写字母
const charLength = chars.length

function getRandomChar() {
  return chars.charAt(Math.floor(Math.random() * charLength))
}

function draw() {
  if (!ctx.value) return

  ctx.value.clearRect(0, 0, canvasRef.value!.width, canvasRef.value!.height)

  let x = 10
  for (let i = 0; i < 4; i++) {
    const c = getRandomChar()
    code.value += c
    ctx.value.font = 'bold 20px Arial'
    ctx.value.fillStyle = '#FFFFFF'
    ctx.value.fillText(c, x, 25)
    x += 20
  }

  for (let i = 0; i < 10; i++) {
    ctx.value.strokeStyle = '#ccc'
    ctx.value.beginPath()
    ctx.value.moveTo(Math.random() * 100, Math.random() * 40)
    ctx.value.lineTo(Math.random() * 100, Math.random() * 40)
    ctx.value.stroke()
  }
  emits('getCode', code.value)
}

function refresh() {
  code.value = ''
  draw()
  emits('getCode', code.value)
}

onMounted(() => {
  const code = ref('')
  canvasRef.value = document.querySelector('canvas')
  emits('getCode', code.value)
  ctx.value = canvasRef.value?.getContext('2d')
  draw()
})
</script>

<style scoped>
.captcha {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.valicode-btn {
  height: 50px;
  line-height: 50px;
}
</style>
