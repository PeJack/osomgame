attribute vec2 aPosition;
attribute vec2 aTextureCoord;

varying vec2 vTextureCoord;
uniform mat4 uModelViewMat;

uniform mat4 uViewModelMat;
uniform mat4 uProjectionMat;

uniform float uCameraLatitude;

uniform vec2 uSpriteRendererSize;
uniform vec2 uSpriteRendererOffset;
uniform mat4 uSpriteRendererAngle;
uniform vec3 uSpriteRendererPosition;
uniform float uSpriteRendererDepth;
uniform float uSpriteRendererZindex;

mat4 Project( mat4 mat, vec3 pos) {	
    // xyz = x(-z)y + middle of cell (0.5)    
    float x =  pos.x + 0.5;
    float y = -pos.z;
    float z =  pos.y + 0.5;

    // Matrix translation
    mat[3].x += mat[0].x * x + mat[1].x * y + mat[2].x * z;
    mat[3].y += mat[0].y * x + mat[1].y * y + mat[2].y * z;
    mat[3].z += (mat[0].z * x + mat[1].z * y + mat[2].z * z) + (uCameraLatitude / 50.0);
    mat[3].w += mat[0].w * x + mat[1].w * y + mat[2].w * z;
    
    // Spherical billboard
    mat[0].xyz = vec3( 1.0, 0.0, 0.0 );
    mat[1].xyz = vec3( 0.0, 1.0 + 0.5/uCameraLatitude, uCameraLatitude/50.0 );
    mat[2].xyz = vec3( 0.0, 0.0, 1.0 );
    return mat;
}

void main(void) {
    vTextureCoord = aTextureCoord;

    // Calculate position base on angle and sprite offset/size
    vec4 position = uSpriteRendererAngle * vec4( aPosition.x * uSpriteRendererSize.x, aPosition.y * uSpriteRendererSize.y, 0.0, 1.0 );
    position.x   += uSpriteRendererOffset.x;
    position.y   -= uSpriteRendererOffset.y + 0.5;

    // Project to camera plane
    gl_Position   = uProjectionMat * Project(uModelViewMat, uSpriteRendererPosition) * position;
    gl_Position.z -= uSpriteRendererZindex * 0.01 + uSpriteRendererDepth;
}