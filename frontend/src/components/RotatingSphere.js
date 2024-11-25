// RotatingSphere.js
import React, { useRef } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import helvetiker from 'three/examples/fonts/helvetiker_regular.typeface.json';
import { useNavigate } from 'react-router-dom';

// Extend react-three-fiber to recognize TextGeometry
extend({ TextGeometry });

function SphereWithText() {
    const navigate = useNavigate();

    const sphereRef = useRef();
    const font = new FontLoader().parse(helvetiker);

    // Create the text geometry with smaller size
    const textOptions = { font, size: 0.2, height: 0.02 };
    const textGeometry = new TextGeometry('Timtou', textOptions);
    textGeometry.center(); // Center the text geometry

    return (
        <mesh ref={sphereRef} castShadow receiveShadow>
            {/* Sphere geometry */}
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#252625" metalness={0.1} roughness={0.1} />

            {/* Centered and smaller Text geometry positioned on the sphere's surface */}
            <mesh geometry={textGeometry} position={[0, 0, 1]}>
                <meshStandardMaterial color="#3d8d2a" />
            </mesh>

            {/* Invisible box for larger clickable area around the text */}
            <mesh
                position={[0, 0, 1]}
                onClick={() => navigate('/timtou')}
            >
                <boxGeometry args={[1, 0.3, 0.05]} /> {/* Adjust box size as needed */}
                <meshBasicMaterial transparent opacity={0} />
            </mesh>
        </mesh>
    );
}

function RotatingSphere() {
    return (
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
            {/* Lighting */}
            <ambientLight intensity={0.8} />

            {/* Sphere with embedded and centered Text */}
            <SphereWithText />

            {/* Ground Plane for Shadows */}
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
                <planeGeometry args={[10, 10]} />
                <shadowMaterial opacity={0.3} />
            </mesh>

            {/* OrbitControls for rotating the sphere and text together */}
            <OrbitControls enableZoom={false} />
        </Canvas>
    );
}

export default RotatingSphere;
