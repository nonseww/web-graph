#ifndef EDGE_H
#define EDGE_H

#include <string>

template <typename T>
struct Edge {
    T vertex; // вершина
    int weight = 0; // вес
    std::string label = "no label"; // метка

    Edge() = default;
    Edge(const T& vertex, int weight = 0, const std::string& label = "no label") :
        vertex(vertex), weight(weight), label(label) {
            if (label.empty()) {
                this->label = "no label";
            }
        }
};

#endif