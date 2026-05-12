# GraphFlow WASM

A web application for working with graphs and solving the Maximum Flow problem using the **Goldberg-Rao algorithm**.

## Overview
This project implements a complex, mathematically-intensive **Goldberg-Rao** max-flow algorithm. To achieve near-native performance in the browser, the core logic is written in **C++** (fully Object-Oriented) and compiled to **WebAssembly (WASM)**.

## Stack
*   **Core Logic:** C++21 
*   **Web Integration:** WebAssembly (WASM) via Emscripten.
*   **Frontend:** React, TypeScript.
*   **Visualization:** D3.js

## Features
*   **Main features**: Works with any graph structure and visualize it.
*   **Advanced Algorithm:** Implements the Goldberg-Rao algorithm, known for its superior theoretical complexity on large-scale graphs.
*   **WASM Acceleration:** High-speed graph processing directly in the browser without server-side overhead.
*   **Full OOP Design:** The C++ core is built with clean, modular, and extensible object-oriented principles.
*   **Interactive UI:** Real-time graph manipulation and flow calculation via a TypeScript-powered React dashboard.

## How it works
1. The C++ engine handles the complex graph structures and flow calculations.
2. Emscripten bridges the C++ classes to JavaScript.
3. The React frontend manages the user state and visualizes the results.
