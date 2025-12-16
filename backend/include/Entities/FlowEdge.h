#ifndef FLOWEDGE_H
#define FLOWEDGE_H

template <typename T>
struct FlowEdge {
    T to;
    int rev;
    int cap;
    int flow;

    FlowEdge() = default;
    FlowEdge(T to, int rev, int cap) : to(to), rev(rev), cap(cap), flow(0) {}
    FlowEdge(T to, int rev, int cap, int flow) : to(to), rev(rev), cap(cap), flow(flow) {}
};

#endif