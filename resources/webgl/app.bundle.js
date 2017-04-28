/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.gl = undefined;

var _canvas = __webpack_require__(2);

var gl = exports.gl = void 0;

try {
	exports.gl = gl = _canvas.canvas.getContext("experimental-webgl");
} catch (e) {
	alert(e);
}

if (!gl) alert("Could not initialize WebGL");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.2.0
 */

/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

(function (_global) {
    "use strict";

    var shim = {};
    if (false) {
        if (typeof define == 'function' && _typeof(define.amd) == 'object' && define.amd) {
            shim.exports = {};
            define(function () {
                return shim.exports;
            });
        } else {
            // gl-matrix lives in a browser, define its namespaces in global
            shim.exports = typeof window !== 'undefined' ? window : _global;
        }
    } else {
        // gl-matrix lives in commonjs, define its namespaces in exports
        shim.exports = exports;
    }

    (function (exports) {
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.
        Redistribution and use in source and binary forms, with or without modification,
        are permitted provided that the following conditions are met:
        * Redistributions of source code must retain the above copyright notice, this
        list of conditions and the following disclaimer.
        * Redistributions in binary form must reproduce the above copyright notice,
        this list of conditions and the following disclaimer in the documentation 
        and/or other materials provided with the distribution.
        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
        ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
        WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
        DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
        ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
        (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
        LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
        ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
        (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
        SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        if (!GLMAT_EPSILON) {
            var GLMAT_EPSILON = 0.000001;
        }

        if (!GLMAT_ARRAY_TYPE) {
            var GLMAT_ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
        }

        if (!GLMAT_RANDOM) {
            var GLMAT_RANDOM = Math.random;
        }

        /**
         * @class Common utilities
         * @name glMatrix
         */
        var glMatrix = {};

        /**
         * Sets the type of array used when creating new vectors and matricies
         *
         * @param {Type} type Array type, such as Float32Array or Array
         */
        glMatrix.setMatrixArrayType = function (type) {
            GLMAT_ARRAY_TYPE = type;
        };

        if (typeof exports !== 'undefined') {
            exports.glMatrix = glMatrix;
        }

        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.
        
        Redistribution and use in source and binary forms, with or without modification,
        are permitted provided that the following conditions are met:
        
          * Redistributions of source code must retain the above copyright notice, this
            list of conditions and the following disclaimer.
          * Redistributions in binary form must reproduce the above copyright notice,
            this list of conditions and the following disclaimer in the documentation 
            and/or other materials provided with the distribution.
        
        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
        ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
        WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
        DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
        ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
        (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
        LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
        ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
        (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
        SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        /**
         * @class 2 Dimensional Vector
         * @name vec2
         */

        var vec2 = {};

        /**
         * Creates a new, empty vec2
         *
         * @returns {vec2} a new 2D vector
         */
        vec2.create = function () {
            var out = new GLMAT_ARRAY_TYPE(2);
            out[0] = 0;
            out[1] = 0;
            return out;
        };

        /**
         * Creates a new vec2 initialized with values from an existing vector
         *
         * @param {vec2} a vector to clone
         * @returns {vec2} a new 2D vector
         */
        vec2.clone = function (a) {
            var out = new GLMAT_ARRAY_TYPE(2);
            out[0] = a[0];
            out[1] = a[1];
            return out;
        };

        /**
         * Creates a new vec2 initialized with the given values
         *
         * @param {Number} x X component
         * @param {Number} y Y component
         * @returns {vec2} a new 2D vector
         */
        vec2.fromValues = function (x, y) {
            var out = new GLMAT_ARRAY_TYPE(2);
            out[0] = x;
            out[1] = y;
            return out;
        };

        /**
         * Copy the values from one vec2 to another
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the source vector
         * @returns {vec2} out
         */
        vec2.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            return out;
        };

        /**
         * Set the components of a vec2 to the given values
         *
         * @param {vec2} out the receiving vector
         * @param {Number} x X component
         * @param {Number} y Y component
         * @returns {vec2} out
         */
        vec2.set = function (out, x, y) {
            out[0] = x;
            out[1] = y;
            return out;
        };

        /**
         * Adds two vec2's
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec2} out
         */
        vec2.add = function (out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            return out;
        };

        /**
         * Subtracts vector b from vector a
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec2} out
         */
        vec2.subtract = function (out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            return out;
        };

        /**
         * Alias for {@link vec2.subtract}
         * @function
         */
        vec2.sub = vec2.subtract;

        /**
         * Multiplies two vec2's
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec2} out
         */
        vec2.multiply = function (out, a, b) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            return out;
        };

        /**
         * Alias for {@link vec2.multiply}
         * @function
         */
        vec2.mul = vec2.multiply;

        /**
         * Divides two vec2's
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec2} out
         */
        vec2.divide = function (out, a, b) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            return out;
        };

        /**
         * Alias for {@link vec2.divide}
         * @function
         */
        vec2.div = vec2.divide;

        /**
         * Returns the minimum of two vec2's
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec2} out
         */
        vec2.min = function (out, a, b) {
            out[0] = Math.min(a[0], b[0]);
            out[1] = Math.min(a[1], b[1]);
            return out;
        };

        /**
         * Returns the maximum of two vec2's
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec2} out
         */
        vec2.max = function (out, a, b) {
            out[0] = Math.max(a[0], b[0]);
            out[1] = Math.max(a[1], b[1]);
            return out;
        };

        /**
         * Scales a vec2 by a scalar number
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the vector to scale
         * @param {Number} b amount to scale the vector by
         * @returns {vec2} out
         */
        vec2.scale = function (out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            return out;
        };

        /**
         * Adds two vec2's after scaling the second operand by a scalar value
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @param {Number} scale the amount to scale b by before adding
         * @returns {vec2} out
         */
        vec2.scaleAndAdd = function (out, a, b, scale) {
            out[0] = a[0] + b[0] * scale;
            out[1] = a[1] + b[1] * scale;
            return out;
        };

        /**
         * Calculates the euclidian distance between two vec2's
         *
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {Number} distance between a and b
         */
        vec2.distance = function (a, b) {
            var x = b[0] - a[0],
                y = b[1] - a[1];
            return Math.sqrt(x * x + y * y);
        };

        /**
         * Alias for {@link vec2.distance}
         * @function
         */
        vec2.dist = vec2.distance;

        /**
         * Calculates the squared euclidian distance between two vec2's
         *
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {Number} squared distance between a and b
         */
        vec2.squaredDistance = function (a, b) {
            var x = b[0] - a[0],
                y = b[1] - a[1];
            return x * x + y * y;
        };

        /**
         * Alias for {@link vec2.squaredDistance}
         * @function
         */
        vec2.sqrDist = vec2.squaredDistance;

        /**
         * Calculates the length of a vec2
         *
         * @param {vec2} a vector to calculate length of
         * @returns {Number} length of a
         */
        vec2.length = function (a) {
            var x = a[0],
                y = a[1];
            return Math.sqrt(x * x + y * y);
        };

        /**
         * Alias for {@link vec2.length}
         * @function
         */
        vec2.len = vec2.length;

        /**
         * Calculates the squared length of a vec2
         *
         * @param {vec2} a vector to calculate squared length of
         * @returns {Number} squared length of a
         */
        vec2.squaredLength = function (a) {
            var x = a[0],
                y = a[1];
            return x * x + y * y;
        };

        /**
         * Alias for {@link vec2.squaredLength}
         * @function
         */
        vec2.sqrLen = vec2.squaredLength;

        /**
         * Negates the components of a vec2
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a vector to negate
         * @returns {vec2} out
         */
        vec2.negate = function (out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            return out;
        };

        /**
         * Normalize a vec2
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a vector to normalize
         * @returns {vec2} out
         */
        vec2.normalize = function (out, a) {
            var x = a[0],
                y = a[1];
            var len = x * x + y * y;
            if (len > 0) {
                //TODO: evaluate use of glm_invsqrt here?
                len = 1 / Math.sqrt(len);
                out[0] = a[0] * len;
                out[1] = a[1] * len;
            }
            return out;
        };

        /**
         * Calculates the dot product of two vec2's
         *
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {Number} dot product of a and b
         */
        vec2.dot = function (a, b) {
            return a[0] * b[0] + a[1] * b[1];
        };

        /**
         * Computes the cross product of two vec2's
         * Note that the cross product must by definition produce a 3D vector
         *
         * @param {vec3} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec3} out
         */
        vec2.cross = function (out, a, b) {
            var z = a[0] * b[1] - a[1] * b[0];
            out[0] = out[1] = 0;
            out[2] = z;
            return out;
        };

        /**
         * Performs a linear interpolation between two vec2's
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @param {Number} t interpolation amount between the two inputs
         * @returns {vec2} out
         */
        vec2.lerp = function (out, a, b, t) {
            var ax = a[0],
                ay = a[1];
            out[0] = ax + t * (b[0] - ax);
            out[1] = ay + t * (b[1] - ay);
            return out;
        };

        /**
         * Generates a random vector with the given scale
         *
         * @param {vec2} out the receiving vector
         * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
         * @returns {vec2} out
         */
        vec2.random = function (out, scale) {
            scale = scale || 1.0;
            var r = GLMAT_RANDOM() * 2.0 * Math.PI;
            out[0] = Math.cos(r) * scale;
            out[1] = Math.sin(r) * scale;
            return out;
        };

        /**
         * Transforms the vec2 with a mat2
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the vector to transform
         * @param {mat2} m matrix to transform with
         * @returns {vec2} out
         */
        vec2.transformMat2 = function (out, a, m) {
            var x = a[0],
                y = a[1];
            out[0] = m[0] * x + m[2] * y;
            out[1] = m[1] * x + m[3] * y;
            return out;
        };

        /**
         * Transforms the vec2 with a mat2d
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the vector to transform
         * @param {mat2d} m matrix to transform with
         * @returns {vec2} out
         */
        vec2.transformMat2d = function (out, a, m) {
            var x = a[0],
                y = a[1];
            out[0] = m[0] * x + m[2] * y + m[4];
            out[1] = m[1] * x + m[3] * y + m[5];
            return out;
        };

        /**
         * Transforms the vec2 with a mat3
         * 3rd vector component is implicitly '1'
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the vector to transform
         * @param {mat3} m matrix to transform with
         * @returns {vec2} out
         */
        vec2.transformMat3 = function (out, a, m) {
            var x = a[0],
                y = a[1];
            out[0] = m[0] * x + m[3] * y + m[6];
            out[1] = m[1] * x + m[4] * y + m[7];
            return out;
        };

        /**
         * Transforms the vec2 with a mat4
         * 3rd vector component is implicitly '0'
         * 4th vector component is implicitly '1'
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the vector to transform
         * @param {mat4} m matrix to transform with
         * @returns {vec2} out
         */
        vec2.transformMat4 = function (out, a, m) {
            var x = a[0],
                y = a[1];
            out[0] = m[0] * x + m[4] * y + m[12];
            out[1] = m[1] * x + m[5] * y + m[13];
            return out;
        };

        /**
         * Perform some operation over an array of vec2s.
         *
         * @param {Array} a the array of vectors to iterate over
         * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
         * @param {Number} offset Number of elements to skip at the beginning of the array
         * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
         * @param {Function} fn Function to call for each vector in the array
         * @param {Object} [arg] additional argument to pass to fn
         * @returns {Array} a
         * @function
         */
        vec2.forEach = function () {
            var vec = vec2.create();

            return function (a, stride, offset, count, fn, arg) {
                var i, l;
                if (!stride) {
                    stride = 2;
                }

                if (!offset) {
                    offset = 0;
                }

                if (count) {
                    l = Math.min(count * stride + offset, a.length);
                } else {
                    l = a.length;
                }

                for (i = offset; i < l; i += stride) {
                    vec[0] = a[i];vec[1] = a[i + 1];
                    fn(vec, vec, arg);
                    a[i] = vec[0];a[i + 1] = vec[1];
                }

                return a;
            };
        }();

        /**
         * Returns a string representation of a vector
         *
         * @param {vec2} vec vector to represent as a string
         * @returns {String} string representation of the vector
         */
        vec2.str = function (a) {
            return 'vec2(' + a[0] + ', ' + a[1] + ')';
        };

        if (typeof exports !== 'undefined') {
            exports.vec2 = vec2;
        }
        ;
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.
        
        Redistribution and use in source and binary forms, with or without modification,
        are permitted provided that the following conditions are met:
        
          * Redistributions of source code must retain the above copyright notice, this
            list of conditions and the following disclaimer.
          * Redistributions in binary form must reproduce the above copyright notice,
            this list of conditions and the following disclaimer in the documentation 
            and/or other materials provided with the distribution.
        
        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
        ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
        WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
        DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
        ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
        (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
        LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
        ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
        (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
        SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        /**
         * @class 3 Dimensional Vector
         * @name vec3
         */

        var vec3 = {};

        /**
         * Creates a new, empty vec3
         *
         * @returns {vec3} a new 3D vector
         */
        vec3.create = function () {
            var out = new GLMAT_ARRAY_TYPE(3);
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            return out;
        };

        /**
         * Creates a new vec3 initialized with values from an existing vector
         *
         * @param {vec3} a vector to clone
         * @returns {vec3} a new 3D vector
         */
        vec3.clone = function (a) {
            var out = new GLMAT_ARRAY_TYPE(3);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            return out;
        };

        /**
         * Creates a new vec3 initialized with the given values
         *
         * @param {Number} x X component
         * @param {Number} y Y component
         * @param {Number} z Z component
         * @returns {vec3} a new 3D vector
         */
        vec3.fromValues = function (x, y, z) {
            var out = new GLMAT_ARRAY_TYPE(3);
            out[0] = x;
            out[1] = y;
            out[2] = z;
            return out;
        };

        /**
         * Copy the values from one vec3 to another
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the source vector
         * @returns {vec3} out
         */
        vec3.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            return out;
        };

        /**
         * Set the components of a vec3 to the given values
         *
         * @param {vec3} out the receiving vector
         * @param {Number} x X component
         * @param {Number} y Y component
         * @param {Number} z Z component
         * @returns {vec3} out
         */
        vec3.set = function (out, x, y, z) {
            out[0] = x;
            out[1] = y;
            out[2] = z;
            return out;
        };

        /**
         * Adds two vec3's
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {vec3} out
         */
        vec3.add = function (out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
            return out;
        };

        /**
         * Subtracts vector b from vector a
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {vec3} out
         */
        vec3.subtract = function (out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            out[2] = a[2] - b[2];
            return out;
        };

        /**
         * Alias for {@link vec3.subtract}
         * @function
         */
        vec3.sub = vec3.subtract;

        /**
         * Multiplies two vec3's
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {vec3} out
         */
        vec3.multiply = function (out, a, b) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            out[2] = a[2] * b[2];
            return out;
        };

        /**
         * Alias for {@link vec3.multiply}
         * @function
         */
        vec3.mul = vec3.multiply;

        /**
         * Divides two vec3's
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {vec3} out
         */
        vec3.divide = function (out, a, b) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            out[2] = a[2] / b[2];
            return out;
        };

        /**
         * Alias for {@link vec3.divide}
         * @function
         */
        vec3.div = vec3.divide;

        /**
         * Returns the minimum of two vec3's
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {vec3} out
         */
        vec3.min = function (out, a, b) {
            out[0] = Math.min(a[0], b[0]);
            out[1] = Math.min(a[1], b[1]);
            out[2] = Math.min(a[2], b[2]);
            return out;
        };

        /**
         * Returns the maximum of two vec3's
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {vec3} out
         */
        vec3.max = function (out, a, b) {
            out[0] = Math.max(a[0], b[0]);
            out[1] = Math.max(a[1], b[1]);
            out[2] = Math.max(a[2], b[2]);
            return out;
        };

        /**
         * Scales a vec3 by a scalar number
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the vector to scale
         * @param {Number} b amount to scale the vector by
         * @returns {vec3} out
         */
        vec3.scale = function (out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            return out;
        };

        /**
         * Adds two vec3's after scaling the second operand by a scalar value
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @param {Number} scale the amount to scale b by before adding
         * @returns {vec3} out
         */
        vec3.scaleAndAdd = function (out, a, b, scale) {
            out[0] = a[0] + b[0] * scale;
            out[1] = a[1] + b[1] * scale;
            out[2] = a[2] + b[2] * scale;
            return out;
        };

        /**
         * Calculates the euclidian distance between two vec3's
         *
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {Number} distance between a and b
         */
        vec3.distance = function (a, b) {
            var x = b[0] - a[0],
                y = b[1] - a[1],
                z = b[2] - a[2];
            return Math.sqrt(x * x + y * y + z * z);
        };

        /**
         * Alias for {@link vec3.distance}
         * @function
         */
        vec3.dist = vec3.distance;

        /**
         * Calculates the squared euclidian distance between two vec3's
         *
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {Number} squared distance between a and b
         */
        vec3.squaredDistance = function (a, b) {
            var x = b[0] - a[0],
                y = b[1] - a[1],
                z = b[2] - a[2];
            return x * x + y * y + z * z;
        };

        /**
         * Alias for {@link vec3.squaredDistance}
         * @function
         */
        vec3.sqrDist = vec3.squaredDistance;

        /**
         * Calculates the length of a vec3
         *
         * @param {vec3} a vector to calculate length of
         * @returns {Number} length of a
         */
        vec3.length = function (a) {
            var x = a[0],
                y = a[1],
                z = a[2];
            return Math.sqrt(x * x + y * y + z * z);
        };

        /**
         * Alias for {@link vec3.length}
         * @function
         */
        vec3.len = vec3.length;

        /**
         * Calculates the squared length of a vec3
         *
         * @param {vec3} a vector to calculate squared length of
         * @returns {Number} squared length of a
         */
        vec3.squaredLength = function (a) {
            var x = a[0],
                y = a[1],
                z = a[2];
            return x * x + y * y + z * z;
        };

        /**
         * Alias for {@link vec3.squaredLength}
         * @function
         */
        vec3.sqrLen = vec3.squaredLength;

        /**
         * Negates the components of a vec3
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a vector to negate
         * @returns {vec3} out
         */
        vec3.negate = function (out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            return out;
        };

        /**
         * Normalize a vec3
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a vector to normalize
         * @returns {vec3} out
         */
        vec3.normalize = function (out, a) {
            var x = a[0],
                y = a[1],
                z = a[2];
            var len = x * x + y * y + z * z;
            if (len > 0) {
                //TODO: evaluate use of glm_invsqrt here?
                len = 1 / Math.sqrt(len);
                out[0] = a[0] * len;
                out[1] = a[1] * len;
                out[2] = a[2] * len;
            }
            return out;
        };

        /**
         * Calculates the dot product of two vec3's
         *
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {Number} dot product of a and b
         */
        vec3.dot = function (a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        };

        /**
         * Computes the cross product of two vec3's
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {vec3} out
         */
        vec3.cross = function (out, a, b) {
            var ax = a[0],
                ay = a[1],
                az = a[2],
                bx = b[0],
                by = b[1],
                bz = b[2];

            out[0] = ay * bz - az * by;
            out[1] = az * bx - ax * bz;
            out[2] = ax * by - ay * bx;
            return out;
        };

        /**
         * Performs a linear interpolation between two vec3's
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @param {Number} t interpolation amount between the two inputs
         * @returns {vec3} out
         */
        vec3.lerp = function (out, a, b, t) {
            var ax = a[0],
                ay = a[1],
                az = a[2];
            out[0] = ax + t * (b[0] - ax);
            out[1] = ay + t * (b[1] - ay);
            out[2] = az + t * (b[2] - az);
            return out;
        };

        /**
         * Generates a random vector with the given scale
         *
         * @param {vec3} out the receiving vector
         * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
         * @returns {vec3} out
         */
        vec3.random = function (out, scale) {
            scale = scale || 1.0;

            var r = GLMAT_RANDOM() * 2.0 * Math.PI;
            var z = GLMAT_RANDOM() * 2.0 - 1.0;
            var zScale = Math.sqrt(1.0 - z * z) * scale;

            out[0] = Math.cos(r) * zScale;
            out[1] = Math.sin(r) * zScale;
            out[2] = z * scale;
            return out;
        };

        /**
         * Transforms the vec3 with a mat4.
         * 4th vector component is implicitly '1'
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the vector to transform
         * @param {mat4} m matrix to transform with
         * @returns {vec3} out
         */
        vec3.transformMat4 = function (out, a, m) {
            var x = a[0],
                y = a[1],
                z = a[2];
            out[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
            out[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
            out[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
            return out;
        };

        /**
         * Transforms the vec3 with a mat3.
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the vector to transform
         * @param {mat4} m the 3x3 matrix to transform with
         * @returns {vec3} out
         */
        vec3.transformMat3 = function (out, a, m) {
            var x = a[0],
                y = a[1],
                z = a[2];
            out[0] = x * m[0] + y * m[3] + z * m[6];
            out[1] = x * m[1] + y * m[4] + z * m[7];
            out[2] = x * m[2] + y * m[5] + z * m[8];
            return out;
        };

        /**
         * Transforms the vec3 with a quat
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the vector to transform
         * @param {quat} q quaternion to transform with
         * @returns {vec3} out
         */
        vec3.transformQuat = function (out, a, q) {
            // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

            var x = a[0],
                y = a[1],
                z = a[2],
                qx = q[0],
                qy = q[1],
                qz = q[2],
                qw = q[3],


            // calculate quat * vec
            ix = qw * x + qy * z - qz * y,
                iy = qw * y + qz * x - qx * z,
                iz = qw * z + qx * y - qy * x,
                iw = -qx * x - qy * y - qz * z;

            // calculate result * inverse quat
            out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
            return out;
        };

        /**
         * Perform some operation over an array of vec3s.
         *
         * @param {Array} a the array of vectors to iterate over
         * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
         * @param {Number} offset Number of elements to skip at the beginning of the array
         * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
         * @param {Function} fn Function to call for each vector in the array
         * @param {Object} [arg] additional argument to pass to fn
         * @returns {Array} a
         * @function
         */
        vec3.forEach = function () {
            var vec = vec3.create();

            return function (a, stride, offset, count, fn, arg) {
                var i, l;
                if (!stride) {
                    stride = 3;
                }

                if (!offset) {
                    offset = 0;
                }

                if (count) {
                    l = Math.min(count * stride + offset, a.length);
                } else {
                    l = a.length;
                }

                for (i = offset; i < l; i += stride) {
                    vec[0] = a[i];vec[1] = a[i + 1];vec[2] = a[i + 2];
                    fn(vec, vec, arg);
                    a[i] = vec[0];a[i + 1] = vec[1];a[i + 2] = vec[2];
                }

                return a;
            };
        }();

        /**
         * Returns a string representation of a vector
         *
         * @param {vec3} vec vector to represent as a string
         * @returns {String} string representation of the vector
         */
        vec3.str = function (a) {
            return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
        };

        if (typeof exports !== 'undefined') {
            exports.vec3 = vec3;
        }
        ;
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.
        
        Redistribution and use in source and binary forms, with or without modification,
        are permitted provided that the following conditions are met:
        
          * Redistributions of source code must retain the above copyright notice, this
            list of conditions and the following disclaimer.
          * Redistributions in binary form must reproduce the above copyright notice,
            this list of conditions and the following disclaimer in the documentation 
            and/or other materials provided with the distribution.
        
        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
        ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
        WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
        DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
        ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
        (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
        LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
        ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
        (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
        SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        /**
         * @class 4 Dimensional Vector
         * @name vec4
         */

        var vec4 = {};

        /**
         * Creates a new, empty vec4
         *
         * @returns {vec4} a new 4D vector
         */
        vec4.create = function () {
            var out = new GLMAT_ARRAY_TYPE(4);
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            return out;
        };

        /**
         * Creates a new vec4 initialized with values from an existing vector
         *
         * @param {vec4} a vector to clone
         * @returns {vec4} a new 4D vector
         */
        vec4.clone = function (a) {
            var out = new GLMAT_ARRAY_TYPE(4);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        };

        /**
         * Creates a new vec4 initialized with the given values
         *
         * @param {Number} x X component
         * @param {Number} y Y component
         * @param {Number} z Z component
         * @param {Number} w W component
         * @returns {vec4} a new 4D vector
         */
        vec4.fromValues = function (x, y, z, w) {
            var out = new GLMAT_ARRAY_TYPE(4);
            out[0] = x;
            out[1] = y;
            out[2] = z;
            out[3] = w;
            return out;
        };

        /**
         * Copy the values from one vec4 to another
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the source vector
         * @returns {vec4} out
         */
        vec4.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        };

        /**
         * Set the components of a vec4 to the given values
         *
         * @param {vec4} out the receiving vector
         * @param {Number} x X component
         * @param {Number} y Y component
         * @param {Number} z Z component
         * @param {Number} w W component
         * @returns {vec4} out
         */
        vec4.set = function (out, x, y, z, w) {
            out[0] = x;
            out[1] = y;
            out[2] = z;
            out[3] = w;
            return out;
        };

        /**
         * Adds two vec4's
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {vec4} out
         */
        vec4.add = function (out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
            out[3] = a[3] + b[3];
            return out;
        };

        /**
         * Subtracts vector b from vector a
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {vec4} out
         */
        vec4.subtract = function (out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            out[2] = a[2] - b[2];
            out[3] = a[3] - b[3];
            return out;
        };

        /**
         * Alias for {@link vec4.subtract}
         * @function
         */
        vec4.sub = vec4.subtract;

        /**
         * Multiplies two vec4's
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {vec4} out
         */
        vec4.multiply = function (out, a, b) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            out[2] = a[2] * b[2];
            out[3] = a[3] * b[3];
            return out;
        };

        /**
         * Alias for {@link vec4.multiply}
         * @function
         */
        vec4.mul = vec4.multiply;

        /**
         * Divides two vec4's
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {vec4} out
         */
        vec4.divide = function (out, a, b) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            out[2] = a[2] / b[2];
            out[3] = a[3] / b[3];
            return out;
        };

        /**
         * Alias for {@link vec4.divide}
         * @function
         */
        vec4.div = vec4.divide;

        /**
         * Returns the minimum of two vec4's
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {vec4} out
         */
        vec4.min = function (out, a, b) {
            out[0] = Math.min(a[0], b[0]);
            out[1] = Math.min(a[1], b[1]);
            out[2] = Math.min(a[2], b[2]);
            out[3] = Math.min(a[3], b[3]);
            return out;
        };

        /**
         * Returns the maximum of two vec4's
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {vec4} out
         */
        vec4.max = function (out, a, b) {
            out[0] = Math.max(a[0], b[0]);
            out[1] = Math.max(a[1], b[1]);
            out[2] = Math.max(a[2], b[2]);
            out[3] = Math.max(a[3], b[3]);
            return out;
        };

        /**
         * Scales a vec4 by a scalar number
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the vector to scale
         * @param {Number} b amount to scale the vector by
         * @returns {vec4} out
         */
        vec4.scale = function (out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            out[3] = a[3] * b;
            return out;
        };

        /**
         * Adds two vec4's after scaling the second operand by a scalar value
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @param {Number} scale the amount to scale b by before adding
         * @returns {vec4} out
         */
        vec4.scaleAndAdd = function (out, a, b, scale) {
            out[0] = a[0] + b[0] * scale;
            out[1] = a[1] + b[1] * scale;
            out[2] = a[2] + b[2] * scale;
            out[3] = a[3] + b[3] * scale;
            return out;
        };

        /**
         * Calculates the euclidian distance between two vec4's
         *
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {Number} distance between a and b
         */
        vec4.distance = function (a, b) {
            var x = b[0] - a[0],
                y = b[1] - a[1],
                z = b[2] - a[2],
                w = b[3] - a[3];
            return Math.sqrt(x * x + y * y + z * z + w * w);
        };

        /**
         * Alias for {@link vec4.distance}
         * @function
         */
        vec4.dist = vec4.distance;

        /**
         * Calculates the squared euclidian distance between two vec4's
         *
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {Number} squared distance between a and b
         */
        vec4.squaredDistance = function (a, b) {
            var x = b[0] - a[0],
                y = b[1] - a[1],
                z = b[2] - a[2],
                w = b[3] - a[3];
            return x * x + y * y + z * z + w * w;
        };

        /**
         * Alias for {@link vec4.squaredDistance}
         * @function
         */
        vec4.sqrDist = vec4.squaredDistance;

        /**
         * Calculates the length of a vec4
         *
         * @param {vec4} a vector to calculate length of
         * @returns {Number} length of a
         */
        vec4.length = function (a) {
            var x = a[0],
                y = a[1],
                z = a[2],
                w = a[3];
            return Math.sqrt(x * x + y * y + z * z + w * w);
        };

        /**
         * Alias for {@link vec4.length}
         * @function
         */
        vec4.len = vec4.length;

        /**
         * Calculates the squared length of a vec4
         *
         * @param {vec4} a vector to calculate squared length of
         * @returns {Number} squared length of a
         */
        vec4.squaredLength = function (a) {
            var x = a[0],
                y = a[1],
                z = a[2],
                w = a[3];
            return x * x + y * y + z * z + w * w;
        };

        /**
         * Alias for {@link vec4.squaredLength}
         * @function
         */
        vec4.sqrLen = vec4.squaredLength;

        /**
         * Negates the components of a vec4
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a vector to negate
         * @returns {vec4} out
         */
        vec4.negate = function (out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            out[3] = -a[3];
            return out;
        };

        /**
         * Normalize a vec4
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a vector to normalize
         * @returns {vec4} out
         */
        vec4.normalize = function (out, a) {
            var x = a[0],
                y = a[1],
                z = a[2],
                w = a[3];
            var len = x * x + y * y + z * z + w * w;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
                out[0] = a[0] * len;
                out[1] = a[1] * len;
                out[2] = a[2] * len;
                out[3] = a[3] * len;
            }
            return out;
        };

        /**
         * Calculates the dot product of two vec4's
         *
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {Number} dot product of a and b
         */
        vec4.dot = function (a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
        };

        /**
         * Performs a linear interpolation between two vec4's
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @param {Number} t interpolation amount between the two inputs
         * @returns {vec4} out
         */
        vec4.lerp = function (out, a, b, t) {
            var ax = a[0],
                ay = a[1],
                az = a[2],
                aw = a[3];
            out[0] = ax + t * (b[0] - ax);
            out[1] = ay + t * (b[1] - ay);
            out[2] = az + t * (b[2] - az);
            out[3] = aw + t * (b[3] - aw);
            return out;
        };

        /**
         * Generates a random vector with the given scale
         *
         * @param {vec4} out the receiving vector
         * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
         * @returns {vec4} out
         */
        vec4.random = function (out, scale) {
            scale = scale || 1.0;

            //TODO: This is a pretty awful way of doing this. Find something better.
            out[0] = GLMAT_RANDOM();
            out[1] = GLMAT_RANDOM();
            out[2] = GLMAT_RANDOM();
            out[3] = GLMAT_RANDOM();
            vec4.normalize(out, out);
            vec4.scale(out, out, scale);
            return out;
        };

        /**
         * Transforms the vec4 with a mat4.
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the vector to transform
         * @param {mat4} m matrix to transform with
         * @returns {vec4} out
         */
        vec4.transformMat4 = function (out, a, m) {
            var x = a[0],
                y = a[1],
                z = a[2],
                w = a[3];
            out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
            out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
            out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
            out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
            return out;
        };

        /**
         * Transforms the vec4 with a quat
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the vector to transform
         * @param {quat} q quaternion to transform with
         * @returns {vec4} out
         */
        vec4.transformQuat = function (out, a, q) {
            var x = a[0],
                y = a[1],
                z = a[2],
                qx = q[0],
                qy = q[1],
                qz = q[2],
                qw = q[3],


            // calculate quat * vec
            ix = qw * x + qy * z - qz * y,
                iy = qw * y + qz * x - qx * z,
                iz = qw * z + qx * y - qy * x,
                iw = -qx * x - qy * y - qz * z;

            // calculate result * inverse quat
            out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
            return out;
        };

        /**
         * Perform some operation over an array of vec4s.
         *
         * @param {Array} a the array of vectors to iterate over
         * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
         * @param {Number} offset Number of elements to skip at the beginning of the array
         * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
         * @param {Function} fn Function to call for each vector in the array
         * @param {Object} [arg] additional argument to pass to fn
         * @returns {Array} a
         * @function
         */
        vec4.forEach = function () {
            var vec = vec4.create();

            return function (a, stride, offset, count, fn, arg) {
                var i, l;
                if (!stride) {
                    stride = 4;
                }

                if (!offset) {
                    offset = 0;
                }

                if (count) {
                    l = Math.min(count * stride + offset, a.length);
                } else {
                    l = a.length;
                }

                for (i = offset; i < l; i += stride) {
                    vec[0] = a[i];vec[1] = a[i + 1];vec[2] = a[i + 2];vec[3] = a[i + 3];
                    fn(vec, vec, arg);
                    a[i] = vec[0];a[i + 1] = vec[1];a[i + 2] = vec[2];a[i + 3] = vec[3];
                }

                return a;
            };
        }();

        /**
         * Returns a string representation of a vector
         *
         * @param {vec4} vec vector to represent as a string
         * @returns {String} string representation of the vector
         */
        vec4.str = function (a) {
            return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
        };

        if (typeof exports !== 'undefined') {
            exports.vec4 = vec4;
        }
        ;
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.
        
        Redistribution and use in source and binary forms, with or without modification,
        are permitted provided that the following conditions are met:
        
          * Redistributions of source code must retain the above copyright notice, this
            list of conditions and the following disclaimer.
          * Redistributions in binary form must reproduce the above copyright notice,
            this list of conditions and the following disclaimer in the documentation 
            and/or other materials provided with the distribution.
        
        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
        ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
        WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
        DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
        ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
        (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
        LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
        ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
        (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
        SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        /**
         * @class 2x2 Matrix
         * @name mat2
         */

        var mat2 = {};

        /**
         * Creates a new identity mat2
         *
         * @returns {mat2} a new 2x2 matrix
         */
        mat2.create = function () {
            var out = new GLMAT_ARRAY_TYPE(4);
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        };

        /**
         * Creates a new mat2 initialized with values from an existing matrix
         *
         * @param {mat2} a matrix to clone
         * @returns {mat2} a new 2x2 matrix
         */
        mat2.clone = function (a) {
            var out = new GLMAT_ARRAY_TYPE(4);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        };

        /**
         * Copy the values from one mat2 to another
         *
         * @param {mat2} out the receiving matrix
         * @param {mat2} a the source matrix
         * @returns {mat2} out
         */
        mat2.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        };

        /**
         * Set a mat2 to the identity matrix
         *
         * @param {mat2} out the receiving matrix
         * @returns {mat2} out
         */
        mat2.identity = function (out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        };

        /**
         * Transpose the values of a mat2
         *
         * @param {mat2} out the receiving matrix
         * @param {mat2} a the source matrix
         * @returns {mat2} out
         */
        mat2.transpose = function (out, a) {
            // If we are transposing ourselves we can skip a few steps but have to cache some values
            if (out === a) {
                var a1 = a[1];
                out[1] = a[2];
                out[2] = a1;
            } else {
                out[0] = a[0];
                out[1] = a[2];
                out[2] = a[1];
                out[3] = a[3];
            }

            return out;
        };

        /**
         * Inverts a mat2
         *
         * @param {mat2} out the receiving matrix
         * @param {mat2} a the source matrix
         * @returns {mat2} out
         */
        mat2.invert = function (out, a) {
            var a0 = a[0],
                a1 = a[1],
                a2 = a[2],
                a3 = a[3],


            // Calculate the determinant
            det = a0 * a3 - a2 * a1;

            if (!det) {
                return null;
            }
            det = 1.0 / det;

            out[0] = a3 * det;
            out[1] = -a1 * det;
            out[2] = -a2 * det;
            out[3] = a0 * det;

            return out;
        };

        /**
         * Calculates the adjugate of a mat2
         *
         * @param {mat2} out the receiving matrix
         * @param {mat2} a the source matrix
         * @returns {mat2} out
         */
        mat2.adjoint = function (out, a) {
            // Caching this value is nessecary if out == a
            var a0 = a[0];
            out[0] = a[3];
            out[1] = -a[1];
            out[2] = -a[2];
            out[3] = a0;

            return out;
        };

        /**
         * Calculates the determinant of a mat2
         *
         * @param {mat2} a the source matrix
         * @returns {Number} determinant of a
         */
        mat2.determinant = function (a) {
            return a[0] * a[3] - a[2] * a[1];
        };

        /**
         * Multiplies two mat2's
         *
         * @param {mat2} out the receiving matrix
         * @param {mat2} a the first operand
         * @param {mat2} b the second operand
         * @returns {mat2} out
         */
        mat2.multiply = function (out, a, b) {
            var a0 = a[0],
                a1 = a[1],
                a2 = a[2],
                a3 = a[3];
            var b0 = b[0],
                b1 = b[1],
                b2 = b[2],
                b3 = b[3];
            out[0] = a0 * b0 + a1 * b2;
            out[1] = a0 * b1 + a1 * b3;
            out[2] = a2 * b0 + a3 * b2;
            out[3] = a2 * b1 + a3 * b3;
            return out;
        };

        /**
         * Alias for {@link mat2.multiply}
         * @function
         */
        mat2.mul = mat2.multiply;

        /**
         * Rotates a mat2 by the given angle
         *
         * @param {mat2} out the receiving matrix
         * @param {mat2} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {mat2} out
         */
        mat2.rotate = function (out, a, rad) {
            var a0 = a[0],
                a1 = a[1],
                a2 = a[2],
                a3 = a[3],
                s = Math.sin(rad),
                c = Math.cos(rad);
            out[0] = a0 * c + a1 * s;
            out[1] = a0 * -s + a1 * c;
            out[2] = a2 * c + a3 * s;
            out[3] = a2 * -s + a3 * c;
            return out;
        };

        /**
         * Scales the mat2 by the dimensions in the given vec2
         *
         * @param {mat2} out the receiving matrix
         * @param {mat2} a the matrix to rotate
         * @param {vec2} v the vec2 to scale the matrix by
         * @returns {mat2} out
         **/
        mat2.scale = function (out, a, v) {
            var a0 = a[0],
                a1 = a[1],
                a2 = a[2],
                a3 = a[3],
                v0 = v[0],
                v1 = v[1];
            out[0] = a0 * v0;
            out[1] = a1 * v1;
            out[2] = a2 * v0;
            out[3] = a3 * v1;
            return out;
        };

        /**
         * Returns a string representation of a mat2
         *
         * @param {mat2} mat matrix to represent as a string
         * @returns {String} string representation of the matrix
         */
        mat2.str = function (a) {
            return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
        };

        if (typeof exports !== 'undefined') {
            exports.mat2 = mat2;
        }
        ;
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.
        
        Redistribution and use in source and binary forms, with or without modification,
        are permitted provided that the following conditions are met:
        
          * Redistributions of source code must retain the above copyright notice, this
            list of conditions and the following disclaimer.
          * Redistributions in binary form must reproduce the above copyright notice,
            this list of conditions and the following disclaimer in the documentation 
            and/or other materials provided with the distribution.
        
        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
        ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
        WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
        DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
        ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
        (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
        LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
        ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
        (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
        SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        /**
         * @class 2x3 Matrix
         * @name mat2d
         * 
         * @description 
         * A mat2d contains six elements defined as:
         * <pre>
         * [a, b,
         *  c, d,
         *  tx,ty]
         * </pre>
         * This is a short form for the 3x3 matrix:
         * <pre>
         * [a, b, 0
         *  c, d, 0
         *  tx,ty,1]
         * </pre>
         * The last column is ignored so the array is shorter and operations are faster.
         */

        var mat2d = {};

        /**
         * Creates a new identity mat2d
         *
         * @returns {mat2d} a new 2x3 matrix
         */
        mat2d.create = function () {
            var out = new GLMAT_ARRAY_TYPE(6);
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            out[4] = 0;
            out[5] = 0;
            return out;
        };

        /**
         * Creates a new mat2d initialized with values from an existing matrix
         *
         * @param {mat2d} a matrix to clone
         * @returns {mat2d} a new 2x3 matrix
         */
        mat2d.clone = function (a) {
            var out = new GLMAT_ARRAY_TYPE(6);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            return out;
        };

        /**
         * Copy the values from one mat2d to another
         *
         * @param {mat2d} out the receiving matrix
         * @param {mat2d} a the source matrix
         * @returns {mat2d} out
         */
        mat2d.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            return out;
        };

        /**
         * Set a mat2d to the identity matrix
         *
         * @param {mat2d} out the receiving matrix
         * @returns {mat2d} out
         */
        mat2d.identity = function (out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            out[4] = 0;
            out[5] = 0;
            return out;
        };

        /**
         * Inverts a mat2d
         *
         * @param {mat2d} out the receiving matrix
         * @param {mat2d} a the source matrix
         * @returns {mat2d} out
         */
        mat2d.invert = function (out, a) {
            var aa = a[0],
                ab = a[1],
                ac = a[2],
                ad = a[3],
                atx = a[4],
                aty = a[5];

            var det = aa * ad - ab * ac;
            if (!det) {
                return null;
            }
            det = 1.0 / det;

            out[0] = ad * det;
            out[1] = -ab * det;
            out[2] = -ac * det;
            out[3] = aa * det;
            out[4] = (ac * aty - ad * atx) * det;
            out[5] = (ab * atx - aa * aty) * det;
            return out;
        };

        /**
         * Calculates the determinant of a mat2d
         *
         * @param {mat2d} a the source matrix
         * @returns {Number} determinant of a
         */
        mat2d.determinant = function (a) {
            return a[0] * a[3] - a[1] * a[2];
        };

        /**
         * Multiplies two mat2d's
         *
         * @param {mat2d} out the receiving matrix
         * @param {mat2d} a the first operand
         * @param {mat2d} b the second operand
         * @returns {mat2d} out
         */
        mat2d.multiply = function (out, a, b) {
            var aa = a[0],
                ab = a[1],
                ac = a[2],
                ad = a[3],
                atx = a[4],
                aty = a[5],
                ba = b[0],
                bb = b[1],
                bc = b[2],
                bd = b[3],
                btx = b[4],
                bty = b[5];

            out[0] = aa * ba + ab * bc;
            out[1] = aa * bb + ab * bd;
            out[2] = ac * ba + ad * bc;
            out[3] = ac * bb + ad * bd;
            out[4] = ba * atx + bc * aty + btx;
            out[5] = bb * atx + bd * aty + bty;
            return out;
        };

        /**
         * Alias for {@link mat2d.multiply}
         * @function
         */
        mat2d.mul = mat2d.multiply;

        /**
         * Rotates a mat2d by the given angle
         *
         * @param {mat2d} out the receiving matrix
         * @param {mat2d} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {mat2d} out
         */
        mat2d.rotate = function (out, a, rad) {
            var aa = a[0],
                ab = a[1],
                ac = a[2],
                ad = a[3],
                atx = a[4],
                aty = a[5],
                st = Math.sin(rad),
                ct = Math.cos(rad);

            out[0] = aa * ct + ab * st;
            out[1] = -aa * st + ab * ct;
            out[2] = ac * ct + ad * st;
            out[3] = -ac * st + ct * ad;
            out[4] = ct * atx + st * aty;
            out[5] = ct * aty - st * atx;
            return out;
        };

        /**
         * Scales the mat2d by the dimensions in the given vec2
         *
         * @param {mat2d} out the receiving matrix
         * @param {mat2d} a the matrix to translate
         * @param {vec2} v the vec2 to scale the matrix by
         * @returns {mat2d} out
         **/
        mat2d.scale = function (out, a, v) {
            var vx = v[0],
                vy = v[1];
            out[0] = a[0] * vx;
            out[1] = a[1] * vy;
            out[2] = a[2] * vx;
            out[3] = a[3] * vy;
            out[4] = a[4] * vx;
            out[5] = a[5] * vy;
            return out;
        };

        /**
         * Translates the mat2d by the dimensions in the given vec2
         *
         * @param {mat2d} out the receiving matrix
         * @param {mat2d} a the matrix to translate
         * @param {vec2} v the vec2 to translate the matrix by
         * @returns {mat2d} out
         **/
        mat2d.translate = function (out, a, v) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4] + v[0];
            out[5] = a[5] + v[1];
            return out;
        };

        /**
         * Returns a string representation of a mat2d
         *
         * @param {mat2d} a matrix to represent as a string
         * @returns {String} string representation of the matrix
         */
        mat2d.str = function (a) {
            return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ')';
        };

        if (typeof exports !== 'undefined') {
            exports.mat2d = mat2d;
        }
        ;
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.
        
        Redistribution and use in source and binary forms, with or without modification,
        are permitted provided that the following conditions are met:
        
          * Redistributions of source code must retain the above copyright notice, this
            list of conditions and the following disclaimer.
          * Redistributions in binary form must reproduce the above copyright notice,
            this list of conditions and the following disclaimer in the documentation 
            and/or other materials provided with the distribution.
        
        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
        ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
        WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
        DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
        ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
        (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
        LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
        ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
        (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
        SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        /**
         * @class 3x3 Matrix
         * @name mat3
         */

        var mat3 = {};

        /**
         * Creates a new identity mat3
         *
         * @returns {mat3} a new 3x3 matrix
         */
        mat3.create = function () {
            var out = new GLMAT_ARRAY_TYPE(9);
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 1;
            out[5] = 0;
            out[6] = 0;
            out[7] = 0;
            out[8] = 1;
            return out;
        };

        /**
         * Copies the upper-left 3x3 values into the given mat3.
         *
         * @param {mat3} out the receiving 3x3 matrix
         * @param {mat4} a   the source 4x4 matrix
         * @returns {mat3} out
         */
        mat3.fromMat4 = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[4];
            out[4] = a[5];
            out[5] = a[6];
            out[6] = a[8];
            out[7] = a[9];
            out[8] = a[10];
            return out;
        };

        /**
         * Creates a new mat3 initialized with values from an existing matrix
         *
         * @param {mat3} a matrix to clone
         * @returns {mat3} a new 3x3 matrix
         */
        mat3.clone = function (a) {
            var out = new GLMAT_ARRAY_TYPE(9);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            return out;
        };

        /**
         * Copy the values from one mat3 to another
         *
         * @param {mat3} out the receiving matrix
         * @param {mat3} a the source matrix
         * @returns {mat3} out
         */
        mat3.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            return out;
        };

        /**
         * Set a mat3 to the identity matrix
         *
         * @param {mat3} out the receiving matrix
         * @returns {mat3} out
         */
        mat3.identity = function (out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 1;
            out[5] = 0;
            out[6] = 0;
            out[7] = 0;
            out[8] = 1;
            return out;
        };

        /**
         * Transpose the values of a mat3
         *
         * @param {mat3} out the receiving matrix
         * @param {mat3} a the source matrix
         * @returns {mat3} out
         */
        mat3.transpose = function (out, a) {
            // If we are transposing ourselves we can skip a few steps but have to cache some values
            if (out === a) {
                var a01 = a[1],
                    a02 = a[2],
                    a12 = a[5];
                out[1] = a[3];
                out[2] = a[6];
                out[3] = a01;
                out[5] = a[7];
                out[6] = a02;
                out[7] = a12;
            } else {
                out[0] = a[0];
                out[1] = a[3];
                out[2] = a[6];
                out[3] = a[1];
                out[4] = a[4];
                out[5] = a[7];
                out[6] = a[2];
                out[7] = a[5];
                out[8] = a[8];
            }

            return out;
        };

        /**
         * Inverts a mat3
         *
         * @param {mat3} out the receiving matrix
         * @param {mat3} a the source matrix
         * @returns {mat3} out
         */
        mat3.invert = function (out, a) {
            var a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a10 = a[3],
                a11 = a[4],
                a12 = a[5],
                a20 = a[6],
                a21 = a[7],
                a22 = a[8],
                b01 = a22 * a11 - a12 * a21,
                b11 = -a22 * a10 + a12 * a20,
                b21 = a21 * a10 - a11 * a20,


            // Calculate the determinant
            det = a00 * b01 + a01 * b11 + a02 * b21;

            if (!det) {
                return null;
            }
            det = 1.0 / det;

            out[0] = b01 * det;
            out[1] = (-a22 * a01 + a02 * a21) * det;
            out[2] = (a12 * a01 - a02 * a11) * det;
            out[3] = b11 * det;
            out[4] = (a22 * a00 - a02 * a20) * det;
            out[5] = (-a12 * a00 + a02 * a10) * det;
            out[6] = b21 * det;
            out[7] = (-a21 * a00 + a01 * a20) * det;
            out[8] = (a11 * a00 - a01 * a10) * det;
            return out;
        };

        /**
         * Calculates the adjugate of a mat3
         *
         * @param {mat3} out the receiving matrix
         * @param {mat3} a the source matrix
         * @returns {mat3} out
         */
        mat3.adjoint = function (out, a) {
            var a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a10 = a[3],
                a11 = a[4],
                a12 = a[5],
                a20 = a[6],
                a21 = a[7],
                a22 = a[8];

            out[0] = a11 * a22 - a12 * a21;
            out[1] = a02 * a21 - a01 * a22;
            out[2] = a01 * a12 - a02 * a11;
            out[3] = a12 * a20 - a10 * a22;
            out[4] = a00 * a22 - a02 * a20;
            out[5] = a02 * a10 - a00 * a12;
            out[6] = a10 * a21 - a11 * a20;
            out[7] = a01 * a20 - a00 * a21;
            out[8] = a00 * a11 - a01 * a10;
            return out;
        };

        /**
         * Calculates the determinant of a mat3
         *
         * @param {mat3} a the source matrix
         * @returns {Number} determinant of a
         */
        mat3.determinant = function (a) {
            var a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a10 = a[3],
                a11 = a[4],
                a12 = a[5],
                a20 = a[6],
                a21 = a[7],
                a22 = a[8];

            return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
        };

        /**
         * Multiplies two mat3's
         *
         * @param {mat3} out the receiving matrix
         * @param {mat3} a the first operand
         * @param {mat3} b the second operand
         * @returns {mat3} out
         */
        mat3.multiply = function (out, a, b) {
            var a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a10 = a[3],
                a11 = a[4],
                a12 = a[5],
                a20 = a[6],
                a21 = a[7],
                a22 = a[8],
                b00 = b[0],
                b01 = b[1],
                b02 = b[2],
                b10 = b[3],
                b11 = b[4],
                b12 = b[5],
                b20 = b[6],
                b21 = b[7],
                b22 = b[8];

            out[0] = b00 * a00 + b01 * a10 + b02 * a20;
            out[1] = b00 * a01 + b01 * a11 + b02 * a21;
            out[2] = b00 * a02 + b01 * a12 + b02 * a22;

            out[3] = b10 * a00 + b11 * a10 + b12 * a20;
            out[4] = b10 * a01 + b11 * a11 + b12 * a21;
            out[5] = b10 * a02 + b11 * a12 + b12 * a22;

            out[6] = b20 * a00 + b21 * a10 + b22 * a20;
            out[7] = b20 * a01 + b21 * a11 + b22 * a21;
            out[8] = b20 * a02 + b21 * a12 + b22 * a22;
            return out;
        };

        /**
         * Alias for {@link mat3.multiply}
         * @function
         */
        mat3.mul = mat3.multiply;

        /**
         * Translate a mat3 by the given vector
         *
         * @param {mat3} out the receiving matrix
         * @param {mat3} a the matrix to translate
         * @param {vec2} v vector to translate by
         * @returns {mat3} out
         */
        mat3.translate = function (out, a, v) {
            var a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a10 = a[3],
                a11 = a[4],
                a12 = a[5],
                a20 = a[6],
                a21 = a[7],
                a22 = a[8],
                x = v[0],
                y = v[1];

            out[0] = a00;
            out[1] = a01;
            out[2] = a02;

            out[3] = a10;
            out[4] = a11;
            out[5] = a12;

            out[6] = x * a00 + y * a10 + a20;
            out[7] = x * a01 + y * a11 + a21;
            out[8] = x * a02 + y * a12 + a22;
            return out;
        };

        /**
         * Rotates a mat3 by the given angle
         *
         * @param {mat3} out the receiving matrix
         * @param {mat3} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {mat3} out
         */
        mat3.rotate = function (out, a, rad) {
            var a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a10 = a[3],
                a11 = a[4],
                a12 = a[5],
                a20 = a[6],
                a21 = a[7],
                a22 = a[8],
                s = Math.sin(rad),
                c = Math.cos(rad);

            out[0] = c * a00 + s * a10;
            out[1] = c * a01 + s * a11;
            out[2] = c * a02 + s * a12;

            out[3] = c * a10 - s * a00;
            out[4] = c * a11 - s * a01;
            out[5] = c * a12 - s * a02;

            out[6] = a20;
            out[7] = a21;
            out[8] = a22;
            return out;
        };

        /**
         * Scales the mat3 by the dimensions in the given vec2
         *
         * @param {mat3} out the receiving matrix
         * @param {mat3} a the matrix to rotate
         * @param {vec2} v the vec2 to scale the matrix by
         * @returns {mat3} out
         **/
        mat3.scale = function (out, a, v) {
            var x = v[0],
                y = v[1];

            out[0] = x * a[0];
            out[1] = x * a[1];
            out[2] = x * a[2];

            out[3] = y * a[3];
            out[4] = y * a[4];
            out[5] = y * a[5];

            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            return out;
        };

        /**
         * Copies the values from a mat2d into a mat3
         *
         * @param {mat3} out the receiving matrix
         * @param {mat2d} a the matrix to copy
         * @returns {mat3} out
         **/
        mat3.fromMat2d = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = 0;

            out[3] = a[2];
            out[4] = a[3];
            out[5] = 0;

            out[6] = a[4];
            out[7] = a[5];
            out[8] = 1;
            return out;
        };

        /**
        * Calculates a 3x3 matrix from the given quaternion
        *
        * @param {mat3} out mat3 receiving operation result
        * @param {quat} q Quaternion to create matrix from
        *
        * @returns {mat3} out
        */
        mat3.fromQuat = function (out, q) {
            var x = q[0],
                y = q[1],
                z = q[2],
                w = q[3],
                x2 = x + x,
                y2 = y + y,
                z2 = z + z,
                xx = x * x2,
                xy = x * y2,
                xz = x * z2,
                yy = y * y2,
                yz = y * z2,
                zz = z * z2,
                wx = w * x2,
                wy = w * y2,
                wz = w * z2;

            out[0] = 1 - (yy + zz);
            out[3] = xy + wz;
            out[6] = xz - wy;

            out[1] = xy - wz;
            out[4] = 1 - (xx + zz);
            out[7] = yz + wx;

            out[2] = xz + wy;
            out[5] = yz - wx;
            out[8] = 1 - (xx + yy);

            return out;
        };

        /**
        * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
        *
        * @param {mat3} out mat3 receiving operation result
        * @param {mat4} a Mat4 to derive the normal matrix from
        *
        * @returns {mat3} out
        */
        mat3.normalFromMat4 = function (out, a) {
            var a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a03 = a[3],
                a10 = a[4],
                a11 = a[5],
                a12 = a[6],
                a13 = a[7],
                a20 = a[8],
                a21 = a[9],
                a22 = a[10],
                a23 = a[11],
                a30 = a[12],
                a31 = a[13],
                a32 = a[14],
                a33 = a[15],
                b00 = a00 * a11 - a01 * a10,
                b01 = a00 * a12 - a02 * a10,
                b02 = a00 * a13 - a03 * a10,
                b03 = a01 * a12 - a02 * a11,
                b04 = a01 * a13 - a03 * a11,
                b05 = a02 * a13 - a03 * a12,
                b06 = a20 * a31 - a21 * a30,
                b07 = a20 * a32 - a22 * a30,
                b08 = a20 * a33 - a23 * a30,
                b09 = a21 * a32 - a22 * a31,
                b10 = a21 * a33 - a23 * a31,
                b11 = a22 * a33 - a23 * a32,


            // Calculate the determinant
            det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

            if (!det) {
                return null;
            }
            det = 1.0 / det;

            out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
            out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
            out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

            out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
            out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
            out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

            out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
            out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
            out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

            return out;
        };

        /**
         * Returns a string representation of a mat3
         *
         * @param {mat3} mat matrix to represent as a string
         * @returns {String} string representation of the matrix
         */
        mat3.str = function (a) {
            return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ')';
        };

        if (typeof exports !== 'undefined') {
            exports.mat3 = mat3;
        }
        ;
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.
        
        Redistribution and use in source and binary forms, with or without modification,
        are permitted provided that the following conditions are met:
        
          * Redistributions of source code must retain the above copyright notice, this
            list of conditions and the following disclaimer.
          * Redistributions in binary form must reproduce the above copyright notice,
            this list of conditions and the following disclaimer in the documentation 
            and/or other materials provided with the distribution.
        
        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
        ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
        WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
        DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
        ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
        (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
        LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
        ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
        (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
        SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        /**
         * @class 4x4 Matrix
         * @name mat4
         */

        var mat4 = {};

        /**
         * Creates a new identity mat4
         *
         * @returns {mat4} a new 4x4 matrix
         */
        mat4.create = function () {
            var out = new GLMAT_ARRAY_TYPE(16);
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = 1;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 1;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out;
        };

        /**
         * Creates a new mat4 initialized with values from an existing matrix
         *
         * @param {mat4} a matrix to clone
         * @returns {mat4} a new 4x4 matrix
         */
        mat4.clone = function (a) {
            var out = new GLMAT_ARRAY_TYPE(16);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            out[9] = a[9];
            out[10] = a[10];
            out[11] = a[11];
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
            return out;
        };

        /**
         * Copy the values from one mat4 to another
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the source matrix
         * @returns {mat4} out
         */
        mat4.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            out[9] = a[9];
            out[10] = a[10];
            out[11] = a[11];
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
            return out;
        };

        /**
         * Set a mat4 to the identity matrix
         *
         * @param {mat4} out the receiving matrix
         * @returns {mat4} out
         */
        mat4.identity = function (out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = 1;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 1;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out;
        };

        /**
         * Transpose the values of a mat4
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the source matrix
         * @returns {mat4} out
         */
        mat4.transpose = function (out, a) {
            // If we are transposing ourselves we can skip a few steps but have to cache some values
            if (out === a) {
                var a01 = a[1],
                    a02 = a[2],
                    a03 = a[3],
                    a12 = a[6],
                    a13 = a[7],
                    a23 = a[11];

                out[1] = a[4];
                out[2] = a[8];
                out[3] = a[12];
                out[4] = a01;
                out[6] = a[9];
                out[7] = a[13];
                out[8] = a02;
                out[9] = a12;
                out[11] = a[14];
                out[12] = a03;
                out[13] = a13;
                out[14] = a23;
            } else {
                out[0] = a[0];
                out[1] = a[4];
                out[2] = a[8];
                out[3] = a[12];
                out[4] = a[1];
                out[5] = a[5];
                out[6] = a[9];
                out[7] = a[13];
                out[8] = a[2];
                out[9] = a[6];
                out[10] = a[10];
                out[11] = a[14];
                out[12] = a[3];
                out[13] = a[7];
                out[14] = a[11];
                out[15] = a[15];
            }

            return out;
        };

        /**
         * Inverts a mat4
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the source matrix
         * @returns {mat4} out
         */
        mat4.invert = function (out, a) {
            var a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a03 = a[3],
                a10 = a[4],
                a11 = a[5],
                a12 = a[6],
                a13 = a[7],
                a20 = a[8],
                a21 = a[9],
                a22 = a[10],
                a23 = a[11],
                a30 = a[12],
                a31 = a[13],
                a32 = a[14],
                a33 = a[15],
                b00 = a00 * a11 - a01 * a10,
                b01 = a00 * a12 - a02 * a10,
                b02 = a00 * a13 - a03 * a10,
                b03 = a01 * a12 - a02 * a11,
                b04 = a01 * a13 - a03 * a11,
                b05 = a02 * a13 - a03 * a12,
                b06 = a20 * a31 - a21 * a30,
                b07 = a20 * a32 - a22 * a30,
                b08 = a20 * a33 - a23 * a30,
                b09 = a21 * a32 - a22 * a31,
                b10 = a21 * a33 - a23 * a31,
                b11 = a22 * a33 - a23 * a32,


            // Calculate the determinant
            det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

            if (!det) {
                return null;
            }
            det = 1.0 / det;

            out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
            out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
            out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
            out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
            out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
            out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
            out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
            out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
            out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
            out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
            out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
            out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
            out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
            out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
            out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
            out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

            return out;
        };

        /**
         * Calculates the adjugate of a mat4
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the source matrix
         * @returns {mat4} out
         */
        mat4.adjoint = function (out, a) {
            var a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a03 = a[3],
                a10 = a[4],
                a11 = a[5],
                a12 = a[6],
                a13 = a[7],
                a20 = a[8],
                a21 = a[9],
                a22 = a[10],
                a23 = a[11],
                a30 = a[12],
                a31 = a[13],
                a32 = a[14],
                a33 = a[15];

            out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
            out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
            out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
            out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
            out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
            out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
            out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
            out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
            out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
            out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
            out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
            out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
            out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
            out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
            out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
            out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
            return out;
        };

        /**
         * Calculates the determinant of a mat4
         *
         * @param {mat4} a the source matrix
         * @returns {Number} determinant of a
         */
        mat4.determinant = function (a) {
            var a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a03 = a[3],
                a10 = a[4],
                a11 = a[5],
                a12 = a[6],
                a13 = a[7],
                a20 = a[8],
                a21 = a[9],
                a22 = a[10],
                a23 = a[11],
                a30 = a[12],
                a31 = a[13],
                a32 = a[14],
                a33 = a[15],
                b00 = a00 * a11 - a01 * a10,
                b01 = a00 * a12 - a02 * a10,
                b02 = a00 * a13 - a03 * a10,
                b03 = a01 * a12 - a02 * a11,
                b04 = a01 * a13 - a03 * a11,
                b05 = a02 * a13 - a03 * a12,
                b06 = a20 * a31 - a21 * a30,
                b07 = a20 * a32 - a22 * a30,
                b08 = a20 * a33 - a23 * a30,
                b09 = a21 * a32 - a22 * a31,
                b10 = a21 * a33 - a23 * a31,
                b11 = a22 * a33 - a23 * a32;

            // Calculate the determinant
            return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        };

        /**
         * Multiplies two mat4's
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the first operand
         * @param {mat4} b the second operand
         * @returns {mat4} out
         */
        mat4.multiply = function (out, a, b) {
            var a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a03 = a[3],
                a10 = a[4],
                a11 = a[5],
                a12 = a[6],
                a13 = a[7],
                a20 = a[8],
                a21 = a[9],
                a22 = a[10],
                a23 = a[11],
                a30 = a[12],
                a31 = a[13],
                a32 = a[14],
                a33 = a[15];

            // Cache only the current line of the second matrix
            var b0 = b[0],
                b1 = b[1],
                b2 = b[2],
                b3 = b[3];
            out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = b[4];b1 = b[5];b2 = b[6];b3 = b[7];
            out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = b[8];b1 = b[9];b2 = b[10];b3 = b[11];
            out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = b[12];b1 = b[13];b2 = b[14];b3 = b[15];
            out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            return out;
        };

        /**
         * Alias for {@link mat4.multiply}
         * @function
         */
        mat4.mul = mat4.multiply;

        /**
         * Translate a mat4 by the given vector
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the matrix to translate
         * @param {vec3} v vector to translate by
         * @returns {mat4} out
         */
        mat4.translate = function (out, a, v) {
            var x = v[0],
                y = v[1],
                z = v[2],
                a00,
                a01,
                a02,
                a03,
                a10,
                a11,
                a12,
                a13,
                a20,
                a21,
                a22,
                a23;

            if (a === out) {
                out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
                out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
                out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
                out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
            } else {
                a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
                a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
                a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];

                out[0] = a00;out[1] = a01;out[2] = a02;out[3] = a03;
                out[4] = a10;out[5] = a11;out[6] = a12;out[7] = a13;
                out[8] = a20;out[9] = a21;out[10] = a22;out[11] = a23;

                out[12] = a00 * x + a10 * y + a20 * z + a[12];
                out[13] = a01 * x + a11 * y + a21 * z + a[13];
                out[14] = a02 * x + a12 * y + a22 * z + a[14];
                out[15] = a03 * x + a13 * y + a23 * z + a[15];
            }

            return out;
        };

        /**
         * Scales the mat4 by the dimensions in the given vec3
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the matrix to scale
         * @param {vec3} v the vec3 to scale the matrix by
         * @returns {mat4} out
         **/
        mat4.scale = function (out, a, v) {
            var x = v[0],
                y = v[1],
                z = v[2];

            out[0] = a[0] * x;
            out[1] = a[1] * x;
            out[2] = a[2] * x;
            out[3] = a[3] * x;
            out[4] = a[4] * y;
            out[5] = a[5] * y;
            out[6] = a[6] * y;
            out[7] = a[7] * y;
            out[8] = a[8] * z;
            out[9] = a[9] * z;
            out[10] = a[10] * z;
            out[11] = a[11] * z;
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
            return out;
        };

        /**
         * Rotates a mat4 by the given angle
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @param {vec3} axis the axis to rotate around
         * @returns {mat4} out
         */
        mat4.rotate = function (out, a, rad, axis) {
            var x = axis[0],
                y = axis[1],
                z = axis[2],
                len = Math.sqrt(x * x + y * y + z * z),
                s,
                c,
                t,
                a00,
                a01,
                a02,
                a03,
                a10,
                a11,
                a12,
                a13,
                a20,
                a21,
                a22,
                a23,
                b00,
                b01,
                b02,
                b10,
                b11,
                b12,
                b20,
                b21,
                b22;

            if (Math.abs(len) < GLMAT_EPSILON) {
                return null;
            }

            len = 1 / len;
            x *= len;
            y *= len;
            z *= len;

            s = Math.sin(rad);
            c = Math.cos(rad);
            t = 1 - c;

            a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
            a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
            a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];

            // Construct the elements of the rotation matrix
            b00 = x * x * t + c;b01 = y * x * t + z * s;b02 = z * x * t - y * s;
            b10 = x * y * t - z * s;b11 = y * y * t + c;b12 = z * y * t + x * s;
            b20 = x * z * t + y * s;b21 = y * z * t - x * s;b22 = z * z * t + c;

            // Perform rotation-specific matrix multiplication
            out[0] = a00 * b00 + a10 * b01 + a20 * b02;
            out[1] = a01 * b00 + a11 * b01 + a21 * b02;
            out[2] = a02 * b00 + a12 * b01 + a22 * b02;
            out[3] = a03 * b00 + a13 * b01 + a23 * b02;
            out[4] = a00 * b10 + a10 * b11 + a20 * b12;
            out[5] = a01 * b10 + a11 * b11 + a21 * b12;
            out[6] = a02 * b10 + a12 * b11 + a22 * b12;
            out[7] = a03 * b10 + a13 * b11 + a23 * b12;
            out[8] = a00 * b20 + a10 * b21 + a20 * b22;
            out[9] = a01 * b20 + a11 * b21 + a21 * b22;
            out[10] = a02 * b20 + a12 * b21 + a22 * b22;
            out[11] = a03 * b20 + a13 * b21 + a23 * b22;

            if (a !== out) {
                // If the source and destination differ, copy the unchanged last row
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
            return out;
        };

        /**
         * Rotates a matrix by the given angle around the X axis
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {mat4} out
         */
        mat4.rotateX = function (out, a, rad) {
            var s = Math.sin(rad),
                c = Math.cos(rad),
                a10 = a[4],
                a11 = a[5],
                a12 = a[6],
                a13 = a[7],
                a20 = a[8],
                a21 = a[9],
                a22 = a[10],
                a23 = a[11];

            if (a !== out) {
                // If the source and destination differ, copy the unchanged rows
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                out[3] = a[3];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }

            // Perform axis-specific matrix multiplication
            out[4] = a10 * c + a20 * s;
            out[5] = a11 * c + a21 * s;
            out[6] = a12 * c + a22 * s;
            out[7] = a13 * c + a23 * s;
            out[8] = a20 * c - a10 * s;
            out[9] = a21 * c - a11 * s;
            out[10] = a22 * c - a12 * s;
            out[11] = a23 * c - a13 * s;
            return out;
        };

        /**
         * Rotates a matrix by the given angle around the Y axis
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {mat4} out
         */
        mat4.rotateY = function (out, a, rad) {
            var s = Math.sin(rad),
                c = Math.cos(rad),
                a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a03 = a[3],
                a20 = a[8],
                a21 = a[9],
                a22 = a[10],
                a23 = a[11];

            if (a !== out) {
                // If the source and destination differ, copy the unchanged rows
                out[4] = a[4];
                out[5] = a[5];
                out[6] = a[6];
                out[7] = a[7];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }

            // Perform axis-specific matrix multiplication
            out[0] = a00 * c - a20 * s;
            out[1] = a01 * c - a21 * s;
            out[2] = a02 * c - a22 * s;
            out[3] = a03 * c - a23 * s;
            out[8] = a00 * s + a20 * c;
            out[9] = a01 * s + a21 * c;
            out[10] = a02 * s + a22 * c;
            out[11] = a03 * s + a23 * c;
            return out;
        };

        /**
         * Rotates a matrix by the given angle around the Z axis
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {mat4} out
         */
        mat4.rotateZ = function (out, a, rad) {
            var s = Math.sin(rad),
                c = Math.cos(rad),
                a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a03 = a[3],
                a10 = a[4],
                a11 = a[5],
                a12 = a[6],
                a13 = a[7];

            if (a !== out) {
                // If the source and destination differ, copy the unchanged last row
                out[8] = a[8];
                out[9] = a[9];
                out[10] = a[10];
                out[11] = a[11];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }

            // Perform axis-specific matrix multiplication
            out[0] = a00 * c + a10 * s;
            out[1] = a01 * c + a11 * s;
            out[2] = a02 * c + a12 * s;
            out[3] = a03 * c + a13 * s;
            out[4] = a10 * c - a00 * s;
            out[5] = a11 * c - a01 * s;
            out[6] = a12 * c - a02 * s;
            out[7] = a13 * c - a03 * s;
            return out;
        };

        /**
         * Creates a matrix from a quaternion rotation and vector translation
         * This is equivalent to (but much faster than):
         *
         *     mat4.identity(dest);
         *     mat4.translate(dest, vec);
         *     var quatMat = mat4.create();
         *     quat4.toMat4(quat, quatMat);
         *     mat4.multiply(dest, quatMat);
         *
         * @param {mat4} out mat4 receiving operation result
         * @param {quat4} q Rotation quaternion
         * @param {vec3} v Translation vector
         * @returns {mat4} out
         */
        mat4.fromRotationTranslation = function (out, q, v) {
            // Quaternion math
            var x = q[0],
                y = q[1],
                z = q[2],
                w = q[3],
                x2 = x + x,
                y2 = y + y,
                z2 = z + z,
                xx = x * x2,
                xy = x * y2,
                xz = x * z2,
                yy = y * y2,
                yz = y * z2,
                zz = z * z2,
                wx = w * x2,
                wy = w * y2,
                wz = w * z2;

            out[0] = 1 - (yy + zz);
            out[1] = xy + wz;
            out[2] = xz - wy;
            out[3] = 0;
            out[4] = xy - wz;
            out[5] = 1 - (xx + zz);
            out[6] = yz + wx;
            out[7] = 0;
            out[8] = xz + wy;
            out[9] = yz - wx;
            out[10] = 1 - (xx + yy);
            out[11] = 0;
            out[12] = v[0];
            out[13] = v[1];
            out[14] = v[2];
            out[15] = 1;

            return out;
        };

        /**
        * Calculates a 4x4 matrix from the given quaternion
        *
        * @param {mat4} out mat4 receiving operation result
        * @param {quat} q Quaternion to create matrix from
        *
        * @returns {mat4} out
        */
        mat4.fromQuat = function (out, q) {
            var x = q[0],
                y = q[1],
                z = q[2],
                w = q[3],
                x2 = x + x,
                y2 = y + y,
                z2 = z + z,
                xx = x * x2,
                xy = x * y2,
                xz = x * z2,
                yy = y * y2,
                yz = y * z2,
                zz = z * z2,
                wx = w * x2,
                wy = w * y2,
                wz = w * z2;

            out[0] = 1 - (yy + zz);
            out[1] = xy + wz;
            out[2] = xz - wy;
            out[3] = 0;

            out[4] = xy - wz;
            out[5] = 1 - (xx + zz);
            out[6] = yz + wx;
            out[7] = 0;

            out[8] = xz + wy;
            out[9] = yz - wx;
            out[10] = 1 - (xx + yy);
            out[11] = 0;

            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;

            return out;
        };

        /**
         * Generates a frustum matrix with the given bounds
         *
         * @param {mat4} out mat4 frustum matrix will be written into
         * @param {Number} left Left bound of the frustum
         * @param {Number} right Right bound of the frustum
         * @param {Number} bottom Bottom bound of the frustum
         * @param {Number} top Top bound of the frustum
         * @param {Number} near Near bound of the frustum
         * @param {Number} far Far bound of the frustum
         * @returns {mat4} out
         */
        mat4.frustum = function (out, left, right, bottom, top, near, far) {
            var rl = 1 / (right - left),
                tb = 1 / (top - bottom),
                nf = 1 / (near - far);
            out[0] = near * 2 * rl;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = near * 2 * tb;
            out[6] = 0;
            out[7] = 0;
            out[8] = (right + left) * rl;
            out[9] = (top + bottom) * tb;
            out[10] = (far + near) * nf;
            out[11] = -1;
            out[12] = 0;
            out[13] = 0;
            out[14] = far * near * 2 * nf;
            out[15] = 0;
            return out;
        };

        /**
         * Generates a perspective projection matrix with the given bounds
         *
         * @param {mat4} out mat4 frustum matrix will be written into
         * @param {number} fovy Vertical field of view in radians
         * @param {number} aspect Aspect ratio. typically viewport width/height
         * @param {number} near Near bound of the frustum
         * @param {number} far Far bound of the frustum
         * @returns {mat4} out
         */
        mat4.perspective = function (out, fovy, aspect, near, far) {
            var f = 1.0 / Math.tan(fovy / 2),
                nf = 1 / (near - far);
            out[0] = f / aspect;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = f;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = (far + near) * nf;
            out[11] = -1;
            out[12] = 0;
            out[13] = 0;
            out[14] = 2 * far * near * nf;
            out[15] = 0;
            return out;
        };

        /**
         * Generates a orthogonal projection matrix with the given bounds
         *
         * @param {mat4} out mat4 frustum matrix will be written into
         * @param {number} left Left bound of the frustum
         * @param {number} right Right bound of the frustum
         * @param {number} bottom Bottom bound of the frustum
         * @param {number} top Top bound of the frustum
         * @param {number} near Near bound of the frustum
         * @param {number} far Far bound of the frustum
         * @returns {mat4} out
         */
        mat4.ortho = function (out, left, right, bottom, top, near, far) {
            var lr = 1 / (left - right),
                bt = 1 / (bottom - top),
                nf = 1 / (near - far);
            out[0] = -2 * lr;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = -2 * bt;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 2 * nf;
            out[11] = 0;
            out[12] = (left + right) * lr;
            out[13] = (top + bottom) * bt;
            out[14] = (far + near) * nf;
            out[15] = 1;
            return out;
        };

        /**
         * Generates a look-at matrix with the given eye position, focal point, and up axis
         *
         * @param {mat4} out mat4 frustum matrix will be written into
         * @param {vec3} eye Position of the viewer
         * @param {vec3} center Point the viewer is looking at
         * @param {vec3} up vec3 pointing up
         * @returns {mat4} out
         */
        mat4.lookAt = function (out, eye, center, up) {
            var x0,
                x1,
                x2,
                y0,
                y1,
                y2,
                z0,
                z1,
                z2,
                len,
                eyex = eye[0],
                eyey = eye[1],
                eyez = eye[2],
                upx = up[0],
                upy = up[1],
                upz = up[2],
                centerx = center[0],
                centery = center[1],
                centerz = center[2];

            if (Math.abs(eyex - centerx) < GLMAT_EPSILON && Math.abs(eyey - centery) < GLMAT_EPSILON && Math.abs(eyez - centerz) < GLMAT_EPSILON) {
                return mat4.identity(out);
            }

            z0 = eyex - centerx;
            z1 = eyey - centery;
            z2 = eyez - centerz;

            len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
            z0 *= len;
            z1 *= len;
            z2 *= len;

            x0 = upy * z2 - upz * z1;
            x1 = upz * z0 - upx * z2;
            x2 = upx * z1 - upy * z0;
            len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
            if (!len) {
                x0 = 0;
                x1 = 0;
                x2 = 0;
            } else {
                len = 1 / len;
                x0 *= len;
                x1 *= len;
                x2 *= len;
            }

            y0 = z1 * x2 - z2 * x1;
            y1 = z2 * x0 - z0 * x2;
            y2 = z0 * x1 - z1 * x0;

            len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
            if (!len) {
                y0 = 0;
                y1 = 0;
                y2 = 0;
            } else {
                len = 1 / len;
                y0 *= len;
                y1 *= len;
                y2 *= len;
            }

            out[0] = x0;
            out[1] = y0;
            out[2] = z0;
            out[3] = 0;
            out[4] = x1;
            out[5] = y1;
            out[6] = z1;
            out[7] = 0;
            out[8] = x2;
            out[9] = y2;
            out[10] = z2;
            out[11] = 0;
            out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
            out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
            out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
            out[15] = 1;

            return out;
        };

        /**
         * Returns a string representation of a mat4
         *
         * @param {mat4} mat matrix to represent as a string
         * @returns {String} string representation of the matrix
         */
        mat4.str = function (a) {
            return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
        };

        if (typeof exports !== 'undefined') {
            exports.mat4 = mat4;
        }
        ;
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.
        
        Redistribution and use in source and binary forms, with or without modification,
        are permitted provided that the following conditions are met:
        
          * Redistributions of source code must retain the above copyright notice, this
            list of conditions and the following disclaimer.
          * Redistributions in binary form must reproduce the above copyright notice,
            this list of conditions and the following disclaimer in the documentation 
            and/or other materials provided with the distribution.
        
        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
        ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
        WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
        DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
        ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
        (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
        LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
        ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
        (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
        SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        /**
         * @class Quaternion
         * @name quat
         */

        var quat = {};

        /**
         * Creates a new identity quat
         *
         * @returns {quat} a new quaternion
         */
        quat.create = function () {
            var out = new GLMAT_ARRAY_TYPE(4);
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        };

        /**
         * Sets a quaternion to represent the shortest rotation from one
         * vector to another.
         *
         * Both vectors are assumed to be unit length.
         *
         * @param {quat} out the receiving quaternion.
         * @param {vec3} a the initial vector
         * @param {vec3} b the destination vector
         * @returns {quat} out
         */
        quat.rotationTo = function () {
            var tmpvec3 = vec3.create();
            var xUnitVec3 = vec3.fromValues(1, 0, 0);
            var yUnitVec3 = vec3.fromValues(0, 1, 0);

            return function (out, a, b) {
                var dot = vec3.dot(a, b);
                if (dot < -0.999999) {
                    vec3.cross(tmpvec3, xUnitVec3, a);
                    if (vec3.length(tmpvec3) < 0.000001) vec3.cross(tmpvec3, yUnitVec3, a);
                    vec3.normalize(tmpvec3, tmpvec3);
                    quat.setAxisAngle(out, tmpvec3, Math.PI);
                    return out;
                } else if (dot > 0.999999) {
                    out[0] = 0;
                    out[1] = 0;
                    out[2] = 0;
                    out[3] = 1;
                    return out;
                } else {
                    vec3.cross(tmpvec3, a, b);
                    out[0] = tmpvec3[0];
                    out[1] = tmpvec3[1];
                    out[2] = tmpvec3[2];
                    out[3] = 1 + dot;
                    return quat.normalize(out, out);
                }
            };
        }();

        /**
         * Sets the specified quaternion with values corresponding to the given
         * axes. Each axis is a vec3 and is expected to be unit length and
         * perpendicular to all other specified axes.
         *
         * @param {vec3} view  the vector representing the viewing direction
         * @param {vec3} right the vector representing the local "right" direction
         * @param {vec3} up    the vector representing the local "up" direction
         * @returns {quat} out
         */
        quat.setAxes = function () {
            var matr = mat3.create();

            return function (out, view, right, up) {
                matr[0] = right[0];
                matr[3] = right[1];
                matr[6] = right[2];

                matr[1] = up[0];
                matr[4] = up[1];
                matr[7] = up[2];

                matr[2] = view[0];
                matr[5] = view[1];
                matr[8] = view[2];

                return quat.normalize(out, quat.fromMat3(out, matr));
            };
        }();

        /**
         * Creates a new quat initialized with values from an existing quaternion
         *
         * @param {quat} a quaternion to clone
         * @returns {quat} a new quaternion
         * @function
         */
        quat.clone = vec4.clone;

        /**
         * Creates a new quat initialized with the given values
         *
         * @param {Number} x X component
         * @param {Number} y Y component
         * @param {Number} z Z component
         * @param {Number} w W component
         * @returns {quat} a new quaternion
         * @function
         */
        quat.fromValues = vec4.fromValues;

        /**
         * Copy the values from one quat to another
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a the source quaternion
         * @returns {quat} out
         * @function
         */
        quat.copy = vec4.copy;

        /**
         * Set the components of a quat to the given values
         *
         * @param {quat} out the receiving quaternion
         * @param {Number} x X component
         * @param {Number} y Y component
         * @param {Number} z Z component
         * @param {Number} w W component
         * @returns {quat} out
         * @function
         */
        quat.set = vec4.set;

        /**
         * Set a quat to the identity quaternion
         *
         * @param {quat} out the receiving quaternion
         * @returns {quat} out
         */
        quat.identity = function (out) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        };

        /**
         * Sets a quat from the given angle and rotation axis,
         * then returns it.
         *
         * @param {quat} out the receiving quaternion
         * @param {vec3} axis the axis around which to rotate
         * @param {Number} rad the angle in radians
         * @returns {quat} out
         **/
        quat.setAxisAngle = function (out, axis, rad) {
            rad = rad * 0.5;
            var s = Math.sin(rad);
            out[0] = s * axis[0];
            out[1] = s * axis[1];
            out[2] = s * axis[2];
            out[3] = Math.cos(rad);
            return out;
        };

        /**
         * Adds two quat's
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a the first operand
         * @param {quat} b the second operand
         * @returns {quat} out
         * @function
         */
        quat.add = vec4.add;

        /**
         * Multiplies two quat's
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a the first operand
         * @param {quat} b the second operand
         * @returns {quat} out
         */
        quat.multiply = function (out, a, b) {
            var ax = a[0],
                ay = a[1],
                az = a[2],
                aw = a[3],
                bx = b[0],
                by = b[1],
                bz = b[2],
                bw = b[3];

            out[0] = ax * bw + aw * bx + ay * bz - az * by;
            out[1] = ay * bw + aw * by + az * bx - ax * bz;
            out[2] = az * bw + aw * bz + ax * by - ay * bx;
            out[3] = aw * bw - ax * bx - ay * by - az * bz;
            return out;
        };

        /**
         * Alias for {@link quat.multiply}
         * @function
         */
        quat.mul = quat.multiply;

        /**
         * Scales a quat by a scalar number
         *
         * @param {quat} out the receiving vector
         * @param {quat} a the vector to scale
         * @param {Number} b amount to scale the vector by
         * @returns {quat} out
         * @function
         */
        quat.scale = vec4.scale;

        /**
         * Rotates a quaternion by the given angle about the X axis
         *
         * @param {quat} out quat receiving operation result
         * @param {quat} a quat to rotate
         * @param {number} rad angle (in radians) to rotate
         * @returns {quat} out
         */
        quat.rotateX = function (out, a, rad) {
            rad *= 0.5;

            var ax = a[0],
                ay = a[1],
                az = a[2],
                aw = a[3],
                bx = Math.sin(rad),
                bw = Math.cos(rad);

            out[0] = ax * bw + aw * bx;
            out[1] = ay * bw + az * bx;
            out[2] = az * bw - ay * bx;
            out[3] = aw * bw - ax * bx;
            return out;
        };

        /**
         * Rotates a quaternion by the given angle about the Y axis
         *
         * @param {quat} out quat receiving operation result
         * @param {quat} a quat to rotate
         * @param {number} rad angle (in radians) to rotate
         * @returns {quat} out
         */
        quat.rotateY = function (out, a, rad) {
            rad *= 0.5;

            var ax = a[0],
                ay = a[1],
                az = a[2],
                aw = a[3],
                by = Math.sin(rad),
                bw = Math.cos(rad);

            out[0] = ax * bw - az * by;
            out[1] = ay * bw + aw * by;
            out[2] = az * bw + ax * by;
            out[3] = aw * bw - ay * by;
            return out;
        };

        /**
         * Rotates a quaternion by the given angle about the Z axis
         *
         * @param {quat} out quat receiving operation result
         * @param {quat} a quat to rotate
         * @param {number} rad angle (in radians) to rotate
         * @returns {quat} out
         */
        quat.rotateZ = function (out, a, rad) {
            rad *= 0.5;

            var ax = a[0],
                ay = a[1],
                az = a[2],
                aw = a[3],
                bz = Math.sin(rad),
                bw = Math.cos(rad);

            out[0] = ax * bw + ay * bz;
            out[1] = ay * bw - ax * bz;
            out[2] = az * bw + aw * bz;
            out[3] = aw * bw - az * bz;
            return out;
        };

        /**
         * Calculates the W component of a quat from the X, Y, and Z components.
         * Assumes that quaternion is 1 unit in length.
         * Any existing W component will be ignored.
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a quat to calculate W component of
         * @returns {quat} out
         */
        quat.calculateW = function (out, a) {
            var x = a[0],
                y = a[1],
                z = a[2];

            out[0] = x;
            out[1] = y;
            out[2] = z;
            out[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
            return out;
        };

        /**
         * Calculates the dot product of two quat's
         *
         * @param {quat} a the first operand
         * @param {quat} b the second operand
         * @returns {Number} dot product of a and b
         * @function
         */
        quat.dot = vec4.dot;

        /**
         * Performs a linear interpolation between two quat's
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a the first operand
         * @param {quat} b the second operand
         * @param {Number} t interpolation amount between the two inputs
         * @returns {quat} out
         * @function
         */
        quat.lerp = vec4.lerp;

        /**
         * Performs a spherical linear interpolation between two quat
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a the first operand
         * @param {quat} b the second operand
         * @param {Number} t interpolation amount between the two inputs
         * @returns {quat} out
         */
        quat.slerp = function (out, a, b, t) {
            // benchmarks:
            //    http://jsperf.com/quaternion-slerp-implementations

            var ax = a[0],
                ay = a[1],
                az = a[2],
                aw = a[3],
                bx = b[0],
                by = b[1],
                bz = b[2],
                bw = b[3];

            var omega, cosom, sinom, scale0, scale1;

            // calc cosine
            cosom = ax * bx + ay * by + az * bz + aw * bw;
            // adjust signs (if necessary)
            if (cosom < 0.0) {
                cosom = -cosom;
                bx = -bx;
                by = -by;
                bz = -bz;
                bw = -bw;
            }
            // calculate coefficients
            if (1.0 - cosom > 0.000001) {
                // standard case (slerp)
                omega = Math.acos(cosom);
                sinom = Math.sin(omega);
                scale0 = Math.sin((1.0 - t) * omega) / sinom;
                scale1 = Math.sin(t * omega) / sinom;
            } else {
                // "from" and "to" quaternions are very close 
                //  ... so we can do a linear interpolation
                scale0 = 1.0 - t;
                scale1 = t;
            }
            // calculate final values
            out[0] = scale0 * ax + scale1 * bx;
            out[1] = scale0 * ay + scale1 * by;
            out[2] = scale0 * az + scale1 * bz;
            out[3] = scale0 * aw + scale1 * bw;

            return out;
        };

        /**
         * Calculates the inverse of a quat
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a quat to calculate inverse of
         * @returns {quat} out
         */
        quat.invert = function (out, a) {
            var a0 = a[0],
                a1 = a[1],
                a2 = a[2],
                a3 = a[3],
                dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3,
                invDot = dot ? 1.0 / dot : 0;

            // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

            out[0] = -a0 * invDot;
            out[1] = -a1 * invDot;
            out[2] = -a2 * invDot;
            out[3] = a3 * invDot;
            return out;
        };

        /**
         * Calculates the conjugate of a quat
         * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a quat to calculate conjugate of
         * @returns {quat} out
         */
        quat.conjugate = function (out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            out[3] = a[3];
            return out;
        };

        /**
         * Calculates the length of a quat
         *
         * @param {quat} a vector to calculate length of
         * @returns {Number} length of a
         * @function
         */
        quat.length = vec4.length;

        /**
         * Alias for {@link quat.length}
         * @function
         */
        quat.len = quat.length;

        /**
         * Calculates the squared length of a quat
         *
         * @param {quat} a vector to calculate squared length of
         * @returns {Number} squared length of a
         * @function
         */
        quat.squaredLength = vec4.squaredLength;

        /**
         * Alias for {@link quat.squaredLength}
         * @function
         */
        quat.sqrLen = quat.squaredLength;

        /**
         * Normalize a quat
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a quaternion to normalize
         * @returns {quat} out
         * @function
         */
        quat.normalize = vec4.normalize;

        /**
         * Creates a quaternion from the given 3x3 rotation matrix.
         *
         * NOTE: The resultant quaternion is not normalized, so you should be sure
         * to renormalize the quaternion yourself where necessary.
         *
         * @param {quat} out the receiving quaternion
         * @param {mat3} m rotation matrix
         * @returns {quat} out
         * @function
         */
        quat.fromMat3 = function () {
            // benchmarks:
            //    http://jsperf.com/typed-array-access-speed
            //    http://jsperf.com/conversion-of-3x3-matrix-to-quaternion

            var s_iNext = typeof Int8Array !== 'undefined' ? new Int8Array([1, 2, 0]) : [1, 2, 0];

            return function (out, m) {
                // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
                // article "Quaternion Calculus and Fast Animation".
                var fTrace = m[0] + m[4] + m[8];
                var fRoot;

                if (fTrace > 0.0) {
                    // |w| > 1/2, may as well choose w > 1/2
                    fRoot = Math.sqrt(fTrace + 1.0); // 2w
                    out[3] = 0.5 * fRoot;
                    fRoot = 0.5 / fRoot; // 1/(4w)
                    out[0] = (m[7] - m[5]) * fRoot;
                    out[1] = (m[2] - m[6]) * fRoot;
                    out[2] = (m[3] - m[1]) * fRoot;
                } else {
                    // |w| <= 1/2
                    var i = 0;
                    if (m[4] > m[0]) i = 1;
                    if (m[8] > m[i * 3 + i]) i = 2;
                    var j = s_iNext[i];
                    var k = s_iNext[j];

                    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
                    out[i] = 0.5 * fRoot;
                    fRoot = 0.5 / fRoot;
                    out[3] = (m[k * 3 + j] - m[j * 3 + k]) * fRoot;
                    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
                    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
                }

                return out;
            };
        }();

        /**
         * Returns a string representation of a quatenion
         *
         * @param {quat} vec vector to represent as a string
         * @returns {String} string representation of the vector
         */
        quat.str = function (a) {
            return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
        };

        if (typeof exports !== 'undefined') {
            exports.quat = quat;
        }
        ;
    })(shim.exports);
})(undefined);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var canvas = exports.canvas = document.getElementById("glcanvas");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Data = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _program = __webpack_require__(13);

var _webgl = __webpack_require__(0);

var _light = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var worldV = __webpack_require__(20);
var worldF = __webpack_require__(19);
var billboardV = __webpack_require__(16);
var depthV = __webpack_require__(18);
var depthF = __webpack_require__(17);

var Data = exports.Data = function () {
	function Data() {
		_classCallCheck(this, Data);

		this.programs = {
			world: new _program.Program(worldV, // vs 
			worldF, // fs
			["Position", "Texture", "Normal"], // attributes
			["PMatrix", "MMatrix", "VMatrix", "Sampler", "LightVMatrix", "LightPMatrix", "AmbientColor", "DepthMap", "Light"], // uniforms
			{
				pMatrix: 4,
				mMatrix: 4,
				vMatrix: 4
			} // matrices
			),
			sprites: new _program.Program(billboardV, worldF, ["Position", "Offset", "Texture", "Moving", "Flipped"], ["Counter", "CamPos", "PMatrix", "MMatrix", "VMatrix", "Sampler", "AmbientColor", "DepthMap", "Light"], {}),
			depth: new _program.Program(depthV, depthF, ["Position"], ["PMatrix", "NMatrix", "MMatrix"], {
				pMatrix: 4,
				mMatrix: 4,
				vMatrix: 4
			})
		};

		this.setLightUniforms(this.programs.world);
		this.setLightUniforms(this.programs.sprites);

		this.programs.background = [0, 0, 0, 1];
		this.programs.rotateSpeed = 0.01;
		this.programs.zoomFactor = 0.01;

		_webgl.gl.enable(_webgl.gl.DEPTH_TEST);

		_webgl.gl.useProgram(this.programs.world.program);

		return this.programs;
	}

	_createClass(Data, [{
		key: 'setLightUniforms',
		value: function setLightUniforms(prog) {
			// Uniform array of PointLight structs in GLSL
			prog.u.Light = [];
			for (var i = 0; i < 4; i++) {
				var l = prog.u.Light;
				l[i] = {};
				for (var key in new _light.Light()) {
					l[i][key] = _webgl.gl.getUniformLocation(prog.program, "uLight[" + i + "]." + key);
				}
			}
		}
	}]);

	return Data;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
			value: true
});
exports.Light = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _data = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var glmat = __webpack_require__(1);

var Light = exports.Light = function () {
			function Light(color, position, attenuation, enabled) {
						_classCallCheck(this, Light);

						this.color = color ? color : [1.0, 1.0, 1.0];
						this.position = position ? position : [0.0, 0.0, 0.0];
						this.attenuation = attenuation ? attenuation : [0.5, 0.1, 0.0];
						this.enabled = enabled ? enabled : true;

						this.frame = 0;
			}

			_createClass(Light, [{
						key: 'update',
						value: function update() {
									for (var i = 0; i < 3; i++) {
												this.color[i] += Math.sin(0.0005 * this.frame * 180 / Math.PI) * 0.002;
									}this.frame++;
						}
			}]);

			return Light;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Game = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _texture = __webpack_require__(15);

var _ground = __webpack_require__(10);

var _level = __webpack_require__(11);

var _camera = __webpack_require__(7);

var _sprite = __webpack_require__(14);

var _webgl = __webpack_require__(0);

var _dungeonConverter = __webpack_require__(8);

var _input = __webpack_require__(12);

var _data = __webpack_require__(3);

var _canvas = __webpack_require__(2);

var _light = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var glmat = __webpack_require__(1);

var Game = exports.Game = function () {
	function Game() {
		var _this = this;

		_classCallCheck(this, Game);

		this.counter = 0;
		this.loading = document.getElementById("loading");

		this.textureAtlas = new _texture.TextureAtlas("src/img/ldfaithful.png", 8);
		this.textureAtlas.sprites = new _texture.TextureAtlas("src/img/oryx.png", 8);

		this.ground = new _ground.Ground(this.textureAtlas);
		this.level = new _level.Level([0.1, 0.1, 0.0], [2, 3, 3, 3, 3, 3], [2, 3], [40, 40], [4, 4], [5, 5]);

		this.camera = new _camera.Camera();

		this.sprites = new _sprite.Sprites(this.textureAtlas.sprites);
		this.sprites.addSprite(Math.floor(Math.random() * 256), [0, 0, 0]);

		this.player = this.sprites.sprites[0];

		this.sprites.addSprite(Math.floor(Math.random() * 256), [0, 0, 1]);
		this.sprites.sprites[1].maxSpeed *= 0.8;

		this.sprites.update();

		this.input = new _input.Input();
		this.data = new _data.Data();

		this.lights = [];
		this.lights[0] = new _light.Light([1.0, 0.5, 0.0], [0, 0, 1], [0.3, 0.1, 0.05]);

		this.goToLevel(0);

		this.gameLoop = function () {
			window.requestAnimFrame(_this.gameLoop);
			_this.display();
		};

		this.gameLoop();
	}

	_createClass(Game, [{
		key: 'goToLevel',
		value: function goToLevel(num) {
			this.loading.innerHTML = "Загрузка, пожалуйста, подождите...";

			this.dungeonObj = new _dungeonConverter.DungeonConverter(this.level);

			this.lights[1] = new _light.Light([1.0, 0.5, 0.0], this.centerXY(this.dungeonObj.upstairs), [0.2, 0.1, 0.05]);

			this.ground.generate(this.dungeonObj.cubes);

			this.player.pos = this.centerXY(this.dungeonObj.upstairs);
			this.sprites.sprites[1].pos = this.centerXY(this.dungeonObj.upstairs);
			this.sprites.update();
			this.loading.innerHTML = "Уровень " + num + 1;
		}
	}, {
		key: 'centerXY',
		value: function centerXY(pos) {
			return [pos[0] + 0.5, pos[1] + 0.5, pos[2]];
		}
	}, {
		key: 'renderWorld',
		value: function renderWorld() {
			_webgl.gl.enable(_webgl.gl.CULL_FACE);
			_webgl.gl.cullFace(_webgl.gl.BACK);
			_webgl.gl.useProgram(this.data.world.program);
			this.data.world.m.vMatrix = this.camera.matrix;

			_webgl.gl.uniformMatrix4fv(this.data.world.u.MMatrix, false, this.data.world.m.mMatrix);
			_webgl.gl.uniformMatrix4fv(this.data.world.u.VMatrix, false, this.data.world.m.vMatrix);
			_webgl.gl.uniformMatrix4fv(this.data.world.u.PMatrix, false, this.data.world.m.pMatrix);
			_webgl.gl.uniform3fv(this.data.world.u.AmbientColor, this.level.ambient);

			this.updateLights(this.data.world);

			// Bind buffers
			this.attributesSetup(this.data.world.a.Position, this.ground.vertexObject, 3);
			this.attributesSetup(this.data.world.a.Texture, this.ground.texCoordObject, 2);
			this.attributesSetup(this.data.world.a.Normal, this.ground.normalObject, 3);

			_webgl.gl.activeTexture(_webgl.gl.TEXTURE0);
			_webgl.gl.bindTexture(_webgl.gl.TEXTURE_2D, this.ground.textureAtlas.texture);
			_webgl.gl.uniform1i(this.data.world.u.Sampler, 0);
			_webgl.gl.bindBuffer(_webgl.gl.ELEMENT_ARRAY_BUFFER, this.ground.indexObject);
			_webgl.gl.drawElements(_webgl.gl.TRIANGLES, this.ground.numVertices(), _webgl.gl.UNSIGNED_SHORT, 0);
		}
	}, {
		key: 'updateLights',
		value: function updateLights(program) {
			for (var i = 0; i < this.lights.length; i++) {
				this.lights[i].update();
				_webgl.gl.uniform1f(program.u.Light[i].enabled, this.lights[i].enabled);
				_webgl.gl.uniform3fv(program.u.Light[i].attenuation, this.lights[i].attenuation);
				_webgl.gl.uniform3fv(program.u.Light[i].color, this.lights[i].color);
				_webgl.gl.uniform3fv(program.u.Light[i].position, this.lights[i].position);
			}
		}
	}, {
		key: 'handleInputs',
		value: function handleInputs() {
			var inputMask = 0;
			if (this.input.isPressed(87)) inputMask += 1; // W
			if (this.input.isPressed(65)) inputMask += 2; // A
			if (this.input.isPressed(83)) inputMask += 4; // S
			if (this.input.isPressed(68)) inputMask += 8; // D

			switch (inputMask) {
				case 1:
					this.player.turnAndMove(this.ground, 0);break;
				case 2:
					this.player.flipped = 1;this.player.turnAndMove(this.ground, Math.PI / 2);break;
				case 3:
					this.player.flipped = 1;this.player.turnAndMove(this.ground, Math.PI / 4);break;
				case 4:
					this.player.turnAndMove(this.ground, Math.PI);break;
				case 6:
					this.player.flipped = 1;this.player.turnAndMove(this.ground, 3 / 4 * Math.PI);break;
				case 8:
					this.player.flipped = 0;this.player.turnAndMove(this.ground, -Math.PI / 2);break;
				case 9:
					this.player.flipped = 0;this.player.turnAndMove(this.ground, -Math.PI / 4);break;
				case 12:
					this.player.flipped = 0;this.player.turnAndMove(this.ground, 5 / 4 * Math.PI);break;
			}

			if (this.input.isPressed("RIGHT_MOUSE")) {
				var angleChange = [-this.input.getMousePosition().y * this.data.rotateSpeed, 0, this.input.getMousePosition().x * this.data.rotateSpeed];
				this.camera.changeAngle(angleChange);
			}

			if (this.input.getMouseScroll()) {
				this.camera.changeDistance(this.input.getMouseScroll());
			}
		}
	}, {
		key: 'attributesSetup',
		value: function attributesSetup(attr, object, size, type) {
			if (!type) type = _webgl.gl.FLOAT;
			_webgl.gl.enableVertexAttribArray(attr);
			_webgl.gl.bindBuffer(_webgl.gl.ARRAY_BUFFER, object);
			_webgl.gl.vertexAttribPointer(attr, size, type, false, 0, 0);
		}
	}, {
		key: 'renderSprites',
		value: function renderSprites() {
			_webgl.gl.disable(_webgl.gl.CULL_FACE);
			this.counter++;

			_webgl.gl.useProgram(this.data.sprites.program);
			this.data.world.m.vMatrix = this.camera.matrix;

			this.sprites.sprites[0].theta = this.camera.theta[2];
			this.sprites.update();

			_webgl.gl.uniformMatrix4fv(this.data.sprites.u.MMatrix, false, this.data.world.m.mMatrix);
			_webgl.gl.uniformMatrix4fv(this.data.sprites.u.VMatrix, false, this.data.world.m.vMatrix);
			_webgl.gl.uniformMatrix4fv(this.data.sprites.u.PMatrix, false, this.data.world.m.pMatrix);

			_webgl.gl.uniform1f(this.data.sprites.u.Counter, this.counter);
			_webgl.gl.uniform3fv(this.data.sprites.u.AmbientColor, this.level.ambient);
			_webgl.gl.uniform3fv(this.data.sprites.u.CamPos, this.camera.pos);

			this.updateLights(this.data.sprites);

			// Bind buffers
			this.attributesSetup(this.data.sprites.a.Position, this.sprites.vertexObject, 3);
			this.attributesSetup(this.data.sprites.a.Texture, this.sprites.texCoordObject, 2);
			this.attributesSetup(this.data.sprites.a.Offset, this.sprites.offsetObject, 3);
			this.attributesSetup(this.data.sprites.a.Moving, this.sprites.movingObject, 1);
			this.attributesSetup(this.data.sprites.a.Flipped, this.sprites.flippedObject, 1);

			_webgl.gl.activeTexture(_webgl.gl.TEXTURE0);
			_webgl.gl.bindTexture(_webgl.gl.TEXTURE_2D, this.sprites.textureAtlas.texture);
			_webgl.gl.uniform1i(this.data.sprites.u.Sampler, 0);
			_webgl.gl.bindBuffer(_webgl.gl.ELEMENT_ARRAY_BUFFER, this.sprites.indexObject);
			_webgl.gl.drawElements(_webgl.gl.TRIANGLES, this.sprites.numVertices(), _webgl.gl.UNSIGNED_SHORT, 0);
		}
	}, {
		key: 'display',
		value: function display() {
			_webgl.gl.clearColor.apply(_webgl.gl, this.data.background);
			_webgl.gl.clear(_webgl.gl.COLOR_BUFFER_BIT | _webgl.gl.DEPTH_BUFFER_BIT);

			_webgl.gl.viewport(0, 0, _canvas.canvas.width, _canvas.canvas.height);
			glmat.mat4.perspective(this.data.world.m.pMatrix, 45.0, _canvas.canvas.width / _canvas.canvas.height, 0.1, 100.0);

			this.handleInputs();

			this.lights[0].position = this.player.pos.slice(0);
			this.lights[0].position[2] += 2;
			this.sprites.sprites[1].moveToward(this.ground, this.player.pos);
			this.camera.moveCenter(this.player.pos, [0.0, 0.0, 0.5]);
			this.camera.updateMatrix(this.ground.cubes);

			this.renderWorld();
			this.renderSprites();
		}
	}]);

	return Game;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(5);

var _canvas = __webpack_require__(2);

window.requestAnimFrame = function () {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
		window.setTimeout(callback, 1000 / 60);
	};
}();

Number.prototype.clamp = function (min, max) {
	return this < min ? min : this > max ? max : this;
};

loadGame();

function loadGame() {
	if (!_canvas.canvas) {
		window.setTimeout(loadGame, 100);
		return;
	}
	new _game.Game();
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var glmat = __webpack_require__(1);

var Camera = exports.Camera = function () {
	function Camera() {
		_classCallCheck(this, Camera);

		this.matrix = glmat.mat4.create();
		glmat.mat4.identity(this.matrix);

		this.theta = [1.7 * Math.PI, 0.0, 0.5 * Math.PI]; // Rotation about X and Z axes
		this.center = [0, 0, 0];
		this.up = [0, 0, 1];
		this.pos = [0, 0, 0];

		this.thetaLimits = [1.5 * Math.PI, 1.8 * Math.PI];
		this.distanceLimits = [2.0, 15.0];
		this.zoomWeight = 0.1;

		this.currentDistance = (this.distanceLimits[0] + this.distanceLimits[1]) / 2;
		this.desiredDistance = this.currentDistance;

		this.updateMatrix();
	}

	_createClass(Camera, [{
		key: 'checkCollision',
		value: function checkCollision(env) {
			for (var d = 0.5; d < this.desiredDistance + 1.0; d += 0.5) {
				var p = this.sphericalToCartesian(this.center, d, this.theta);
				for (var i = 0; i < 3; i++) {
					p[i] = Math.floor(p[i]);
				}if (p[2] < 0 || p[2] >= env.length || p[1] < 0 || p[1] >= env[p[2]].length || p[0] < 0 || p[0] >= env[p[2]][p[1]].length) continue;
				if (env[p[2]][p[1]][p[0]]) {
					this.currentDistance = d - 0.5;
					return true;
				}
			}
			return false;
		}
	}, {
		key: 'moveCenter',
		value: function moveCenter(pos, offset) {
			this.center = pos.slice(0);
			if (offset) {
				for (var i = 0; i < 3; i++) {
					this.center[i] += offset[i];
				}
			}
		}
	}, {
		key: 'changeAngle',
		value: function changeAngle(dTheta) {
			this.theta[0] -= dTheta[0];
			this.theta[1] -= dTheta[1];
			this.theta[2] -= dTheta[2];
			this.theta[0] = this.theta[0].clamp(this.thetaLimits[0], this.thetaLimits[1]);
		}
	}, {
		key: 'setAngle',
		value: function setAngle(theta) {
			this.theta = theta;
			this.theta[0] = this.theta[0].clamp(this.thetaLimits[0], this.thetaLimits[1]);
		}
	}, {
		key: 'changeDistance',
		value: function changeDistance(amount) {
			this.desiredDistance += amount;
			this.desiredDistance = this.desiredDistance.clamp(this.distanceLimits[0], this.distanceLimits[1]);
		}
	}, {
		key: 'setDistance',
		value: function setDistance(dist) {
			this.desiredDistance = dist;
			this.desiredDistance = this.desiredDistance.clamp(this.distanceLimits[0], this.distanceLimits[1]);
		}
	}, {
		key: 'sphericalToCartesian',
		value: function sphericalToCartesian(origin, r, angles) {
			return [origin[0] + r * Math.sin(angles[0]) * Math.cos(angles[2]), origin[1] + r * Math.sin(angles[0]) * Math.sin(angles[2]), origin[2] + r * Math.cos(angles[0])];
		}
	}, {
		key: 'updateMatrix',
		value: function updateMatrix(env) {
			for (var i = 0; i < 3; i++) {
				if (this.theta[i] < 0) this.theta[i] += 2 * Math.PI;else if (this.theta[i] > 2 * Math.PI) this.theta[i] -= 2 * Math.PI;
			}
			if (env && !this.checkCollision(env)) {
				this.currentDistance *= 1 - this.zoomWeight;
				this.currentDistance += this.zoomWeight * this.desiredDistance;
			}

			this.pos = this.sphericalToCartesian(this.center, this.currentDistance, this.theta);
			glmat.mat4.lookAt(this.matrix, this.pos, this.center, this.up);
		}
	}]);

	return Camera;
}();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DungeonConverter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dungeon = __webpack_require__(9);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DungeonConverter = exports.DungeonConverter = function () {
	function DungeonConverter(level) {
		_classCallCheck(this, DungeonConverter);

		this.level = level;
		this.cubes = [];
		this.upstairs = [0, 0, 0];
		this.downstairs = [0, 0, 0];
		this.tileDim = level.tileDim;
		this.roomDim = level.roomDim;
		this.roomMinSize = level.roomMinSize;
		this.dungeon = new _dungeon.Dungeon(this.tileDim, this.roomDim, this.roomMinSize);

		for (var z = 0; z < 2; z++) {
			this.cubes[z] = [];
			for (var y = 0; y < this.dungeon.tileDim[1]; y++) {
				this.cubes[z][y] = [];
				for (var x = 0; x < this.dungeon.tileDim[0]; x++) {
					switch (this.dungeon.tiles[x][y]) {
						case this.dungeon.tileVals.empty:
							this.cubes[z][y][x] = 0;break;
						case this.dungeon.tileVals.wall:
							this.cubes[z][y][x] = this.getWall(z);break;
						case this.dungeon.tileVals.floor:
							this.cubes[z][y][x] = this.getFloor(z);break;
						case this.dungeon.tileVals.up:
							this.cubes[z][y][x] = this.getUp(z);
							this.upstairs = [x, y, 1.2];
							break;
						case this.dungeon.tileVals.down:
							this.cubes[z][y][x] = this.getDown(z);
							this.downstairs = [x, y, 1.2];
							break;
					}
				}
			}
		}
	}

	_createClass(DungeonConverter, [{
		key: 'randFromArray',
		value: function randFromArray(arr) {
			return arr[Math.floor(Math.random() * arr.length)];
		}
	}, {
		key: 'getWall',
		value: function getWall(z) {
			if (z == 0) return 0;
			return this.randFromArray(this.level.wallTiles);
		}
	}, {
		key: 'getFloor',
		value: function getFloor(z) {
			if (z > 0) return 0;
			return this.randFromArray(this.level.floorTiles);
		}
	}, {
		key: 'getUp',
		value: function getUp(z) {
			if (z > 0) return 0;
			return 212;
		}
	}, {
		key: 'getDown',
		value: function getDown(z) {
			if (z > 0) return 0;
			return 211;
		}
	}]);

	return DungeonConverter;
}();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var randInt = function randInt(min, max) {
	if (max == null) {
		max = min;
		min = 0;
	}
	return Math.floor(Math.random() * (max - min)) + min;
};

var Room = function () {
	var Room = function Room(id, minSize, maxSize, topLeft) {
		this.id = id;
		this.connected = false;
		this.unconnectedNeighbors = [];
		this.connectedTo = [];
		var size = [randInt(minSize[0], maxSize[0]), randInt(minSize[1], maxSize[1])];
		var positionMax = [maxSize[0] - size[0], maxSize[1] - size[1]];
		var position = [topLeft[0] + randInt(positionMax[0]) + 1, topLeft[1] + randInt(positionMax[1]) + 1];
		this.rect = [position[0], position[1], size[0], size[1]];
	};
	Room.prototype.removeFromUnconnected = function (roomId) {
		for (var i = 0; i < this.unconnectedNeighbors.length; i++) {
			if (this.unconnectedNeighbors[i].id == roomId) {
				this.unconnectedNeighbors.splice(i, 1);
				return;
			}
		}
	};
	Room.prototype.connectTo = function (roomIndex) {
		var newlyConnected = this.unconnectedNeighbors[roomIndex];
		this.connectedTo.push(newlyConnected);
		this.unconnectedNeighbors.splice(roomIndex, 1);
		//newlyConnected.connectedTo.push(this);
		newlyConnected.removeFromUnconnected(this.id);
		this.connected = true;
		newlyConnected.connected = true;

		return newlyConnected;
	};
	Room.prototype.connectRandom = function () {
		if (this.unconnectedNeighbors.length == 0) return false;
		var roomIndex = randInt(this.unconnectedNeighbors.length);
		return this.connectTo(roomIndex);
	};
	Room.prototype.connectToConnected = function () {
		var candidates = [];
		for (var i = 0; i < this.unconnectedNeighbors.length; i++) {
			candidates.push(i);
		}while (candidates.length > 0) {
			var index = randInt(candidates.length);
			if (this.unconnectedNeighbors[candidates[index]].connected) return this.connectTo(candidates[index]);else candidates.splice(index, 1);
		}
		return false;
	};
	return Room;
}();

var Dungeon = exports.Dungeon = function Dungeon(tileDim, roomDim, roomMinSize) {
	this.tileDim = tileDim;
	this.roomDim = roomDim;
	this.numRooms = roomDim[0] * roomDim[1];
	this.roomGrid = [Math.floor(tileDim[0] / roomDim[0]), Math.floor(tileDim[1] / roomDim[1])];
	this.rooms = [];
	this.firstRoom = 0;
	this.lastRoom = 0;

	this.tileVals = {
		wall: "#",
		floor: " ",
		empty: ".",
		up: "u",
		down: "d"
	};

	var tiles = [];
	for (var i = 0; i < tileDim[0]; i++) {
		tiles[i] = [];
		for (var j = 0; j < tileDim[1]; j++) {
			tiles[i][j] = this.tileVals.wall;
		}
	}
	this.tiles = tiles;

	var roomMaxSize = [tileDim[0] / roomDim[0] - 2, tileDim[1] / roomDim[1] - 2];
	if (!roomMinSize) roomMinSize = [2, 2];
	var rooms = [];
	for (var i = 0; i < roomDim[0]; i++) {
		rooms[i] = [];
		for (var j = 0; j < roomDim[1]; j++) {
			rooms[i][j] = new Room(i * roomDim[0] + j, roomMinSize, roomMaxSize, [this.roomGrid[0] * i, this.roomGrid[1] * j]);
		}
	}
	for (var i = 0; i < roomDim[0]; i++) {
		for (var j = 0; j < roomDim[1]; j++) {
			if (i > 0) rooms[i][j].unconnectedNeighbors.push(rooms[i - 1][j]);
			if (i < roomDim[0] - 1) rooms[i][j].unconnectedNeighbors.push(rooms[i + 1][j]);
			if (j > 0) rooms[i][j].unconnectedNeighbors.push(rooms[i][j - 1]);
			if (j < roomDim[1] - 1) rooms[i][j].unconnectedNeighbors.push(rooms[i][j + 1]);
		}
	}
	this.rooms = rooms;

	this.getRoomFromCoords = function (x, y) {
		return this.rooms[x * this.rooms.length][y];
	};

	this.getRoomFromId = function (id) {
		return this.rooms[Math.floor(id / this.roomDim[0])][id % this.roomDim[1]];
	};

	this.generate = function () {
		var unconnected = [];
		for (var i = 0; i < this.numRooms; i++) {
			unconnected[i] = i;
		} // See http://kuoi.com/~kamikaze/GameDesign/art07_rogue_dungeon.php
		var roomId = randInt(this.numRooms);
		var current = this.getRoomFromId(roomId);
		var firstRoom = roomId;
		while (current && current.unconnectedNeighbors.length > 0) {
			roomId = current.id;
			var roomIndex = unconnected.indexOf(roomId);
			if (roomIndex >= 0) unconnected.splice(roomIndex, 1);
			current = current.connectRandom();
		}
		while (unconnected.length > 0) {
			var roomNum = randInt(unconnected.length);
			current = this.getRoomFromId(unconnected[roomNum]);
			if (current.connectToConnected()) unconnected.splice(roomNum, 1);
		}
		var lastRoom = current.id;

		// Draw and connect rooms
		for (var i = 0; i < this.numRooms; i++) {
			var room = this.getRoomFromId(i);
			this.fillRoom(room);
			for (var j = 0; j < room.connectedTo.length; j++) {
				this.connectRooms(room, room.connectedTo[j]);
			}
		}

		// Place up stairs
		var room = this.getRoomFromId(firstRoom);
		this.upStairsPos = [room.rect[0] + randInt(room.rect[2]), room.rect[1] + randInt(room.rect[3])];
		this.plot(this.upStairsPos[0], this.upStairsPos[1], this.tileVals.up);
		room = this.getRoomFromId(lastRoom);
		this.downStairsPos = [room.rect[0] + randInt(room.rect[2]), room.rect[1] + randInt(room.rect[3])];
		this.plot(this.downStairsPos[0], this.downStairsPos[1], this.tileVals.down);
		this.cleanUpWalls();
	};

	this.plot = function (x, y, val) {
		if (!val) val = this.tileVals.floor;
		this.tiles[Math.floor(x)][Math.floor(y)] = val;
	};

	this.fillRoom = function (room) {
		for (var i = room.rect[0]; i < room.rect[0] + room.rect[2]; i++) {
			for (var j = room.rect[1]; j < room.rect[1] + room.rect[3]; j++) {
				this.plot(i, j);
			}
		}
	};

	// Bresenham's line algorithm
	// Thanks to: http://stackoverflow.com/a/4672319/1887090
	this.fillHallway = function (x0, y0, x1, y1) {
		var dx = Math.abs(x1 - x0);
		var dy = Math.abs(y1 - y0);
		var sx = x0 < x1 ? 1 : -1;
		var sy = y0 < y1 ? 1 : -1;
		var err = dx - dy;

		for (;;) {
			this.plot(x0, y0);
			this.plot(x0 - 1, y0);
			this.plot(x0 + 1, y0);
			this.plot(x0, y0 - 1);
			this.plot(x0, y0 + 1);

			if (x0 == x1 && y0 == y1) break;

			var e2 = 2 * err;
			if (e2 > -dy) {
				err -= dy;
				x0 += sx;
			}
			if (e2 < dx) {
				err += dx;
				y0 += sy;
			}
		}
	};

	this.connectRooms = function (room1, room2) {
		this.fillHallway(Math.floor(room1.rect[0] + room1.rect[2] / 2), Math.floor(room1.rect[1] + room1.rect[3] / 2), Math.floor(room2.rect[0] + room2.rect[2] / 2), Math.floor(room2.rect[1] + room2.rect[3] / 2));
	};

	this.cleanUpWalls = function () {
		for (var i = 0; i < this.tileDim[0]; i++) {
			for (var j = 0; j < this.tileDim[1]; j++) {
				if (this.tiles[i][j] != this.tileVals.wall) continue;

				if (i > 0 && this.isWalkable(i - 1, j) || i < this.tileDim[0] - 1 && this.isWalkable(i + 1, j) || j > 0 && this.isWalkable(i, j - 1) || j < this.tileDim[1] - 1 && this.isWalkable(i, j + 1)) continue;
				this.tiles[i][j] = this.tileVals.empty;
			}
		}
	};

	this.isWalkable = function (x, y) {
		return this.tiles[x][y] != this.tileVals.wall && this.tiles[x][y] != this.tileVals.empty;
	};

	this.printDungeon = function () {
		var str = "";
		for (var i = 0; i < this.tileDim[0]; i++) {
			str += "\n";
			for (var j = 0; j < this.tileDim[1]; j++) {
				str += this.tiles[i][j];
			}
		}
		console.log(str);
	};
	this.generate();
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Ground = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _webgl = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ground = exports.Ground = function () {
	function Ground(textureAtlas) {
		_classCallCheck(this, Ground);

		this.textureAtlas = textureAtlas;
		this.cubes = [];
		this.vertices = [];
		this.normals = [];
		this.texCoords = [];
		this.indices = [];
		this.baseIndex = 0;
		this.vertexObject = null;
		this.normalObject = null;
		this.texCoordObject = null;
		this.indexObject = null;

		this.specialTiles = {
			// [front,side,top,under]
			3: [3, 3, 0, 2], // grass
			5: [5, 5, 6, 6], 6: 5, // slab
			8: [8, 8, 9, 10], 9: 8, 10: 8, // TNT
			20: [20, 20, 21, 21], 21: 20, // wood oak
			43: [59, 60, 43, 43], 59: 43, 60: 43, // workbench
			44: [44, 45, 62, 62], 45: 44, 62: 44, // furnace unlit
			46: [46, 45, 62, 62], // dispenser
			69: [70, 70, 69, 71], 70: 69, 71: 69, // cactus
			74: [74, 74, 75, 75], 75: 74, // jukebox
			77: [77, 77, 78, 2], 78: 77, // mycelium
			// 82,98: wood door
			// 83,99: iron door
			102: [119, 118, 102, 102], // pumpkin
			120: [120, 118, 102, 102], 118: 102, 119: 102, // jack-o-lantern
			108: [110, 108, 109, 109], 109: 108, 110: 108, // piston
			116: [20, 20, 116, 116], // wood pine
			117: [20, 20, 117, 117], // wood birch
			121: [122, 122, 121, 124], 122: 121, 124: 121, // cake
			123: 121, // cake inside
			// 125,126: mushroom top
			// 134,135,149,150,151,152: bed 
			136: [136, 136, 137, 137], 137: 136, // melon
			138: [154, 154, 138, 155], 154: 138, 155: 138, // cauldron
			158: [159, 159, 158, 175], 159: 158, // end portal
			166: [182, 182, 166, 183], 182: 166, 183: 166, // enchant table
			176: [192, 192, 176, 208], 192: 176, 208: 176 // sandstone
		};
	}

	_createClass(Ground, [{
		key: 'numVertices',
		value: function numVertices() {
			return this.indices.length;
		}
	}, {
		key: 'collision',
		value: function collision(x, y, z) {
			if (x instanceof Array) {
				z = x[2];
				y = x[1];
				x = x[0];
			}
			x = Math.floor(x);
			y = Math.floor(y);
			z = Math.floor(z);
			if (z < 0 || z >= this.cubes.length || y < 0 || y >= this.cubes[z].length || x < 0 || x >= this.cubes[z][y].length) return true;
			return this.cubes[z][y][x];
		}
	}, {
		key: 'generate',
		value: function generate(dungeon) {
			this.cubes = dungeon;
			this.vertices = [];
			this.normals = [];
			this.texCoords = [];
			this.indices = [];
			this.baseIndex = 0;
			// Test for hidden faces and add blocks
			for (var z = 0; z < dungeon.length; z++) {
				for (var y = 0; y < dungeon[z].length; y++) {
					for (var x = 0; x < dungeon[z][y].length; x++) {
						if (dungeon[z][y][x] == 0) continue;
						if (z == 0) {
							this.addBlock(dungeon[z][y][x], [x, y, z], [false, false, false, false, false, true]);
							continue;
						}
						var showFace = [true, true, true, true, true, true];
						if (x > 0) showFace[0] = !dungeon[z][y][x - 1];
						if (x < dungeon[z][y].length - 1) showFace[1] = !dungeon[z][y][x + 1];
						if (y > 0) showFace[2] = !dungeon[z][y - 1][x];
						if (y < dungeon[z].length - 1) showFace[3] = !dungeon[z][y + 1][x];
						if (z > 0) showFace[4] = !dungeon[z - 1][y][x];
						if (z < dungeon.length - 1) showFace[5] = !dungeon[z + 1][y][x];
						this.addBlock(dungeon[z][y][x], [x, y, z], showFace);
					}
				}
			}

			// Initialize buffer data
			_webgl.gl.deleteBuffer(this.vertexObject);
			_webgl.gl.deleteBuffer(this.normalObject);
			_webgl.gl.deleteBuffer(this.texCoordObject);
			_webgl.gl.deleteBuffer(this.indexObject);
			this.vertexObject = _webgl.gl.createBuffer();
			this.normalObject = _webgl.gl.createBuffer();
			this.texCoordObject = _webgl.gl.createBuffer();
			this.indexObject = _webgl.gl.createBuffer();
			_webgl.gl.bindBuffer(_webgl.gl.ARRAY_BUFFER, this.vertexObject);
			_webgl.gl.bufferData(_webgl.gl.ARRAY_BUFFER, new Float32Array(this.vertices), _webgl.gl.STATIC_DRAW);
			_webgl.gl.bindBuffer(_webgl.gl.ARRAY_BUFFER, this.normalObject);
			_webgl.gl.bufferData(_webgl.gl.ARRAY_BUFFER, new Float32Array(this.normals), _webgl.gl.STATIC_DRAW);
			_webgl.gl.bindBuffer(_webgl.gl.ARRAY_BUFFER, this.texCoordObject);
			_webgl.gl.bufferData(_webgl.gl.ARRAY_BUFFER, new Float32Array(this.texCoords), _webgl.gl.STATIC_DRAW);
			_webgl.gl.bindBuffer(_webgl.gl.ELEMENT_ARRAY_BUFFER, this.indexObject);
			_webgl.gl.bufferData(_webgl.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), _webgl.gl.STATIC_DRAW);
			_webgl.gl.bindBuffer(_webgl.gl.ARRAY_BUFFER, null);
		}
	}, {
		key: 'addBlock',
		value: function addBlock(tileNum, pos, faces) {
			/*   6-------5
       /|      /|
      1-------0 |
      | |     | |
      | 7-----|-4
      |/      |/
      2-------3  */
			var c = [// Cube
			[1.0, 1.0, 1.0], [0.0, 1.0, 1.0], [0.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 0.0], [1.0, 1.0, 0.0], [0.0, 1.0, 0.0], [0.0, 0.0, 0.0]];
			// Apply offsets to cubes
			for (var i = 0; i < c.length; i++) {
				c[i][0] += pos[0];
				c[i][1] += pos[1];
				c[i][2] += pos[2];
			}

			// Normals
			var n = [[-1, 0, 0], // left
			[1, 0, 0], // right
			[0, -1, 0], // front
			[0, 1, 0], // back
			[0, 0, -1], // bottom
			[0, 0, 1] // top
			];
			// Indices for vertices
			var indices = [[2, 1, 6, 7], [0, 3, 4, 5], [3, 2, 7, 4], [1, 0, 5, 6], [6, 5, 4, 7], [0, 1, 2, 3]];

			for (var f = 0; f < 6; f++) {
				if (!faces[f]) {
					continue;
				};
				this.addFaceVertices(c, indices[f]);
				this.addFaceNormals(n[f]);
				this.addFaceTexCoords(tileNum, f);
			}
		}
	}, {
		key: 'addFaceVertices',
		value: function addFaceVertices(cube, indices) {
			for (var i = 0; i < indices.length; i++) {
				this.vertices = this.vertices.concat(cube[indices[i]]);
			}this.indices.push(this.baseIndex, this.baseIndex + 1, this.baseIndex + 2, this.baseIndex, this.baseIndex + 2, this.baseIndex + 3);
			this.baseIndex += 4;
		}
	}, {
		key: 'addFaceNormals',
		value: function addFaceNormals(newNormal) {
			for (var i = 0; i < 4; i++) {
				this.normals = this.normals.concat(newNormal);
			}
		}
	}, {
		key: 'addFaceTexCoords',
		value: function addFaceTexCoords(tileNum, faceNum) {
			if (this.specialTiles.hasOwnProperty(tileNum)) {
				var specialTile = this.specialTiles[tileNum];
				if (!Array.isArray(specialTile)) specialTile = this.specialTiles[this.specialTiles[tileNum]]; // Reference to different tile
				switch (faceNum) {
					case 2:
						tileNum = specialTile[0];break; // front
					case 4:
						tileNum = specialTile[3];break; // under
					case 5:
						tileNum = specialTile[2];break; // top
					default:
						tileNum = specialTile[1];break; // side
				}
			}
			var st = this.textureAtlas.getST(tileNum);

			this.texCoords = this.texCoords.concat(st[2], st[1], st[0], st[1], st[0], st[3], st[2], st[3]);
		}
	}]);

	return Ground;
}();

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Level = exports.Level = function Level(ambient, floorTiles, wallTiles, tileDim, roomDim, roomMinSize) {
  _classCallCheck(this, Level);

  this.ambient = ambient;
  this.floorTiles = floorTiles;
  this.wallTiles = wallTiles;
  this.tileDim = tileDim;
  this.roomDim = roomDim;
  this.roomMinSize = roomMinSize;
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _canvas = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Input = exports.Input = function () {
  function Input() {
    _classCallCheck(this, Input);

    this._buttonListener = new ButtonListener();
    this._mouseMoveListener = new MouseMoveListener();

    _canvas.canvas.contentEditable = true; // дать канвасу фокус (preventDefault)
  }

  _createClass(Input, [{
    key: 'update',
    value: function update() {
      this._buttonListener.update();
    }
  }, {
    key: 'isDown',
    value: function isDown(button) {
      return this._buttonListener.isDown(button);
    }
  }, {
    key: 'isPressed',
    value: function isPressed(button) {
      return this._buttonListener.isPressed(button);
    }
  }, {
    key: 'getMousePosition',
    value: function getMousePosition() {
      return this._mouseMoveListener.getMousePosition();
    }
  }, {
    key: 'getMouseScroll',
    value: function getMouseScroll() {
      return this._mouseMoveListener.getMouseScroll();
    }
  }]);

  return Input;
}();

var ButtonListener = function () {
  function ButtonListener() {
    _classCallCheck(this, ButtonListener);

    var self = this;

    this._buttonDownState = {};
    this._buttonPressedState = {};

    _canvas.canvas.addEventListener('keydown', function (e) {
      return self._down(e.keyCode);
    }, false);

    _canvas.canvas.addEventListener('keyup', function (e) {
      return self._up(e.keyCode);
    }, false);

    _canvas.canvas.addEventListener('mousedown', function (e) {
      return self._down(self._getMouseButton(e));
    }, false);

    _canvas.canvas.addEventListener('mouseup', function (e) {
      return self._up(self._getMouseButton(e));
    }, false);
  }

  _createClass(ButtonListener, [{
    key: 'update',
    value: function update() {
      for (var i in this._buttonPressedState) {
        if (this._buttonPressedState[i] === true) {
          // кнопка нажата и событие продолжается
          this._buttonPressedState[i] = false; // окончание нажатия кнопки
        }
      }
    }
  }, {
    key: '_down',
    value: function _down(buttonId) {
      this._buttonDownState[buttonId] = true;
      if (this._buttonPressedState[buttonId] === undefined) {
        // начало нового нажатия
        this._buttonPressedState[buttonId] = true; // регистрация кнопки
      }
    }
  }, {
    key: '_up',
    value: function _up(buttonId) {
      this._buttonDownState[buttonId] = false;
      if (this._buttonPressedState[buttonId] === false) {
        // предыдущее нажатие окончено
        this._buttonPressedState[buttonId] = undefined; // подготовка к следующему нажатию
      }
    }
  }, {
    key: 'isDown',
    value: function isDown(button) {
      return this._buttonDownState[button] || false;
    }
  }, {
    key: 'isPressed',
    value: function isPressed(button) {
      return this._buttonPressedState[button] || false;
    }
  }, {
    key: '_getMouseButton',
    value: function _getMouseButton(e) {
      if (e.which !== undefined || e.button !== undefined) {
        if (e.which === 3 || e.button === 2) {
          return "RIGHT_MOUSE";
        } else if (e.which === 1 || e.button === 0 || e.button === 1) {
          return "LEFT_MOUSE";
        }
      }
    }
  }]);

  return ButtonListener;
}();

var MouseMoveListener = function () {
  function MouseMoveListener() {
    _classCallCheck(this, MouseMoveListener);

    this._bindings = [];
    this._mousePosition;
    this._scroll;

    var self = this;
    var mousewheelevent = /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel";

    _canvas.canvas.addEventListener('mousemove', function (e) {
      var absoluteMousePosition = self._getAbsoluteMousePosition(e);
      var elementPosition = getElementPosition(_canvas.canvas);

      self._mousePosition = {
        x: absoluteMousePosition.x - elementPosition.x,
        y: absoluteMousePosition.y - elementPosition.y
      };
    }, false);

    _canvas.canvas.addEventListener('mousemove', function (e) {
      for (var i = 0; i < self._bindings.length; i++) {
        self._bindings[i](self.getMousePosition());
      }
    }, false);

    _canvas.canvas.addEventListener(mousewheelevent, function (e) {
      return self.mousewheel(e);
    }, false);
  }

  _createClass(MouseMoveListener, [{
    key: 'mousewheel',
    value: function mousewheel(e) {
      var event = window.event || e;
      this._scroll = event.detail ? event.detail : -event.wheelDelta / 120;
    }
  }, {
    key: 'getMousePosition',
    value: function getMousePosition() {
      return this._mousePosition;
    }
  }, {
    key: 'getMouseScroll',
    value: function getMouseScroll() {
      return this._scroll;
    }
  }, {
    key: '_getAbsoluteMousePosition',
    value: function _getAbsoluteMousePosition(e) {
      if (e.pageX) {
        return { x: e.pageX, y: e.pageY };
      } else if (e.clientX) {
        return { x: e.clientX, y: e.clientY };
      }
    }
  }]);

  return MouseMoveListener;
}();

var getWindow = function getWindow(document) {
  return document.parentWindow || document.defaultView;
};

var getElementPosition = function getElementPosition(element) {
  var rect = element.getBoundingClientRect();
  var document = element.ownerDocument;
  var body = document.body;
  var window = getWindow(document);
  return {
    x: rect.left + (window.pageXOffset || body.scrollLeft) - (body.clientLeft || 0),
    y: rect.top + (window.pageYOffset || body.scrollTop) - (body.clientTop || 0)
  };
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Program = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _webgl = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var glmat = __webpack_require__(1);

var Program = exports.Program = function () {
	function Program(vs, fs, att, uni, mats) {
		_classCallCheck(this, Program);

		this.glProgram = this.initShader(vs, fs);
		var p = {
			program: this.glProgram,
			a: {},
			u: {},
			m: {}
		};
		// Set attributes
		for (var i = 0; i < att.length; i++) {
			p.a[att[i]] = _webgl.gl.getAttribLocation(this.glProgram, "a" + att[i]);
		} // Set uniforms
		for (var _i = 0; _i < uni.length; _i++) {
			p.u[uni[_i]] = _webgl.gl.getUniformLocation(this.glProgram, "u" + uni[_i]);
		} // Initialize matrices
		for (var prop in mats) {
			var size = mats[prop];
			var mat = void 0;
			switch (size) {
				case 2:
					mat = glmat.mat2;break;
				case 3:
					mat = glmat.mat3;break;
				case 4:
					mat = glmat.mat4;break;
				default:
					console.log("Invalid matrix size");
			}
			p.m[prop] = mat.create();
			mat.identity(p.m[prop]);
		};

		return p;
	}

	// Returns compiled shader


	_createClass(Program, [{
		key: 'getShader',
		value: function getShader(type, text) {
			var shader = _webgl.gl.createShader(type);
			_webgl.gl.shaderSource(shader, text);
			_webgl.gl.compileShader(shader);

			if (!_webgl.gl.getShaderParameter(shader, _webgl.gl.COMPILE_STATUS)) {
				throw (type == _webgl.gl.VERTEX_SHADER ? "Vertex" : "Fragment") + " failed to compile:\n\n" + _webgl.gl.getShaderInfoLog(shader);
			}

			return shader;
		}

		// Assigns shaders to program and returns the program

	}, {
		key: 'initShader',
		value: function initShader(vertexShaderText, fragmentShaderText) {
			var shaderProgram = _webgl.gl.createProgram();
			_webgl.gl.attachShader(shaderProgram, this.getShader(_webgl.gl.VERTEX_SHADER, vertexShaderText));
			_webgl.gl.attachShader(shaderProgram, this.getShader(_webgl.gl.FRAGMENT_SHADER, fragmentShaderText));
			_webgl.gl.linkProgram(shaderProgram);

			if (!_webgl.gl.getProgramParameter(shaderProgram, _webgl.gl.LINK_STATUS)) throw new Error("Could not initialize shaders");

			return shaderProgram;
		}
	}]);

	return Program;
}();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});
exports.Sprites = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _webgl = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var glmat = __webpack_require__(1);

var Sprite = function () {
				function Sprite(pos) {
								_classCallCheck(this, Sprite);

								this.pos = pos ? pos : [0, 0, 0];
								this.theta = 0;
								this.vel = [0, 0, 0];
								this.maxSpeed = 0.1;
								this.moving = 0;
								this.flipped = 0.0;
				}

				_createClass(Sprite, [{
								key: 'moveTo',
								value: function moveTo(pos) {
												this.pos = pos;
												this.moving = 0;
								}
				}, {
								key: 'moveToward',
								value: function moveToward(env, pos) {
												var dx = pos[0] - this.pos[0];
												var dy = pos[1] - this.pos[1];

												if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) return;

												this.theta = Math.atan2(dy, dx);
												this.limitTheta();
												this.flipped = this.theta < 0.5 * Math.PI || this.theta > 1.5 * Math.PI ? 0 : 1;
												this.moveForward(env);
								}
				}, {
								key: 'limitTheta',
								value: function limitTheta() {
												if (this.theta < 0) {
																this.theta += 2 * Math.PI;
												} else if (this.theta > 2 * Math.PI) {
																this.theta -= 2 * Math.PI;
												}
								}
				}, {
								key: 'turnAndMove',
								value: function turnAndMove(env, amount) {
												this.theta += amount;
												this.moveForward(env);
												this.theta -= amount;
												this.limitTheta();
								}
				}, {
								key: 'moveForward',
								value: function moveForward(env) {
												this.vel[0] = this.maxSpeed * Math.cos(this.theta);
												this.vel[1] = this.maxSpeed * Math.sin(this.theta);
												this.checkCollision(env);

												for (var i = 0; i < 3; i++) {
																this.pos[i] += this.vel[i];
												}
												this.moving = 1;
								}
				}, {
								key: 'checkCollision',
								value: function checkCollision(env) {
												for (var i = 0; i < 3; i++) {
																if (this.vel[i] == 0) {
																				continue;
																}

																var padding = this.vel[i] > 0 ? 0.5 : -0.5;

																var testPos = this.pos.slice(0);
																if (env.collision(testPos)) {
																				this.vel[i] = 0;
																}
												}
								}
				}]);

				return Sprite;
}();

var Sprites = exports.Sprites = function () {
				function Sprites(textureAtlas) {
								_classCallCheck(this, Sprites);

								this.textureAtlas = textureAtlas;
								this.sprites = [];
								this.vertices = [];
								this.offsets = [];
								this.texCoords = [];
								this.indices = [];
								this.moving = [];
								this.flipped = [];
								this.baseIndex = 0;
								this.vertexObject = _webgl.gl.createBuffer();
								this.texCoordObject = _webgl.gl.createBuffer();
								this.offsetObject = _webgl.gl.createBuffer();
								this.indexObject = _webgl.gl.createBuffer();
								this.movingObject = _webgl.gl.createBuffer();
								this.flippedObject = _webgl.gl.createBuffer();
				}

				_createClass(Sprites, [{
								key: 'numVertices',
								value: function numVertices() {
												return this.indices.length;
								}
				}, {
								key: 'update',
								value: function update() {
												for (var _i = 0; _i < this.sprites.length; _i++) {
																this.moveSprite(_i, this.sprites[_i].pos);
																this.flipSprite(_i, this.sprites[_i].flipped);
												}

												// Initialize buffer data
												_webgl.gl.bindBuffer(_webgl.gl.ARRAY_BUFFER, this.vertexObject);
												_webgl.gl.bufferData(_webgl.gl.ARRAY_BUFFER, new Float32Array(this.vertices), _webgl.gl.STATIC_DRAW);

												_webgl.gl.bindBuffer(_webgl.gl.ARRAY_BUFFER, this.texCoordObject);
												_webgl.gl.bufferData(_webgl.gl.ARRAY_BUFFER, new Float32Array(this.texCoords), _webgl.gl.STATIC_DRAW);

												_webgl.gl.bindBuffer(_webgl.gl.ARRAY_BUFFER, this.offsetObject);
												_webgl.gl.bufferData(_webgl.gl.ARRAY_BUFFER, new Float32Array(this.offsets), _webgl.gl.STATIC_DRAW);

												_webgl.gl.bindBuffer(_webgl.gl.ARRAY_BUFFER, this.movingObject);
												_webgl.gl.bufferData(_webgl.gl.ARRAY_BUFFER, new Float32Array(this.moving), _webgl.gl.STATIC_DRAW);

												_webgl.gl.bindBuffer(_webgl.gl.ARRAY_BUFFER, this.flippedObject);
												_webgl.gl.bufferData(_webgl.gl.ARRAY_BUFFER, new Float32Array(this.flipped), _webgl.gl.STATIC_DRAW);

												_webgl.gl.bindBuffer(_webgl.gl.ELEMENT_ARRAY_BUFFER, this.indexObject);
												_webgl.gl.bufferData(_webgl.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), _webgl.gl.STATIC_DRAW);

												_webgl.gl.bindBuffer(_webgl.gl.ARRAY_BUFFER, null);

												for (var i = 0; i < this.sprites.length; i++) {
																this.sprites[i].moving = 0;
												}
								}
				}, {
								key: 'addSprite',
								value: function addSprite(tileNum, pos) {
												/* 1--0
               |  |
               2--3 */
												var o = [[0.5, 0.0, 1.0], [-0.5, 0.0, 1.0], [-0.5, 0.0, 0.0], [0.5, 0.0, 0.0]];

												this.sprites.push(new Sprite(pos));

												for (var i = 0; i < 4; i++) {
																this.vertices = this.vertices.concat(pos);
																this.offsets = this.offsets.concat(o[i]);
																this.moving.push(0);
																this.flipped.push(0);
												}

												var st = this.textureAtlas.getST(tileNum);

												this.texCoords = this.texCoords.concat(st[2], st[1], st[0], st[1], st[0], st[3], st[2], st[3]);

												this.indices.push(this.baseIndex, this.baseIndex + 1, this.baseIndex + 2, this.baseIndex, this.baseIndex + 2, this.baseIndex + 3);
												this.baseIndex += 4;
								}
				}, {
								key: 'flipSprite',
								value: function flipSprite(spriteId, flipped) {
												for (var i = 0; i < 4; i++) {
																this.flipped[spriteId * 4 + i] = this.sprites[spriteId].flipped;
												}
								}
				}, {
								key: 'moveSprite',
								value: function moveSprite(spriteId, pos) {
												for (var i = 0; i < 4; i++) {
																this.moving[spriteId * 4 + i] = this.sprites[spriteId].moving;
																for (var j = 0; j < 3; j++) {
																				this.vertices[spriteId * 12 + i * 3 + j] = pos[j];
																}
												}
								}
				}, {
								key: 'offsetSprite',
								value: function offsetSprite(spriteId, d) {
												for (var i = 0; i < 4; i++) {
																for (var j = 0; j < 3; j++) {
																				this.vertices[spriteId * 4 + i * 3 + j] += d[j];
																}
												}
								}
				}]);

				return Sprites;
}();

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TextureAtlas = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _webgl = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextureAtlas = exports.TextureAtlas = function () {
	function TextureAtlas(url, tileSize) {
		_classCallCheck(this, TextureAtlas);

		this.tileSizePx = tileSize;
		this.imageSizePx = 0;
		this.tileSizeNormalized = 0;
		this.tilesPerRow = 0;
		this.paddingNormalized = 0;
		this.texture = null;

		this.loadTexture(url);
	}

	_createClass(TextureAtlas, [{
		key: 'loadTexture',
		value: function loadTexture(url) {
			var self = this;
			self.texture = _webgl.gl.createTexture();
			self.texture.image = new Image();

			self.texture.image.onload = function () {
				self.handleTexture(self.texture.image, self.texture);
			};
			self.texture.image.src = url;
		}
	}, {
		key: 'handleTexture',
		value: function handleTexture(image, texture) {
			_webgl.gl.bindTexture(_webgl.gl.TEXTURE_2D, texture);
			_webgl.gl.texImage2D(_webgl.gl.TEXTURE_2D, 0, _webgl.gl.RGBA, _webgl.gl.RGBA, _webgl.gl.UNSIGNED_BYTE, image);
			_webgl.gl.texParameteri(_webgl.gl.TEXTURE_2D, _webgl.gl.TEXTURE_MIN_FILTER, _webgl.gl.NEAREST);
			_webgl.gl.texParameteri(_webgl.gl.TEXTURE_2D, _webgl.gl.TEXTURE_MAG_FILTER, _webgl.gl.NEAREST);
			_webgl.gl.bindTexture(_webgl.gl.TEXTURE_2D, null);
			this.texture = texture;
			this.imageSizePx = image.width; // width must equal height	
			this.tileSizeNormalized = this.tileSizePx / this.imageSizePx;
			this.paddingNormalized = 0.5 / this.imageSizePx;
			this.tilesPerRow = Math.floor(this.imageSizePx / this.tileSizePx);
		}
	}, {
		key: 'getST',


		/** Based on tile number, get the s and t coordinate ranges of the tile.
  returns array of format [s1,t1,s2,t2] */
		value: function getST(tileNum) {
			var stRange = [this.tileSizeNormalized * (tileNum % this.tilesPerRow) + this.paddingNormalized, this.tileSizeNormalized * Math.floor(tileNum / this.tilesPerRow) + this.paddingNormalized];
			stRange[2] = stRange[0] + this.tileSizeNormalized - this.paddingNormalized * 1.5;
			stRange[3] = stRange[1] + this.tileSizeNormalized - this.paddingNormalized * 1.5;
			return stRange;
		}
	}]);

	return TextureAtlas;
}();

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "#define M_PI 3.1415926535897932384626433832795\n\nattribute vec3 aPosition;\nattribute vec3 aOffset;\nattribute vec2 aTexture;\nattribute float aMoving;\nattribute float aFlipped;\n\nuniform vec3 uCamPos;\nuniform mat4 uMMatrix;\nuniform mat4 uVMatrix;\nuniform mat4 uPMatrix;\nuniform float uCounter;\n\nvarying vec4 vWorldVertex;\nvarying vec3 vWorldNormal;\nvarying vec4 vPosition;\nvarying vec2 vTexture;\n\nconst vec3 camUp = vec3(0.0, 0.0, 1.0);\n\nvoid main(void) {\n\t// Billboarding\n\tvec3 look = normalize(uCamPos - aPosition);\n\tvec3 right = normalize(cross(camUp, look));\n\tvec3 up = normalize(cross(look, right));\n\n\tvec3 offset = aOffset;\n\n\tif (aFlipped > 0.5)\n\t\toffset.x *= -1.0;\n\n\t// Thanks to http://www.gamedev.net/topic/385785-billboard-shader/#entry3550648\n\tvec3 vR = offset.x*right;\n\tvec3 vU = offset.z*up;\n\tvec4 d = vec4(vR+vU+look*0.5, 0.0);\n\tvPosition = vWorldVertex =  uMMatrix * (vec4(aPosition, 1.0) + d);\n\n\tvWorldNormal = look;\n\tvTexture = aTexture;\n\n\tgl_Position = uPMatrix * uVMatrix * vWorldVertex;\n}\n\n"

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "precision mediump float;\n\nconst float Near = 1.0;\nconst float Far = 30.0;\nconst float LinearDepthConstant = 1.0 / (Far - Near);\n\nvarying vec4 vPosition;\n\n// Via http://devmaster.net/posts/3002/shader-effects-shadow-mapping\nvec4 pack(float depth) {\n\tconst vec4 bias = vec4(1.0/255.0, 1.0/255.0, 1.0/255.0, 0.0);\n\n\tfloat r = depth;\n\tfloat g = fract(r*255.0);\n\tfloat b = fract(g*255.0);\n\tfloat a = fract(b*255.0);\n\tvec4 color = vec4(r, g, b, a);\n\n\treturn color - (color.yzww * bias);\n}\n\nvoid main(void) {\n\tfloat linearDepth = length(vPosition) * LinearDepthConstant;\n\t/*gl_FragColor = pack(linearDepth);*/\n\tgl_FragColor = vec4(1.0,0.0,1.0,1.0);\n}\n\n"

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "attribute vec3 aPosition;\n\nuniform mat4 uVMatrix;\nuniform mat4 uMMatrix;\nuniform mat4 uPMatrix;\n\nvarying vec4 vPosition;\n\nvoid main(void) {\n\tvPosition = uVMatrix * uMMatrix * vec4(aPosition + vec3(-8,-8,-8), 1.0);\n\tvPosition += vec4(0,0,-16,0);\n\tvPosition = vec4(aPosition, 1.0);\n\tgl_Position = uPMatrix * vPosition;\n}\n\n"

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = "precision mediump float;\n\nconst float Near = 1.0;\nconst float Far = 30.0;\nconst float LinearDepthConstant = 1.0 / (Far - Near);\n\nstruct PointLight\n{\n\tfloat enabled;\n\tvec3 color;\n\tvec3 position;\n\tvec3 attenuation;\n};\n\nvarying vec4 vWorldVertex;\nvarying vec3 vWorldNormal;\nvarying vec4 vPosition;\nvarying vec2 vTexture;\n\nuniform PointLight uLight[4];\nuniform sampler2D uDepthMap;\n\nuniform sampler2D uSampler; // texture coords\nuniform vec3 uAmbientColor;\n\nfloat unpack(vec4 color)\n{\n\tconst vec4 bitShifts = vec4(1.0, 1.0/255.0, 1.0/(255.0*255.0), 1.0/(255.0*255.0*255.0));\n\treturn dot(color, bitShifts);\n}\n\nvoid main(void) {\n\tvec3 normal = normalize(vWorldNormal);\n\tvec4 texColor = texture2D(uSampler, vec2(vTexture.s, vTexture.t));\n\tif (texColor.a < 0.1) // Transparent textures\n\t\tdiscard;\n\n\tvec3 color = uAmbientColor;\n\n\tfor (int i=0; i<4; i++) {\n\t\tif (uLight[i].enabled < 0.5)\n\t\t\tcontinue;\n\t\tvec3 lightVec = normalize(uLight[i].position - vWorldVertex.xyz);\n\t\tfloat l = dot(normal, lightVec);\n\n\t\tif (l <= 0.0)\n\t\t\tcontinue;\n\n\t\tfloat d = distance(vWorldVertex.xyz, uLight[i].position);\n\t\tfloat a = 1.0/(\n\t\t\tuLight[i].attenuation.x +\n\t\t\tuLight[i].attenuation.y*d + \n\t\t\tuLight[i].attenuation.z*d*d\n\t\t);\n\t\tcolor += l*a*uLight[i].color;\n\t}\n\n\t//vec3 depth = vPosition.xyz / vPosition.w;\n\t//depth.z = length(vWorldVertex.xyz - uLight[0].position) * LinearDepthConstant;\n\tfloat shadow = 1.0;\n\n\t//depth.z *= 0.96; // Offset depth \n\t//if (depth.z > unpack(texture2D(uDepthMap, depth.xy)))\n\t\t//shadow *= 0.5;\n\n\tgl_FragColor = clamp(vec4(texColor.rgb*color*shadow, texColor.a), 0.0, 1.0);\n}\n\n"

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = "attribute vec3 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aTexture;\n\nuniform mat4 uMMatrix;\nuniform mat4 uVMatrix;\nuniform mat4 uPMatrix;\n\nuniform mat4 uLightVMatrix;\nuniform mat4 uLightPMatrix;\n\nvarying vec4 vWorldVertex;\nvarying vec3 vWorldNormal;\nvarying vec4 vPosition;\nvarying vec2 vTexture;\n\nvoid main(void) {\n\tvWorldVertex = uMMatrix * vec4(aPosition, 1.0);\n\tvec4 viewVertex = uVMatrix * vWorldVertex;\n\tgl_Position = uPMatrix * viewVertex;\n\n\tvTexture = aTexture;\n\tvWorldNormal = normalize(mat3(uMMatrix) * aNormal);\n\n\tvPosition = uLightPMatrix * uLightVMatrix * vWorldVertex;\n}\n\n"

/***/ })
/******/ ]);