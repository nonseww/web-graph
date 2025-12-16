#!/usr/bin/env bash

mkdir -p src/build

em++ \
  src/wasm_wrapper.cpp \
  -Iinclude \
  -O3 \
  -s MODULARIZE=1 \
  -s EXPORT_ES6=1 \
  -s SINGLE_FILE=1 \
  -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap", "UTF8ToString", "stringToUTF8", "lengthBytesUTF8"]' \
  -s EXPORTED_FUNCTIONS='[
      "_load_directedGraph",
      "_load_undirectedGraph",
      "_get_graphJSON",
      "_delete_graph",
      "_add_vertex",
      "_add_edge",
      "_delete_vertex",
      "_delete_edge",
      "_get_outdegree",
      "_get_indegree",
      "_get_degree",
      "_reverse_graph",
      "_check_cycles",
      "_find_unreachable",
      "_kruskal",
      "_ecc_center_raduis",
      "_shortest_paths",
      "_is_negcycle_here",
      "_max_flow",
      "_malloc",
      "_free"
  ]' \
  -o src/build/graph.js