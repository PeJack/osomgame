uniform sampler2D grassTexture;
uniform sampler2D rockTexture;

varying vec2 vUV;

varying float vAmount;

void main() 
{
    vec4 grass = (smoothstep(0.30, 0.50, vAmount) - smoothstep(0.70, 0.80, vAmount)) * texture2D( grassTexture, vUV * 10.0 );
    vec4 rock = (smoothstep(0.31, 0.85, vAmount)) * texture2D( rockTexture, vUV * 10.0 ); 
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0) + grass + rock; 
} 