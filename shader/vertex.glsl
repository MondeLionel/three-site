varying vec2 vUv;
uniform float uTime;
varying float vWave;

void main() {
  vUv = uv;

  vec3 pos = position;
  float noiseFreq = 3.5;
  float noiseAmp = 0.15; 
  vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
  pos.z += snoise(noisePos) * noiseAmp;
  vWave = pos.z;

 gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}
