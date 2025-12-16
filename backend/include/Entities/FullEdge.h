#ifndef FULLEDGE_H
#define FULLEDGE_H

#include <string>

template <typename T>
struct FullEdge {
    T u, v;
    int weight;

    FullEdge() = default;
    FullEdge(const T& u, const T& v, int weight = 0)
        : u(u), v(v), weight(weight) {}
};


#endif